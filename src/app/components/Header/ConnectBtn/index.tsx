"use client";

import { useWalletConnector } from "@/app/hooks/useWalletConnector";

export default function ConnectBtn() {
  const { connectAccount } = useWalletConnector();

  return (
    <button
      className="bg-foreground text-background p-2 rounded-md"
      onClick={connectAccount}
    >
      Connect Wallet
    </button>
  );
}
