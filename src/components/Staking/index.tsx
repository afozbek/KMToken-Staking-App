"use client";

import React, { useEffect, useState } from "react";
import StakingForm from "./StakingForm";
import { useAccount } from "wagmi";
import StakingConnectCTA from "./StakingConnectCTA";
import StakingFormSkeleton from "./StakingFormSkeleton";

const StakingContainer = () => {
  const { address, isConnected, isConnecting } = useAccount();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (!isConnecting) {
      setMounted(true);
    }
  }, [isConnecting]);

  // Show StakingFormSkeleton while mounting
  if (!mounted) {
    return <StakingFormSkeleton />;
  }

  return (
    <>{address && isConnected ? <StakingForm /> : <StakingConnectCTA />}</>
  );
};

export default StakingContainer;
