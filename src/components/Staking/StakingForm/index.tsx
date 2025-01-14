"use client";

import React, { useEffect, useMemo, useState } from "react";
import TabButtons from "./TabButtons";
import StakeInput from "./StakeInput";
import TransactionDetails from "./TransactionDetails";
import TermsCheckbox from "./TermsCheckbox";
import StakeButton from "./StakeButton";
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

export enum TabType {
  Faucet = "faucet",
  Stake = "stake",
  Unstake = "unstake",
  Approve = "approve",
}
const MAX_BALANCE_FOR_FAUCET = 10; // 10 Kommunity Tokens

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

  const handleMaxClick = () => {
    const amount = formatBalanceToNumber(
      selectedTab === TabType.Stake ? tokenBalance.balance : stakedAmount.amount
    );

    setAmount(amount.toString());
  };

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

  const isFaucetEnabledForUser = useMemo(() => {
    return (
      formatBalanceToNumber(tokenBalance.balance) < MAX_BALANCE_FOR_FAUCET &&
      faucetEnabled
    );
  }, [tokenBalance.balance, faucetEnabled]);

  return (
    <div data-testid="staking-form" className="p-5 lg:p-0">
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
        <BalanceDisplay
          selectedTab={selectedTab}
          tokenBalance={tokenBalance}
          tokenSymbol={tokenSymbol}
          stakedAmount={stakedAmount}
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
