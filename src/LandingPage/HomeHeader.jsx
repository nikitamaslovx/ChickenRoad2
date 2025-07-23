import React from "react";

const HomeHeader = () => {
  return (
    <header className="bg-[#2b3990] w-full px-4 py-2 flex items-center justify-between">
      {/* Logo */}
      <div className="flex items-center">
        <img
          src="/logo.png" // 🔁 Replace with actual logo path
          alt="Chicken Road Logo"
          className="w-10 h-10 rounded-full object-cover"
        />
      </div>

      {/* Login Button */}
      <button className="text-blue-400 border border-blue-400 px-4 py-1 rounded-md hover:bg-blue-500 hover:text-white transition duration-300 text-sm">
        Log in
      </button>
    </header>
  );
};

export default HomeHeader;
