"use client";
import { useContext, useEffect } from "react";
import { WalletConnectorContext } from "../context/walletContext";
import { connect, disconnect, getAccount } from "wagmi/actions";
import { config } from "../../wagmi/config";
import { injected, useAccount } from "wagmi";

export function useWalletConnector() {
  const { account, setAccount } = useContext(WalletConnectorContext);
  const { address } = useAccount();

  useEffect(() => {
    if (address) {
      setAccount(address);
    } else {
      setAccount("");
    }
  }, [address]);

  const connectAccount = async () => {
    try {
      await connect(config, { connector: injected() });
    } catch (err) {
      console.log({ err });
    }
  };

  const disconnectAccount = async () => {
    try {
      // gets the current connector
      const { connector } = getAccount(config);
      await disconnect(config, { connector });
    } catch (err) {
      console.log({ err });
    }
  };

  return {
    account,
    connectAccount,
    disconnectAccount,
  };
}
