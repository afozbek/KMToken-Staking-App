// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Faucet is Ownable(msg.sender) {
    IERC20 public token;
    uint256 public dripAmount;
    uint256 public cooldownTime;

    mapping(address => uint256) public lastClaim;

    constructor(address _tokenAddress, uint256 _dripAmount, uint256 _cooldownTime) {
        token = IERC20(_tokenAddress);
        dripAmount = _dripAmount;
        cooldownTime = _cooldownTime;
    }

    function claimTokens() external {
        require(block.timestamp >= lastClaim[msg.sender] + cooldownTime, "Claim cooldown active");
        require(token.balanceOf(address(this)) >= dripAmount, "Faucet is empty");

        lastClaim[msg.sender] = block.timestamp;
        require(token.transfer(msg.sender, dripAmount), "Token transfer failed");
    }

    function setDripAmount(uint256 _dripAmount) external onlyOwner {
        dripAmount = _dripAmount;
    }

    function setCooldownTime(uint256 _cooldownTime) external onlyOwner {
        cooldownTime = _cooldownTime;
    }

    function fundFaucet(uint256 amount) external onlyOwner {
        require(token.transferFrom(msg.sender, address(this), amount), "Funding failed");
    }

    function withdrawTokens(uint256 amount) external onlyOwner {
        require(token.transfer(owner(), amount), "Withdraw failed");
    }
}
