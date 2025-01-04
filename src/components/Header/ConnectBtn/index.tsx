"use client";

import { baseSepolia } from "viem/op-stack";
import { injected, useConnect } from "wagmi";

export default function ConnectBtn() {
  const { connect } = useConnect();

  const connectAccount = async () => {
    await connect({ connector: injected(), chainId: baseSepolia.id });
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
