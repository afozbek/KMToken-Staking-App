"use client";

import React from "react";
import StakingForm from "./StakingForm";
import StakingConnectCTA from "./StakingConnectCTA";

const StakingContainer = () => {
  const address = "0x0";
  const isConnected = true;
  return (
    <>{address && isConnected ? <StakingForm /> : <StakingConnectCTA />}</>
  );
};

export default StakingContainer;
