"use client";
import ConnectBtn from "./ConnectBtn";
import { copyText } from "../utils";
import { useWalletConnector } from "@/app/hooks/useWalletConnector";

export default function Header() {
  const { account } = useWalletConnector();

  return (
    <header className="bg-background text-foreground flex justify-between items-center p-3">
      <h1 className="text-2xl ">Kommunity Staking App</h1>

      {account ? (
        <button
          className="text-teal-500 font-bold flex items-center justify-center cursor-pointer"
          onClick={() => {
            copyText(account);
          }}
        >
          <span className="mr-1">Connected with: </span>
          <div className="max-w-[200px] truncate">{account}</div>
        </button>
      ) : (
        <ConnectBtn />
      )}
    </header>
  );
}
