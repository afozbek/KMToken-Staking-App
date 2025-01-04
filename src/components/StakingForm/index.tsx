"use client";

import React, { useState, useEffect } from "react";
import { useAccount, useReadContracts } from "wagmi";
import { formatEther } from "viem";
import TabButtons from "./TabButtons";
import StakeInput from "./StakeInput";
import TransactionDetails from "./TransactionDetails";
import TermsCheckbox from "./TermsCheckbox";
import StakeButton from "./StakeButton";
import { TabType } from "../TabbedForm/types";
import { approveTx, stakeTx, unstakeTx } from "@/blockchain";
import { useEthersSigner } from "@/app/hooks/wagmi/utils";
import {
  KOMMUNUTY_TOKEN_CONTRACT_ADDRESS,
  STAKING_CONTRACT_ADDRESS,
} from "@/blockchain/blockchainUtils/constants";
import { Contract } from "ethers";
import {
  KommunityTokenAbi,
  StakingAbi,
} from "@/blockchain/blockchainUtils/abi";

const StakingForm = () => {
  const [selectedTab, setSelectedTab] = useState<TabType>(TabType.Stake);
  const [amount, setAmount] = useState("");
  const [isTermsAccepted, setIsTermsAccepted] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [stakedAmount, setStakedAmount] = useState("0");

  const signer = useEthersSigner();
  const { address } = useAccount();

  // Get user's token balance
  const { data: contractInfo } = useReadContracts({
    allowFailure: false,
    contracts: [
      {
        address: KOMMUNUTY_TOKEN_CONTRACT_ADDRESS,
        abi: KommunityTokenAbi,
        functionName: "balanceOf",
        args: [address],
      },
      {
        address: KOMMUNUTY_TOKEN_CONTRACT_ADDRESS,
        abi: KommunityTokenAbi,
        functionName: "symbol",
      },
    ],
  });

  const kommunityTokenBalance = contractInfo
    ? (contractInfo as bigint[])[0]
    : 0;
  const tokenSymbol = contractInfo ? (contractInfo as string[])[1] : "";

  // Get user's staked amount from contract
  useEffect(() => {
    const getStakedAmount = async () => {
      if (signer && address) {
        try {
          const contract = new Contract(
            STAKING_CONTRACT_ADDRESS,
            StakingAbi,
            signer
          );
          const stake = await contract.stakes(address);
          setStakedAmount(formatEther(stake.amount));
        } catch (err) {
          console.error("Error fetching staked amount:", err);
        }
      }
    };

    getStakedAmount();
  }, [signer, address]);

  const handleMaxClick = () => {
    if (kommunityTokenBalance) {
      setAmount(formatEther(kommunityTokenBalance));
    }
  };

  const handleStake = async () => {
    if (!signer || !amount) return;

    setLoading(true);
    try {
      const hash = await stakeTx(amount, signer);
      console.log({ hash });
      alert(`Successfully staked. TxHash: ${hash}`);
      setAmount("");
    } catch (err: any) {
      console.error(err);
      if (err.message === "APPROVE_REQUIRED") {
        setSelectedTab(TabType.Approve);
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

  return (
    <div className="bg-white rounded-xl p-6 max-w-md mx-auto font-fontTomorrow">
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
            Available:{" "}
            {kommunityTokenBalance ? formatEther(kommunityTokenBalance) : "0"}{" "}
            {tokenSymbol}
          </div>
        ) : (
          <div>
            Staked: {stakedAmount} {tokenSymbol}
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
        onClick={
          selectedTab === TabType.Stake
            ? handleStake
            : selectedTab === TabType.Unstake
            ? handleUnstake
            : handleApprove
        }
        loading={isLoading}
      />
    </div>
  );
};

export default StakingForm;
