import React from "react";
import Image from "next/image";
import TokenIcon from "../icons/TokenIcon";
import ConnectBtn from "./ConnectBtn";
import DropdownMenu from "./DropdownMenu";
import { tokenSymbol } from "@/blockchain/utils";

interface ConnectPartProps {
  address?: string;
  connected: boolean;
  balance?: string;
  onMenuToggle: () => void;
  showMenu: boolean;
  setShowMenu: (show: boolean) => void;
}

const ConnectPart = React.forwardRef<HTMLDivElement, ConnectPartProps>(
  (
    { address, connected, balance, onMenuToggle, showMenu, setShowMenu },
    ref
  ) => {
    if (!address || !connected) {
      return <ConnectBtn />;
    }

    return (
      <div className="flex items-center gap-4 relative">
        <div className="hidden sm:flex items-center gap-2">
          <TokenIcon />
          <span className="font-medium">
            {balance} {tokenSymbol}
          </span>
        </div>
        <button
          className="flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors"
          onClick={onMenuToggle}
        >
          <Image
            src="/avatar-placeholder.svg"
            alt="Avatar"
            className="w-6 h-6"
            width={24}
            height={24}
          />
          <span className="max-w-[120px] truncate hidden sm:block">
            {address}
          </span>
        </button>

        {showMenu && (
          <DropdownMenu ref={ref} address={address} setShowMenu={setShowMenu} />
        )}
      </div>
    );
  }
);

// Add display name for debugging
ConnectPart.displayName = "ConnectPart";

export default ConnectPart;
