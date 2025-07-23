
import React, { useState, useEffect } from "react";
import { FaTimes } from "react-icons/fa";
import { currency } from "../utils/keys";
import useApi from "../hooks/useApi";
import { apis } from "../utils/apis";

const YourWithdrawHistoryModal = ({ title, onClose }) => {
  const [history, setHistory] = useState([]);
  const { get } = useApi();
  const userid = localStorage.getItem("userid");

  const fetchData = async () => {
    try {
      const res = await get(`${apis?.withdraw_history}${userid}`);
      setHistory(res?.data?.data || []);
    } catch (error) {
      console.error("Error fetching withdraw history:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const getStatusLabel = (status) => {
    switch (status) {
      case 0:
        return <span className="text-yellow-400">Pending</span>;
      case 1:
        return <span className="text-green-400">Approved</span>;
      case 2:
        return <span className="text-red-400">Rejected</span>;
      default:
        return <span className="text-gray-300">Unknown</span>;
    }
  };

  return (
    <div className="fixed inset-0 bg-black/30 z-50 flex justify-center items-center">
      <div className="bg-[#3A3D51] w-[90%] max-w-xl rounded-xl relative shadow-xl">
        {/* Header */}
        <div className="flex justify-between items-center p-6">
          <h2 className="text-lg font-semibold text-white">{title}</h2>
          <button onClick={onClose}>
            <FaTimes className="text-white text-xl" />
          </button>
        </div>

        {/* Table Header */}
        <div className="grid grid-cols-3 px-6 text-sm text-gray-300 pb-2">
          <div>Date</div>
          <div>Amount</div>
          <div>Status</div>
        </div>

        {/* Table Rows */}
        <div className="max-h-64 overflow-y-auto scrollbar-thin scrollbar-thumb-yellow-400 scrollbar-track-transparent px-4">
          {history.length > 0 ? (
            history.map((item, index) => (
              <div
                key={index}
                className="grid grid-cols-3 items-center bg-[#44475A] rounded-md text-white py-2 px-2 my-2 text-xs"
              >
                <div>{item.created_at}</div>
                <div className="flex items-center gap-1">
                  {currency}
                  <span>{item.amount}</span>
                </div>
                <div>{getStatusLabel(item.status)}</div>
              </div>
            ))
          ) : (
            <p className="text-white text-center py-4">
              No withdraw history found.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default YourWithdrawHistoryModal;
