"use client";

import React from "react";
import StakingForm from "./StakingForm";
import { useAccount } from "wagmi";
import StakingConnectCTA from "./StakingConnectCTA";

const StakingContainer = () => {
  const { address, isConnected } = useAccount();

  return (
    <>{address && isConnected ? <StakingForm /> : <StakingConnectCTA />}</>
  );
};

export default StakingContainer;
