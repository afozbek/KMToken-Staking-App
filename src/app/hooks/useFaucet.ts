import { useCallback, useEffect, useState } from "react";
import { useEthersSigner } from "./wagmi/utils";
import { claimTokensTx, isFaucetEnabled } from "@/blockchain";
import { useToast } from "./useToast";

const useFaucet = () => {
  const [faucetEnabled, setIsFaucetEnabled] = useState(true);
  const [faucetLoading, setFaucetLoading] = useState(false);
  const signer = useEthersSigner();
  const { success } = useToast();

  const checkFaucetEnabled = useCallback(async () => {
    if (!signer) return;
    const enabled = await isFaucetEnabled(signer);
    setIsFaucetEnabled(enabled);
  }, [signer]);

  useEffect(() => {
    if (signer) {
      checkFaucetEnabled();
    }
  }, [signer, checkFaucetEnabled]);

  const claimTokens = async () => {
    console.log("Claiming faucet");

    if (!signer) return;
    try {
      setFaucetLoading(true);
      const hash = await claimTokensTx(signer);
      console.log({ hash });

      success("Tokens claimed successfully");
      setIsFaucetEnabled(false);
      setFaucetLoading(false);
    } catch (err) {
      console.log({ err });
      setFaucetLoading(false);
    }
  };

  return {
    faucetEnabled,
    checkFaucetEnabled,
    claimTokens,
    faucetLoading,
  };
};

export default useFaucet;
