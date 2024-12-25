import React from "react";
import { TabType } from "../types";

interface Props {
  activeTab: TabType;
  handleTabChange: (tab: TabType) => void;
}

const Header = (props: Props) => {
  const { activeTab, handleTabChange } = props;

  // Dynamically define tabs
  const tabs = [
    { name: "Stake", type: TabType.Stake },
    { name: "Unstake", type: TabType.Unstake },
    { name: "Approve", type: TabType.Approve },
    { name: "Faucet", type: TabType.Faucet },
  ];

  return (
    <div className="flex justify-between border-b-2 mb-6">
      {tabs.map((tab) => (
        <button
          key={tab.type}
          className={`flex-1 text-center py-2 ${
            activeTab === tab.type
              ? "border-b-4 border-blue-500 font-semibold"
              : "text-gray-500"
          }`}
          onClick={() => handleTabChange(tab.type)}
        >
          {tab.name}
        </button>
      ))}
    </div>
  );
};

export default Header;
