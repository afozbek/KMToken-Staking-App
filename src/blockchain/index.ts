"use client";

import { formatUnits, Contract, JsonRpcSigner, parseUnits } from "ethers";

import {
  STAKING_CONTRACT_ADDRESS,
  KOMMUNUTY_TOKEN_CONTRACT_ADDRESS,
  FAUCET_CONTRACT_ADDRESS,
} from "@/blockchain/blockchainUtils/constants";
import {
  FaucetAbi,
  KommunityTokenAbi,
  StakingAbi,
} from "@/blockchain/blockchainUtils/abi";

// --------------------------------TOKEN CONTRACT UTILS---------------------------------------------

const _getAllowance = async (
  signer: JsonRpcSigner,
  walletAddressToCheck: string,
  contractAddressToCheck: string,
  requestedTokenAmount: string
) => {
  // Main Token That will be used inside other contracts
  const tokenContract = new Contract(
    KOMMUNUTY_TOKEN_CONTRACT_ADDRESS,
    KommunityTokenAbi,
    signer
  );

  const allowanceAmountWei = await tokenContract.allowance(
    walletAddressToCheck,
    contractAddressToCheck
  );

  const approvedAmount = formatUnits(allowanceAmountWei);
  const requiredAmountToApprove = requestedTokenAmount; // sent as small number

  const isEnoughApproved =
    parseFloat(approvedAmount) >= parseFloat(requiredAmountToApprove);

  return { isApproved: isEnoughApproved, approvedAmount: approvedAmount };
};

export const approveTx = async (amount: string, signer: JsonRpcSigner) => {
  console.log("Approving");

  const tokenContract = new Contract(
    KOMMUNUTY_TOKEN_CONTRACT_ADDRESS,
    KommunityTokenAbi,
    signer
  );

  const rawTx = await tokenContract.approve.populateTransaction(
    STAKING_CONTRACT_ADDRESS,
    parseUnits(amount)
  );

  const tx = await signer.sendTransaction(rawTx);
  await tx.wait();

  return tx.hash;
};

export const getBalance = async (
  address: string,
  signer: JsonRpcSigner
): Promise<string> => {
  const tokenContract = new Contract(
    KOMMUNUTY_TOKEN_CONTRACT_ADDRESS,
    KommunityTokenAbi,
    signer
  );

  return await tokenContract.balanceOf(address);
};

export const getTokenSymbol = async (signer: JsonRpcSigner) => {
  const tokenContract = new Contract(
    KOMMUNUTY_TOKEN_CONTRACT_ADDRESS,
    KommunityTokenAbi,
    signer
  );

  const symbol = await tokenContract.symbol();
  return symbol;
};

// ---------------------------------STAKE CONTRACT ---------------------------------------------------

export const stakeTx = async (amount: string, signer: JsonRpcSigner) => {
  const stakingContract = new Contract(STAKING_CONTRACT_ADDRESS, StakingAbi);

  const wallet = await signer.getAddress();

  const result = await _getAllowance(
    signer,
    wallet,
    STAKING_CONTRACT_ADDRESS,
    amount
  );

  // token needs to be approved
  if (!result.isApproved) {
    throw new Error("APPROVE_REQUIRED");
  }

  const rawTx = await stakingContract.stake.populateTransaction(
    String(parseUnits(amount))
  );

  const tx = await signer.sendTransaction({ ...rawTx });

  await tx.wait();

  return tx.hash;
};

export const unstakeTx = async (signer: JsonRpcSigner) => {
  const stakingContract = new Contract(STAKING_CONTRACT_ADDRESS, StakingAbi);

  const rawTx = await stakingContract.withdraw.populateTransaction();

  const tx = await signer.sendTransaction({ ...rawTx });

  await tx.wait();

  return tx.hash;
};

export const getStakedAmount = async (signer: JsonRpcSigner) => {
  const stakingContract = new Contract(
    STAKING_CONTRACT_ADDRESS,
    StakingAbi,
    signer
  );

  const stake = await stakingContract.stakes(signer.address);

  return stake.amount;
};

// ---------------------------------FAUCET CONTRACT ---------------------------------------------------

export const claimTokensTx = async (signer: JsonRpcSigner) => {
  const faucetContract = new Contract(FAUCET_CONTRACT_ADDRESS, FaucetAbi);

  const rawTx = await faucetContract.claimTokens.populateTransaction();

  const tx = await signer.sendTransaction({ ...rawTx });

  await tx.wait();

  return tx.hash;
};

export const isFaucetEnabled = async (
  signer: JsonRpcSigner
): Promise<boolean> => {
  const faucetContract = new Contract(
    FAUCET_CONTRACT_ADDRESS,
    FaucetAbi,
    signer
  );

  const result = await faucetContract.canClaimTokens(signer.address);

  return typeof result === "boolean" ? result : false;
};
