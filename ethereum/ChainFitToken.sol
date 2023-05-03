import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Snapshot.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/draft-ERC20Permit.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Votes.sol";

contract ChainFitToken is ERC20, ERC20Burnable, Ownable {

    address internal chainFitContract;

    ////////////////////////////////////////////////////////////////////////
    //////////                                                    //////////
    //////////                  TOKENOMICS POOLS                  //////////
    //////////  (all pools is included in address token balance)  //////////
    //////////                                                    //////////
    ////////////////////////////////////////////////////////////////////////
    uint private rewardPool = 128000000 * 10 ** decimals();
    uint private taxPool = 0;

    address private adminAddress;


    constructor(address adminAddr) ERC20("ChainFitToken", "CFT") {
        _mint(msg.sender, 256000000 * 10 ** decimals());
        chainFitContract = msg.sender;
        adminAddress = adminAddr;
    }


    ///////////////////////////////////////////////////////////////////
    //////////                                               //////////
    //////////           CHAINTFIT TOKEN METHODS             //////////
    //////////                                               //////////
    ///////////////////////////////////////////////////////////////////

    // Calculate the reward for the gym visit
    function calculateReward() view public returns(uint reward){
        // Pool divide by 32M
        return rewardPool / (32000000);
    }
    
    function payRewardForGymVisit(address to) public onlyOwner {
        uint reward = calculateReward();
        uint tax = reward / 20; // 5% tax to pool
        rewardPool = rewardPool - reward;
        taxPool = taxPool + tax;
        transfer(to, (reward-tax));
    }


    ///////////////////////////////////////////////////////////////////
    //////////                                               //////////
    //////////             TOKEN MANAGE METHODS              //////////
    //////////                  (TO TEST)                    //////////
    //////////                                               //////////
    ///////////////////////////////////////////////////////////////////
    
    modifier onlyAdmin { require(msg.sender == adminAddress); _; }
    
    function sendTokens(address to, uint value) public onlyAdmin {
        require(balanceOf(chainFitContract) - value >= rewardPool + taxPool, "Cannot withdraw pool tokens");
        transferFrom(chainFitContract, to, value);
    }

    function addTokensToPool(uint value) public onlyAdmin {
        require(balanceOf(chainFitContract) >= rewardPool + taxPool + value, "Cannot add pool tokens over balance");
        rewardPool = rewardPool + value;
    }

    function taxPoolTransfer(address to) public onlyAdmin {
        transferFrom(chainFitContract, to, taxPool);
        taxPool = 0;
    }

    function moveTaxPoolToRewardPool() public onlyAdmin {
        rewardPool = rewardPool + taxPool;
        taxPool = 0;
    }
}
