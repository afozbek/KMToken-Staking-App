import React from "react";
import { useConnect } from "wagmi";
import { tokenSymbol } from "@/blockchain/utils";
import { metaMask } from "wagmi/connectors";
import { baseSepolia } from "viem/op-stack";
import { useToast } from "@/app/hooks/useToast";

const StakingConnectCTA = () => {
  const { connect } = useConnect();
  const { error } = useToast();

  const connectAccount = async () => {
    try {
      await connect({ connector: metaMask(), chainId: baseSepolia.id });
    } catch (err) {
      console.log(err);
      error("Please install Metamask to connect your wallet");
    }
  };

  return (
    <div className="p-5 lg:p-0">
      <div className="bg-white rounded-xl p-6 max-w-md mx-auto font-fontTomorrow mt-10">
        <div className="text-center mb-6">
          <h2 className="text-xl font-semibold mb-2">Stake {tokenSymbol}</h2>
          <p className="text-gray-600">
            Connect your wallet to start staking {tokenSymbol} tokens
          </p>
        </div>

        <div className="flex flex-col items-center justify-center ">
          <p className="text-gray-600 text-center mb-6">
            Start earning rewards by staking your {tokenSymbol} tokens. Connect
            your wallet to begin your staking journey.
          </p>

          <button
            onClick={connectAccount}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors w-full max-w-xs"
          >
            Connect Wallet
          </button>
        </div>
      </div>
    </div>
  );
};

export default StakingConnectCTA;