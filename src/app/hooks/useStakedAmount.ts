import { useState, useEffect, useCallback } from "react";
import { JsonRpcSigner } from "ethers";
import { getStakedAmount } from "@/blockchain";
import { formatBalance } from "@/blockchain/utils";

interface StakedAmountData {
  amount: string;
  formattedAmount: string;
  reward: string;
  formattedAmountWithReward: string;
}

interface UseStakedAmountReturn {
  data: StakedAmountData;
  isLoading: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
}
const initialData: StakedAmountData = {
  amount: "0",
  formattedAmount: "0",
  reward: "0",
  formattedAmountWithReward: "0",
};

export const useStakedAmount = ({
  signer,
  skip = false,
}: {
  signer: JsonRpcSigner | undefined;
  skip: boolean;
}): UseStakedAmountReturn => {
  const [data, setData] = useState<StakedAmountData>(initialData);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchStakedAmount = useCallback(async () => {
    if (skip || !signer) {
      setIsLoading(false);
      setError(null);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const { amount, reward } = await getStakedAmount(signer);
      const formattedAmount = formatBalance(amount);
      const formattedReward = formatBalance(reward);
      const formattedAmountWithReward = String(
        Number(formattedAmount) + Number(formattedReward)
      );

      setData({
        amount,
        formattedAmount,
        reward,
        formattedAmountWithReward,
      });
    } catch (err) {
      setError(
        err instanceof Error ? err : new Error("Failed to fetch staked amount")
      );
    } finally {
      setIsLoading(false);
    }
  }, [signer, skip]);

  useEffect(() => {
    if (skip) {
      setData(initialData);
    } else {
      fetchStakedAmount();
    }
  }, [skip, fetchStakedAmount]);

  return {
    data,
    isLoading,
    error,
    refetch: fetchStakedAmount,
  };
};
