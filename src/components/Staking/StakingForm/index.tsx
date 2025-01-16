"use client";

import React, { useCallback, useEffect, useState } from "react";
import StakeInput from "./Form/StakeInput";
import TransactionDetails from "./Transactions/TransactionDetails";
import TermsCheckbox from "./Form/TermsCheckbox";
import { useToast } from "@/app/hooks/useToast";

import { useEthersSigner } from "@/app/hooks/wagmi/utils";
import { approveTx, stakeTx, unstakeTx, getStakedAmount } from "@/blockchain";
import {
  formatBalance,
  formatBalanceToNumber,
  tokenSymbol,
} from "@/blockchain/utils";
import { JsonRpcSigner } from "ethers";
import useFaucet from "@/app/hooks/useFaucet";
import useTokenBalance from "@/app/hooks/useTokenBalance";
import BalanceDisplay from "./BalanceDisplay";

import TransactionsToggle from "./Transactions/TransactionsToggle";
import FormTitle from "./Form/FormTitle";
import TabButtons from "./Form/TabButtons";
import StakeButton from "./Form/StakeButton";
import dynamic from "next/dynamic";
import LoadingIcon from "@/components/icons/LoadingIcon";
import { getTransactions } from "@/store/transactionsStore";
const RecentTransactions = dynamic(
  () => import("./Transactions/RecentTransactions"),
  {
    loading: () => (
      <div className="absolute top-0 -right-2 z-0 translate-x-full w-80 h-80 bg-gray-100 rounded-lg animate-pulse">
        <div className="flex items-center justify-center h-full">
          <LoadingIcon />
        </div>
      </div>
    ),
  }
);

export enum TabType {
  Faucet = "faucet",
  Stake = "stake",
  Unstake = "unstake",
  Approve = "approve",
}
const MAX_BALANCE_FOR_FAUCET = 10; // 10 Kommunity Tokens

export interface Transaction {
  action: "stake" | "unstake" | "approve" | "claim";
  amount: string;
  hash: string;
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
  const [stakedAmountWithReward, setStakedAmountWithReward] = useState({
    amount: "0",
    formattedAmount: "0",
    reward: "0",
    formattedAmountWithReward: "0",
  });
  const [error, setError] = useState("");
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [opened, setOpened] = useState(false);

  const { faucetLoading, claimTokens, faucetEnabled } = useFaucet();

  const signer = useEthersSigner();
  const toast = useToast();

  const { balance, refetch } = useTokenBalance(signer?.address);

  // Fetch token balance
  useEffect(() => {
    if (balance) {
      setTokenBalance({
        balance,
        formattedBalance: formatBalance(balance),
      });
      setTransactions(getTransactions());
    }
  }, [balance]);

  // Fetch staked amount when unstake tab is selected
  useEffect(() => {
    if (!signer) return;

    if (selectedTab === TabType.Unstake) {
      fetchStakedAmount(signer);
    }
  }, [signer, selectedTab]);

  useEffect(() => {
    setAmount("");
  }, [selectedTab]);

  const handleMaxClick = useCallback(() => {
    const amount = formatBalanceToNumber(
      selectedTab === TabType.Stake
        ? tokenBalance.balance
        : stakedAmountWithReward.amount
    );
    setAmount(amount.toString());
  }, [selectedTab, tokenBalance.balance, stakedAmountWithReward.amount]);

  const handleStake = async () => {
    if (!signer || !amount) return;

    setLoading(true);
    try {
      const hash = await stakeTx(amount, signer);
      console.log({ hash });
      handleTxSuccess(`Successfully staked. TxHash: ${hash}`);
      setAmount("");
      fetchStakedAmount(signer);
    } catch (err: any) {
      if (err.message === "APPROVE_REQUIRED") {
        toast.error("You need to approve the tokens first");
        setError(err.message);
      } else {
        toast.error(err.message || "Failed to stake tokens");
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
      handleTxSuccess(`Successfully unstaked. TxHash: ${hash}`);
      setError("");
    } catch (err: any) {
      toast.error(err.message || "Failed to unstake tokens");
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
      handleTxSuccess(`Successfully approved. TxHash: ${hash}`);

      // we always approve during stake
      await handleStake();
      setError("");
    } catch (err: any) {
      toast.error(err.message || "Failed to approve tokens");
      console.error(err);
      setLoading(false);
    }
  };

  const handleTxSuccess = (message: string) => {
    refetch(); // refetch token balance
    toast.success(message);
    setTransactions(getTransactions());
  };

  const fetchStakedAmount = async (signer: JsonRpcSigner) => {
    const { amount, reward } = await getStakedAmount(signer);
    const formattedAmount = formatBalance(amount);
    const formattedReward = formatBalance(reward);
    const formattedAmountWithReward = String(
      Number(formattedAmount) + Number(formattedReward)
    );

    setStakedAmountWithReward({
      amount,
      formattedAmount,
      reward,
      formattedAmountWithReward,
    });
  };

  const handleFormAction = () => {
    if (selectedTab === TabType.Stake) {
      if (error && error === "APPROVE_REQUIRED") {
        handleApprove();
      } else {
        handleStake();
      }
    } else if (selectedTab === TabType.Unstake) {
      handleUnstake();
    } else {
      console.log("TODO: Wrong tab selected");
    }
  };

  const isFaucetEnabledForUser =
    formatBalanceToNumber(tokenBalance.balance) < MAX_BALANCE_FOR_FAUCET &&
    faucetEnabled;

  return (
    <div data-testid="staking-form" className="p-5 lg:p-0">
      <div className="bg-white rounded-xl p-6 max-w-md mx-auto font-fontTomorrow mt-10 relative">
        {/* TRANSACTIONS TOGGLE */}
        <TransactionsToggle opened={opened} setOpened={setOpened} />
        {opened && <RecentTransactions transactions={transactions} />}

        {/* FORM */}
        <FormTitle />
        <TabButtons selectedTab={selectedTab} onTabChange={setSelectedTab} />
        <StakeInput
          amount={amount}
          onAmountChange={setAmount}
          onMaxClick={handleMaxClick}
        />

        {/* Balance Display */}
        <BalanceDisplay
          selectedTab={selectedTab}
          tokenBalance={tokenBalance}
          tokenSymbol={tokenSymbol}
          stakedAmount={stakedAmountWithReward}
          isFaucetEnabledForUser={isFaucetEnabledForUser}
          claimTokens={claimTokens}
          faucetLoading={faucetLoading}
          faucetEnabled={faucetEnabled}
        />

        <TransactionDetails />

        <TermsCheckbox
          isAccepted={isTermsAccepted}
          onAcceptChange={setIsTermsAccepted}
        />

        <StakeButton
          disabled={!isTermsAccepted || !amount || !signer}
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
