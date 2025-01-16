import React from "react";

// Simulating data fetching

async function fetchData(): Promise<any[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([]);
    }, 2000);
  });
}

const LazyTransactions = async () => {
  const data = await fetchData();

  return (
    <div className="bg-blue-100 p-4 rounded-lg">
      <p className="text-lg">{data.length} transactions found</p>
    </div>
  );
};

export default LazyTransactions;
