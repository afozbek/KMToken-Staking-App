import { KommunityTokenAbi } from "@/blockchain/blockchainUtils/abi";
import { KOMMUNUTY_TOKEN_CONTRACT_ADDRESS } from "@/blockchain/blockchainUtils/constants";
import { formatBalance, formatBalanceToNumber } from "@/blockchain/utils";
import { useReadContract, UseReadContractReturnType } from "wagmi";

const useTokenBalance = (userAddress: string | undefined) => {
  const { data, isFetching, refetch }: UseReadContractReturnType =
    useReadContract({
      address: KOMMUNUTY_TOKEN_CONTRACT_ADDRESS,
      abi: KommunityTokenAbi,
      functionName: "balanceOf",
      args: [userAddress],
    });

  const balanceToShow = data ? String(data) : "0";
  const formattedBalance = formatBalance(balanceToShow);

  return {
    balance: balanceToShow,
    isFetchingTokens: isFetching,
    balanceFormatted: formattedBalance,
    balanceNumber: formatBalanceToNumber(balanceToShow),
    refetch,
  };
};

export default useTokenBalance;
