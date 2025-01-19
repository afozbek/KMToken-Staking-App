"use client";

import React, { useEffect, useState } from "react";
import StakingForm from "./StakingForm";
import { useAccount } from "wagmi";
import StakingConnectCTA from "./StakingConnectCTA";
import StakingFormSkeleton from "./StakingFormSkeleton";
import TransactionsPage from "./TransactionsPage";
import { useMediaQuery } from "@/app/hooks/useMediaQuery";

const StakingContainer = () => {
  const { address, isConnected, isConnecting } = useAccount();
  const [mounted, setMounted] = useState(false);
  const isMobile = useMediaQuery("(max-width: 768px)");

  useEffect(() => {
    setMounted(true);
  }, []);

  // Show StakingFormSkeleton while mounting
  if (!mounted || isConnecting) {
    return <StakingFormSkeleton />;
  }

  return (
    <>
      {address && isConnected ? (
        <>
          <StakingForm />
          {isMobile && <TransactionsPage />}
        </>
      ) : (
        <StakingConnectCTA />
      )}
    </>
  );
};

export default StakingContainer;
