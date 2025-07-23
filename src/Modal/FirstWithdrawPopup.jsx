
import React,{useEffect, useState} from "react";
import { FaTimes } from "react-icons/fa";
import { apis } from "../utils/apis";
import useApi from "../hooks/useApi";

export default function FirstWithdrawPopup({
  isOpen,
  onClose,
  setProfileRefresher,
}) {
  const { get } = useApi();
  const userid = localStorage.getItem("userid");
  const [rechargeVlaue, setRechargeVlaue] = useState("")

  if (!isOpen) return null; // Do not render if modal is not open

  const profileHandler = () => {
    get(`${apis?.profile}${userid}`)
      .then((res) => {
        // console.log("response profile", res);
        if (res?.data?.status === true) {
          if (typeof setProfileRefresher === "function") {
            setProfileRefresher(true);
          }
          onClose(); // close modal
        }
      })
      .catch(console.error);
  };

   const values = async () => {
      try {
        const res = await get(`${apis?.gameRule_request}`);
        const data = res?.data?.data;
        // console.log("res for first recharge:", res.data.data.min_recharge);
        setRechargeVlaue(res.data.data.min_recharge);
      } catch (error) {
        console.log(error);
      }
    };
    
    useEffect(()=>{
      values()
    },[])

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center px-4">
      <div className="relative bg-[#25283D] w-full max-w-80 rounded-2xl shadow-2xl p-6 text-white">
        {/* Close button */}
        <button
          className="absolute top-2 right-4 text-gray-300 hover:text-red-400 transition cursor-pointer"
          onClick={onClose}
        >
          <FaTimes size={20} />
        </button>

        <h2 className="text-xl font-bold text-center mb-4">Withdrawal</h2>

        <p className="text-sm text-center mb-6">
          FOR WITHDRAWAL ACCESS DEPOSIT {rechargeVlaue} RUPEES ONE TIME.
        </p>
        <p className="text-sm text-center mb-6">
          {/* FOR WITHDRAWAL ACCESS DEPOSIT {rechargeVlaue} RUPEES ONE TIME. */}
          निकासी हेतु {rechargeVlaue} रुपए एक बार जमा करें।
        </p>

        <button
          onClick={profileHandler}
          className="w-full bg-gradient-to-r from-green-500 to-emerald-600 py-2 rounded-lg font-bold hover:from-green-600 hover:to-emerald-700"
        >
          OK
        </button>
      </div>
    </div>
  );
}
