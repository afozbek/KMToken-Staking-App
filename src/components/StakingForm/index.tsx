"use client";

import React, { useState } from "react";
import TabButtons from "./TabButtons";
import StakeInput from "./StakeInput";
import TransactionDetails from "./TransactionDetails";
import TermsCheckbox from "./TermsCheckbox";
import StakeButton from "./StakeButton";

const StakingForm = () => {
  const [selectedTab, setSelectedTab] = useState<"stake" | "unstake" | "claim">(
    "stake"
  );
  const [amount, setAmount] = useState("");
  const [isTermsAccepted, setIsTermsAccepted] = useState(false);

  const handleMaxClick = () => {
    // Implement max amount logic
    setAmount("100"); // Example value
  };

  const handleStake = () => {
    // Implement stake logic
    console.log("Staking:", amount);
  };

  return (
    <div className="bg-white rounded-xl p-6 max-w-md mx-auto font-fontTomorrow">
      {/* Header */}
      <div className="text-center mb-6">
        <h2 className="text-xl font-semibold mb-2">Stake ETH</h2>
        <p className="text-gray-600">
          Stake ETH and recieve dETH while staking
        </p>
      </div>

      <TabButtons selectedTab={selectedTab} onTabChange={setSelectedTab} />

      <StakeInput
        amount={amount}
        onAmountChange={setAmount}
        onMaxClick={handleMaxClick}
      />

      <TransactionDetails />

      <TermsCheckbox
        isAccepted={isTermsAccepted}
        onAcceptChange={setIsTermsAccepted}
      />

      <StakeButton
        disabled={!isTermsAccepted || !amount}
        onClick={handleStake}
      />
    </div>
  );
};

export default StakingForm;
