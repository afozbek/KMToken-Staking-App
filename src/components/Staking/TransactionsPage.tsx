"use client";
import React from "react";
import { getTransactions } from "@/store/transactionsStore";

import { useMediaQuery } from "@/app/hooks/useMediaQuery";
import dynamic from "next/dynamic";
import LoadingIcon from "../icons/LoadingIcon";

const RecentTransactions = dynamic(
  () =>
    import("@/components/Staking/StakingForm/Transactions/RecentTransactions"),
  {
    loading: () => (
      <div className="w-full h-[400px] flex items-center justify-center">
        <LoadingIcon />
      </div>
    ),
  }
);

const TransactionsPage = () => {
  const transactions = getTransactions();
  const isMobile = useMediaQuery("(max-width: 768px)");

  return (
    <div className="w-full mx-auto px-4 md:px-0">
      <div className="mt-8 md:mt-12">
        <RecentTransactions transactions={transactions} isMobile={isMobile} />
      </div>
    </div>
  );
};

export default TransactionsPage;
