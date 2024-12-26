import React from "react";

const SkeletonProductCard = () => {
  return (
    <div className="relative flex items-center justify-center w-full h-[370px] rounded-3xl bg-white/30 animate-pulse">
      <div className="w-full h-full bg-white rounded-2xl p-5 flex flex-col justify-start">
        <div className="w-full h-[240px] bg-gray-300 rounded-t-xl"></div>
        <div className="h-6 bg-gray-300 rounded mt-2 w-3/4"></div>
        <div className="h-4 bg-gray-200 rounded mt-2 w-1/4"></div>
        <div className="flex justify-between items-center mt-auto">
          <div className="h-8 bg-gray-300 rounded w-1/3"></div>
          <div className="h-10 bg-gray-300 rounded-full w-1/3"></div>
        </div>
      </div>
    </div>
  );
};

export default SkeletonProductCard;
