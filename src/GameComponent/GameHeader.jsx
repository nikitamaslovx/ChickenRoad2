import React from "react";
import { FaHome, FaPlay, FaEye, FaExpand, FaTimes } from "react-icons/fa";
import SignupModal from "../Auth/Signup";

export default function GameHeader() {
  const [showModal, setShowModal] = useState(false);
  const [showModalLogin, setShowModalLogin] = useState(false);
  return (
    <div className="flex  items-center justify-between gap-y-2 px-3 py-2 bg-gradient-to-r from-[#00254e] to-[#00356b] text-white text-sm">
      <div className="flex items-center gap-2 flex-shrink-0">
        <FaHome className="text-[#4f8cc9]" />
        <span className="font-semibold hidden sm:inline">FAST GAMES</span>
        <span className="text-[#4f8cc9] hidden sm:inline">• CHICKEN ROAD</span>
      </div>

      <div className="flex  items-center  sm:gap-0 justify-end text-xs sm:text-sm">
        <div className="flex items-center bg-orange-500 rounded-full px-3 sm:px-4 py-1 font-semibold cursor-pointer hover:bg-orange-600 transition-all whitespace-nowrap">
          <div className="w-6 h-6 bg-yellow-400 border-[3px] border-orange-300 rounded-full mr-2 flex items-center justify-center shadow-md">
            <span className="text-white text-xs font-bold">★</span>
          </div>
          <span className="hidden sm:inline">PLAY FOR REAL MONEY</span>
          <span className="inline sm:hidden">REAL</span>
        </div>

        <div className="flex items-center gap-1 px-2 sm:px-3 py-1 rounded-full bg-[#0f2f5f] hover:bg-[#123b70] cursor-pointer">
          <FaPlay className="text-xs" />
          <span className="hidden sm:inline">PLAY</span>
        </div>

        <div className="flex items-center gap-1 px-2 sm:px-3 py-1 rounded-full bg-[#5CA7FF] hover:bg-[#74b7ff] text-white cursor-pointer">
          <FaEye className="text-xs" />
          <span className="hidden sm:inline">DEMO</span>
        </div>

        <div className="flex items-center gap-2">
          <button
            className="bg-orange hover:bg-orange-dark text-white text-xs sm:text-sm font-semibold px-3 sm:px-4 py-1.5 sm:py-2 rounded-full transition"
            onClick={() => setShowModal(true)}
          >
            SIGN UP
          </button>
          <button
            className="bg-blue hover:bg-blue-dark text-white text-xs sm:text-sm font-semibold px-3 sm:px-4 py-1.5 sm:py-2 rounded-full transition"
            onClick={() => setShowModalLogin(true)}
          >
            LOG IN
          </button>
        </div>

        {/* Fullscreen */}
        <div className="cursor-pointer hover:text-blue-400 px-1">
          <FaExpand />
        </div>

        {/* Close */}
        <div className="cursor-pointer hover:text-red-400 px-1">
          <FaTimes />
        </div>
      </div>
      {/* Modals */}
      <SignupModal isOpen={showModal} onClose={() => setShowModal(false)} />
      {/* <Login isOpen={showModalLogin} onClose={() => setShowModalLogin(false)} /> */}
    </div>
  );
}
