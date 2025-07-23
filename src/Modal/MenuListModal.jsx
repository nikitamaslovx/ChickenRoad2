import React,{useState} from "react";
import { HiOutlineMusicNote } from "react-icons/hi";
import ToggleButton from "../ReusableComponents/ToggleButton";
import { AiOutlineHistory, AiOutlineSound } from "react-icons/ai";
import { TfiWrite } from "react-icons/tfi";
import { IoWalletOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { PiHandWithdraw } from "react-icons/pi";
import PayinModal from "../services/Payin";
import PayOutModal from '../services/Payout'
import ChangeAvatarModal from "../Modal/ChangeAvtarModal";
import { FiLogOut } from "react-icons/fi";
import useApi from "../hooks/useApi";
import { apis, referral_url } from "../utils/apis";
import FirstWithdrawPopup from "./FirstWithdrawPopup";
import YourDepositHistoryModal from "./YourDepositHistoryModal";
import YourWithdrawHistoryModal from "./YourWithdrawHistoryModal"
import Login from "../Auth/Login";
function MenuListModal({
  isOpen,
  onClose,
  toggleSound,
  setToggleSound,
  toggleMusic,
  setToggleMusic,
  setIsModalOpenForGameRules,
  setIsModalOpenForBetHistory,
  profileData,
  setProfileRefresher,
  restartGame,
}) {
  const navigate = useNavigate();

  const [showPayinModal, setShowPayinModal] = useState(false);
  const [showPayOutModal, setShowPayOutModal] = useState(false);
  const [showAvatarModal, setShowAvatarModal] = useState(false);
  const [showFirstWithdrawPopup, setShowFirstWithdrawPopup] = useState(false);
  const [showDepositHistory, setShowDepositHistory] = useState(false);
  const [showWithdrawHistory, setShowWithdrawHistory] = useState(false);
  // const [showLogin, setShowLogin] = useState(false);
 const [showModalLogin, setShowModalLogin] = useState(false);
  const { get } = useApi(); 
  const userid = localStorage.getItem("userid");



  if (!isOpen) return null;

  const handleLogout = () => {
    localStorage.removeItem("userid");
    // toast.success("Logged out successfully");
    restartGame();
    onClose(); // close the modal
    navigate("/");
    // window.location.reload();

    // or navigate to your login/home route
  };

  
  const handleWithdraw = async () => {
    try {
      const userid = localStorage.getItem("userid");
      const res = await get(`${apis?.profile}${userid}`);
      const firstRecharge = res?.data?.profile?.first_recharge;

      if (firstRecharge === 1 || firstRecharge === 2) {
        setShowPayOutModal(true);
      } else {
        setShowFirstWithdrawPopup(true);
      }
    } catch (error) {
      console.error("Failed to fetch profile for withdraw check", error);
    }
  };
  
  return (
    <div className="fixed inset-0 bg-black/70 z-50">
      {/* Modal Panel */}
      <div className="absolute top-16 right-5 w-72 bg-[#3A3D51] border-accent/10 border-2 text-white rounded-lg p-4 shadow-xl z-50">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute  right-3 text-white text-2xl hover:text-red-400 transition"
        >
          &times;
        </button>

        {/* Modal Content */}
        <div className="space-y-3 mt-6 text-[12px]">
          {/* <div className="flex items-center justify-between w-full ">
            <img
              className="w-6 h-6 rounded-full"
              src={profileData?.profile_image}
              alt="sd"
            />
            {!userid ? (
              <p className="text-[12px]">You are Logged in ?</p>
            ) : (
              <p className="font-bold text-sm">{profileData?.name}</p>
            )}

            <p className="font-bold text-sm">{profileData?.name}</p>
            <button className="text-[#757575]">Change avatar</button>
            {!userid ? (
              <button
                onClick={() => setShowModalLogin(true)}
                className="text-[#35C0F7] cursor-pointer hover:text-green-400 "
              >
                Login
              </button>
            ) : (
              <button
                onClick={() => setShowAvatarModal(true)}
                className="text-[#757575] cursor-pointer hover:text-green-400"
              >
                Change avatar
              </button>
            )}
            <button
              onClick={() => setShowAvatarModal(true)}
              className="text-[#757575] cursor-pointer hover:text-green-400"
            >
              Change avatar
            </button>
          </div> */}
          <div className="flex items-center justify-between w-full">
            {userid && (
              <img
                className="w-6 h-6 rounded-full"
                src={profileData?.profile_image}
                alt="avatar"
              />
            )}

            <div className="flex flex-col items-start flex-1 px-2">
              {!userid ? (
                <>
                  {/* <div className="flex">
                    <p className="text-[12px] text-white">
                      You are not logged in ?
                    </p>
                    <button
                      onClick={() => setShowModalLogin(true)}
                      className="text-[#35C0F7] text-sm cursor-pointer hover:text-green-400"
                    >
                      Login
                    </button>
                  </div> */}
                  <div className="flex items-center justify-center gap-1 w-full">
                    <p className="text-[12px] text-white">
                      You are not logged in?
                    </p>
                    <button
                      onClick={() => setShowModalLogin(true)}
                      className="text-[#35C0F7] text-[14px] cursor-pointer hover:text-green-400"
                    >
                      Login
                    </button>
                  </div>
                </>
              ) : (
                <p className="font-bold text-sm text-white">
                  {profileData?.name}
                </p>
              )}
            </div>

            {/* {!userid ? (
              <button
                onClick={() => setShowModalLogin(true)}
                className="text-[#35C0F7] text-sm cursor-pointer hover:text-green-400"
              >
                Login
              </button>
            ) : (
              <button
                onClick={() => setShowAvatarModal(true)}
                className="text-[#757575] text-sm cursor-pointer hover:text-green-400"
              >
                Change avatar
              </button>
            )} */}

            {userid && (
              <button
                onClick={() => setShowAvatarModal(true)}
                className="text-[#757575] text-sm cursor-pointer hover:text-green-400"
              >
                Change avatar
              </button>
            )}
          </div>

          <div className="pt-2 flex items-center justify-between w-full">
            <div className="flex items-center gap-3">
              <p>
                <AiOutlineSound size={15} />
              </p>
              <p>Sound</p>
            </div>
            <ToggleButton
              toggle={toggleSound}
              setToggle={setToggleSound}
              w={32}
              h={16}
            />
          </div>
          <div className="pt-2 flex items-center justify-between w-full">
            <div className="flex items-center gap-3">
              <p>
                <HiOutlineMusicNote size={15} />
              </p>
              <p>Music</p>
            </div>
            <ToggleButton
              toggle={toggleMusic}
              setToggle={setToggleMusic}
              w={8}
              h={4}
            />
          </div>
          <div className="pt-2 flex items-center justify-between w-full">
            <button
              onClick={() => setIsModalOpenForGameRules(true)}
              className="flex w-full items-center gap-3"
            >
              <p>
                <TfiWrite size={15} />
              </p>
              <p>Games rules</p>
            </button>
          </div>
          <div className="pt-2 flex items-center justify-between w-full">
            <button
              onClick={() => setIsModalOpenForBetHistory(true)}
              className="flex w-full items-center gap-3"
            >
              <p>
                <AiOutlineHistory size={15} />
              </p>
              <p>My bet history</p>
            </button>
          </div>
          <div className="pt-2 flex items-center justify-between w-full">
            <button
              onClick={() => setShowPayinModal(true)}
              className="flex w-full items-center gap-3"
            >
              <IoWalletOutline size={15} />
              <p>Recharge</p>
            </button>
          </div>
          <div className="pt-2 flex items-center justify-between w-full">
            <button
              // onClick={() => setShowPayOutModal(true)}
              onClick={handleWithdraw}
              className="flex w-full items-center gap-3"
            >
              <p>
                <PiHandWithdraw size={15} />
              </p>
              <p>Withdraw</p>
            </button>
          </div>
          {/* Deposit History */}
          <div className="pt-2 flex items-center justify-between w-full">
            <button
              onClick={() => setShowDepositHistory(true)}
              className="flex w-full items-center gap-3"
            >
              <p>
                <IoWalletOutline size={15} />
              </p>
              <p>Deposit History</p>
            </button>
          </div>

          {/* Withdraw History */}
          <div className="pt-2 flex items-center justify-between w-full">
            <button
              onClick={() => setShowWithdrawHistory(true)}
              className="flex w-full items-center gap-3"
            >
              <p>
                <PiHandWithdraw size={15} />
              </p>
              <p>Withdraw History</p>
            </button>
          </div>

          {/* Referral Share */}
          <div className="pt-2 flex items-center justify-between w-full">
            <button
              onClick={() => {
                const shareData = {
                  title: "Play Chicken Road Game",
                  text: "Check out this exciting Chicken Road Game and earn rewards! 🐔🔥",
                  url: referral_url, // Replace this with your actual app/game link
                };

                if (navigator.share) {
                  navigator
                    .share(shareData)
                    .catch((error) => console.error("Sharing failed:", error));
                } else {
                  // Fallback: copy to clipboard
                  navigator.clipboard.writeText(shareData.url);
                  alert("Link copied to clipboard!");
                }
              }}
              className="flex w-full items-center gap-3"
            >
              <p>
                <TfiWrite size={15} />
              </p>
              <p>Referral</p>
            </button>
          </div>

          <div className="pt-2 flex items-center justify-between w-full">
            <button
              onClick={handleLogout}
              className="flex w-full items-center gap-3 text-red-400 hover:text-red-300"
            >
              <FiLogOut size={16} />
              <p>Logout</p>
            </button>
          </div>
        </div>
      </div>
      {showPayinModal && (
        <PayinModal
          isOpen={showPayinModal}
          onClose={() => setShowPayinModal(false)}
        />
      )}
      {showPayOutModal && (
        <PayOutModal
          isOpen={showPayOutModal}
          onClose={() => setShowPayOutModal(false)}
        />
      )}
      {showAvatarModal && (
        <ChangeAvatarModal
          onClose={() => setShowAvatarModal(false)}
          onSelect={(selectedAvatar) => {
            // Optional: update avatar in backend or local state
            // console.log("Selected Avatar:", selectedAvatar);
          }}
          setProfileRefresher={setProfileRefresher}
        />
      )}
      {showFirstWithdrawPopup && (
        <FirstWithdrawPopup
          isOpen={showFirstWithdrawPopup}
          onClose={() => setShowFirstWithdrawPopup(false)}
        />
      )}
      {showDepositHistory && (
        <YourDepositHistoryModal
          isOpen={showDepositHistory}
          title="My deposit history"
          onClose={() => setShowDepositHistory(false)}
        />
      )}

      {showWithdrawHistory && (
        <YourWithdrawHistoryModal
          isOpen={showWithdrawHistory}
          title="My withdraw history"
          onClose={() => setShowWithdrawHistory(false)}
        />
      )}

      {/* {showLogin && (

      )} */}
      <Login isOpen={showModalLogin} onClose={() => setShowModalLogin(false)} />
    </div>
  );
}

export default MenuListModal;
