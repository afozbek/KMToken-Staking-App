import { forwardRef } from "react";
import { copyText } from "../utils";

interface Props {
  address: string;
  setShowMenu: (show: boolean) => void;
}

const DropdownMenu = forwardRef<HTMLDivElement, Props>(
  ({ address, setShowMenu }, ref) => {
    return (
      <div
        ref={ref}
        className="absolute right-0 top-full mt-2 w-48 bg-white rounded-lg shadow-lg py-2"
      >
        <button
          className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
          onClick={() => {
            copyText(address);
          }}
        >
          Copy Address
        </button>
        <button
          onClick={() => setShowMenu(false)}
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
