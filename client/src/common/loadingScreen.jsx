import React from "react";

const LoadingScreen = () => {
  return (
    <div className="fixed inset-0 flex flex-col space-y-4 bg-gray-100 p-4 z-50">
      {/* Header Placeholder */}
      <div className="loading w-full h-16 rounded-lg"></div>
      {/* Title Placeholder */}
      <div className="loading w-3/4 h-6 rounded-md"></div>
      <div className="loading w-1/2 h-6 rounded-md"></div>
      {/* Cards / Blocks */}
      <div className="flex flex-1 space-x-4">
        <div className="loading w-1/3 h-full rounded-lg"></div>
        <div className="loading w-1/3 h-full rounded-lg"></div>
        <div className="loading w-1/3 h-full rounded-lg"></div>
      </div>
      {/* Full-width & Full-height Content Section */}
      <div className="flex-1 flex flex-col space-y-4">
        <div className="loading w-full h-1/2 rounded-lg"></div>
        <div className="loading w-full h-1/2 rounded-lg"></div>
      </div>
    </div>
  );
};

export default LoadingScreen;
