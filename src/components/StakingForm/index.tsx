"use client";

import { useEthersSigner } from "@/app/hooks/wagmi/utils";
import { JsonRpcSigner } from "ethers";
import React, { useState } from "react";

interface Props {
  onStake: (amount: string, signer: JsonRpcSigner) => void;
}

const StakingForm = (props: Props) => {
  const [amount, setAmount] = useState("");
  const [error, setError] = useState("");

  const signer = useEthersSigner();

  const { onStake } = props;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!amount || Number(amount) <= 0) {
      setError("Please enter a valid positive number.");
      return;
    }

    if (!signer) {
      throw new Error("Signer not defined");
    }

    setError("");
    onStake(amount, signer); // Pass the amount to the parent component or staking function
    setAmount(""); // Reset the input field
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="amount">Amount to Stake:</label>
      <input
        type="number"
        id="amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="Enter amount"
      />
      {error && <p style={{ color: "red" }}>{error}</p>}
      <button type="submit">Stake</button>
    </form>
  );
};

export default StakingForm;
