


import { div } from "framer-motion/client";
import { useEffect, useRef, useState } from "react";
import { currency } from "../utils/keys";
import { IoIosArrowDown } from "react-icons/io";
import useApi from "../hooks/useApi";
import { apis } from "../utils/apis";
import { toast } from "react-toastify";

const GameControlPanel = ({
  setProfileRefresher,
  profileRefresher,
  onPlay,
  score,
  showScore,
  setDifficulty,
  difficulty,
  setDifficultyArray,
  difficultyArray,
  setActiveDifficulty,
  activeDifficulty,
  currentAmount,
  setCurrentAmount,
  finalValue,
  gameStarted,
  restartGame,
  setIslastSecondSegment,
  islastSecondSegment,
  cashoutHandlerByButton,
  setShowLoginModal,
  setIsProcessingFragment,
  isProcessingFragment,
}) => {
  // const [selectedAmount, setSelectedAmount] = useState(1);
  const [selectedAmount, setSelectedAmount] = useState(null);

  const { get, post, put, del, loading, error } = useApi();
  const [activeTab, setActiveTab] = useState({ type: 1 });
  const [showModal, setShowModal] = useState(false);
  const containerRef = useRef(null);
  const [modalStyle, setModalStyle] = useState({});
  const [goButtonCooldown, setGoButtonCooldown] = useState(false);
  const userid = localStorage.getItem("userid");

  // const amountOptions = [10, 20, 50, 100];
  const [amountOptions, setAmountOptions] = useState([]);

  const fetchAmountOptions=async()=>{
    try {
      
      const response = await get(apis.bet_value);
      console.log("res of amount options:",response.data.data)
      const data = response?.data?.data;
      if (Array.isArray(data)) {
        const values = data.map((item) => item.value); // Extract just the `value`
        setAmountOptions(values); // Save to state
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(()=>{
    fetchAmountOptions()
  },[])

  const handleMin = () => {
    setCurrentAmount(minMaxValues.min);
    setSelectedAmount(null);
  };

  const handleMax = () => {
    setCurrentAmount(minMaxValues.max);
    setSelectedAmount(null);
  };
  

  const handleAmountClick = (amt) => {
    setSelectedAmount(amt);
    setCurrentAmount(amt);
  };

  const handleDifficultyChange = (level) => {
    setActiveTab(level);
    setDifficultyArray(level);
    setActiveDifficulty(level?.type);
  };

  useEffect(() => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      setModalStyle({
        position: "absolute",
        top: `${rect.top - 50}px`,
        left: `${rect.left}px`,
        width: `${rect.width}px`,
        zIndex: 50,
      });
    }
  }, [showModal]);

  const getMultiplier = () => {
    get(`${apis?.chickenMultplier}`)
      .then((res) => {
        if (res?.data?.success === true) {
          setDifficulty(res?.data?.data);
          setDifficultyArray(res?.data?.data[0]);
        }
      })
      .catch(console.error);
  };

  useEffect(() => {
    getMultiplier();
  }, []);

  const bethandler = async() => {
    // ✅ Check for userid before anything else
    if (!userid) {
      toast?.warn("Please log in first.");
      setShowLoginModal(true);
      return;
    }

      // ✅ Get wallet balance before playing
  try {
    const res = await get(`${apis?.profile}${userid}`)
    // console.log("res for play check:", typeof res.data.profile.amount);
    // const balance = res.data.profile.amount;
    const balance = parseFloat(res.data.profile.amount);
    console.log("current amount:", typeof balance);
    const amountToPlay = parseFloat(currentAmount);
    console.log("current amount:", typeof amountToPlay);
    if (amountToPlay > balance) {
      toast?.error("Insufficient wallet balance.");
      return;
    }
  } catch (err) {
    // console.error("Error fetching balance:", err);
    toast?.error("Could not verify balance. Try again.");
    return;
  }

  // payload
    const payload = {
      user_id: userid,
      game_id: 19,
      amount: currentAmount,
    };

    setIsProcessingFragment(true);
    setGoButtonCooldown(true); // disable go button for 2 sec

    setTimeout(() => {
      onPlay();
      // console.log("payload:", payload);
      post(`${apis?.chickenbet}`, payload)
        .then((res) => {
          if (res?.data?.success === true) {
            // console.log("res for payload cash out:",res.data)
            setProfileRefresher(true);
            onPlay();
          }
        })
        .catch(console.error);

      setGoButtonCooldown(false); // enable go button
    }, 500);
  };

  const [minMaxValues, setMinMaxValues] = useState({ min: 1, max: 150 });
   
  const values = async () => {
    try {
      const res = await get(`${apis?.gameRule_request}`);
      const data = res?.data?.data;

      if (data) {
        setMinMaxValues({
          min: data.min_bet_amount,
          max: data.max_bet_amount,
        });

        setSelectedAmount(data.min_bet_amount);
        setCurrentAmount(data.min_bet_amount);
      }
    } catch (error) {
      console.log(error);
    }
  };
  
  useEffect(()=>{
    values()
  },[])
  // values()
  return (
    <div className="bg-mainBetBg p-2 lg:px-8 lg:py-10  w-full ">
      <div className="md:flex items-center justify-between bg-[#393c52] border-accent/10 border-2 h-full rounded-2xl p-1 md:p-3 lg:p-5 gap-2 lg:gap-4 2xl:gap-6 w-full">
        <div className="w-full z-40 md:w-[25%] flex items-center justify-between flex-col gap-1 h-[10%]">
          <div className="flex z-40 shadow-2xl items-center gap-1 bg-[#4E5063] w-full h-full px-2 py-1 rounded-lg text-white justify-between">
            <button
              onClick={handleMin}
              disabled={gameStarted}
              className="bg-[#606172] z-50 px-2 py-0 shadow-2xl rounded cursor-pointer"
            >
              MIN
            </button>
            {/* <span>
              {currency}
              {currentAmount}
            </span> */}
            <input
              type="text"
              value={currentAmount}
              onChange={(e) => {
                const onlyDigits = e.target.value.replace(/\D/g, ""); // allow only digits
                const numeric = Number(onlyDigits);

                if (numeric <= minMaxValues.max) {
                  setCurrentAmount(onlyDigits); // update state
                  setSelectedAmount(null); // deselect quick buttons
                }
              }}
              className="bg-transparent text-white text-center w-full outline-none"
            />

            <button
              onClick={handleMax}
              disabled={gameStarted}
              className="bg-[#606172] z-50 px-2 py-0 rounded shadow-2xl cursor-pointer"
            >
              MAX
            </button>
          </div>

          <div className="flex z-40 gap-4 md:gap-2 shadow-2xl 2xl:gap-4 w-full text-[12px] 2xl:text-sm">
            {amountOptions.map((amt, i) => (
              <button
                key={amt}
                disabled={gameStarted}
                onClick={() => handleAmountClick(amt)}
                className={`flex z-50 items-center shadow-2xl justify-center py-1 gap-2 md:gap-1 ${
                  i === 0 ? "w-[35%] 2xl:w-[37%]" : "w-[32%] 2xl:w-[21%]"
                } py-1 rounded-lg text-white transition-all ${
                  selectedAmount === amt ? "bg-[#52b8d9]" : "bg-[#4D5062]"
                }`}
              >
                <span className="w-4 h-4 2xl:w-5 2xl:h-5 bg-white text-black rounded-full flex items-center justify-center">
                  {currency}
                </span>
                {amt}
              </button>
            ))}
          </div>
        </div>

        <div className="w-full md:w-[50%] mt-1 md:mt-0 flex flex-col gap-14 h-full justify-between">
          <div className="md:flex hidden text-[12px] sm:text-sm text-gray-300 w-full items-start justify-between">
            <p>Difficulty</p>
            <p>Chance of Collision</p>
          </div>
          <div className="hidden md:flex bg-grayBgMain rounded-lg overflow-hidden p-1 py-0">
            {difficulty?.length > 0 &&
              difficulty.map((level) => (
                <button
                  key={level?.type}
                  disabled={gameStarted}
                  onClick={() => handleDifficultyChange(level)}
                  className={`w-full py-1 text-sm font-semibold transition-colors rounded-md ${
                    activeTab?.type === level?.type
                      ? "text-white bg-[#5F6171]"
                      : "text-gray-400"
                  }`}
                >
                  {level?.type === 1
                    ? "Easy"
                    : level?.type === 2
                    ? "Medium"
                    : level?.type === 3
                    ? "Hard"
                    : level?.type === 4
                    ? "Hardcore"
                    : ""}
                </button>
              ))}
          </div>

          {showModal && (
            <div
              style={modalStyle}
              className="bg-grayBgMain -mt-32 rounded-lg overflow-hidden p-1 shadow-lg"
            >
              <div className="flex flex-col gap-2">
                {difficulty?.length > 0 &&
                  difficulty?.map((level) => (
                    <button
                      key={level}
                      disabled={gameStarted}
                      onClick={() => {
                        handleDifficultyChange(level);
                        setShowModal(false);
                      }}
                      className={`w-full py-1 text-sm text-start px-2 font-semibold transition-colors rounded-md ${
                        activeTab?.type === level?.type
                          ? "text-white bg-[#5F6171]"
                          : "text-gray-400"
                      }`}
                    >
                      {level?.type === 1
                        ? "Easy"
                        : level?.type === 2
                        ? "Medium"
                        : level?.type === 3
                        ? "Hard"
                        : level?.type === 4
                        ? "Hardcore"
                        : ""}
                    </button>
                  ))}
              </div>
            </div>
          )}

          <button
            onClick={() => setShowModal(!showModal)}
            ref={containerRef}
            className="flex h-5 items-center justify-between text-white md:hidden bg-grayBgMain rounded-lg overflow-hidden px-2"
          >
            <p>
              {activeTab?.type === 1
                ? "Easy"
                : activeTab?.type === 2
                ? "Medium"
                : activeTab?.type === 3
                ? "Hard"
                : activeTab?.type === 4
                ? "Hardcore"
                : ""}
            </p>
            <p>
              <IoIosArrowDown />
            </p>
          </button>
        </div>

        <div
          className={`w-full ${
            gameStarted ? "gap-2" : "gap-0"
          } flex md:flex-none md:w-[25%]`}
        >
          {gameStarted && (
            <button
              onClick={cashoutHandlerByButton}
              className="w-full bg-yellow-500 text-black font-bold text-[20px] px-1 mt-1 md:mt-0 md:py-9 shadow-lg py-3 rounded-2xl text-center cursor-pointer"
            >
              CASH OUT <br />
              {currency} {finalValue}
            </button>
          )}
          {gameStarted ? (
            <button
              onClick={() => {
                if (!goButtonCooldown) {
                  setGoButtonCooldown(true);
                  onPlay();
                  setTimeout(() => {
                    setGoButtonCooldown(false);
                  }, 1000);
                }
              }}
              disabled={isProcessingFragment || goButtonCooldown}
              className={`w-full text-black font-bold rounded-2xl text-xl py-3 md:py-9 mt-1 md:mt-0 shadow-2xl text-center cursor-pointer transition-all duration-300 ${
                isProcessingFragment || goButtonCooldown
                  ? "bg-green-600 opacity-70 cursor-not-allowed"
                  : "bg-green-500 hover:bg-green-600"
              }`}
            >
              {goButtonCooldown || isProcessingFragment ? "Go" : "Go"}
            </button>
          ) : (
            <button
              onClick={bethandler}
              className="w-full bg-green-500 hover:bg-green-600 text-white font-extrabold text-xl px-1 mt-3 md:mt-0 md:py-12 shadow-2xl py-3 rounded-2xl text-center cursor-pointer"
            >
              Play
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default GameControlPanel;


// import { useEffect, useRef, useState } from "react";
// import { currency } from "../utils/keys";
// import { IoIosArrowDown } from "react-icons/io";
// import useApi from "../hooks/useApi";
// import { apis } from "../utils/apis";
// import { toast } from "react-toastify";

// const GameControlPanel = ({
//   setProfileRefresher,
//   profileRefresher,
//   onPlay,
//   score,
//   showScore,
//   setDifficulty,
//   difficulty,
//   setDifficultyArray,
//   difficultyArray,
//   setActiveDifficulty,
//   activeDifficulty,
//   currentAmount,
//   setCurrentAmount,
//   finalValue,
//   gameStarted,
//   restartGame,
//   setIslastSecondSegment,
//   islastSecondSegment,
//   cashoutHandlerByButton,
//   setShowLoginModal,
//   setIsProcessingFragment,
//   isProcessingFragment,
// }) => {
//   // const [selectedAmount, setSelectedAmount] = useState(1);
//   const [selectedAmount, setSelectedAmount] = useState(null);

//   const { get, post, put, del, loading, error } = useApi();
//   const [activeTab, setActiveTab] = useState({ type: 1 });
//   const [showModal, setShowModal] = useState(false);
//   const containerRef = useRef(null);
//   const [modalStyle, setModalStyle] = useState({});
//   const [goButtonCooldown, setGoButtonCooldown] = useState(false);
//   const [userBalance, setUserBalance] = useState(0);

//   const userid = localStorage.getItem("userid");

//   const amountOptions = [10, 20, 50, 100];

//   const handleMin = () => {
//     setCurrentAmount(minMaxValues.min);
//     setSelectedAmount(null);
//   };

//   const handleMax = () => {
//     setCurrentAmount(minMaxValues.max);
//     setSelectedAmount(null);
//   };
  

//   const handleAmountClick = (amt) => {
//     setSelectedAmount(amt);
//     setCurrentAmount(amt);
//   };

//   const handleDifficultyChange = (level) => {
//     setActiveTab(level);
//     setDifficultyArray(level);
//     setActiveDifficulty(level?.type);
//   };

//   useEffect(() => {
//     if (containerRef.current) {
//       const rect = containerRef.current.getBoundingClientRect();
//       setModalStyle({
//         position: "absolute",
//         top: `${rect.top - 50}px`,
//         left: `${rect.left}px`,
//         width: `${rect.width}px`,
//         zIndex: 50,
//       });
//     }
//   }, [showModal]);

//   const getMultiplier = () => {
//     get(`${apis?.chickenMultplier}`)
//       .then((res) => {
//         if (res?.data?.success === true) {
//           setDifficulty(res?.data?.data);
//           setDifficultyArray(res?.data?.data[0]);
//         }
//       })
//       .catch(console.error);
//   };

//   useEffect(() => {
//     getMultiplier();
//   }, []);

//   const getUserBalance = async () => {
//     try {
//       const res = await get(`${apis?.profile}${userid}`);
//       if (res?.data?.status) {
//         const balance = res.data?.profile?.amount;
//         setUserBalance(balance || 0);
//       }
//     } catch (err) {
//       console.error("Error fetching user balance", err);
//     }
//   };

//   useEffect(() => {
//     if (userid) getUserBalance();
//   }, []);
  
//   const bethandler = () => {
//     // ✅ Check for userid before anything else
//     if (!userid) {
//       toast?.warn("Please log in first.");
//       setShowLoginModal(true);
//       return;
//     }

//     // ❌ Insufficient balance check
//     if (currentAmount >= userBalance) {
//       toast.error("Insufficient balance to place this bet.");
//       return;
//     }

//     const payload = {
//       user_id: userid,
//       game_id: 19,
//       amount: currentAmount,
//     };

//     setIsProcessingFragment(true);
//     setGoButtonCooldown(true); // disable go button for 2 sec

//     setTimeout(() => {
//       onPlay();
//       console.log("payload:", payload);
//       post(`${apis?.chickenbet}`, payload)
//         .then((res) => {
//           if (res?.data?.success === true) {
//             console.log("res for payload cash out:", res.data);
//             setProfileRefresher(true);
//             getUserBalance(); // refresh balance after bet
//             onPlay();
//           }
//         })
//         .catch(console.error);

//       setGoButtonCooldown(false); // enable go button
//     }, 500);
//   };

//   const [minMaxValues, setMinMaxValues] = useState({ min: 1, max: 150 });
   
//   const values = async () => {
//     try {
//       const res = await get(`${apis?.gameRule_request}`);
//       const data = res?.data?.data;

//       if (data) {
//         setMinMaxValues({
//           min: data.min_bet_amount,
//           max: data.max_bet_amount,
//         });

//         setSelectedAmount(data.min_bet_amount);
//         setCurrentAmount(data.min_bet_amount);
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };
  
//   useEffect(()=>{
//     values()
//   },[])
//   // values()
//   return (
//     <div className="bg-mainBetBg p-2 lg:px-8 lg:py-10  w-full ">
//       <div className="md:flex items-center justify-between bg-[#393c52] border-accent/10 border-2 h-full rounded-2xl p-1 md:p-3 lg:p-5 gap-2 lg:gap-4 2xl:gap-6 w-full">
//         <div className="w-full z-40 md:w-[25%] flex items-center justify-between flex-col gap-1 h-[10%]">
//           <div className="flex z-40 shadow-2xl items-center gap-1 bg-[#4E5063] w-full h-full px-2 py-1 rounded-lg text-white justify-between">
//             <button
//               onClick={handleMin}
//               disabled={gameStarted}
//               className="bg-[#606172] z-50 px-2 py-0 shadow-2xl rounded cursor-pointer"
//             >
//               MIN
//             </button>
//             <span>
//               {currency}
//               {currentAmount}
//             </span>
//             <button
//               onClick={handleMax}
//               disabled={gameStarted}
//               className="bg-[#606172] z-50 px-2 py-0 rounded shadow-2xl cursor-pointer"
//             >
//               MAX
//             </button>
//           </div>

//           <div className="flex z-40 gap-4 md:gap-2 shadow-2xl 2xl:gap-4 w-full text-[12px] 2xl:text-sm">
//             {amountOptions.map((amt, i) => (
//               <button
//                 key={amt}
//                 disabled={gameStarted}
//                 onClick={() => handleAmountClick(amt)}
//                 className={`flex z-50 items-center shadow-2xl justify-center py-1 gap-2 md:gap-1 ${
//                   i === 0 ? "w-[35%] 2xl:w-[37%]" : "w-[32%] 2xl:w-[21%]"
//                 } py-1 rounded-lg text-white transition-all ${
//                   selectedAmount === amt ? "bg-[#52b8d9]" : "bg-[#4D5062]"
//                 }`}
//               >
//                 <span className="w-4 h-4 2xl:w-5 2xl:h-5 bg-white text-black rounded-full flex items-center justify-center">
//                   {currency}
//                 </span>
//                 {amt}
//               </button>
//             ))}
//           </div>
//         </div>

//         <div className="w-full md:w-[50%] mt-1 md:mt-0 flex flex-col gap-14 h-full justify-between">
//           <div className="md:flex hidden text-[12px] sm:text-sm text-gray-300 w-full items-start justify-between">
//             <p>Difficulty</p>
//             <p>Chance of Collision</p>
//           </div>
//           <div className="hidden md:flex bg-grayBgMain rounded-lg overflow-hidden p-1 py-0">
//             {difficulty?.length > 0 &&
//               difficulty.map((level) => (
//                 <button
//                   key={level?.type}
//                   disabled={gameStarted}
//                   onClick={() => handleDifficultyChange(level)}
//                   className={`w-full py-1 text-sm font-semibold transition-colors rounded-md ${
//                     activeTab?.type === level?.type
//                       ? "text-white bg-[#5F6171]"
//                       : "text-gray-400"
//                   }`}
//                 >
//                   {level?.type === 1
//                     ? "Easy"
//                     : level?.type === 2
//                     ? "Medium"
//                     : level?.type === 3
//                     ? "Hard"
//                     : level?.type === 4
//                     ? "Hardcore"
//                     : ""}
//                 </button>
//               ))}
//           </div>

//           {showModal && (
//             <div
//               style={modalStyle}
//               className="bg-grayBgMain -mt-32 rounded-lg overflow-hidden p-1 shadow-lg"
//             >
//               <div className="flex flex-col gap-2">
//                 {difficulty?.length > 0 &&
//                   difficulty?.map((level) => (
//                     <button
//                       key={level}
//                       disabled={gameStarted}
//                       onClick={() => {
//                         handleDifficultyChange(level);
//                         setShowModal(false);
//                       }}
//                       className={`w-full py-1 text-sm text-start px-2 font-semibold transition-colors rounded-md ${
//                         activeTab?.type === level?.type
//                           ? "text-white bg-[#5F6171]"
//                           : "text-gray-400"
//                       }`}
//                     >
//                       {level?.type === 1
//                         ? "Easy"
//                         : level?.type === 2
//                         ? "Medium"
//                         : level?.type === 3
//                         ? "Hard"
//                         : level?.type === 4
//                         ? "Hardcore"
//                         : ""}
//                     </button>
//                   ))}
//               </div>
//             </div>
//           )}

//           <button
//             onClick={() => setShowModal(!showModal)}
//             ref={containerRef}
//             className="flex h-5 items-center justify-between text-white md:hidden bg-grayBgMain rounded-lg overflow-hidden px-2"
//           >
//             <p>
//               {activeTab?.type === 1
//                 ? "Easy"
//                 : activeTab?.type === 2
//                 ? "Medium"
//                 : activeTab?.type === 3
//                 ? "Hard"
//                 : activeTab?.type === 4
//                 ? "Hardcore"
//                 : ""}
//             </p>
//             <p>
//               <IoIosArrowDown />
//             </p>
//           </button>
//         </div>

//         <div
//           className={`w-full ${
//             gameStarted ? "gap-2" : "gap-0"
//           } flex md:flex-none md:w-[25%]`}
//         >
//           {gameStarted && (
//             <button
//               onClick={cashoutHandlerByButton}
//               className="w-full bg-yellow-500 text-black font-bold text-[20px] px-1 mt-1 md:mt-0 md:py-9 shadow-lg py-3 rounded-2xl text-center cursor-pointer"
//             >
//               CASH OUT <br />
//               {currency} {finalValue}
//             </button>
//           )}
//           {gameStarted ? (
//             <button
//               onClick={() => {
//                 if (!goButtonCooldown) {
//                   setGoButtonCooldown(true);
//                   onPlay();
//                   setTimeout(() => {
//                     setGoButtonCooldown(false);
//                   }, 1000);
//                 }
//               }}
//               disabled={isProcessingFragment || goButtonCooldown}
//               className={`w-full text-black font-bold rounded-2xl text-xl py-3 md:py-9 mt-1 md:mt-0 shadow-2xl text-center cursor-pointer transition-all duration-300 ${
//                 isProcessingFragment || goButtonCooldown
//                   ? "bg-green-600 opacity-70 cursor-not-allowed"
//                   : "bg-green-500 hover:bg-green-600"
//               }`}
//             >
//               {goButtonCooldown || isProcessingFragment ? "Go" : "Go"}
//             </button>
//           ) : (
//             <button
//               onClick={bethandler}
//               className="w-full bg-green-500 hover:bg-green-600 text-white font-extrabold text-xl px-1 mt-3 md:mt-0 md:py-12 shadow-2xl py-3 rounded-2xl text-center cursor-pointer"
//             >
//               Play
//             </button>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default GameControlPanel;