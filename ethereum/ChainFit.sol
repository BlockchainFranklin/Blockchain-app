pragma solidity ^0.8.0;

import "@openzeppelin/contracts/utils/math/Math.sol";
import "./Token.sol";

interface ChainFitInterface {

    ///////////////////////////////////////////////////////////////////
    //////////                                               //////////
    //////////                DATA STRUCTURES                //////////
    //////////                                               //////////
    ///////////////////////////////////////////////////////////////////

    struct User { // user profile
        address userAddress;
    }

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
        User user; // user who added a visit
        uint visitTime; // time of the visit
        uint localizationX; // localization to verify in int value (ex. 52.406333 -> 52406333)
        uint localizationY;
        string hash; // verification hash value
        Result result; // result of visit
        uint[] ratesIds; // idents of rates for this visit (optimizing search)
    }

    struct GymVisitRate { // entity of visit rate
        uint visitId; // identifier of visit
        User userRated; // user who rated a visit
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

    // event emit after accept visit and transfer token
    event TokenPayment(address user, uint visitId, uint amount, uint paymentTime);




    ///////////////////////////////////////////////////////////////////
    //////////                                               //////////
    //////////                   METHODS                     //////////
    //////////                                               //////////
    ///////////////////////////////////////////////////////////////////

    // Add a visit with localization, emit event "NewVisit"
    function addVisit(uint localizationX, uint localizationY, string memory hash) external;

    // Add a visit without localization, emit event "NewVisit"
    function addVisit(string memory hash) external;

    // Add a rate, emit event "NewRate"
    function addRate(uint gymVisit, Rate rate, RateSource ratesource) external;

    // Check visit (change status and possibly pay token)
    function checkVisit(uint visitId) external returns(Result);






    ///////////////////////////////////////////////////////////////////
    //////////                                               //////////
    //////////             VIEW/PURE METHODS                 //////////
    //////////                                               //////////
    ///////////////////////////////////////////////////////////////////

    // Get user by address
    function getUser(address userAddress) external pure returns(User memory user);
   
    // Get user visits from some time (to show in app - default week)
    function getVisits(address user, uint historyTime) external view returns(GymVisit[] memory);
    function getVisits(uint historyTime) external view returns(GymVisit[] memory);
    function getVisits() external view returns(GymVisit[] memory);

    // Get all visits
    function getAllVisits() external view returns(GymVisit[] memory);

    // Get GymVisitRates objects of visit
    function getVisitRates(uint visitId) external view returns(GymVisitRate[] memory);

    // // Get rates count for visit
    function getVisitRatesCount(uint visitId) external view returns(uint);

    // Get user visit rates
    function getUserVisitRates(address user, uint historyTime) external view returns(GymVisitRate[] memory);
    function getUserVisitRates(uint historyTime) external view returns(GymVisitRate[] memory);
    function getUserVisitRates() external view returns(GymVisitRate[] memory);


    // Check last visit time
    function checkLastVisitTime() external view returns(bool);

    // Check week visits limit
    function checkWeekVisitLimit() external view returns(bool);

    // Check visit rating time
    function checkVisitRatingTimeNotExceed(uint visitId) external view returns(bool);

    // Check claim reward time
    function checkClaimRewardTimeNotExceed(uint visitId) external view returns(bool);


    // Check is visit still in "in progress" result
    function checkVisitInProgress(uint visitId) external view returns(bool);

    // Check visit hash value
    function checkVisitHash(uint visitId, string memory hash) external view returns(bool);

    // Check visit rates count (to check reward)
    function checkVisitRatesCount(uint visitId) external view returns(bool);

    // Check visit rates count from social media (to check reward)
    function checkVisitRatesSocialmediaCount(uint visitId) external view returns(bool);

    // Check positive rates percent
    function checkVisitRatesResult(uint visitId) external view returns(bool);

    // Check required number of ratings to reward
    function checkRequiredUserRatesToReward() external view returns(bool);

    // Check user rated visit
    function checkRated(address user, uint visitId) external view returns(bool);
}






contract ChainFit is ChainFitInterface {

    ChainFitToken public chainFitToken;


    constructor() {
        chainFitToken = new ChainFitToken(msg.sender);
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

    modifier timeUnderYear(uint time){
        require(time <= (Const.DAY_SECONDS * 366), "Maximum time is one year");
        _;
    }

    modifier notZero(uint value){
        require(value != 0, "Value is zero");
        _;
    }

    modifier allowToAddVisit(){
        require(checkLastVisitTime(), "You added your last visit earlier than 8 hours ago");
        require(checkWeekVisitLimit(), "You reached the week visit limit");
        _;
    }

    modifier allowToAddRate(uint visitId){
        require(isOwnVisit(visitId) == false, "You cannot rate own visit");
        require(checkVisitInProgress(visitId), "Visit was rated or time exceed");
        require(checkVisitRatingTimeNotExceed(visitId), "Time to rate visit is over");
        require(getUserVisitRates(Const.DAY_SECONDS).length <= Const.MAX_DAILY_RATES, "Reached daily rate limit");
        require(checkRated(msg.sender, visitId) == false, "You rated this visit");
        _;
    }

    modifier ownVisit(uint visitId){
        require(isOwnVisit(visitId) == true);
        _;
    }

    modifier notOwnVisit(uint visitId){
        require(isOwnVisit(visitId) == false);
        _;
    }



    ///////////////////////////////////////////////////////////////////
    //////////                                               //////////
    //////////                      TEST                     //////////
    //////////                                               //////////
    ///////////////////////////////////////////////////////////////////


    function _insertSampleData() public {
        uint timeNow = block.timestamp;
        uint yesterday = timeNow - Const.DAY_SECONDS;
        uint twoDaysAgo = yesterday - Const.DAY_SECONDS;
        uint threeDaysAgo = twoDaysAgo - Const.DAY_SECONDS;
        uint weekAgo = block.timestamp - Const.WEEK_SECONDS;

        gymVisits[gymVisitsCount] = GymVisit(gymVisitsCount, getUser(address(0x5B38Da6a701c568545dCfcB03FcB875f56beddC4)), threeDaysAgo, 0, 0, "", Result.InProgress, new uint[](0));
        gymVisitsCount++;

        for(uint i=0; i<6; i++) {
            gymVisitRates[gymVisitRatesCount] = GymVisitRate(0, getUser(msg.sender), block.timestamp, Rate.Positive, RateSource.App);
            gymVisits[0].ratesIds.push(gymVisitRatesCount);
            gymVisitRatesCount++;
        }
        for(uint i=0; i<6; i++) {
            gymVisitRates[gymVisitRatesCount] = GymVisitRate(0, getUser(msg.sender), block.timestamp, Rate.Positive, RateSource.QRCode);
            gymVisits[0].ratesIds.push(gymVisitRatesCount);
            gymVisitRatesCount++;
        }
    }

    function payTo(address to) public {
        chainFitToken.payRewardForGymVisit(to);
    }

    function balance(address addr) view public returns(uint balance) {
        return chainFitToken.balanceOf(addr);
    }

    function _sendTokens(address to, uint value) public {
        chainFitToken.sendTokens(to,value);
    }




    ///////////////////////////////////////////////////////////////////
    //////////                                               //////////
    //////////             METHODS IMPLEMENTATION            //////////
    //////////                                               //////////
    ///////////////////////////////////////////////////////////////////


    function getUser(address userAddress) public pure returns(User memory user){
        return User(userAddress);
    }

    function getVisitsCount() external view returns(uint){
        return gymVisitsCount;
    }

    function getVisitRatessCount() external view returns(uint){
        return gymVisitRatesCount;
    }

    function addVisit(uint localizationX, uint localizationY, string memory hash) public override allowToAddVisit {
        gymVisits[gymVisitsCount] = GymVisit(gymVisitsCount, getUser(msg.sender), block.timestamp, localizationX, localizationY, hash, Result.InProgress, new uint[](0));
        emit NewVisit(msg.sender, gymVisitsCount, block.timestamp);
        gymVisitsCount++;
    }

    function addVisit(string memory hash) public override allowToAddVisit {
        return addVisit(0, 0, hash);
    }

    function addRate(uint visitId, Rate rate, RateSource rateSource) public override allowToAddRate(visitId) {
        gymVisitRates[gymVisitRatesCount] = GymVisitRate(visitId, getUser(msg.sender), block.timestamp, rate, rateSource);
        gymVisits[visitId].ratesIds.push(gymVisitRatesCount);
        emit NewRate(msg.sender, gymVisitRatesCount, visitId, rate, block.timestamp);
        gymVisitRatesCount++;
    }

    function checkVisit(uint visitId) external override ownVisit(visitId) returns(Result result){
        require(gymVisits[visitId].result == Result.InProgress, "This visit has already rated");
        bool inTimeToClaim = checkClaimRewardTimeNotExceed(visitId);
        bool inTimeToRate = checkVisitRatingTimeNotExceed(visitId);

        if(!inTimeToClaim){
            return Result.Negative_pickTimeOut;
        }
        else if(!(checkVisitRatesCount(visitId) && checkVisitRatesSocialmediaCount(visitId))){
            if(inTimeToRate) return Result.InProgress;
            else {
                gymVisits[visitId].result = Result.Negative_insufficientRates;
                return Result.Negative_insufficientRates;
            }
        }
        else if(!checkVisitRatesResult(visitId)){
            if(inTimeToRate) return Result.InProgress;
            else {
                gymVisits[visitId].result = Result.Negative_ratesNegative;
                return Result.Negative_ratesNegative;
            }
        }
        else if(!checkRequiredUserRatesToReward()){
            if(inTimeToRate) return Result.InProgress;
            else {
                gymVisits[visitId].result = Result.Negative_insufficientUserRates;
                return Result.Negative_insufficientUserRates;
            }
        }
        else {
            // Transfer tokens from pool
            gymVisits[visitId].result = Result.Positive;
            chainFitToken.payRewardForGymVisit(msg.sender);
        }
    }




    function getVisits(address user, uint historyTime) view public override notZero(historyTime) returns(GymVisit[] memory visits){
        if(gymVisitsCount == 0) return new GymVisit[](0);
        uint retLen = getMaxCountVisitsForTime(historyTime);
        GymVisit[] memory ret = new GymVisit[](retLen);
        uint minTime = block.timestamp - historyTime;
        uint index = gymVisitsCount - 1;
        uint indexRet = 0;
        while(index >= 0 && gymVisits[index].visitTime >= minTime){
            if(gymVisits[index].user.userAddress == user){
                if(indexRet < retLen) ret[indexRet++] = gymVisits[index];
                else break;
            }
            if(index == 0) break;
            else index--;
        }
        return ret;
    }

    function getVisits(uint historyTime) view public override notZero(historyTime) returns(GymVisit[] memory visits){
        return getVisits(msg.sender, historyTime);
    }

    function getVisits() view public override returns(GymVisit[] memory visits){
        return getVisits(msg.sender, block.timestamp - Const.APP_START_DATE);
    }

    
    function getUserVisitRates(address user, uint historyTime) notZero(historyTime) public view returns(GymVisitRate[] memory){
        if(gymVisitRatesCount == 0) return new GymVisitRate[](0);

        uint minTime = block.timestamp - historyTime;
        uint userVisitRatesCount = 0;

        // Count the number of gym visit rates for the given user that meet the historyTime criteria
        for (uint i = 0; i < gymVisitRatesCount; i++) {
            if (gymVisitRates[i].userRated.userAddress == user && gymVisitRates[i].ratingTime >= minTime) {
                userVisitRatesCount++;
            }
        }

        GymVisitRate[] memory userVisitRates = new GymVisitRate[](userVisitRatesCount);
        uint userVisitRatesIndex = 0;

        for (uint i = 0; i < gymVisitRatesCount; i++) {
            if (gymVisitRates[i].userRated.userAddress == user && gymVisitRates[i].ratingTime >= historyTime) {
                userVisitRates[userVisitRatesIndex] = gymVisitRates[i];
                userVisitRatesIndex++;
            }
        }
        return userVisitRates;
    }

    function getUserVisitRates(uint historyTime) view public override notZero(historyTime) returns(GymVisitRate[] memory visits){
        return getUserVisitRates(msg.sender, historyTime);
    }

    function getUserVisitRates() view public override returns(GymVisitRate[] memory visits){
        return getUserVisitRates(msg.sender, block.timestamp - Const.APP_START_DATE);
    }

    function getAllVisits() view public override returns(GymVisit[] memory visits){
        GymVisit[] memory ret = new GymVisit[](gymVisitsCount);
        for(uint i=0; i<gymVisitsCount; i++){
            ret[i] = gymVisits[i];
        }
        return ret;
    }

    function getVisitRatesCount(uint visitId) public view override returns(uint){
        uint[] memory rates = gymVisits[visitId].ratesIds;
        return rates.length;
    }

    function getVisitRates(uint visitId) public view override returns(GymVisitRate[] memory){
        uint[] memory rates = gymVisits[visitId].ratesIds;
        GymVisitRate[] memory ret = new GymVisitRate[](rates.length);
        for(uint i=0; i<rates.length; i++){
            ret[i] = gymVisitRates[i];
        }
        return ret;
    }

    function checkLastVisitTime() public view override returns(bool){
        GymVisit[] memory visits = getVisits(Const.MINIMUM_TIME_BETWEEN_VISITS);
        for(uint i=0; i<visits.length; i++)
            if(visits[i].user.userAddress != Const.DEFAULT_ADDRESS)
                return false;
        return true;
    }

    function checkWeekVisitLimit() public view override returns(bool){
        GymVisit[] memory visits = getVisits(Const.WEEK_SECONDS);
        uint visitCount = 0;
        for(uint i=0; i< visits.length; i++)
            if(visits[i].user.userAddress != Const.DEFAULT_ADDRESS)
                visitCount++;
        return visitCount < Const.MAX_WEEK_VISITS;
    }

    function checkVisitRatingTimeNotExceed(uint visitId) public view override returns(bool){
        return gymVisits[visitId].visitTime + Const.RATE_TIME >= block.timestamp;
    }

    function checkClaimRewardTimeNotExceed(uint visitId) public view override returns(bool){
        return gymVisits[visitId].visitTime + Const.CLAIN_REWARD_TIME >= block.timestamp;
    }

    function checkVisitInProgress(uint visitId) public view override returns(bool){
        if(checkVisitRatingTimeNotExceed(visitId) == false) return false;
        else return gymVisits[visitId].result == Result.InProgress;
    }

    function checkVisitHash(uint visitId, string memory hash) public view override returns(bool){
        return (keccak256(abi.encodePacked(gymVisits[visitId].hash)) == keccak256(abi.encodePacked(hash)));
    }

    function checkVisitRatesCount(uint visitId) public view returns(bool){
        return getVisitRatesCount(visitId) >= Const.RATES_REQUIRE;
    }

    function checkVisitRatesSocialmediaCount(uint visitId) public view returns(bool){
        GymVisitRate[] memory rates = getVisitRates(visitId);
        uint socialmediaRates = 0;
        for(uint i=0; i<rates.length; i++)
            if(rates[i].rateSource == RateSource.QRCode)
                socialmediaRates++;
        return socialmediaRates >= Const.RATES_SOCIALMEDIA_REQUIRE;
    }

    function checkVisitRatesResult(uint visitId) public view returns(bool){
        GymVisitRate[] memory rates = getVisitRates(visitId);
        uint positiveCount = 0;
        for(uint i=0; i<rates.length; i++)
            if(rates[i].rate == Rate.Positive)
                positiveCount++;
        return positiveCount * 100 / rates.length >= Const.POSITIVE_RATES_PERCENT;
    }

    function checkRated(address user, uint visitId) public view returns(bool){
        for(uint i=0; i<gymVisitRatesCount; i++){
            if(gymVisitRates[i].visitId == visitId && gymVisitRates[i].userRated.userAddress == user)
                return true;
        }
        return false;
    }

    // TODO TEST
    function checkRequiredUserRatesToReward() public view returns(bool){
        GymVisitRate[] memory rates = getUserVisitRates(Const.DAY_SECONDS * (Const.RATE_DAYS + 1)); // days +1 because of checking full days (00:00-23:59)
        uint[] memory daysRates = new uint[](Const.RATE_DAYS);
        uint dayToday = block.timestamp / uint(Const.DAY_SECONDS); // floor division = number of day
        for(uint i=0; i<rates.length; i++){
            uint index = dayToday - (rates[i].ratingTime / uint(Const.DAY_SECONDS)); // should be from 0 to Const.RATE_DAYS + 1)
            if(index < Const.RATE_DAYS) daysRates[index]++;
        }
        for(uint i=0; i<Const.RATE_DAYS; i++)
            if(daysRates[i] < Const.DAILY_RATES_REQUIRED)
                return false;
        return true;
    }









    ///////////////////////////////////////////////////////////////////
    //////////                                               //////////
    //////////               INTERNAL METHODS                //////////
    //////////                                               //////////
    ///////////////////////////////////////////////////////////////////

    // Max visits for aplied time
    function getMaxCountVisitsForTime(uint time) pure internal returns(uint maxVisits){
        return Const.MAX_WEEK_VISITS * Math.ceilDiv(time, Const.WEEK_SECONDS);
    }

    function isOwnVisit(uint visitId) view internal returns(bool result){
        return gymVisits[visitId].user.userAddress == msg.sender;
    }


}




///////////////////////////////////////////////////////////////////
//////////                                               //////////
//////////                   CONSTANTS                   //////////
//////////                                               //////////
///////////////////////////////////////////////////////////////////

library Const {
    uint constant MAX_WEEK_VISITS = 3;
    uint constant MAX_DAILY_RATES = 20;


    uint constant MINIMUM_TIME_BETWEEN_VISITS = 60*60*8; // hours between adding visits
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
