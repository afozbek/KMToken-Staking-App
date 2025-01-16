import { tokenSymbol } from "@/blockchain/utils";
import React from "react";

const FormTitle = () => {
  return (
    <div className="text-center mb-6">
      <h2 className="text-xl font-semibold mb-2">Stake {tokenSymbol}</h2>
      <p className="text-gray-600">
        Stake {tokenSymbol} and receive d{tokenSymbol} while staking
      </p>
    </div>
  );
};

export default FormTitle;
