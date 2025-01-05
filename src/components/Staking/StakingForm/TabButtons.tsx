import { TabType } from ".";

interface TabButtonsProps {
  selectedTab: TabType;
  onTabChange: (tab: TabType) => void;
}

const TabButtons = ({ selectedTab, onTabChange }: TabButtonsProps) => {
  return (
    <div className="flex gap-2 mb-6 bg-gray-100 p-1 rounded-lg">
      <button
        className={`flex-1 py-2 px-4 rounded-md transition-all ${
          selectedTab === TabType.Stake
            ? "bg-blue-500 text-white"
            : "text-gray-600 hover:text-gray-800"
        }`}
        onClick={() => onTabChange(TabType.Stake)}
      >
        Stake
      </button>
      <button
        className={`flex-1 py-2 px-4 rounded-md transition-all ${
          selectedTab === TabType.Unstake
            ? "bg-blue-500 text-white"
            : "text-gray-600 hover:text-gray-800"
        }`}
        onClick={() => onTabChange(TabType.Unstake)}
      >
        Unstake
      </button>
      {/* <button
        className={`flex-1 py-2 px-4 rounded-md transition-all ${
          selectedTab === "faucet"
            ? "bg-blue-500 text-white"
            : "text-gray-600 hover:text-gray-800"
        }`}
        onClick={() => onTabChange("faucet")}
      >
        Faucet
      </button> */}
    </div>
  );
};

export default TabButtons;
