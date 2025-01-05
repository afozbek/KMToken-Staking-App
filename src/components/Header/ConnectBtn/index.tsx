"use client";

import { useToast } from "@/app/hooks/useToast";
import { baseSepolia } from "viem/chains";
import { useConnect } from "wagmi";
import { metaMask } from "wagmi/connectors";

export default function ConnectBtn() {
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
    <button
      className="bg-foreground text-background p-2 rounded-md"
      onClick={connectAccount}
    >
      Connect Wallet
    </button>
  );
}
