import { forwardRef } from "react";
import { getAccount } from "wagmi/actions";
import { config } from "@/wagmi/config";
import { useDisconnect } from "wagmi";
import { useCopyToClipboard } from "@/app/hooks/useCopyToClipboard";

interface Props {
  address: string;
  setShowMenu: (show: boolean) => void;
}

const DropdownMenu = forwardRef<HTMLDivElement, Props>(
  ({ address, setShowMenu }, ref) => {
    const { disconnect } = useDisconnect();

    const copyToClipboard = useCopyToClipboard();

    const disconnectAccount = async () => {
      try {
        // gets the current connector
        const { connector } = getAccount(config);

        await disconnect({ connector });
        setShowMenu(false);
      } catch (err) {
        console.log({ err });
      }
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
          onClick={disconnectAccount}
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
