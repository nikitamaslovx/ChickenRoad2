// import React, { useState } from "react";
// import SignupModal from "../Auth/SignUp";
// import Login from "../Auth/Login";

// export default function Header() {
//   const [showModal, setShowModal] = useState(false);
//   const [showModalLogin, setShowModalLogin] = useState(false);

//   return (
//     <div className="w-full bg-mainGradient text-white px-4 py-2 flex items-center justify-between">
//       {/* Left side: Chicken Road */}
//       <div className="text-2xl font-bold">CHICKEN ROAD</div>

//       {/* Right side: Buttons */}
//       <div className="flex gap-2">
//         <button
//           className="bg-orange hover:bg-orange text-white text-sm font-bold px-4 py-2 rounded-full"
//           onClick={() => setShowModal(true)}
//         >
//           SIGN UP
//         </button>
//         <button
//           className="bg-blue hover:bg-blue text-white text-sm font-bold px-4 py-2 rounded-full"
//           onClick={() => setShowModalLogin(true)}
//         >
//           LOG IN
//         </button>
//       </div>

//       {/* Modal */}
//       <SignupModal isOpen={showModal} onClose={() => setShowModal(false)} />
//       <Login isOpen={showModalLogin} onClose={() => setShowModalLogin(false)} />
//     </div>
//   );
// }


import React, { useState, useEffect } from "react";
import SignupModal from "../Auth/Register";
import Login from "../Auth/Login";
import { currency } from "../utils/keys";
import { apis } from "../utils/apis";
import useApi from "../hooks/useApi";
import chickenLogo from "../assets/chicken road game logo.png";
import MenuListModal from "../Modal/MenuListModal";
import { HiBars3 } from "react-icons/hi2";
import chicken_dead_voice from "../assets/music/chicken_dead_voice.mp3";
import bg_music from "../assets/music/bg_music.mp3";
import GameRulesModal from "../Modal/GameRules";
import BetHistory from "../Modal/BetHistory";


export default function Header({
  toggleSound,
  setToggleSound,
  toggleMusic,
  setToggleMusic,
  setProfileRefresher,
  profileRefresher,
  restartGame,
}) {
  const userid = localStorage.getItem("userid");

  const { get, post, put, del, loading, error } = useApi();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [betHisotryData, setBetHisotryData] = useState([]);
  const [profileData, setProfileData] = useState(null);
  const [isModalOpenForGameRules, setIsModalOpenForGameRules] = useState(false);
  const [isModalOpenForBetHistory, setIsModalOpenForBetHistory] =
    useState(false);
  const [isMenuModalOpen, setIsMenuModalopen] = useState(false);
  const ToggleModalMenu = () => {
    setIsMenuModalopen(!isMenuModalOpen);
  };

  const betHisotry = () => {
    get(`${apis?.betHisotry}${userid}&limit=10&offset=10`)
      .then((res) => {
        // console.log("response hisotry", res);
        if (res?.data?.success === true) {
          setBetHisotryData(res?.data);
        }
      })
      .catch(console.error);
  };

  const profileHandler = () => {
    get(`${apis?.profile}${userid}`)
      .then((res) => {
        // console.log("response profile", res);
        if (res?.data?.status === true) {
          setProfileData(res?.data?.profile);
          // console.log(res?.data?.profile.status);
        }
      })
      .catch(console.error);
  };
  useEffect(() => {
    betHisotry();
    profileHandler();
  }, []);
  useEffect(() => {
    if (profileRefresher) {
      profileHandler();
      setProfileRefresher(false); // reset it
    }
  }, [profileRefresher]);

  // const handleFullscreen = () => {
  //   const elem = document.documentElement;
  //   if (elem.requestFullscreen) {
  //     elem.requestFullscreen();
  //   } else if (elem.webkitRequestFullscreen) {
  //     elem.webkitRequestFullscreen();
  //   } else if (elem.msRequestFullscreen) {
  //     elem.msRequestFullscreen();
  //   }
  // };

  const handleFullscreen = () => {
    const isFullscreen =
      document.fullscreenElement ||
      document.webkitFullscreenElement ||
      document.mozFullScreenElement ||
      document.msFullscreenElement;

    if (isFullscreen) {
      // Exit fullscreen
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      }
    } else {
      // Enter fullscreen
      const elem = document.documentElement;
      if (elem.requestFullscreen) {
        elem.requestFullscreen();
      } else if (elem.webkitRequestFullscreen) {
        elem.webkitRequestFullscreen();
      } else if (elem.msRequestFullscreen) {
        elem.msRequestFullscreen();
      }
    }
  };

  const [showModal, setShowModal] = useState(false);
  const [showModalLogin, setShowModalLogin] = useState(false);
  return (
    <div className="w-full bg-mainGradient text-white px-4 py-3 flex items-center justify-between">
      {/* Left side: Logo */}
      <div className="text-lg sm:text-2xl font-bold">
        <img
          className="w-12 h-12 rounded-full"
          src={chickenLogo}
          alt="logo not found"
        />
      </div>

      {/* Right side: Buttons */}

      {!userid && (
        <div className="flex items-center gap-2 text-xsm font-bold">
          <button
            className=" text-white  px-5 py-1 rounded transition cursor-pointer items-center bg-[#FA6315] hover:bg-[#FA6315] border-none uppercase"
            onClick={() => setShowModal(true)}
          >
            Register
          </button>
          <button
            className=" text-white   px-5 py-1 rounded transition cursor-pointer items-center bg-[#5292D8] hover:bg-[#5292D8] whitespace-nowrap"
            onClick={() => setShowModalLogin(true)}
          >
            LOG IN
          </button>
        </div>
      )}
      {userid && (
        <>
          <div className="flex items-center gap-2 text-xsm">
            <button
              className="px-3 sm:px-5 py-1 flex items-center rounded bg-[#5292D8] hover:bg-[#5292D8]  transition whitespace-nowrap"
              // onClick={() => setIsModalOpen(true)}
            >
              <span className="mr-1 flex items-center justify-center w-4 h-4 text-[10px] bg-white rounded-full text-black">
                {currency}
              </span>
              {profileData?.amount}
            </button>
            <button
              onClick={() => ToggleModalMenu()}
              className="whitespace-nowrap cursor-pointer"
            >
              <HiBars3 className="" size={25} />
            </button>
            <div className="z-50 cursor-pointer">
              <MenuListModal
                isOpen={isMenuModalOpen}
                onClose={() => setIsMenuModalopen(false)}
                toggleSound={toggleSound}
                setToggleSound={setToggleSound}
                toggleMusic={toggleMusic}
                setToggleMusic={setToggleMusic}
                setIsModalOpenForGameRules={setIsModalOpenForGameRules}
                setIsModalOpenForBetHistory={setIsModalOpenForBetHistory}
                profileData={profileData}
                setProfileRefresher={setProfileRefresher}
                restartGame={restartGame}
              />
            </div>
            {isModalOpenForGameRules && (
              <GameRulesModal
                onClose={() => setIsModalOpenForGameRules(false)}
              />
            )}
            {isModalOpenForBetHistory && (
              <BetHistory
                onClose={() => setIsModalOpenForBetHistory(false)}
                title="My bet history"
                data={betHisotryData}
                // onLoadMore={handleLoadMore}
              />
            )}
          </div>
        </>
      )}

      {/* Modals */}
      <SignupModal isOpen={showModal} onClose={() => setShowModal(false)} />
      <Login
        isOpen={showModalLogin}
        onClose={() => setShowModalLogin(false)}
        setProfileRefresher={setProfileRefresher}
      />
    </div>
  );
}

