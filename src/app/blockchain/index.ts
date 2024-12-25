"use client";

import { formatUnits, Contract, JsonRpcSigner, parseUnits } from "ethers";
import {
  STAKING_CONTRACT_ADDRESS,
  KOMMUNUTY_TOKEN_CONTRACT_ADDRESS,
  FAUCET_CONTRACT_ADDRESS,
} from "../blockchainUtils/constants";
import {
  FaucetAbi,
  KommunityTokenAbi,
  StakingAbi,
} from "../blockchainUtils/abi";

const getAllowance = async (
  singer: JsonRpcSigner,
  walletAddressToCheck: string,
  contractAddressToCheck: string,
  requestedTokenAmount: string
) => {
  // Main Token That will be used inside other contracts
  const tokenContract = new Contract(
    KOMMUNUTY_TOKEN_CONTRACT_ADDRESS,
    KommunityTokenAbi,
    singer
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

export const stakeTx = async (amount: string, signer: JsonRpcSigner) => {
  const stakingContract = new Contract(STAKING_CONTRACT_ADDRESS, StakingAbi);

  const wallet = await signer.getAddress();

  const result = await getAllowance(
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

// Claim Kommunity Token from faucet contract
export const claimTokensTx = async (signer: JsonRpcSigner) => {
  const faucetContract = new Contract(FAUCET_CONTRACT_ADDRESS, FaucetAbi);

  const rawTx = await faucetContract.claimTokens.populateTransaction();

  const tx = await signer.sendTransaction({ ...rawTx });

  await tx.wait();

  return tx.hash;
};

export const approveTx = async (amount: string, singer: JsonRpcSigner) => {
  console.log("Approving");

  const tokenContract = new Contract(
    KOMMUNUTY_TOKEN_CONTRACT_ADDRESS,
    KommunityTokenAbi,
    singer
  );

  const rawTx = await tokenContract.approve.populateTransaction(
    STAKING_CONTRACT_ADDRESS,
    parseUnits(amount)
  );

  const tx = await singer.sendTransaction(rawTx);
  await tx.wait();

  return tx.hash;
};

export const isFaucetEnabled = async (
  singer: JsonRpcSigner
): Promise<boolean> => {
  const faucetContract = new Contract(
    FAUCET_CONTRACT_ADDRESS,
    FaucetAbi,
    singer
  );

  const result = await faucetContract.canClaimTokens(singer.address);
  console.log({ result });

  return typeof result === "boolean" ? result : false;
};
