
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IoMdPerson } from "react-icons/io";
import { currency } from "../utils/keys";

const liveData = [
  { name: "Brynjolfursdsd", flag: "🇮🇸", amount: 273.24 },
  { name: "Luciano", flag: "🇮🇹", amount: 412.75 },
  { name: "Hiroshi", flag: "🇯🇵", amount: 189.0 },
  { name: "Carlos", flag: "🇪🇸", amount: 356.42 },
];

export default function Notification() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % liveData.length);
    }, 2000); // Rotate every 2s

    return () => clearInterval(interval);
  }, []);

  const { name, flag, amount } = liveData[currentIndex];

  return (
    <div className="fixed  left-0 w-54 z-40  text-white  shadow-lg px-3 py-1 pl-0 pr-0 pb-0 text-sm overflow-hidden">
      <div className="flex text-[13px] font-bold text-[#A7B1E6] items-center gap-2 mb-1 pl-4 whitespace-nowrap">
        <span className="">Live wins</span>
        <span className="relative flex w-[6px] h-[6px]">
          <span className="absolute inset-0 rounded-full bg-accent opacity-75 animate-ping"></span>
          <span className="relative w-[6px] h-[6px] rounded-full bg-accent z-10"></span>
        </span>
        <span className="ps-2">Online: 7465</span>
      </div>

      {/* AnimatePresence enables exit + entry animation */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex} // ensure animation triggers on change
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 30, opacity: 0 }}
          transition={{ duration: 0.1, ease: "easeOut" }}
          className="flex w-full items-center text-[13px]  justify-between py-1 gap-2 overflow-hidden bg-gradient-to-r from-[rgba(56,62,98,2)] to-[rgba(56,62,98,0)] px-2"
        >
          <div className="w-full">
            <div className="relative bg-[#FE8F84] w-5 h-5  rounded-full">
              <div className="ml-1 mt-1 text-[#A01305]"><IoMdPerson size={14} />  </div>
              <div className="text-sm z-50 ml-1 -mt-2.5">{flag}</div>
            </div>
          </div>
          <p className="font-semibold w-full mr-3">{name.length > 13 ? `${name.slice(0, 12)}...` : name}</p>
          <p className="text-green-400 text-nowrap w-full font-bold">
            +{currency}{amount.toFixed(2)}
          </p>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
