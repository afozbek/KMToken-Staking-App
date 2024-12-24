"use client";
import { useContext, useEffect } from "react";
import { WalletConnectorContext } from "../context/walletContext";
import { connect } from "wagmi/actions";
import { config } from "../wagmi/config";
import { injected, useAccount } from "wagmi";

export function useWalletConnector() {
  const { account, setAccount } = useContext(WalletConnectorContext);
  const { address } = useAccount();

  useEffect(() => {
    if (address) {
      setAccount(address);
    }
  }, [address]);

  const connectAccount = async () => {
    try {
      await connect(config, { connector: injected() });
    } catch (err) {
      console.log({ err });
    }
  };

  return {
    account,
    connectAccount,
  };
}
