

import React, { useEffect } from "react";
import { currency } from "../utils/keys";
import { motion } from "framer-motion";

const WinAmountModal = ({ amount, onClose, gameOver = false }) => {
  useEffect(() => {
    const timeout = setTimeout(() => {
      onClose();
    }, 2000);
    return () => clearTimeout(timeout);
  }, []);

  // Custom bounce-in effect based on your video
  const scaleBounce = [
    1.0, 0.978, 0.947, 0.912, 0.875, 0.839, 0.805, 0.777, 0.755, 0.739, 0.729,
    0.726, 0.728, 0.734, 0.744, 0.756, 0.769, 0.782, 0.794, 0.805, 0.815, 0.823,
    0.83, 0.835, 0.839, 0.842, 0.844, 0.845, 0.846, 0.846, 0.846, 0.846, 0.845,
    0.844, 0.843, 0.841, 0.839, 0.837, 0.835, 0.832, 0.83, 0.827, 0.824, 0.821,
    0.818, 0.816, 0.813, 0.81, 0.808, 0.805,
  ];
  const yBounce = [
    -20.0, -17.8, -14.7, -11.2, -7.5, -3.9, -0.5, 2.3, 4.5, 6.1, 7.1, 7.4, 7.2,
    6.6, 5.6, 4.4, 3.1, 1.8, 0.6, -0.5, -1.4, -2.1, -2.6, -3.0, -3.2, -3.3,
    -3.2, -3.0, -2.7, -2.3, -1.8, -1.3, -0.7, -0.2, 0.3, 0.7, 1.1, 1.4, 1.6,
    1.7, 1.8, 1.8, 1.7, 1.6, 1.4, 1.2, 0.9, 0.6, 0.3, 0.0,
  ];

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center">
      <motion.div
        initial={{ rotate: 0, opacity: 0, scale: 0.9 }}
        animate={{
          rotate: [-30, 0, 30, 0],
          opacity: 1,
          scale: 1,
        }}
        transition={{
          duration: 1.2,
          ease: "easeInOut",
          times: [0, 0.3, 0.7, 1],
        }}
        className="bg-white/10 text-white rounded-xl shadow-xl p-5 w-56 h-56 flex flex-col items-center justify-center border border-white/20 text-center"
      >
        <h2 className="text-2xl font-bold">
          {gameOver ? "You Won! Game Over" : "You Won!"}
        </h2>
        <p className="text-3xl font-bold mt-2">
          {currency} {amount}
        </p>
      </motion.div>
    </div>
  );
};

export default WinAmountModal;


