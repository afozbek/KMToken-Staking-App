"use client";

import { useToast } from "@/app/hooks/useToast";
import { config } from "@/wagmi/config";
import { baseSepolia } from "viem/op-stack";
import { useConnect } from "wagmi";
import { getAccount } from "wagmi/actions";

export default function ConnectBtn() {
  const { connect } = useConnect();
  const { error } = useToast();

  const connectAccount = async () => {
    // gets the current connector
    const { connector } = getAccount(config);

    if (connector) {
      // We will use baseSepolia chain for this project (You may change it to base mainnet on production)
      await connect({ connector, chainId: baseSepolia.id });
    } else {
      error("Please install Metamask to connect your wallet");
    }
  };

  return (
    <button
      className="bg-foreground text-background p-2 rounded-md"
      onClick={connectAccount}
    >
      Connect Wallet
    </button>
  );
}
