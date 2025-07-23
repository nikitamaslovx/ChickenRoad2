import { useState } from "react";
import { FaInfoCircle, FaDollarSign, FaExpand, FaBars } from "react-icons/fa";
import HowToPlayModal from "../Modal/Howtoplay";

const TopBar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      {/* Content container that gets blurred when modal is open */}
      <div
        className={`${
          isModalOpen ? "filter blur-sm transition duration-300" : ""
        }`}
      >
        <div className="flex items-center justify-between bg-[#393c52] px-4 py-2 rounded-t-lg">
          <div className="flex items-center gap-1 text-white font-bold text-xl">
            <span>CHICKEN</span>
            <span>R</span>
            <span className="text-yellow-400 text-2xl">🥚</span>
            <span>AD</span>
          </div>

          <div className="flex items-center gap-3 text-white">
            <button
              onClick={() => setIsModalOpen(true)}
              className="flex items-center gap-1 bg-[#4a4d66] hover:bg-[#5b5f7a] px-3 py-1 rounded text-sm"
            >
              <FaInfoCircle className="text-white text-xs" />
              <span>How to play?</span>
            </button>

            <div className="flex items-center gap-1 bg-[#4a4d66] px-3 py-1 rounded text-sm">
              <span>999 998.84</span>
              <FaDollarSign className="text-white text-sm" />
            </div>

            <button className="bg-[#4a4d66] p-2 rounded hover:bg-[#5b5f7a]">
              <FaExpand className="text-white text-sm" />
            </button>

            <button className="bg-[#4a4d66] p-2 rounded hover:bg-[#5b5f7a]">
              <FaBars className="text-white text-sm" />
            </button>
          </div>
        </div>
      </div>

      {/* Modal on top */}
      <HowToPlayModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
};

export default TopBar;
