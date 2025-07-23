// import React, {useEffect} from 'react'
// import Header from '../Component/Header'
// import HomeSlider from './HomeSlider';
// import Announce from "./Announce"
// import PlayNow from './PlayNow';
// import WinningInformation from "./WinningInformation"
// import { useLocation } from "react-router-dom";
// import { toast } from "react-toastify";


// export default function Home() {
//   const location = useLocation();

//   useEffect(() => {
//     if (location.state?.fromProtected) {
//       toast.warning("Login required!");
//     }
//   }, [location.state]);
//   return (
//     <div>
//       <Header />
//       <HomeSlider />
//       <Announce />
//       <PlayNow />
//       <WinningInformation />
//     </div>
//   );
// }

import React, { useEffect, useRef, useState } from "react";
import Header from "../Component/Header";
import HomeSlider from "./HomeSlider";
import Announce from "./Announce";
import PlayNow from "./PlayNow";
import Footer from "./Footer"
import WinningInformation from "./WinningInformation";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import chicken_dead_voice from "../assets/music/chicken_dead_voice.mp3";
import { apis } from "../utils/apis";
import useApi from "../hooks/useApi";
import bg_music from "../assets/music/bg_music.mp3";


export default function Home() {
  const userid = localStorage.getItem("userid");
  const audioRef = useRef(new Audio(chicken_dead_voice));
  const audioRefMusic = useRef(null);
  const [score, setScore] = useState(0);
  const [finalValue, setFinalValue] = useState(0);
  const [resetCoinsTrigger, setResetCoinsTrigger] = useState(0);
  const containerRef = useRef(null);
  const [activeDifficulty, setActiveDifficulty] = useState(1);
  const [difficultyDataArray, setDifficultyArray] = useState([]);
  const [hasMoved, setHasMoved] = useState(false);
  const [currentAmount, setCurrentAmount] = useState(1);
  const [difficultyData, setDifficulty] = useState(1);
  const [gameStarted, setGameStarted] = useState(false);
  const [activeFireIndex, setActiveFireIndex] = useState(null);
  const [islastSecondSegment, setIslastSecondSegment] = useState(false);
  const [cashoutIdByWhenByButton, setCashoutIdByWhenByButton] = useState(null);
  const [toggleSound, setToggleSound] = useState(false);
  const [toggleMusic, setToggleMusic] = useState(true);
  const [showWinModal, setShowWinModal] = useState(false);
  const [profileRefresher, setProfileRefresher] = useState(false);
  const [winAmount, setWinAmount] = useState(0);
  const { get, post, put, del, loading, error } = useApi();
  const isSmallScreen = window.innerWidth <= 500;
  const fragmentWidthVW = isSmallScreen ? 33.33 : 15;
  // chicken sound
  // useEffect(() => {
  //   const audio = audioRef.current;
  //   if (toggleSound) {
  //     audio.currentTime = 0;
  //     audio.play().catch((err) => {
  //       console.error("Failed to play sound:", err);
  //     });
  //     const handleEnded = () => {
  //       setToggleSound(false);
  //     };
  //     audio.addEventListener("ended", handleEnded);
  //     return () => {
  //       audio.removeEventListener("ended", handleEnded);
  //     };
  //   }
  // }, [toggleSound, setToggleSound]);
  // bg music
  useEffect(() => {
    const handleUserInteraction = () => {
      const audio = audioRefMusic.current;
      if (toggleMusic && audio) {
        audio.volume = 0.3;
        audio.play().catch((err) => {
          console.warn("Autoplay was prevented even after interaction:", err);
        });
      }
    };
    document.addEventListener("click", handleUserInteraction, { once: true });
    document.addEventListener("touchstart", handleUserInteraction, {
      once: true,
    });

    return () => {
      document.removeEventListener("click", handleUserInteraction);
      document.removeEventListener("touchstart", handleUserInteraction);
    };
  }, [toggleMusic]);

  useEffect(() => {
    const audio = audioRefMusic.current;
    if (!audio) return;

    if (toggleMusic) {
      if (document.readyState === "complete") {
        audio.play().catch((err) => {
          console.warn("Play failed due to autoplay policy:", err);
        });
      }
    } else {
      audio.pause();
    }
  }, [toggleMusic]);

  const a = difficultyData?.length > 0 && difficultyData[0]?.multiplier?.length;
  const regularFragmentCount =
    difficultyDataArray?.multiplier?.length > 0
      ? difficultyDataArray?.multiplier?.length
      : a;
  const goldenEggFragmentsCount = 1;
  const fragmentCount = regularFragmentCount + goldenEggFragmentsCount;
  const typeOrder = [1, 2, 3, 4];
  const multiplierEntry = Array.isArray(difficultyData)
    ? typeOrder.find((type) =>
        difficultyData.find((item) => item?.type === type)
      )
    : null;

  const multiplier = multiplierEntry || null;

  const handlePlay = () => {
    if (!gameStarted) setGameStarted(true);
    const newScore = score + 1 < fragmentCount ? score + 1 : score;
    const currentMultiplier = getMultiplierByIndex(newScore);
    setCashoutIdByWhenByButton(currentMultiplier);

    const thisStepValue = currentMultiplier
      ? currentAmount * currentMultiplier
      : 0;
    setHasMoved(true);
    setScore(newScore);
    if (activeFireIndex !== newScore) {
      setFinalValue((prevVal) => thisStepValue.toFixed(2));
      setIslastSecondSegment(false);
    }
    if (islastSecondSegment) {
      const lastMultiplier =
        difficultyDataArray?.multiplier[
          difficultyDataArray?.multiplier?.length
        ];
      setFinalValue((prevVal) =>
        (lastMultiplier > 0 ? lastMultiplier : 0).toFixed(2)
      );
      cashoutHandlerWithLastMultiplier(() => {
        restartGame();
      });
    }
    if (score >= 1) {
      setTimeout(() => {
        if (containerRef.current) {
          const vw = window.innerWidth / 100;
          containerRef.current.scrollTo({
            left: containerRef.current.scrollLeft + fragmentWidthVW * vw,
            behavior: "smooth",
          });
        }
      }, 50);
    }
  };

  const getMultiplierByIndex = (i) => {
    let base =
      difficultyDataArray?.multiplier?.length > 0
        ? difficultyDataArray?.multiplier[i - 1]
        : [];
    return i >= 1 ? parseFloat(base) : null;
  };

  const [dinoLandedIndex, setDinoLandedIndex] = useState(null);
  const restartGame = () => {
    setDinoLandedIndex(null);
    setIslastSecondSegment(false);
    setScore(0);
    setFinalValue(0);
    if (containerRef.current) {
      containerRef.current.scrollTo({
        left: 0,
        behavior: "smooth",
      });
    }
    setGameStarted(false);
    setHasMoved(false);
    setResetCoinsTrigger((prev) => prev + 1);
  };
  const cashoutHandlerByButton = async () => {
    const payload = {
      userid: userid,
      game_id: 19,
      multiplier_id: cashoutIdByWhenByButton,
    };
    // console.log("cashout payload", payload);
    try {
      const res = await post(`${apis?.chickenCashout}`, payload);
      // console.log("response cashout", res);
      if (res?.data?.status === true) {
        setProfileRefresher(true);
        // setWinAmount(res?.data?.win_amount);
        setWinAmount(Number(res?.data?.win_amount).toFixed(2));
        setShowWinModal(true);
        restartGame();
      } else {
        toast?.error(res?.data?.message || "Cashout failed.");
      }
    } catch (error) {
      console.error("❌ Cashout error:", error);
      toast?.error("Something went wrong with cashout.");
    }
  };

  const cashoutHandlerWithLastMultiplier = (onSuccessCallback) => {
    const payload = {
      userid: userid,
      game_id: 1,
      multiplier_id:
        difficultyDataArray?.multiplier[
          difficultyDataArray?.multiplier?.length - 1
        ],
    };
    // console.log("cashou ,payload", payload);

    post(`${apis?.chickenCashout}`, payload)
      .then((res) => {
        // console.log("response cashout", res);
        if (res?.data?.status === true) {
          setProfileRefresher(true);
          setWinAmount(res?.data?.win_amount);
          setIsGameOver(true);
          setShowWinModal(true);
          setTimeout(() => {
            if (typeof onSuccessCallback === "function") {
              onSuccessCallback();
            }
          }, 1000);
        }
      })
      .catch(console.error);
  };
  useEffect(() => {
    if (profileRefresher) {
      setTimeout(() => {
        setProfileRefresher(false);
      }, 500);
    }
  }, [profileRefresher]);

  const playChickenDeadSound = () => {
    const audio = audioRef.current;
    if (toggleSound && audio) {
      audio.currentTime = 0;
      audio.play().catch((err) => {
        console.error("Failed to play sound:", err);
      });
    }
  };

  const [showModalLogin, setShowModalLogin] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);
  const [isProcessingFragment, setIsProcessingFragment] = useState(false);

  return (
    <div>
            <audio ref={audioRefMusic} src={bg_music} loop preload="auto" />
      <Header
        toggleSound={toggleSound}
        setToggleSound={setToggleSound}
        toggleMusic={toggleMusic}
        setToggleMusic={setToggleMusic}
        setProfileRefresher={setProfileRefresher}
        profileRefresher={profileRefresher}
        restartGame={restartGame}
      />
      <HomeSlider />
      <Announce />
      <PlayNow />
      <WinningInformation />
      <Footer />
    </div>
  );
}
