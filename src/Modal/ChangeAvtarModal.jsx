
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import useApi from "../hooks/useApi";
import { apis } from "../utils/apis";
import { IoMdCheckmark } from "react-icons/io";

const ChangeAvatarModal = ({ onClose, onSelect, setProfileRefresher }) => {
  const [avatars, setAvatars] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const userid = localStorage.getItem("userid");

  const { get } = useApi();

  const fetchData = async () => {
    try {
      const res = await get(`${apis?.avatar_request}`);
      const data = res?.data?.data || [];
      setAvatars(data);

      // Automatically highlight previously selected avatar
      const currentAvatarId = localStorage.getItem("selected_avatar_id");
      if (currentAvatarId) {
        setSelectedId(parseInt(currentAvatarId));
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const profileHandler = () => {
    get(`${apis?.profile}${userid}`)
      .then((res) => {
        // console.log("response profile", res);
        if (res?.data?.status === true) {
          // console.log("profile api close");
          if (typeof setProfileRefresher === "function") {
            setProfileRefresher(true);
          }
          onClose();
        }
      })
      .catch(console.error);
  };

  const handleSelect = async (avatar) => {
    setSelectedId(avatar.id);
    // localStorage.setItem("selected_avatar_id", avatar.id);

    // try {
    //   await get(
    //     `${apis?.avatarUpdate_request}${userid}&avatar_id=${avatar.id}`
    //   )
    //   // no auto-close or profile handler here
    // } catch (error) {
    //   console.log(error);
    // }
  };

  const handleSaveAndClose = async () => {
    const selectedAvatar = avatars.find((a) => a.id === selectedId);
    if (onSelect && selectedAvatar) {
      onSelect(selectedAvatar);
    }
    // console.log("avatra id : ", selectedId);
    try {
      const res = await get(
        `${apis?.avatarUpdate_request}${userid}&avatar_id=${selectedId}`
      );
      // console.log("res :", res);
      if (res?.data?.status === true) {
        profileHandler();
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="bg-[#2F2F45] text-white rounded-2xl p-6 w-[360px] max-h-[90vh] overflow-y-auto relative"
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-5 text-white text-xl font-bold hover:text-red-400"
        >
          &times;
        </button>

        <h2 className="text-lg font-semibold mb-5">Change avatar</h2>

        <div className="grid grid-cols-4 gap-4">
          {avatars.map((avatar) => (
            <div
              key={avatar.id}
              className="relative cursor-pointer"
              onClick={() => handleSelect(avatar)}
            >
              <img
                src={avatar.avatars}
                alt="avatar"
                className={`w-16 h-16 rounded-full border-2 ${
                  selectedId === avatar.id
                    ? "border-yellow-400"
                    : "border-transparent"
                }`}
              />
              {selectedId === avatar.id && (
                <div className="absolute -top-1 -right-1 bg-yellow-400 rounded-full p-1">
                  <IoMdCheckmark size={12} className="text-black" />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Save button */}
        <button
          onClick={handleSaveAndClose}
          className="mt-6 w-full bg-green-500 hover:bg-green-600 text-white font-bold py-2 rounded-md"
        >
          SAVE AND CLOSE
        </button>
      </motion.div>
    </div>
  );
};

export default ChangeAvatarModal;


