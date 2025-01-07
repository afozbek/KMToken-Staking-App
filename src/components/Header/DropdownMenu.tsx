import { forwardRef, useEffect, useState } from "react";
import { useCopyToClipboard } from "@/app/hooks/useCopyToClipboard";
import { useClientDisconnect, useEthersSigner } from "@/app/hooks/wagmi/utils";
import { claimTokensTx, isFaucetEnabled } from "@/blockchain";

interface Props {
  address: string;
  setShowMenu: (show: boolean) => void;
}

const DropdownMenu = forwardRef<HTMLDivElement, Props>(
  ({ address, setShowMenu }, ref) => {
    const [faucetEnabled, setIsFaucetEnabled] = useState(true);

    const signer = useEthersSigner();

    const { disconnectAccount } = useClientDisconnect();

    const copyToClipboard = useCopyToClipboard();

    useEffect(() => {
      if (signer) {
        isFaucetEnabled(signer).then((enabled) => {
          setIsFaucetEnabled(enabled);
        });
      }
    }, [signer]);

    const handleDisconnect = async () => {
      try {
        await disconnectAccount();
        setShowMenu(false);
      } catch (err) {
        console.log({ err });
      }
    };

    const handleClaimFaucet = async () => {
      console.log("Claiming faucet");

      if (!signer) return;
      try {
        await claimTokensTx(signer);
        setIsFaucetEnabled(false);
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
          className={`w-full text-left px-4 py-2 text-sm text-green-500 hover:bg-green-100 ${
            !faucetEnabled ? "cursor-not-allowed" : ""
          }`}
          onClick={() => {
            handleClaimFaucet();
          }}
          disabled={!faucetEnabled}
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
