import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Snapshot.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/draft-ERC20Permit.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Votes.sol";


contract ChainFitToken is ERC20, ERC20Burnable, Ownable {

    // ChainFit contract
    address internal chainFitContract;


    ////////////////////////////////////////////////////////////////////////
    //////////                                                    //////////
    //////////                  TOKENOMICS POOLS                  //////////
    //////////  (all pools is included in address token balance)  //////////
    //////////                                                    //////////
    ////////////////////////////////////////////////////////////////////////
    uint private totalSupplyCFT = 256000000 * 10 ** decimals();
    uint private rewardPool = 128000000 * 10 ** decimals();
    uint private taxPool = 0;

    constructor() ERC20("ChainFitToken", "CFT") {
        _mint(address(this), totalSupplyCFT);
    }

    function setChainFitAddress(address _chainFitAddress) public onlyOwner {
        chainFitContract = _chainFitAddress;
        IERC20(address(this)).approve(_chainFitAddress, totalSupplyCFT); // approval to manage tokens
    }




    ///////////////////////////////////////////////////////////////////
    //////////                                               //////////
    //////////           CHAINTFIT TOKEN METHODS             //////////
    //////////                                               //////////
    ///////////////////////////////////////////////////////////////////


    // event emit after accept visit and transfer token
    event TokenPayment(address user, uint visitId, uint amount, uint paymentTime);

    // Calculate the reward for the gym visit
    function calculateReward() view public returns(uint reward){
        return rewardPool / (32000000); // Reward is pool amount divide by 32M
    }
   
    function payRewardForGymVisit(uint visitId, address to) public onlyChainFit {
        uint reward = calculateReward();
        uint tax = reward / 20; // 5% tax to pool
        rewardPool = rewardPool - reward;
        taxPool = taxPool + tax;
        transferFrom(address(this), to, (reward-tax));
        emit TokenPayment(msg.sender, visitId, (reward-tax), block.timestamp);
    }




    ///////////////////////////////////////////////////////////////////
    //////////                                               //////////
    //////////             TOKEN MANAGE METHODS              //////////
    //////////                  (TO TEST)                    //////////
    //////////                                               //////////
    ///////////////////////////////////////////////////////////////////
   
    modifier onlyChainFit { require(msg.sender == chainFitContract); _; }
    modifier onlyAdmin { require(admins[msg.sender], "Only admin can call this function"); _;}

    // ChainFitToken admins
    mapping(address => bool) public admins;
    event AdminAdded(address indexed admin);
    event AdminRemoved(address indexed admin);

    function addAdmin(address _admin) public onlyOwner {
        require(_admin != address(0), "Cannot add zero address as admin");
        require(!admins[_admin], "Admin already exists");
        admins[_admin] = true;
        emit AdminAdded(_admin);
    }

    function removeAdmin(address _admin) public onlyOwner {
        require(admins[_admin], "Admin does not exist");
        delete admins[_admin];
        emit AdminRemoved(_admin);
    }


    // Send foundation tokens (but not above reward pool)
    function sendTokens(address to, uint value) public onlyAdmin {
        require(balanceOf(address(this)) - value >= rewardPool + taxPool, "Cannot withdraw pool tokens");
        transferFrom(address(this), to, value);
    }

    // Add foundation tokens to pool (but not above reward pool)
    function addTokensToPool(uint value) public onlyAdmin {
        require(balanceOf(address(this)) >= rewardPool + taxPool + value, "Cannot add pool tokens over balance");
        rewardPool = rewardPool + value;
    }

    // Send all tax pool
    function taxPoolTransfer(address to) public onlyAdmin {
        transferFrom(address(this), to, taxPool);
        taxPool = 0;
    }

    // Increace rewards by add taxes to the pool
    function moveTaxPoolToRewardPool() public onlyAdmin {
        rewardPool = rewardPool + taxPool;
        taxPool = 0;
    }
}
