import TokenIcon from "../../../icons/TokenIcon";
import { memo } from "react";

interface StakeInputProps {
  amount: string;
  onAmountChange: (amount: string) => void;
  onMaxClick: () => void;
}

const StakeInput = memo(
  ({ amount, onAmountChange, onMaxClick }: StakeInputProps) => {
    return (
      <div className="mb-2">
        <label className="block text-gray-700 mb-2">Amount</label>
        <div className="relative">
          <div className="absolute left-3 top-1/2 -translate-y-1/2">
            <TokenIcon />
          </div>
          <input
            type="number"
            value={amount}
            onChange={(e) => onAmountChange(e.target.value)}
            className="w-full pl-12 pr-20 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="0.0"
            min="0"
            step="0.1"
          />
          <button
            onClick={onMaxClick}
            className="absolute right-3 top-1/2 -translate-y-1/2
           bg-blue-100 text-blue-600 px-3 py-1 rounded-md 
           hover:bg-blue-200 transition-colors font-semibold"
          >
            MAX
          </button>
        </div>
      </div>
    );
  }
);

StakeInput.displayName = "StakeInput";

export default StakeInput;
