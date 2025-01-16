"use client";

export interface Transaction {
  action: "stake" | "unstake" | "approve" | "claim";
  amount: string;
  hash: string;
}

// Add mock transactions (replace with real data later)
const mockTransactions: Transaction[] = [
  { action: "stake", amount: "100", hash: "0x123..." },
  { action: "unstake", amount: "50", hash: "0x456..." },
  { action: "approve", amount: "200", hash: "0x789..." },
];

export const getTransactions = (): Transaction[] => {
  const transactions = localStorage.getItem("transactions");

  if (transactions) {
    return JSON.parse(transactions);
  }

  return [];
};

export const addTransaction = (transaction: Transaction) => {
  const transactions = getTransactions();
  transactions.push(transaction);
  localStorage.setItem("transactions", JSON.stringify(transactions));
};
