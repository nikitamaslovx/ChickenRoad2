import React, {useEffect,useState} from 'react';
import { currency } from '../utils/keys';
import { apis } from "../utils/apis";
import useApi from "../hooks/useApi";

const GameRulesModal = ({ onClose }) => {
  const { get } = useApi();
  const [minBet, setMinBet] = useState("")
  const [maxBet, setMaxBet] = useState("")
  const [maxWin, setMaxWin] = useState("")
  const [minWin, setMinWin] = useState("")
     const values = async () => {
        try {
          const res = await get(`${apis?.gameRule_request}`);
          const data = res?.data?.data;
          // console.log("res for game rule:", res.data.data);
          // console.log("res for game rule:", res.data.data.min_bet_amount);
          // console.log("res for game rule:", res.data.data.max_bet_amount);
          setMinBet(res.data.data.min_bet_amount);
          setMaxBet(res.data.data.max_bet_amount);
          setMaxWin(res.data.data.max_win);
          setMinWin(res.data.data.min_win);
          // setRechargeVlaue(res.data.data.min_recharge);
        } catch (error) {
          console.log(error);
        }
      };
      
      useEffect(()=>{
        values()
      },[])
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
      <div className="bg-[#3A3D51] border-accent/10 border-2 min-w-96 z-100 p-6 rounded-xl relative text-white shadow-xl">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white text-xl hover:text-yellow-400"
        >
          &times;
        </button>

        {/* Title */}
        <h2 className="text-lg font-semibold mb-1">Game rules</h2>
        <p className="text-[12px] text-gray-400 mb-6">
          Bet limits are presented below
        </p>

        {/* Rule Rows */}
        <div className="space-y-3">
          <div className="flex justify-between items-center bg-[#4E5163] px-4 py-1.5 rounded-lg">
            <span className="text-[15px] text-white">Min bet:</span>
            <span className="text-[15px] font-semibold text-white">
              {currency}
              {minBet}
            </span>
          </div>
          <div className="flex justify-between items-center bg-[#4E5163] px-4 py-1.5 rounded-lg">
            <span className="text-[15px] text-white">Max bet:</span>
            <span className="text-[15px] font-semibold text-white">
              {currency}
              {maxBet}
            </span>
          </div>
          <div className="flex justify-between items-center bg-[#4E5163] px-4 py-1.5 rounded-lg">
            <span className="text-[15px] text-white">Min win:</span>
            <span className="text-[15px] font-semibold text-white">
              {currency}
              {minWin}
            </span>
          </div>
          <div className="flex justify-between items-center bg-[#4E5163] px-4 py-1.5 rounded-lg">
            <span className="text-[15px] text-white">Max win:</span>
            <span className="text-[15px] font-semibold text-white">
              {currency}
              {maxWin}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameRulesModal;
