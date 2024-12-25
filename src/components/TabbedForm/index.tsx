"use client";
import React, { useState } from "react";
import { TabType } from "./types";
import Header from "./Header";
import { useEthersSigner } from "@/app/hooks/wagmi/utils";
import { stakeTx, unstakeTx, claimTokensTx, approveTx } from "@/blockchain";
import FaucetTab from "./FaucetTab";

const TabbedForm = () => {
  const [activeTab, setActiveTab] = useState<TabType>(TabType.Stake);
  const [amountToStake, setAmountToStake] = useState("");
  const [amountToUnstake, setAmountToUnstake] = useState("");
  const [amountToApprove, setAmountToApprove] = useState("");
  const [error, setError] = useState<Error | null>(null);

  // const { writeContractAsync } = useWriteContract();

  const [isLoading, setLoading] = useState(false);

  const signer = useEthersSigner();

  const handleTabChange = (tab: TabType) => setActiveTab(tab);

  const handleStake = async () => {
    console.log(`Staking ${amountToStake} tokens`);
    if (!signer) {
      throw new Error("signer not exist");
    }

    setLoading(true);
    try {
      const hash = await stakeTx(amountToStake, signer);
      console.log({ hash });

      alert(`You successfully staked. TxHash: ${hash}`);
      setAmountToStake("");
      setLoading(false);
    } catch (err: any) {
      console.log({ err });

      if (err.message === "APPROVE_REQUIRED") {
        setAmountToApprove(amountToStake);
        setActiveTab(TabType.Approve);
      }

      setError(err);
      setLoading(false);
    }
  };

  const handleUnstake = async () => {
    console.log(`Unstaking ${amountToUnstake} tokens`);
    if (!signer) {
      throw new Error("signer not exist");
    }
    setLoading(true);

    const hash = await unstakeTx(signer);
    console.log({ hash });

    alert(`You successfully unstaked. TxHash: ${hash}`);
    setLoading(false);
    setAmountToUnstake("");
  };

  const handleApprove = async () => {
    console.log(`Approving ${amountToApprove} tokens`);
    if (!signer) {
      throw new Error("signer not exist");
    }

    setLoading(true);
    try {
      const hash = await approveTx(amountToApprove, signer);
      // const hash = await writeContractAsync({
      //   abi: KommunityTokenAbi,
      //   address: KOMMUNUTY_TOKEN_CONTRACT_ADDRESS,
      //   functionName: "approve",
      //   args: [STAKING_CONTRACT_ADDRESS, parseUnits(amountToApprove, 18)], // contractAddress, amountToApprove
      // });

      console.log({ hash });

      alert(`You successfully approved. TxHash: ${hash}`);
      setAmountToApprove("");
      setAmountToStake(amountToApprove);
      setLoading(false);
      setActiveTab(TabType.Stake); // Move to staking tab
    } catch (err: any) {
      setError(err.message);
      console.log(err);
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg p-6 mt-10">
      <Header activeTab={activeTab} handleTabChange={handleTabChange} />

      <div className="">
        {activeTab === TabType.Stake && (
          <div>
            <label htmlFor="stakeAmount" className="block text-gray-700">
              Amount to Stake:
            </label>
            <input
              type="number"
              id="stakeAmount"
              value={amountToStake}
              onChange={(e) => setAmountToStake(e.target.value)}
              className="w-full px-3 py-2 mt-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter amount"
            />
            <button
              onClick={handleStake}
              className="mt-4 w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
              disabled={isLoading}
            >
              {isLoading ? "Loading..." : "Stake Tokens"}
            </button>
          </div>
        )}

        {activeTab === TabType.Unstake && (
          <div>
            {/* <label htmlFor="unstakeAmount" className="block text-gray-700">
              Amount to Unstake:
            </label>
            <input
              type="number"
              id="unstakeAmount"
              value={amountToUnstake}
              onChange={(e) => setAmountToUnstake(e.target.value)}
              className="w-full px-3 py-2 mt-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter amount"
            /> */}
            <p className="text-green-500 font-medium">
              If you want to withdraw your staked tokens click below
            </p>

            <button
              onClick={handleUnstake}
              className="mt-4 w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
              disabled={isLoading}
            >
              {isLoading ? "Loading..." : "Unstake Tokens"}
            </button>
          </div>
        )}

        {activeTab === TabType.Faucet && <FaucetTab />}

        {activeTab === TabType.Approve && (
          <div>
            <label htmlFor="approveAmount" className="block text-gray-700">
              Amount to Approve:
            </label>
            <input
              type="number"
              id="approveAmount"
              value={amountToApprove}
              onChange={(e) => setAmountToApprove(e.target.value)}
              className="w-full px-3 py-2 mt-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter amount"
              min={amountToStake}
            />
            <button
              onClick={handleApprove}
              className="mt-4 w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 disabled:cursor-not-allowed"
              disabled={isLoading}
            >
              {isLoading ? "Loading..." : "Approve Tokens"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TabbedForm;
