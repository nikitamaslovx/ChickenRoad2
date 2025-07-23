// import React from 'react'

// export default function Footer() {
//   return (
//     <div>
      
//     </div>
//   )
// }


import React from "react";
import chickenLogo from "../assets/chicken road game logo.png"; // replace with your actual logo path
import { href } from "react-router-dom";
import { apis } from "../utils/apis";
import useApi from "../hooks/useApi";

const ChickenFooter = () => {
//   const { get } = useApi();

  return (
    <>
      <footer className="bg-[#25283D] text-white text-center px-4 py-6 rounded-t-3xl">
        {/* Logo */}
        <div className="flex justify-center mb-2">
          <img
            src={chickenLogo}
            alt="Chicken Road Logo"
            className="w-35 h-20 rounded-[15px]  "
          />
        </div>
        {/* <a href="">
          <button download className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold px-4 py-2 rounded transition duration-200 text-xs sm:text-sm">
            Download Now
          </button>
        </a> */}
        <a href={apis?.download_apk} download>
          <button
            download
            className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold px-4 py-2 rounded transition duration-200 text-xs sm:text-sm"
          >
            Download Now
          </button>
        </a>
        {/* Copyright */}
        <div className="flex items-center justify-center text-sm text-gray-400 mb-3 space-x-2">
          <img src={chickenLogo} alt="icon" className="w-4 h-4" />
          <span>Copyright © 2025 ChickenRoad. All rights reserved.</span>
        </div>

        {/* Links */}
        <div className="flex justify-center gap-6 text-sm text-gray-300 mb-4">
          <button className="hover:text-white transition">Terms</button>
          <button className="hover:text-white transition">Privacy</button>
          <button className="hover:text-white transition">Contact</button>
        </div>

        {/* URL */}
      </footer>
      {/* <div className="bg-[#042F55] text-white text-sm py-2 rounded-b-xl flex justify-center items-center">
        chikenroadlandingpage.fctechteam.org
      </div> */}
      <div className="bg-[#042F55] text-white text-sm py-4 rounded-b-xl px-4">
        <div className="flex flex-col sm:flex-row justify-center items-center gap-2 sm:gap-4 text-center">
          <span className="break-words text-xs sm:text-sm">
            chikenroadlandingpage.fctechteam.org
          </span>
        </div>
      </div>
    </>
  );
};

export default ChickenFooter;
