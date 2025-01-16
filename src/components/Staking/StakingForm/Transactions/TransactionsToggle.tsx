import { ChevronRight } from "lucide-react";
import { ChevronLeft } from "lucide-react";
import React from "react";

const TransactionsToggle = ({
  opened,
  setOpened,
}: {
  opened: boolean;
  setOpened: (opened: boolean) => void;
}) => {
  return (
    <button
      className="absolute z-10 top-5 -right-5 bg-white shadow-md hover:bg-gray-50 transition-colors text-gray-600 p-2 rounded-full"
      onClick={() => setOpened(!opened)}
    >
      {opened ? (
        <ChevronLeft className="w-4 h-4" />
      ) : (
        <ChevronRight className="w-4 h-4" />
      )}
    </button>
  );
};

export default TransactionsToggle;
