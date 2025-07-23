import React, { useEffect, useState } from "react";
import HowToPlayModal from "../Modal/Howtoplay";
import { AiOutlineExclamationCircle } from "react-icons/ai";
import { SlSizeFullscreen } from "react-icons/sl";
import { HiBars3 } from "react-icons/hi2";
import MenuListModal from "../Modal/MenuListModal";
import GameRulesModal from "../Modal/GameRules";
import BetHistory from "../Modal/BetHistory";
import { apis } from "../utils/apis";
import useApi from "../hooks/useApi";
import { currency } from "../utils/keys";
import SignupModal from "../Auth/Register";
import Login from "../Auth/Login"
import { useNavigate } from "react-router-dom";
import chickenGameimage from "../assets/chicken header image.png";
export default function GameSection({
  toggleSound,
  setToggleSound,
  toggleMusic,
  setToggleMusic,
  setProfileRefresher,
  profileRefresher,
  restartGame,
}) {
  const userid = localStorage.getItem("userid");
  const navigate = useNavigate()

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
    const userid = localStorage.getItem("userid"); 
    get(`${apis?.profile}${userid}`)
      .then((res) => {
        // console.log("response profile", res);
        if (res?.data?.status === true) {
          setProfileData(res?.data?.profile);
          console.log(res?.data?.profile);
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
    <>
      <div
        className={`relative w-full h-full bg-no-repeat bg-cover bg-center 
          }`}
      >
        {/* Header Section */}
        <div className="flex items-center justify-between h-full px-2 sm:px-5 bg-mainBg text-white flex-nowrap overflow-x-auto overflow-hidden">
          {/* Title */}
          {/* <h1
            className="font-extrabold text-[1.4rem] md:text-[1.9rem] xl:text-[2.3rem] whitespace-nowrap cursor-pointer"
            onClick={() => navigate("/")}
          >
            CHICKEN <span className="text-yellow-400">R</span>
            <span className="inline-block w-4 md:w-6 h-4 md:h-6 lg:h-7 lg:w-7 bg-yellow-400 rounded-full mx-1"></span>
            AD
          </h1> */}

          <img
            src={chickenGameimage}
            alt=""
            className="w-50 whitespace-nowrap cursor-pointer"
          />

          {/* Info buttons */}
          <div className="flex items-center gap-2 sm:gap-4 text-xsm justify-end">
            <button
              className="hidden px-5 py-1 md:flex hover:text-yellow-400 items-center rounded bg-grayBgMain hover:bg-grayBgHover  transition whitespace-nowrap"
              onClick={() => setIsModalOpen(true)}
            >
              <AiOutlineExclamationCircle className="" />
              <span className=" sm:inline hidden ml-1">How to play?</span>
            </button>
            {userid && (
              <button
                className="px-3 sm:px-5 py-1 flex items-center rounded bg-grayBgMain hover:bg-grayBgHover  transition whitespace-nowrap"
                // onClick={() => setIsModalOpen(true)}
              >
                <span className="mr-1 flex items-center justify-center w-4 h-4 text-[10px] bg-white rounded-full text-black">
                  {currency}
                </span>
                {profileData?.amount}
              </button>
            )}

            {!userid && (
              <div className="flex items-center gap-2 text-xsm">
                <button
                  className="hover:bg-orange-dark text-white  px-5 py-1 rounded transition cursor-pointer items-center bg-grayBgMain hover:bg-grayBgHover uppercase"
                  onClick={() => setShowModal(true)}
                >
                  Register
                </button>
                <button
                  className="hover:bg-orange-dark text-white   px-5 py-1 rounded transition cursor-pointer items-center bg-grayBgMain hover:bg-grayBgHover whitespace-nowrap"
                  onClick={() => setShowModalLogin(true)}
                >
                  LOG IN
                </button>
              </div>
            )}

            <button
              onClick={handleFullscreen}
              className="bg-grayBgMain hidden lg:block rounded p-2.5 whitespace-nowrap cursor-pointer"
            >
              <SlSizeFullscreen className="hover:text-yellow-400" size={12} />
            </button>
            <button
              onClick={() => ToggleModalMenu()}
              className="whitespace-nowrap cursor-pointer"
            >
              <HiBars3 className="" size={25} />
            </button>
          </div>
        </div>
        {/* Game Area - Scrollable */}
      </div>
      <HowToPlayModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
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
        <GameRulesModal onClose={() => setIsModalOpenForGameRules(false)} />
      )}
      {isModalOpenForBetHistory && (
        <BetHistory
          onClose={() => setIsModalOpenForBetHistory(false)}
          title="My bet history"
          data={betHisotryData}
          // onLoadMore={handleLoadMore}
        />
      )}

      <SignupModal isOpen={showModal} onClose={() => setShowModal(false)} />
      <Login
        isOpen={showModalLogin}
        onClose={() => setShowModalLogin(false)}
        profileHandler={profileHandler}
      />
    </>
  );
}
