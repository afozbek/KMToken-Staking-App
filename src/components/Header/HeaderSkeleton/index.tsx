import React from "react";

interface HeaderSkeletonProps {
  className?: string;
}

const HeaderSkeleton = ({ className = "" }: HeaderSkeletonProps) => {
  return (
    <header className="bg-white text-gray-800 px-4 sm:px-6 py-4 shadow-sm font-fontTomorrow flex justify-center">
      <div className="max-w-[1200px] container flex justify-between items-center">
        <div className="flex items-center gap-12">
          <div className="text-2xl font-bold">
            <div className="h-8 w-24 bg-gray-200 rounded-md animate-pulse" />
          </div>
          <div className="hidden lg:flex gap-8">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="h-4 w-20 bg-gray-200 rounded-md animate-pulse"
              />
            ))}
          </div>
        </div>

        <div className={`flex items-center gap-4 ${className}`}>
          <div className="h-10 w-[180px] bg-gray-200 rounded-md animate-pulse" />
          <div className="lg:hidden h-10 w-10 bg-gray-200 rounded-lg animate-pulse" />
        </div>
      </div>
    </header>
  );
};

export default HeaderSkeleton;
