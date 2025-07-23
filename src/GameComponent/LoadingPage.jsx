// components/LoadingScreen.jsx
import React from "react";
import logo from "../assets/chicken loading.png"; // replace with actual logo path

const LoadingPage = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-[#0F172A]">
      <div className="flex flex-col items-center">
        <img src={logo} alt="Logo" className="w-64 mb-8 animate-pulse" />
        <div className="flex items-center space-x-2">
          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          <p className="text-white text-lg">Loading...</p>
        </div>
      </div>
    </div>
  );
};

export default LoadingPage;
