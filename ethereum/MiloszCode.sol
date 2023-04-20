pragma solidity ^0.8.0;

import "@openzeppelin/contracts/utils/math/Math.sol";

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
        Negative_insufficientRates, // 2 - didn't get 10 rates or 5 social media rates in 3 days
        Negative_ratesNegative, // 3 - rates were negative (need >= 90%)
        Negative_insufficientUserRates, // 4 - user didn't give atleast 5 rates per day since 3 days
        Negative_pickTimeOut, // 5 - out of time to check visit (default 4 days)
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

    struct GymVisitRates { // entity of visit rate
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
    function checkVisit(uint visitId) external payable returns(Result);






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
    function getVisitRates(uint visitId) external view returns(GymVisitRates[] memory);

    // // Get rates count for visit
    function getVisitRatesCount(uint visitId) external view returns(uint);

    // Get user visit rates (defualt week)
    function getUserVisitRates(address user, uint historyTime) external view returns(GymVisitRate[] memory);
    function getUserVisitRates(uint historyTime) external view returns(GymVisitRate[] memory);
    function getUserVisitRates() external view returns(GymVisitRate[] memory);


    // Check last visit time (one per 8h)
    function checkLastVisitTime() external view returns(bool);

    // Check week visits limit (3 per week)
    function checkWeekVisitLimit() external view returns(bool);

    // Check visits time (3 days)
    function checkVisitRatingTimeNotExceed(uint visitId) external view returns(bool);


    // Check is visit still in "in progress" result
    function checkVisitInProgress(uint visitId) external view returns(bool);

    // Check visit hash value
    function checkVisitHash(uint visitId, string memory hash) external view returns(bool);

    // Check visit rates count (to check reward)
    function checkVisitRatesCount(uint visitId) external view returns(bool);

    // Check visit rates count from social media (to check reward)
    function checkVisitRatesSocialmediaCount(uint visitId) external view returns(bool);

    // Check positive rates percent (require +90%)
    function checkVisitRatesResult(uint visitId) external view returns(bool);

    // Check required number of ratings to reward
    function checkRequiredUserRatesToReward() external view returns(bool);
}






contract ChainFit is ChainFitInterface {

    address public chainFitToken;

    constructor(){
        chainFitToken = new ChainFitToken();
    }


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
    //////////                     DATA                      //////////
    //////////                                               //////////
    ///////////////////////////////////////////////////////////////////

    // List of gym visits (semaphore?)
    mapping(uint => GymVisit) gymVisits;
    uint gymVisitsCount = 0;

    // List of gym visit rates (semaphore?)
    mapping(uint => GymVisitRates) gymVisitRates;
    uint gymVisitRatesCount = 0;






    ///////////////////////////////////////////////////////////////////
    //////////                                               //////////
    //////////             METHODS IMPLEMENTATION            //////////
    //////////                                               //////////
    ///////////////////////////////////////////////////////////////////

    function insertSampleData() public {
        for(uint i=0; i<10; i++){
            addVisit(/*przykladowy hash*/ "asdfghjkl");
        }
    }

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
        gymVisitRates[gymVisitRatesCount] = GymVisitRates(visitId, getUser(msg.sender), block.timestamp, rate, rateSource);
        gymVisits[visitId].ratesIds.push(gymVisitRatesCount);
        emit NewRate(msg.sender, gymVisitRatesCount, visitId, rate, block.timestamp);
        gymVisitRatesCount++;
    }

    function checkVisit(uint visitId) external payable override ownVisit(visitId) returns(Result result){
        require(gymVisits[visitId].result == Result.InProgress, "This visit has already rated");
        bool inTimeToRate = checkVisitRatingTimeNotExceed(visitId);
        if(!inTimeToRate){
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
            gymVisits[visitId].result = Result.Positive;
            chainFitToken.mint(gymVisits[visitId].user.getAddress());
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
        uint retLen = getMaxCountRatesForTime(historyTime);
        GymVisitRate[] memory ret = new GymVisitRate[](retLen);
        uint minTime = block.timestamp - historyTime;
        uint index = gymVisitRatesCount - 1;
        uint indexRet = 0;
        while(index >= 0 && gymVisitRates[index].rateTime >= minTime){
            if(gymVisitRates[index].userRated.userAddress == user){
                if(indexRet < retLen) ret[indexRet++] = gymVisitRates[index];
                else break;
            }
            if(index == 0) break;
            else index--;
        }
        return ret;
    }

    function getUserVisitRates(uint historyTime) view public override notZero(historyTime) returns(GymVisit[] memory visits){
        return getUserVisitRates(msg.sender, historyTime);
    }

    function getUserVisitRates() view public override returns(GymVisit[] memory visits){
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

    function getVisitRates(uint visitId) public view override returns(GymVisitRates[] memory){
        uint[] memory rates = gymVisits[visitId].ratesIds;
        GymVisitRates[] memory ret = new GymVisitRates[](rates.length);
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
        GymVisitRates[] memory rates = getVisitRates(visitId);
        uint socialmediaRates = 0;
        for(uint i=0; i<rates.length; i++)
            if(rates[i].rateSource == RateSource.QRCode)
                socialmediaRates++;
        return socialmediaRates >= Const.RATES_SOCIALMEDIA_REQUIRE;
    }

    function checkVisitRatesResult(uint visitId) public view returns(bool){
        GymVisitRates[] memory rates = getVisitRates(visitId);
        uint positiveCount = 0;
        for(uint i=0; i<rates.length; i++)
            if(rates[i].rate == Rate.Positive)
                positiveCount++;
        return positiveCount * 100 / rates.length >= Const.POSITIVE_RATES_PERCENT;
    }

    // TODO TEST
    function checkRequiredUserRatesToReward() external view returns(bool){
        GymVisitRate[] memory rates = getUserVisitRates(Const.DAY_SECONDS * (Const.RATE_DAYS + 1)); // days +1 because of checking full days (00:00-23:59)
        uint[] daysRates = new uint[Const.RATE_DAYS];
        uint dayToday = block.timestamp / uint(DAY_SECONDS); // floor division = number of day
        for(uint i=0; i<rates.length; i++){
            uint index = dayToday - (rates.ratingTime / uint(DAY_SECONDS)); // should be from 0 to Const.RATE_DAYS + 1)
            if(index < Const.RATE_DAYS) daysRates[index]++;
        }
        for(uint i=0; i<Const.RATE_DAYS; i++)
            if(daysRates[i] < 5)
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

    // Max visits for aplied time
    function getMaxCountRatesForTime(uint time) pure internal returns(uint maxRates){
        return Const.MAX_DAILY_RATES * Math.ceilDiv(time, Const.DAY_SECONDS);
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
    uint constant RATE_DAYS = 3; //time to rate a visit
    uint constant RATE_TIME = DAY_SECONDS * RATE_DAYS; //time to rate a visit
    uint constant RATES_REQUIRE = 10; // rates required to verify a visit
    uint constant RATES_SOCIALMEDIA_REQUIRE = 5; // rates from social media required to verify a visit
    uint constant POSITIVE_RATES_PERCENT = 80; // positive rates percent require to verify a visit

    uint constant DAY_SECONDS = 60*60*24;
    uint constant WEEK_SECONDS = DAY_SECONDS * 7;

    uint constant MAX_UINT = 2**256 - 1;
    uint constant APP_START_DATE = 1672527600; //2023.01.01
    address constant DEFAULT_ADDRESS = address(0);
}





library Test {
    function uint256ToString(uint256 _i) internal pure returns (string memory) {
        if (_i == 0) {
            return "0";
        }
        uint256 j = _i;
        uint256 len;
        while (j != 0) {
            len++;
            j /= 10;
        }
        bytes memory bstr = new bytes(len);
        uint256 k = len;
        while (_i != 0) {
            k = k-1;
            uint8 temp = (48 + uint8(_i - _i / 10 * 10));
            bytes1 b1 = bytes1(temp);
            bstr[k] = b1;
            _i /= 10;
        }
        return string(bstr);
    }

    function bytes32ToString(bytes32 _bytes32) public pure returns (string memory) {
        bytes memory bytesArray = new bytes(32);
        for (uint256 i; i < 32; i++) {
            bytesArray[i] = _bytes32[i];
        }
        return string(bytesArray);
    }
}



import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Snapshot.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/draft-ERC20Permit.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Votes.sol";

contract ChainFitToken is ERC20, ERC20Burnable, ERC20Snapshot, Ownable, Pausable, ERC20Permit, ERC20Votes {

    address internal chainFitContract;

    constructor() ERC20("ChainFitToken", "CFT") ERC20Permit("ChainFitToken") {
        _mint(msg.sender, 256000000 * 10 ** decimals());
        chainFitContract = msg.sender;
    }

    function snapshot() public onlyOwner {
        _snapshot();
    }

    function pause() public onlyOwner {
        _pause();
    }

    function unpause() public onlyOwner {
        _unpause();
    }

    function _beforeTokenTransfer(address from, address to, uint256 amount)
        internal
        whenNotPaused
        override(ERC20, ERC20Snapshot)
    {
        super._beforeTokenTransfer(from, to, amount);
    }

    // The following functions are overrides required by Solidity.

    function _afterTokenTransfer(address from, address to, uint256 amount)
        internal
        override(ERC20, ERC20Votes)
    {
        super._afterTokenTransfer(from, to, amount);
    }

    function _mint(address to, uint256 amount)
        internal
        override(ERC20, ERC20Votes)
    {
        require(chainFitContract == msg.sender);
        super._mint(to, amount);
    }

    function _burn(address account, uint256 amount)
        internal
        override(ERC20, ERC20Votes)
    {
        super._burn(account, amount);
    }
}