const TransactionDetails = () => {
  return (
    <div className="space-y-4 mb-6">
      <h3 className="text-gray-700 font-medium">Transaction details</h3>

      <div className="flex justify-between text-gray-600">
        <span>You will recieve</span>
        <span>3.82 dETH</span>
      </div>

      <div className="flex justify-between text-gray-600">
        <span>Exchange rate</span>
        <span>1 ETH = 1 dETH</span>
      </div>

      <div className="flex justify-between text-gray-600">
        <span>Transaction cost</span>
        <span>$3.20 (0.0021)</span>
      </div>

      <div className="flex justify-between text-gray-600">
        <span className="flex items-center">
          Reward fee
          <span className="ml-1 text-gray-400 cursor-help">ⓘ</span>
        </span>
        <span>10%</span>
      </div>

      <div className="flex justify-between">
        <span className="flex items-center">
          Annual percentage rate
          <span className="ml-1 text-gray-400 cursor-help">ⓘ</span>
        </span>
        <span className="text-green-500">4.3%</span>
      </div>
    </div>
  );
};

export default TransactionDetails;
