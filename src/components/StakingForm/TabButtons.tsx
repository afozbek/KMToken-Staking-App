interface TabButtonsProps {
  selectedTab: "stake" | "unstake" | "claim";
  onTabChange: (tab: "stake" | "unstake" | "claim") => void;
}

const TabButtons = ({ selectedTab, onTabChange }: TabButtonsProps) => {
  return (
    <div className="flex gap-2 mb-6 bg-gray-100 p-1 rounded-lg">
      <button
        className={`flex-1 py-2 px-4 rounded-md transition-all ${
          selectedTab === "stake"
            ? "bg-blue-500 text-white"
            : "text-gray-600 hover:text-gray-800"
        }`}
        onClick={() => onTabChange("stake")}
      >
        Stake
      </button>
      <button
        className={`flex-1 py-2 px-4 rounded-md transition-all ${
          selectedTab === "unstake"
            ? "bg-blue-500 text-white"
            : "text-gray-600 hover:text-gray-800"
        }`}
        onClick={() => onTabChange("unstake")}
      >
        Unstake
      </button>
      <button
        className={`flex-1 py-2 px-4 rounded-md transition-all ${
          selectedTab === "claim"
            ? "bg-blue-500 text-white"
            : "text-gray-600 hover:text-gray-800"
        }`}
        onClick={() => onTabChange("claim")}
      >
        Claim
      </button>
    </div>
  );
};

export default TabButtons;
