import React from "react";
import { TabType } from ".";

interface Props {
  selectedTab: TabType;
  tokenBalance: { formattedBalance: string };
  tokenSymbol: string;
  stakedAmount: {
    formattedAmount: string;
    formattedAmountWithReward: string;
  };
  isFaucetEnabledForUser: boolean;
  claimTokens: () => void;
  faucetLoading: boolean;
  faucetEnabled: boolean;
}

const BalanceDisplay = ({
  selectedTab,
  tokenBalance,
  tokenSymbol,
  stakedAmount,
  isFaucetEnabledForUser,
  claimTokens,
  faucetLoading,
  faucetEnabled,
}: Props) => {
  return (
    <div className="mb-4 text-sm text-gray-600 flex justify-between">
      {selectedTab === TabType.Stake ? (
        <div>
          Available: {tokenBalance.formattedBalance} {tokenSymbol}
        </div>
      ) : (
        <div>
          Staked: {stakedAmount.formattedAmountWithReward} {tokenSymbol}
        </div>
      )}

      <>
        {isFaucetEnabledForUser && (
          <p className="text-gray-600">
            <button
              className="text-blue-500 hover:underline"
              onClick={claimTokens}
              disabled={faucetLoading || !faucetEnabled}
            >
              Low on balance?
            </button>
          </p>
        )}
      </>
    </div>
  );
};

export default BalanceDisplay;
