import { formatEther } from "ethers";

export const tokenSymbol = "KMT";
// seperate the numbers with commas
/**
✓ 100 => 100
✓ 1000 => 1,000
✓ 10000 => 10,000
✓ 100000 => 100,000
✓ 1000000 => 1,000,000
✓ 10000000 => 10,000,000
 */
export const numberWithCommas = (x: number) => {
  return x.toLocaleString("en-US", { maximumFractionDigits: 2 });
};

export const formatBalance = (balance: string) => {
  const balanceFormatted = Number(formatEther(balance));

  return numberWithCommas(balanceFormatted);
};
