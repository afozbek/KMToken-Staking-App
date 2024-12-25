"use client";
import ConnectBtn from "./ConnectBtn";
import { useWalletConnector } from "@/app/hooks/useWalletConnector";
import { useRef, useState } from "react";
import { useClickOutside } from "@/app/hooks/useClickOutside";
import DropdownMenu from "./DropdownMenu";

export default function Header() {
  const { account } = useWalletConnector();
  const [showMenu, setShowMenu] = useState(false);

  const menuRef = useRef<HTMLElement | any>(null);

  useClickOutside(menuRef, () => {
    setShowMenu(false);
  });

  const renderConnectPart = () => {
    if (account) {
      return (
        <>
          <button
            className="text-teal-500 font-bold flex items-center justify-center cursor-pointer"
            onClick={() => {
              setShowMenu((open) => !open);
            }}
          >
            <span className="mr-1">Connected with: </span>
            <div className="max-w-[200px] truncate">{account}</div>
          </button>

          {showMenu && (
            <DropdownMenu
              account={account}
              setShowMenu={setShowMenu}
              ref={menuRef} // we can add ref to components with new React
            />
          )}
        </>
      );
    }

    // show connect if account not connected
    return <ConnectBtn />;
  };

  return (
    <header className="bg-background text-foreground flex justify-between items-center p-3">
      <h1 className="text-2xl ">Kommunity Staking App</h1>
      <div className="relative">{renderConnectPart()}</div>
    </header>
  );
}
