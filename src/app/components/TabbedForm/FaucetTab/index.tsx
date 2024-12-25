import { claimTokensTx, isFaucetEnabled } from "@/app/blockchain";
import { useWalletConnector } from "@/app/hooks/useWalletConnector";
import { useEthersSigner } from "@/app/hooks/wagmi/utils";
import { FaucetAbi } from "@/app/blockchainUtils/abi";
import { config } from "@/app/wagmi/config";
import React, { useEffect, useState } from "react";
import { useReadContract } from "wagmi";

interface Props {}

const FaucetTab = () => {
  const [canClaim, setCanClaim] = useState(true); // Simulate faucet claim state
  const [isLoading, setLoading] = useState(true);

  const signer = useEthersSigner();

  useEffect(() => {
    console.log("faucet opened");

    checkFaucetClaim();
  }, []);

  const checkFaucetClaim = async () => {
    if (!signer) {
      throw new Error("No signer");
    }
    const isEnabled = await isFaucetEnabled(signer);
    setCanClaim(isEnabled);
    setLoading(false);
  };

  const handleFaucetClaim = async () => {
    if (!signer) {
      throw new Error("Signer not exist");
    }

    setLoading(true);
    const hash = await claimTokensTx(signer);

    console.log({ hash });
    alert(`You successfully claimed free tokens. TxHash: ${hash}`);

    setLoading(false);
    setCanClaim(false);
  };

  return (
    <div className="text-center">
      <>
        {isLoading ? (
          <p>Loading..</p>
        ) : canClaim ? (
          <p className="text-green-500 font-medium">
            You are eligible to claim tokens!
          </p>
        ) : (
          <p className="text-red-500 font-medium">
            You have already claimed your tokens.
          </p>
        )}
        <button
          className={`mt-4 px-4 py-2 rounded ${
            canClaim
              ? "bg-blue-500 text-white hover:bg-blue-600"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
          onClick={handleFaucetClaim}
          disabled={!canClaim || isLoading}
        >
          {isLoading ? "Loading..." : "Claim Tokens"}
        </button>
      </>
    </div>
  );
};

export default FaucetTab;
