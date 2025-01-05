"use client";

import React from "react";
import StakingForm from "./StakingForm";
import { useAccount } from "wagmi";
import StakingConnectCTA from "./StakingConnectCTA";

const StakingContainer = () => {
  const { address } = useAccount();

  return <>{address ? <StakingForm /> : <StakingConnectCTA />}</>;
};

export default StakingContainer;
