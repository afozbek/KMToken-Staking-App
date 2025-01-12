import React from "react";

// Simulating data fetching
let data: string | null = null;
let promise: Promise<void> | null = null;

function fetchData() {
  if (data) return data;
  // Instead of this use Next API routes to fetch data
  if (!promise) {
    promise = new Promise((resolve) => {
      setTimeout(() => {
        data = "🎉 Transactions has been loaded successfully!";
        resolve();
      }, 4000); // 2 second delay
    });
  }
  throw promise;
}

// TODO: Change this to TransactionList
const LazyTransactions = () => {
  const content = fetchData();
  console.log(content);

  return (
    <div className="bg-blue-100 p-4 rounded-lg">
      <p className="text-lg">{content}</p>
    </div>
  );
};

export default LazyTransactions;
