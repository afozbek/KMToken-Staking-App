import React, { memo } from "react";
import { ExternalLink } from "lucide-react";
import { Transaction } from "@/store/transactionsStore";

const RecentTransactions = memo(
  ({
    transactions,
    isMobile,
  }: {
    transactions: Transaction[];
    isMobile?: boolean;
  }) => {
    return (
      <div
        data-testid="recent-transactions-container"
        className={` bg-white shadow-lg p-4 rounded-xl overflow-y-auto max-h-[400px]  ${
          isMobile
            ? "w-full mt-6" // mobile specific styles added
            : "absolute top-0 -right-2 z-0 translate-x-full w-80  max-h-[300px]"
        }`}
      >
        <h3 className="font-semibold text-gray-800 mb-4">
          Recent Transactions
        </h3>
        <div className="space-y-3 ">
          {transactions.length === 0 ? (
            <p className="text-gray-500 text-sm">No transactions found</p>
          ) : (
            transactions.map((tx, index) => (
              <a
                href={`https://sepolia.basescan.org/tx/${tx.hash}`}
                target="_blank"
                rel="noopener noreferrer"
                key={index}
                className="flex items-center justify-between bg-gray-50 p-3 rounded-lg"
              >
                <div className="flex flex-col ">
                  <span className="text-sm md:text-md font-semibold capitalize">
                    {tx.action}
                  </span>
                  <span className="text-sm md:text-md text-gray-500">
                    {tx.amount} KMT
                  </span>
                  {/* <span className="text-xs text-gray-400 mt-1">
                    {new Date(tx.timestamp).toLocaleString()}
                  </span> */}
                </div>
                <div className="text-blue-500 hover:text-blue-600">
                  <ExternalLink className="w-4 h-4" />
                </div>
              </a>
            ))
          )}
        </div>
      </div>
    );
  }
);

RecentTransactions.displayName = "RecentTransactions";

export default RecentTransactions;
