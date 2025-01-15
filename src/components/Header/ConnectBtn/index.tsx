"use client";

import { useClientConnect } from "@/app/hooks/wagmi/utils";

export default function ConnectBtn() {
  const { connectAccount } = useClientConnect();

  return (
    <button
      data-testid="connect-btn"
      className="bg-foreground text-background p-2 rounded-md"
      onClick={connectAccount}
    >
      Connect Wallet
    </button>
  );
}
