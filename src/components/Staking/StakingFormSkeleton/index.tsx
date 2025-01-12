import React from "react";

const StakingFormSkeleton = () => {
  return (
    <div className="p-5 lg:p-0">
      <div className="bg-white rounded-xl p-6 max-w-md mx-auto font-fontTomorrow mt-10">
        {/* Header */}
        <div className="text-center mb-6">
          <div className="h-7 w-32 bg-gray-200 rounded-lg mx-auto mb-2 animate-pulse" />
          <div className="h-4 w-48 bg-gray-200 rounded-lg mx-auto animate-pulse" />
        </div>

        {/* Tab Buttons */}
        <div className="flex gap-2 mb-6 bg-gray-100 p-1 rounded-lg">
          <div className="flex-1 h-10 bg-gray-200 rounded-md animate-pulse" />
          <div className="flex-1 h-10 bg-gray-200 rounded-md animate-pulse" />
        </div>

        {/* Input Area */}
        <div className="mb-6">
          <div className="h-4 w-16 bg-gray-200 rounded mb-2 animate-pulse" />
          <div className="h-12 w-full bg-gray-200 rounded-lg animate-pulse" />
        </div>

        {/* Transaction Details */}
        <div className="space-y-4 mb-6">
          <div className="h-5 w-36 bg-gray-200 rounded animate-pulse" />

          {/* Transaction rows */}
          {[...Array(4)].map((_, i) => (
            <div key={i} className="flex justify-between items-center">
              <div className="h-4 w-24 bg-gray-200 rounded animate-pulse" />
              <div className="h-4 w-20 bg-gray-200 rounded animate-pulse" />
            </div>
          ))}
        </div>

        {/* Terms Checkbox */}
        <div className="mb-6 flex items-center gap-2">
          <div className="h-5 w-5 bg-gray-200 rounded animate-pulse" />
          <div className="h-4 flex-1 bg-gray-200 rounded animate-pulse" />
        </div>

        {/* Action Button */}
        <div className="h-12 w-full bg-gray-200 rounded-lg animate-pulse" />
      </div>
    </div>
  );
};

export default StakingFormSkeleton;
