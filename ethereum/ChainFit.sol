pragma solidity ^0.8.0;

import "./ChainFitToken.sol";


contract ChainFit {

    ChainFitToken public chainFitToken;

    constructor(address _cftToken) {
        chainFitToken = ChainFitToken(_cftToken);
    }



    ///////////////////////////////////////////////////////////////////
    //////////                                               //////////
    //////////                     DATA                      //////////
    //////////                                               //////////
    ///////////////////////////////////////////////////////////////////

    // List of gym visits
    mapping(uint => GymVisit) gymVisits;
    uint gymVisitsCount = 0;


    // List of gym visit rates
    mapping(uint => GymVisitRate) gymVisitRates;
    uint gymVisitRatesCount = 0;


   



    ///////////////////////////////////////////////////////////////////
    //////////                                               //////////
    //////////                  MODIFIERS                    //////////
    //////////                                               //////////
    ///////////////////////////////////////////////////////////////////

    modifier notZero(uint value){
        require(value != 0, "Value is zero");
        _;
    }

    modifier allowToAddVisit(){
        require(checkLastVisitTime(), "You added your last visit earlier than 8 hours ago");
        require(checkWeekVisitLimit(), "You reached the week visit limit");
        _;
    }

    modifier allowToAddRate (uint visitId) {
        require(gymVisits[visitId].user != msg.sender, "You cannot rate own visit");
        require(checkVisitInProgress(visitId), "Visit was rated or time exceed");
        require(checkVisitRatingTimeNotExceed(visitId), "Time to rate visit is over");
        require(getUserVisitRates(msg.sender, Const.DAY_SECONDS).length <= Const.MAX_DAILY_RATES, "Reached daily rate limit");
        require(checkRated(msg.sender, visitId) == false, "You rated this visit");
        _;
    }

    modifier ownVisit(uint visitId){
        require(gymVisits[visitId].user == msg.sender);
        _;
    }





    ///////////////////////////////////////////////////////////////////
    //////////                                               //////////
    //////////                DATA STRUCTURES                //////////
    //////////                                               //////////
    ///////////////////////////////////////////////////////////////////

    enum Result { // result of social photo verification
        Positive, // 0 - visit accepted, token assigned
        InProgress, // 1 - didn't verified yet
        Negative_insufficientRates, // 2 - didn't get Const.RATES_REQUIRE or Const.RATES_SOCIALMEDIA_REQUIRE in Const.RATE_DAYS
        Negative_ratesNegative, // 3 - rates were negative (need >= Const.POSITIVE_RATES_PERCENT %)
        Negative_insufficientUserRates, // 4 - user didn't give atleast Const.DAILY_RATES_REQUIRED rates per day since Const.RATE_DAYS
        Negative_pickTimeOut, // 5 - out of time to check visit (default Const.RATE_DAYS)
        Contested, // 6 - user reported negative verification (only after Result.Negative_ratesNegative)
        Negative_afterContested // 7 - negative reclamation verification
    }

    enum Rate { Positive, Negative } // rating of photo (on gym / not on gym) - can add some reject reasons

    enum RateSource { QRCode, App } // source of given rate

    struct GymVisit { // entity of visit (with server photo)
        uint visitId; // identifier of visit
        address user; // user who added a visit
        uint visitTime; // time of the visit
        string hash; // verification hash value
        Result result; // result of visit
        uint[] ratesIds; // idents of rates for this visit (optimizing search)
    }

    struct GymVisitRate { // entity of visit rate
        uint visitId; // identifier of visit
        address userRated; // user who rated a visit
        uint ratingTime; // time of the rating
        Rate rate; // given rate
        RateSource rateSource; // source of given rate
    }






    ///////////////////////////////////////////////////////////////////
    //////////                                               //////////
    //////////                    EVENTS                     //////////
    //////////                                               //////////
    ///////////////////////////////////////////////////////////////////

    // event emit after add new visit
    event NewVisit(address user, uint id, uint addTime);

    // event emit after add new rate
    event NewRate(address userRated, uint rateId, uint visitId, Rate rate, uint rateTime);




    ///////////////////////////////////////////////////////////////////
    //////////                                               //////////
    //////////                VIEW METHODS                   //////////
    //////////                                               //////////
    ///////////////////////////////////////////////////////////////////

    function getVisitsCount() external view returns(uint){
        return gymVisitsCount;
    }

    function getVisitRatesCount() external view returns(uint){
        return gymVisitRatesCount;
    }




    ///////////////////////////////////////////////////////////////////
    //////////                                               //////////
    //////////            MAIN METHODS IMPLEMENTATION        //////////
    //////////                                               //////////
    ///////////////////////////////////////////////////////////////////

    // Add GymVisit, emit event "NewVisit"
    function addVisit(string memory hash) external allowToAddVisit {
        gymVisits[gymVisitsCount] = GymVisit(gymVisitsCount, msg.sender, block.timestamp, hash, Result.InProgress, new uint[](0));
        emit NewVisit(msg.sender, gymVisitsCount, block.timestamp);
        gymVisitsCount++;
    }

    // Add a GymVisitRate, emit event "NewRate"
    function addRate(uint visitId, Rate rate, RateSource rateSource) external allowToAddRate(visitId) {
        gymVisitRates[gymVisitRatesCount] = GymVisitRate(visitId,msg.sender, block.timestamp, rate, rateSource);
        gymVisits[visitId].ratesIds.push(gymVisitRatesCount);
        emit NewRate(msg.sender, gymVisitRatesCount, visitId, rate, block.timestamp);
        gymVisitRatesCount++;
    }

    // Check visit (change status and possibly pay token). Anyone can execute it on any visit
    function checkVisit(uint visitId) public returns(Result result){
        require(gymVisits[visitId].result == Result.InProgress, "This visit has already rated");
        bool inTimeToRate = checkVisitRatingTimeNotExceed(visitId);

        // Check if the visit exceeded the claim reward time
        if(gymVisits[visitId].visitTime + Const.CLAIN_REWARD_TIME < block.timestamp){
            gymVisits[visitId].result = Result.Negative_pickTimeOut;
        }
        // Check if the user provided enough rates and it's social media count within the time limit
        else if((!(checkVisitRatesCount(visitId) && checkVisitRatesSocialmediaCount(visitId))) && !inTimeToRate){
            gymVisits[visitId].result = Result.Negative_insufficientRates;
        }
        // Check if the user provided positive rates in needed percentage
        else if(!checkVisitRatesResult(visitId) && !inTimeToRate){
            gymVisits[visitId].result = Result.Negative_ratesNegative;
        }
        // Check if the user provided enough rates for other users visits to qualify for the reward
        else if(!checkRequiredUserRatesToReward() && !inTimeToRate){
            gymVisits[visitId].result = Result.Negative_insufficientUserRates;
        }
        // Transfer tokens from pool and set the result to positive
        else {
            gymVisits[visitId].result = Result.Positive;
            chainFitToken.payRewardForGymVisit(visitId, gymVisits[visitId].user);
        }

        return gymVisits[visitId].result;
    }





    ///////////////////////////////////////////////////////////////////
    //////////                                               //////////
    //////////                GETTERS METHODS                //////////
    //////////                                               //////////
    ///////////////////////////////////////////////////////////////////

    // Get the visits for user not older than historyTime (from now)
    function getVisits(address user, uint historyTime) view public notZero(historyTime) returns(GymVisit[] memory visits){
        if(gymVisitsCount == 0) return new GymVisit[](0);

        // Maximum amount of visits in historyTime
        uint retLen = Const.MAX_WEEK_VISITS * Math.ceilDiv(historyTime, Const.WEEK_SECONDS);

        // Get the visits for user in this time
        GymVisit[] memory ret = new GymVisit[](retLen);
        uint minTime = block.timestamp - historyTime;
        uint index = gymVisitsCount - 1;
        uint indexRet = 0;
        while(gymVisits[index].visitTime >= minTime && index >= 0){
            if(gymVisits[index].user == user){
                if(indexRet < retLen) ret[indexRet++] = gymVisits[index];
                else break;
            }
            if(index == 0) break;
            else index--;
        }

        // Array without empty slots
        GymVisit[] memory r = new GymVisit[](indexRet);
        for(uint i=0; i<indexRet; i++){
            r[i] = ret[i];
        }

        return r;
    }



   // Get the visit rates for user not older than historyTime (from now)
    function getUserVisitRates(address user, uint historyTime) notZero(historyTime) public view returns(GymVisitRate[] memory){
        if(gymVisitRatesCount == 0) return new GymVisitRate[](0);

        uint minTime = block.timestamp - historyTime;
        uint userVisitRatesCount = 0;

        // Count the number of gym visit rates for the given user that meet the historyTime criteria
        for (uint i = 0; i < gymVisitRatesCount; i++) {
            if (gymVisitRates[i].userRated == user && gymVisitRates[i].ratingTime >= minTime) {
                userVisitRatesCount++;
            }
        }

        GymVisitRate[] memory userVisitRates = new GymVisitRate[](userVisitRatesCount);
        uint userVisitRatesIndex = 0;

        for (uint i = 0; i < gymVisitRatesCount; i++) {
            if (gymVisitRates[i].userRated == user && gymVisitRates[i].ratingTime >= historyTime) {
                userVisitRates[userVisitRatesIndex] = gymVisitRates[i];
                userVisitRatesIndex++;
            }
        }

        return userVisitRates;
    }


    // Count of rates for visitId
    function getVisitRatesCountForVisit(uint visitId) public view returns(uint){
        uint[] memory rates = gymVisits[visitId].ratesIds;
        return rates.length;
    }

    // Array of GymVisitRate objects for visitId
    function getVisitRates(uint visitId) public view returns(GymVisitRate[] memory){
        uint[] memory rates = gymVisits[visitId].ratesIds;
        GymVisitRate[] memory ret = new GymVisitRate[](rates.length);
        for(uint i=0; i<rates.length; i++){
            ret[i] = gymVisitRates[i];
        }
        return ret;
    }



    ///////////////////////////////////////////////////////////////////
    //////////                                               //////////
    //////////               CHECKERS METHODS                //////////
    //////////                                               //////////
    ///////////////////////////////////////////////////////////////////

    // Check last visit was added before Const.MINIMUM_TIME_BETWEEN_VISITS (true = allow to add visit)
    function checkLastVisitTime() public view returns(bool){
        return getVisits(msg.sender, Const.MINIMUM_TIME_BETWEEN_VISITS).length == 0;
    }

    // Check week visit add limit - true if user can add visit (maximum Const.MAX_WEEK_VISITS per week)
    function checkWeekVisitLimit() public view returns(bool){
        return getVisits(msg.sender, Const.WEEK_SECONDS).length < Const.MAX_WEEK_VISITS;
    }

    // Check time to rate - true if it's in time (only Const.RATE_TIME after adding the visit)
    function checkVisitRatingTimeNotExceed(uint visitId) public view returns(bool){
        return gymVisits[visitId].visitTime + Const.RATE_TIME >= block.timestamp;
    }

    // Check is Result.InProgress for visit
    function checkVisitInProgress(uint visitId) public view returns(bool){
        if(checkVisitRatingTimeNotExceed(visitId) == false) return false;
        else return gymVisits[visitId].result == Result.InProgress;
    }

    // Check if visit has enough rates to check reward
    function checkVisitRatesCount(uint visitId) public view returns(bool){
        return getVisitRatesCountForVisit(visitId) >= Const.RATES_REQUIRE;
    }

    // Check if visit has enough rates from social media to check reward
    function checkVisitRatesSocialmediaCount(uint visitId) public view returns(bool){
        GymVisitRate[] memory rates = getVisitRates(visitId);
        uint socialmediaRates = 0;
        for(uint i=0; i<rates.length; i++)
            if(rates[i].rateSource == RateSource.QRCode)
                socialmediaRates++;
        return socialmediaRates >= Const.RATES_SOCIALMEDIA_REQUIRE;
    }

    // Check positive rates percentage - true if greater than Const.POSITIVE_RATES_PERCENT
    function checkVisitRatesResult(uint visitId) public view returns(bool){
        GymVisitRate[] memory rates = getVisitRates(visitId);
        uint positiveCount = 0;
        for(uint i=0; i<rates.length; i++)
            if(rates[i].rate == Rate.Positive)
                positiveCount++;
        return positiveCount * 100 / rates.length >= Const.POSITIVE_RATES_PERCENT;
    }

    // Check user rated visit yet - true if user rated this visit (so he cannot rate this again)
    function checkRated(address user, uint visitId) public view returns(bool){
        for(uint i=0; i<gymVisitRatesCount; i++){
            if(gymVisitRates[i].visitId == visitId && gymVisitRates[i].userRated == user)
                return true;
        }
        return false;
    }

    // Check if user add enought rates to get a reward (user has to make atleast Const.DAILY_RATES_REQUIRED in Const.RATE_DAYS)
    function checkRequiredUserRatesToReward() public view returns(bool){
        GymVisitRate[] memory rates = getUserVisitRates(msg.sender, Const.RATE_TIME + 60);
        uint[] memory daysRates = new uint[](Const.RATE_DAYS);
        for(uint i=0; i<rates.length; i++){
            uint index = (block.timestamp - rates[i].ratingTime) / uint(Const.DAY_SECONDS); // should be from 0 to Const.RATE_DAYS)
            if(index < Const.RATE_DAYS) daysRates[index] = daysRates[index] + 1;
        }
        for(uint i=0; i<Const.RATE_DAYS; i++){
            uint ratesForDay = daysRates[i];
            if(ratesForDay < Const.DAILY_RATES_REQUIRED)
                return false;
        }
        return true;
    }

}



///////////////////////////////////////////////////////////////////
//////////                                               //////////
//////////                   CONSTANTS                   //////////
//////////                                               //////////
///////////////////////////////////////////////////////////////////


library Const {
    uint constant MAX_WEEK_VISITS = 3; // maximum visits per week
    uint constant MAX_DAILY_RATES = 20; // maximum rates per day

    uint constant MINIMUM_TIME_BETWEEN_VISITS = 60 * 60 * 8; // hours between adding visits
    uint constant RATES_REQUIRE = 10; // rates required to verify a visit
    uint constant RATES_SOCIALMEDIA_REQUIRE = 5; // rates from social media required to verify a visit
    uint constant POSITIVE_RATES_PERCENT = 80; // positive rates percent require to verify a visit
    uint constant DAILY_RATES_REQUIRED = 5; // daily rates commit needed to recive yield

    uint constant RATE_DAYS = 3; //time to rate a visit
    uint constant RATE_TIME = DAY_SECONDS * RATE_DAYS; //time to rate a visit

    uint constant CLAIN_REWARD_DAYS = 7; // time to claim reward (within time to vote)
    uint constant CLAIN_REWARD_TIME = CLAIN_REWARD_DAYS * DAY_SECONDS; // time to claim reward (within time to vote)

    uint constant DAY_SECONDS = 60*60*24;
    uint constant WEEK_SECONDS = DAY_SECONDS * 7;
    uint constant MAX_UINT = 2**256 - 1;
    uint constant APP_START_DATE = 1672527600; //2023.01.01
    address constant DEFAULT_ADDRESS = address(0);
}
