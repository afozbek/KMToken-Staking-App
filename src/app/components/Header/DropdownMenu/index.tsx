import React from "react";
import { copyText } from "../../utils";
import { useDisconnect } from "wagmi";

interface Props {
  account: string;
  setShowMenu: (show: boolean) => void;
  ref: React.RefObject<any>;
}

const DropdownMenu = ({ account, setShowMenu, ref: menuRef }: Props) => {
  // const { disconnectAccount } = useWalletConnector();
  const { disconnect } = useDisconnect();

  return (
    <div
      ref={menuRef}
      className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md border border-gray-200 z-10"
    >
      <button
        className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
        onClick={() => {
          copyText(account);
          setShowMenu(false);
        }}
      >
        Copy Address
      </button>

      <button
        className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
        onClick={() => {
          disconnect();
          setShowMenu(false);
        }}
      >
        Logout
      </button>
    </div>
  );
};

export default DropdownMenu;
