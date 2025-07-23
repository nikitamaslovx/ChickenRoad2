import React from "react";

const FooterHeader = () => {
  return (
    <div className="w-full bg-[#002c5f] flex items-center justify-between px-6 py-3">
      {/* Logo */}
      <div className="flex items-center space-x-1">
        <h1 className="font-bold text-xsm sm:text-xl md:text-2xl lg:text-3xl whitespace-nowrap text-white">
          CHICKEN <span className="text-yellow-400">R</span>
          <span className="inline-block w-4 h-4 bg-yellow-400 rounded-full mx-1 align-middle"></span>
          AD
        </h1>
      </div>

      {/* Age Badge */}
      <div className="border border-[#1d5fae] text-[#1d5fae] text-sm font-bold px-2 py-0.5 rounded-full">
        18+
      </div>
    </div>
  );
};

export default FooterHeader;
