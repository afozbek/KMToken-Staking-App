import React from "react";
import { copyText } from "../../utils";
import { useDisconnect } from "wagmi";
import { config } from "@/wagmi/config";
import { getAccount } from "wagmi/actions";

interface Props {
  address: string;
  setShowMenu: (show: boolean) => void;
  ref: React.RefObject<any>;
}

const DropdownMenu = ({ address, setShowMenu, ref: menuRef }: Props) => {
  const { disconnect } = useDisconnect();

  const disconnectAccount = async () => {
    try {
      // gets the current connector
      const { connector } = getAccount(config);
      await disconnect({ connector });
    } catch (err) {
      console.log({ err });
    }
  };
  return (
    <div
      ref={menuRef}
      className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md border border-gray-200 z-10"
    >
      <button
        className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
        onClick={() => {
          copyText(address);
          setShowMenu(false);
        }}
      >
        Copy Address
      </button>

      <button
        className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
        onClick={() => {
          disconnectAccount();
          setShowMenu(false);
        }}
      >
        Logout
      </button>
    </div>
  );
};

export default DropdownMenu;
