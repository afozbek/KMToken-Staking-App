import dynamic from "next/dynamic";
import React from "react";
const LazyTransactions = dynamic(() => import("./LazyTransactions"), {
  loading: () => (
    <div className="bg-gray-100 p-4 rounded-lg animate-pulse">
      <div className="h-6 bg-gray-200 rounded"></div>
    </div>
  ),
});

// Main component with Suspense
export default function TransactionWrapper() {
  return (
    <div className="max-w-md mx-auto p-4">
      <h2 className="text-xl font-bold mb-4">Transactions</h2>
      <LazyTransactions />
    </div>
  );
}
