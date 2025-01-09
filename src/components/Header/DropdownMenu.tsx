import { forwardRef } from "react";
import { useCopyToClipboard } from "@/app/hooks/useCopyToClipboard";

interface Props {
  address: string;
  setShowMenu: (show: boolean) => void;
}

const DropdownMenu = forwardRef<HTMLDivElement, Props>(
  ({ address, setShowMenu }, ref) => {
    const copyToClipboard = useCopyToClipboard();

    const handleDisconnect = async () => {
      console.log("Disconnecting");
    };

    const handleClaimFaucet = async () => {
      console.log("Claiming faucet");
    };

    return (
      <div
        ref={ref}
        className="absolute right-0 top-full mt-2 w-48 bg-white rounded-lg shadow-lg py-2"
      >
        <button
          className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
          onClick={() => {
            copyToClipboard(address);
          }}
        >
          Copy Address
        </button>

        <button
          className={`w-full text-left px-4 py-2 text-sm text-green-500 hover:bg-green-100`}
          onClick={() => {
            handleClaimFaucet();
          }}
        >
          Claim Tokens
        </button>

        <button
          onClick={handleDisconnect}
          className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
        >
          Disconnect
        </button>
      </div>
    );
  }
);

DropdownMenu.displayName = "DropdownMenu";

export default DropdownMenu;
