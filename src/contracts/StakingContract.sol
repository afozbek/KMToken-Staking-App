// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract StakingContract {
    IERC20 public stakingToken;
    address public owner;
    uint256 public rewardRate = 1e17; // Reward tokens per second

    struct Stake {
        uint256 amount;
        uint256 reward;
        uint256 lastUpdated;
    }

    mapping(address => Stake) public stakes;

    modifier onlyOwner() {
        require(msg.sender == owner, "Not the contract owner");
        _;
    }

    event Staked(address indexed user, uint256 amount);
    event Withdrawn(address indexed user, uint256 amount, uint256 reward);

    constructor(address _stakingToken) {
        stakingToken = IERC20(_stakingToken);
        owner = msg.sender;
    }

    function stake(uint256 _amount) external {
        require(_amount > 0, "Amount must be greater than 0");
        
        // Update rewards before changing the staked amount
        _updateRewards(msg.sender);

        // Transfer tokens to the contract
        require(
            stakingToken.transferFrom(msg.sender, address(this), _amount),
            "Token transfer failed"
        );

        // Update the stake information
        stakes[msg.sender].amount += _amount;
        stakes[msg.sender].lastUpdated = block.timestamp;

        emit Staked(msg.sender, _amount);
    }

    function withdraw() external {
        Stake storage userStake = stakes[msg.sender];
        require(userStake.amount > 0, "No staked tokens to withdraw");

        // Update rewards before withdrawing
        _updateRewards(msg.sender);

        uint256 amountToWithdraw = userStake.amount;
        uint256 reward = userStake.reward;

        // Reset user stake
        userStake.amount = 0;
        userStake.reward = 0;
        userStake.lastUpdated = block.timestamp;

        // Transfer staked tokens and rewards back to the user
        require(
            stakingToken.transfer(msg.sender, amountToWithdraw + reward),
            "Token transfer failed"
        );

        emit Withdrawn(msg.sender, amountToWithdraw, reward);
    }

    function _updateRewards(address _user) internal {
        Stake storage userStake = stakes[_user];
        if (userStake.amount > 0) {
            // check the difference between the current block timestamp and the last updated timestamp
            uint256 timeElapsed = block.timestamp - userStake.lastUpdated;
            userStake.reward += timeElapsed * rewardRate * userStake.amount / 1e18;
            userStake.lastUpdated = block.timestamp;
        }
    }

    function setRewardRate(uint256 _newRate) external onlyOwner {
        rewardRate = _newRate;
    }
}
