"use client";

import React, { useEffect, useState } from "react";
import TabButtons from "./TabButtons";
import StakeInput from "./StakeInput";
import TransactionDetails from "./TransactionDetails";
import TermsCheckbox from "./TermsCheckbox";
import StakeButton from "./StakeButton";

import { useEthersSigner } from "@/app/hooks/wagmi/utils";
import {
  approveTx,
  getBalance,
  stakeTx,
  unstakeTx,
  getStakedAmount,
} from "@/blockchain";
import { formatBalance, tokenSymbol } from "@/blockchain/utils";
import { JsonRpcSigner } from "ethers";

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

  const signer = useEthersSigner();

  useEffect(() => {
    if (!signer) return;

    const getKommunityTokenBalance = async () => {
      const balance = await getBalance(signer.address, signer);

      setTokenBalance({
        balance,
        formattedBalance: formatBalance(balance),
      });
    };

    getKommunityTokenBalance();
  }, [signer]);

  useEffect(() => {
    if (!signer) return;

    if (selectedTab === TabType.Unstake) {
      fetchStakedAmount(signer);
    }
  }, [signer, selectedTab]);

  const handleMaxClick = () => {
    console.log("TODO: Handle MAX CLICK");
  };

  const handleStake = async () => {
    if (!signer || !amount) return;

    setLoading(true);
    try {
      const hash = await stakeTx(amount, signer);
      console.log({ hash });
      alert(`Successfully staked. TxHash: ${hash}`);
      setAmount("");
      fetchStakedAmount(signer); // update staked amount
    } catch (err: any) {
      if (err.message === "APPROVE_REQUIRED") {
        handleApprove();
      }
    } finally {
      setLoading(false);
    }
  };

  const handleUnstake = async () => {
    if (!signer) return;

    setLoading(true);
    try {
      const hash = await unstakeTx(signer);
      console.log({ hash });
      alert(`Successfully unstaked. TxHash: ${hash}`);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async () => {
    if (!signer || !amount) return;

    setLoading(true);
    try {
      const hash = await approveTx(amount, signer);
      console.log({ hash });
      alert(`Successfully approved. TxHash: ${hash}`);
      setSelectedTab(TabType.Stake);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchStakedAmount = async (signer: JsonRpcSigner) => {
    const amount = await getStakedAmount(signer);
    setStakedAmount({
      amount,
      formattedAmount: formatBalance(amount),
    });
  };

  const handleFormAction = () => {
    if (selectedTab === TabType.Stake) {
      handleStake();
    } else if (selectedTab === TabType.Unstake) {
      handleUnstake();
    } else {
      console.log("TODO: Wrong tab selected");
    }
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
          disabled={!isTermsAccepted || !amount || !signer}
          onClick={handleFormAction}
          loading={isLoading}
          btnText={selectedTab === TabType.Stake ? "Stake" : "Unstake"}
        />
      </div>
    </div>
  );
};

export default StakingForm;
