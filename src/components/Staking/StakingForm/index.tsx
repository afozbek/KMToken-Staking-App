"use client";

import React, { useEffect, useState } from "react";
import TabButtons from "./TabButtons";
import StakeInput from "./StakeInput";
import TransactionDetails from "./TransactionDetails";
import TermsCheckbox from "./TermsCheckbox";
import StakeButton from "./StakeButton";

import { tokenSymbol } from "@/blockchain/utils";

export enum TabType {
  Faucet = "faucet",
  Stake = "stake",
  Unstake = "unstake",
  Approve = "approve",
}

const StakingForm = () => {
  const [selectedTab, setSelectedTab] = useState<TabType>(TabType.Stake);
  const [amount, setAmount] = useState("");
  const [isTermsAccepted, setIsTermsAccepted] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [tokenBalance, setTokenBalance] = useState({
    balance: "0",
    formattedBalance: "0",
  });
  const [stakedAmount, setStakedAmount] = useState({
    amount: "0",
    formattedAmount: "0",
  });
  const [error, setError] = useState("");

  useEffect(() => {
    setAmount("");
  }, [selectedTab]);

  const handleMaxClick = () => {
    console.log("TODO: Handle Max Click");
  };

  const handleStake = async () => {
    console.log("TODO: Stake functionality");
  };

  const handleUnstake = async () => {
    console.log("TODO: Unstake functionality");
  };

  const handleApprove = async () => {
    console.log("TODO: Approve functionality");
  };

  const handleFormAction = () => {
    console.log("TODO: Form action");
  };

  return (
    <div className="p-5 lg:p-0">
      <div className="bg-white rounded-xl p-6 max-w-md mx-auto font-fontTomorrow mt-10">
        <div className="text-center mb-6">
          <h2 className="text-xl font-semibold mb-2">Stake {tokenSymbol}</h2>
          <p className="text-gray-600">
            Stake {tokenSymbol} and receive d{tokenSymbol} while staking
          </p>
        </div>

        <TabButtons selectedTab={selectedTab} onTabChange={setSelectedTab} />

        <StakeInput
          amount={amount}
          onAmountChange={setAmount}
          onMaxClick={handleMaxClick}
        />

        {/* Balance Display */}
        <div className="mb-4 text-sm text-gray-600">
          {selectedTab === TabType.Stake ? (
            <div>
              Available: {tokenBalance.formattedBalance} {tokenSymbol}
            </div>
          ) : (
            <div>
              Staked: {stakedAmount.formattedAmount} {tokenSymbol}
            </div>
          )}
        </div>

        <TransactionDetails />

        <TermsCheckbox
          isAccepted={isTermsAccepted}
          onAcceptChange={setIsTermsAccepted}
        />

        <StakeButton
          disabled={!isTermsAccepted}
          onClick={handleFormAction}
          loading={isLoading}
          btnText={
            selectedTab === TabType.Stake
              ? error && error === "APPROVE_REQUIRED"
                ? "Approve & Stake"
                : "Stake"
              : "Unstake"
          }
        />
      </div>
    </div>
  );
};

export default StakingForm;
