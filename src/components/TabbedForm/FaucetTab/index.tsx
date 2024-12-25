import { claimTokensTx, isFaucetEnabled } from "@/blockchain";
import { useEthersSigner } from "@/app/hooks/wagmi/utils";
import React, { useEffect, useState } from "react";
import { Loader } from "lucide-react";

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

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="flex items-center text-center justify-center">
          <Loader size={40} />
        </div>
      );
    }

    return (
      <>
        {canClaim ? (
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
    );
  };

  return <div className="text-center">{renderContent()}</div>;
};

export default FaucetTab;
