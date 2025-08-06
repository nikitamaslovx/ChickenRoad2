
// import React, { useEffect, useState, useRef } from "react";
// import { motion, useAnimation } from "framer-motion";
// import Car from "../assets/Game2/car-4.png";
// import Car1 from "../assets/Game2/car_n-2.png";
// import Car2 from "../assets/Game2/car_n-4.png";
// import Car3 from "../assets/Game2/car_n-5.png";
// import Car4 from "../assets/Game2/car_n-7.png";
// import Car5 from "../assets/Game2/car_n-8.png";
// import Car6 from "../assets/Game2/car-1.png";
// import Car7 from "../assets/Game2/car-2.png";
// import Car8 from "../assets/Game2/car-3.png";
// import Car9 from "../assets/Game2/car-4.png";
// import GreyCoin from "../assets/Game/gray_steper.png";
// import GreyBackground from "../assets/Game2/sli-1.png";
// import ChickenGif from "../assets/Game/CHIK-K-K.gif";
// import cuttedChicken from "../assets/Game2/cuttedChicken.gif";
// import fregement1 from "../assets/Game2/fregment1.png";
// import fregement2 from "../assets/Game2/fragment 2.png";
// import goldenBackground from "../assets/Game2/fragment 2.png";
// import GoldenChicken from "../assets/Game/goldEgg.png";
// import lastWall from "../assets/Game/last-wall.png";
// import greenBackground from "../assets/Game2/fragment 2.png";
// import greenCoin from "../assets/Game/green-coin.png";
// import RedChicken from "../assets/Game/pinkcoin.webp";
// import barrier from "../assets/Game/barrier.png";
// // import bigFire from "../assets/Game/bigFire.gif";
// // import bigFire from "../assets/Game/fire-big.gif";
// import bigFire from "../assets/Game/FIRE--R.gif";
// // import bigFire from "../assets/Game2/ns-12.png";
// import goldEgg from "../assets/Game/golden_egg.png";
// import tandoriPlate from "../assets/Game/tandoorinplate.png";
// import "./PlayGame.css";
// import Notification from "./Notifiaction";
// import strip from "../assets/Game2/strip.png";
// import { toast } from "react-toastify";
// import { apis } from "../utils/apis";
// import useApi from "../hooks/useApi";
// import "./PlayGame.css";
// import multiplerBackground from "../assets/Game/multiplerBackground.png";
// import { div } from "framer-motion/client";

// export default function PlayGame({
//   containerRef,
//   fragmentCount,
//   regularFragmentCount,
//   dinoIndex,
//   multiplier,
//   difficulty,
//   setDifficultyArray,
//   difficultyArray,
//   setActiveDifficulty,
//   activeDifficulty,
//   fragmentWidthVW,
//   currentAmount,
//   goldenEgg,
//   goldEgg2,
//   goldEgg,
//   restartGame,
//   resetCoinsTrigger,
//   setActiveFireIndex,
//   activeFireIndex,
//   setIslastSecondSegment,
//   islastSecondSegment,
//   setCashoutIdByWhenByButton,
//   cashoutIdByWhenByButton,
//   toggleSound,
//   setToggleSound,
//   playChickenDeadSound,
//   setIsProcessingFragment,
//   dinoLandedIndex,
//   setDinoLandedIndex,
// }) {
//   const controls = useAnimation();
//   const [currentX, setCurrentX] = useState(0);
//   // const [dinoLandedIndex, setDinoLandedIndex] = useState(null);
//   const [greenFragments, setGreenFragments] = useState([]);
//   const [goldenFragments, setGoldenFragments] = useState([]);
//   const [redFragments, setRedFragments] = useState([]);
//   // const [fireHitFragments, setFireHitFragments] = useState([]);
//   const [flipStates, setFlipStates] = useState({});
//   const chickenRef = useRef(null);
//   const carRef = useRef(null);

//   // const [bottom, setBottom] = useState("52px");
//   // const [fireStages, setFireStages] = useState({});

//   useEffect(() => {
//     setGreenFragments([]);
//     setGoldenFragments([]);
//     setRedFragments([]);
//     // setFireHitFragments([]);
//     setFlipStates({});
//     setDinoLandedIndex(null);
//   }, [resetCoinsTrigger]);

//   const vw = window.innerWidth / 100;
//   const fragmentWidth = fragmentWidthVW * vw;
//   const frequency =
//     difficulty?.length > 0 ? difficulty[activeDifficulty - 1]?.frequency : [];
//   // console.log("frequency", frequency);
//   const intervalTime = 1000 / frequency;
//   // Fire logic
//   // useEffect(() => {
//   //   let fireTimeout;
//   //   const interval = setInterval(() => {
//   //     const possibleTargets = Array.from(
//   //       { length: fragmentCount },
//   //       (_, i) => i + 1
//   //     ).filter(
//   //       (i) =>
//   //         !greenFragments.includes(i) &&
//   //         !goldenFragments.includes(i) &&
//   //         !redFragments.includes(i)
//   //     );

//   //     if (possibleTargets.length === 0) {
//   //       setActiveFireIndex(null);
//   //       return;
//   //     }

//   //     const randomIndex =
//   //       possibleTargets[Math.floor(Math.random() * possibleTargets.length)];

//   //     // Show fire
//   //     setActiveFireIndex(randomIndex);

//   //     // Clear previous timeout if any
//   //     clearTimeout(fireTimeout);

//   //     // Hide fire after 1 second
//   //     fireTimeout = setTimeout(() => {
//   //       setActiveFireIndex(null);
//   //     }, 2000);
//   //   }, intervalTime);

//   //   return () => {
//   //     clearInterval(interval);
//   //     clearTimeout(fireTimeout);
//   //   };
//   // }, [
//   //   fragmentCount,
//   //   greenFragments,
//   //   goldenFragments,
//   //   redFragments,
//   //   activeDifficulty,
//   // ]);

//   const userid = localStorage.getItem("userid");
//   const { get } = useApi();
//   const [status, setStatus] = useState("");
//   const profileHandler = () => {
//     get(`${apis?.profile}${userid}`)
//       .then((res) => {
//         // console.log("response profile", res);
//         if (res?.data?.status === true) {
//           // setProfileData(res?.data?.profile);
//           // console.log("status: ",res?.data?.profile.status);
//           if (res?.data?.profile.status == 2) {
//             // console.log("you are blocked")
//             localStorage.removeItem("userid");
//             restartGame();
//           }
//           setStatus(res?.data?.profile.status);
//         }
//       })
//       .catch(console.error);
//   };
//   // Dino logic
  // useEffect(() => {
  //   const newX = dinoIndex * fragmentWidth + fragmentWidth / 2 - 20;

  //   controls.start({
  //     x: newX,
  //     transition: { duration: 0.2, ease: "easeInOut" },
  //   });

  //   controls.start({
  //     y: [0, -10, 0],
  //     transition: { duration: 0.2, ease: "easeInOut" },
  //   });

  //   setCurrentX(newX);

  //   // const timer = setTimeout(() => {
  //   //   // console.log("difficultyArray2", difficultyArray);
  //   //   // const shouldRoast =
  //   //   //   (difficultyArray?.roast_multiplier > 0 &&
  //   //   //     difficultyArray?.roast_multiplier === dinoIndex) ||
  //   //   //   activeFireIndex === dinoIndex;
  //   //   const shouldRoast =
  //   //     (difficultyArray?.roast_multiplier > 0 &&
  //   //       Math.abs(
  //   //         difficultyArray?.multiplier?.[dinoIndex - 1] -
  //   //           difficultyArray?.roast_multiplier
  //   //       ) < 0.01) ||
  //   //     activeFireIndex === dinoIndex;

  //   //   // console.log("should roast:", shouldRoast);
  //   //   profileHandler();
  //   //   // console.log("status2:",status)
  //   //   if (shouldRoast) {
  //   //     // alert("roast the chicken")
  //   //     if (!redFragments.includes(dinoIndex)) {
  //   //       setRedFragments((prev) => [...prev, dinoIndex]);
  //   //       setFlipStates((prev) => ({
  //   //         ...prev,
  //   //         [dinoIndex]: (prev[dinoIndex] || 0) + 1,
  //   //       }));
  //   //     }

  //   //     setFireHitFragments((prev) => [...prev, dinoIndex]);
  //   //     setFireStages((prev) => ({ ...prev, [dinoIndex]: "bottom" })); // Step 1: fire at bottom

  //   //     setTimeout(() => {
  //   //       setFireStages((prev) => ({ ...prev, [dinoIndex]: "full" })); // Step 2: expand
  //   //     }, 10000);

  //   //     setTimeout(() => {
  //   //       setFireHitFragments((prev) =>
  //   //         prev.filter((index) => index !== dinoIndex)
  //   //       );
  //   //       setFireStages((prev) => ({ ...prev, [dinoIndex]: "done" })); // Step 3: show tandoori
  //   //     }, 1500);

  //   //     const lastGreenIndex = [...greenFragments].sort((a, b) => b - a)[0];
  //   //     const lastGreenMultiplier =
  //   //       lastGreenIndex !== undefined
  //   //         ? getMultiplierByIndex(lastGreenIndex)
  //   //         : 0;

  //   //     setTimeout(() => {
  //   //       restartGame();
  //   //     }, 2000);
  //   //   } else {
  //   //     if (!greenFragments.includes(dinoIndex)) {
  //   //       setGreenFragments((prev) => [...prev, dinoIndex]);
  //   //       setFlipStates((prev) => ({
  //   //         ...prev,
  //   //         [dinoIndex]: (prev[dinoIndex] || 0) + 1,
  //   //       }));
  //   //     }

  //   //     if (dinoIndex === fragmentCount) {
  //   //       const winningMultiplier =
  //   //         difficultyArray?.multiplier?.length > 0
  //   //           ? difficultyArray?.multiplier[
  //   //               difficultyArray?.multiplier?.length - 1
  //   //             ]
  //   //           : 1;

  //   //       const total = (currentAmount * winningMultiplier).toFixed(2);

  //   //       setTimeout(() => {
  //   //         restartGame();
  //   //       }, 2000);
  //   //     }

  //   //     const prev = dinoIndex - 1;
  //   //     if (
  //   //       prev >= 1 &&
  //   //       greenFragments.includes(prev) &&
  //   //       !goldenFragments.includes(prev)
  //   //     ) {
  //   //       setGoldenFragments((prevGold) => [...prevGold, prev]);

  //   //       setFlipStates((prevState) => ({
  //   //         ...prevState,
  //   //         [prev]: (prevState[prev] || 0) + 1,
  //   //       }));
  //   //     }

  //   //     setDinoLandedIndex(dinoIndex);
  //   //   }
  //   // }, frequency);

  //   // return () => clearTimeout(timer);
  // }, [dinoIndex, activeDifficulty]);

//   useEffect(() => {
//     if (dinoIndex === fragmentCount - 2) {
//       setIslastSecondSegment(true);
//     }
//   }, [dinoIndex, fragmentCount]);

//   const getMultiplierByIndex = (i) => {
//     let base =
//       difficultyArray?.multiplier?.length > 0
//         ? difficultyArray?.multiplier[i - 1]
//         : [];
//     return i >= 1 ? parseFloat(base) : null;
//   };

//   const [font, setFont] = useState("25px");
//   useEffect(() => {
//     const handleResize = () => {
//       const width = window.innerWidth;
//       if (400 < width <= 600) setFont("20px");
//       if (width <= 1024) setFont("40px");
//       if (width <= 400) setFont("25px");
//       else setFont("20px");
//     };

//     handleResize(); // call once on mount
//     window.addEventListener("resize", handleResize);
//     return () => window.removeEventListener("resize", handleResize);
//   }, []);
//   // console.log("redFragments",redFragments)

//   const isLoading =
//     !difficultyArray?.multiplier || difficultyArray?.multiplier.length === 0;

//   // After your fragment result processing (inside setTimeout callbacks where restartGame is called):
//   setTimeout(
//     () => {
//       // restartGame();
//       setIsProcessingFragment(false);
//     } /* match the same delay you have, e.g. 100 or 200ms after final state is shown */,
//     2000
//   );

//   const [bottom, setBottom] = useState("52px");

//   useEffect(() => {
//     const updateDinoBottom = () => {
//       if (containerRef?.current) {
//         const containerHeight = containerRef.current.offsetHeight;
//         const screenWidth = window.innerWidth;

//         let newBottom;

//         if (screenWidth <= 360) {
//           newBottom = containerHeight * 0.15;
//         } else if (screenWidth <= 375) {
//           newBottom = containerHeight * 0.15;
//         } else if (screenWidth <= 400) {
//           newBottom = containerHeight * 0.13;
//         } else if (screenWidth <= 450) {
//           newBottom = containerHeight * 0.13;
//         } else if (screenWidth <= 800) {
//           newBottom = containerHeight * 0.12;
//         } else if (screenWidth <= 1000) {
//           newBottom = containerHeight * 0.11;
//         } else if (screenWidth <= 1200) {
//           newBottom = containerHeight * 0.1;
//         } else if (screenWidth <= 1500) {
//           newBottom = containerHeight * 0.18;
//         } else if (screenWidth <= 1540) {
//           newBottom = containerHeight * 0.21;
//         } else if (screenWidth <= 2000) {
//           newBottom = containerHeight * 0.12;
//         } else {
//           newBottom = containerHeight * 0.1;
//         }

//         setBottom(`${newBottom}px`);
//       }
//     };

//     updateDinoBottom();
//     window.addEventListener("resize", updateDinoBottom);

//     return () => {
//       window.removeEventListener("resize", updateDinoBottom);
//     };
//   }, [containerRef]);

//   const fireBottom = `${parseFloat(bottom) - 20}px`;

//   const cars = [Car, Car1, Car2, Car3, Car4, Car5, Car6, Car7, Car8, Car9];

//   const getRandomCar = () => {
//     const randomIndex = Math.floor(Math.random() * cars.length);
//     return cars[randomIndex];
//   };

//   const [randomCars, setRandomCars] = useState([]);
//   useEffect(() => {
//     // Assuming you know how many fire objects there are
//     const fireCount = 10;
//      // or use your actual count
//     const generated = Array.from({ length: fireCount }, () => getRandomCar());
//     setRandomCars(generated);
//   }, []); // empty dependency = run only once

//   const isColliding = (rect1, rect2) => {
//     return (
//       rect1 &&
//       rect2 &&
//       rect1.left < rect2.right &&
//       rect1.right > rect2.left &&
//       rect1.top < rect2.bottom &&
//       rect1.bottom > rect2.top
//     );
//   };

//   return (
//     <div className="relative h-full overflow-auto">
//       {/* 🔔 Fixed Notification */}
//       <div className="absolute top-0 left-4 z-40">
//         <Notification message="🔥 Watch out! Fire may hit!" />
//       </div>
//       <div
//         ref={containerRef}
//         className="scroll-container"
//         style={{
//           overflowX: "auto",
//           overflowY: "hidden",
//           whiteSpace: "nowrap",
//           position: "relative",
//           scrollBehavior: "smooth",
//           height: "100%",
//         }}
//       >
//         {/* chicken  🐔 Dino - Hide if collided */}
//         <motion.div
//           animate={controls}
//           style={{
//             position: "absolute",
//             // bottom: bottom,
//             // bottom: 38,
//             top: "50%",
//             transform: "translateY(-50%)",
//             width: "50px",
//             height: "60px",
//             zIndex: 40,
//             display: redFragments.includes(dinoIndex) ? "none" : "flex",
//             alignItems: "center",
//             justifyContent: "center",
//           }}
//         >
//           {dinoLandedIndex === null || dinoLandedIndex === 0 ? (
//             <img
//               className={`max-w-[120px] lg:max-w-[120px] 2lg:max-w-[180px] h-auto object-contain`}
//               src={cuttedChicken}
//               alt="Chicken"
//               style={{ transform: "translateX(20px)" }}
//             />
//           ) : (
//             <div>
//               <img src={barrier} alt="" className="-mt-16" />
//               <img
//                 className={`max-w-[160px] lg:max-w-[150px] 2lg:max-w-[230px] h-auto object-contain  -ml-5`}
//                 ref={chickenRef}
//                 src={ChickenGif}
//                 style={
//                   {
//                     // bottom: window.innerWidth >= 1224 ? "25px" : bottom,
//                   }
//                 }
//                 alt="Chicken"
//               />
//               {/* Multiplier below chicken when it's green */}
//               {difficultyArray?.multiplier?.length > 0 && (
//                 <div className="relative w-full h-full mx-auto">
//                   {/* Background image */}
//                   <img
//                     src={multiplerBackground}
//                     alt="multiplier"
//                     className="w-full h-full object-contain -ml-2"
//                   />

//                   {/* Centered multiplier text */}
//                   <div
//                     className="absolute inset-0 flex items-center justify-center text-white font-bold pt-2 -ml-4"
//                     style={{
//                       fontSize: "28px",
//                       textShadow: "0 0 3px rgba(255,255,255,0.8)",
//                       pointerEvents: "none",
//                       userSelect: "none",
//                     }}
//                   >
//                     x{" "}
//                     {
//                       difficultyArray.multiplier[
//                         difficultyArray.multiplier.length - 1
//                       ]
//                     }
//                   </div>
//                 </div>
//               )}
//             </div>
//           )}
//         </motion.div>

//         {/* 🧱 Fragments */}

//         {isLoading && (
//           <>
//             {Array.from({ length: 10 }).map((_, i) => (
//               <div
//                 key={i}
//                 className="inline-block animate-pulse"
//                 style={{
//                   width: `${fragmentWidthVW}vw`,
//                   height: "100%",
//                   backgroundImage: `url(${i === 0 ? fregement1 : fregement2})`,
//                   backgroundSize: "100% 100%",
//                   backgroundRepeat: "no-repeat",
//                   backgroundPosition: "center",
//                   boxSizing: "border-box",
//                   position: "relative",
//                 }}
//               />
//             ))}
//           </>
//         )}

//         {Array.from({ length: fragmentCount }).map((_, i) => {
//           if (isLoading) {
//             return (
//               <div
//                 key={i}
//                 className="inline-block animate-pulse"
//                 style={{
//                   width: `${fragmentWidthVW}vw`,
//                   height: "100%",
//                   backgroundImage: `url(${fregement2})`,
//                   backgroundSize: "100% 100%",
//                   backgroundRepeat: "no-repeat",
//                   backgroundPosition: "center",
//                   boxSizing: "border-box",
//                   position: "relative",
//                   // filter: "brightness(0.4)",
//                   // darken to indicate loading
//                 }}
//               />
//             );
//           }
//           // console.log("kitne freagment hai ",fragmentCount)
//           const isSecondLast = i - 1 === fragmentCount - 2;
//           const isLast = i === fragmentCount - 1;
//           // if(isSecondLast+1){
//           //   setIslastSecondSegment(true)
//           // }
//           if (isSecondLast) {
//             return (
//               <>
//                 <div
//                   className="text-white overflow-hidden w-[80vw] lg:w-[18vw]"
//                   key={i}
//                   style={{
//                     display: "inline-block",
//                     // width: `80vw`,
//                     height: "100%",
//                     backgroundImage: `url(${lastWall})`,
//                     backgroundSize: "100% 100%",
//                     backgroundRepeat: "no-repeat",
//                     backgroundPosition: "center",
//                     boxSizing: "border-box",
//                     position: "relative",
//                   }}
//                 >
//                   <div
//                     className="text-white font-extrabold"
//                     style={{
//                       position: "absolute",
//                       top: "42%",
//                       left: "40%",
//                       transform: "translate(-50%, -50%)",
//                       color: "white",
//                       fontWeight: "black",
//                       fontSize: "40px",
//                       textShadow: "0 0 5px #ffd700",
//                       textAlign: "center",
//                       whiteSpace: "nowrap",
//                       pointerEvents: "none",
//                     }}
//                   >
//                     {/* x
//                     {difficultyArray?.multiplier?.length > 0
//                       ? difficultyArray?.multiplier[
//                           difficultyArray?.multiplier?.length - 1
//                         ]
//                       : ""} */}
//                   </div>

//                   <p className="h-8 ml-0.0 w-full absolute bottom-0 left-0 bg-[#333647]"></p>
//                 </div>
//               </>
//             );
//           }
//           // console.log("difficultyArray new", difficultyArray);
//           const fragMultiplier =
//             difficultyArray?.multiplier?.length > 0
//               ? difficultyArray?.multiplier
//               : 1;
//           const isGolden = goldenFragments.includes(i);
//           const isGreen = greenFragments.includes(i);
//           const isRed = redFragments.includes(i);
//           // const isFireHit = fireHitFragments.includes(i);
//           // console.log("fragMultiplier", fragMultiplier);
//           // console.log(`Fragment ${i} - isGreen:`, greenFragments.includes(i));

//           return (
//             <>
//               <div
//                 key={i}
//                 style={{
//                   display: "inline-block",
//                   width: `${fragmentWidthVW}vw`,
//                   height: "100%",
//                   boxSizing: "border-box",
//                 }}
//               >
//                 <div
//                   className="h-[calc(100%-30px)]"
//                   style={{
//                     position: "relative",
//                     width: "100%",
//                     // height: "100%",
//                     // margin: "0 auto",
//                     // aspectRatio: "4 / 16",
//                     backgroundImage: `url(${
//                       i === 0
//                         ? fregement1
//                         : isGolden
//                         ? goldenBackground
//                         : isGreen
//                         ? greenBackground
//                         : fregement2
//                     })`,
//                     backgroundSize: "100% 100%",
//                     backgroundRepeat: "no-repeat",
//                     backgroundPosition: "center",
//                   }}
//                 >
//                   {/* {redFragments.includes(i) &&
//                     i === dinoIndex &&
//                     (() => {
//                       if (toggleSound) {
//                         playChickenDeadSound?.();
//                       }
//                       return (
//                         <>
//                           {fireStages[i] === "bottom" ||
//                           fireStages[i] === "full" ? (
//                             <img
//                               src={bigFire}
//                               alt="Fire"
//                               style={{
//                                 position: "absolute",
//                                 bottom: "5px",
//                                 left: 0,
//                                 width: "100%",
//                                 height: "100%",
//                                 objectFit: "fill",
//                                 pointerEvents: "none",
//                                 zIndex: 15,
//                               }}
//                             />
//                           ) : fireStages[i] === "done" ? (
//                             <img
//                               src={tandoriPlate}
//                               alt="Tandoori"
//                               style={{
//                                 position: "absolute",
//                                 bottom: "3px",
//                                 left: "50%",
//                                 transform: "translateX(-50%)",
//                                 width: "120px",
//                                 height: "120px",
//                                 pointerEvents: "none",
//                                 zIndex: 15,
//                               }}
//                             />
//                           ) : null}
//                         </>
//                       );
//                     })()} */}

//                   {/* ✅ Red Coin Display After Fire */}
//                   {redFragments.includes(i) && i !== 0 && (
//                     <motion.div
//                       key={`red-${flipStates[i] || 0}`}
//                       initial={{ rotateY: 90 }}
//                       animate={{ rotateY: 0 }}
//                       transition={{ duration: 0.5, ease: "easeInOut" }}
//                       style={{
//                         position: "absolute",
//                         top: "50%",
//                         transform: "translate(-50%, -50%) rotateY(0deg)",
//                         width: "100%",
//                         height: "120px",
//                         backgroundImage: `url(${RedChicken})`,
//                         backgroundSize: "contain",
//                         backgroundRepeat: "no-repeat",
//                         backgroundPosition: "center",
//                         pointerEvents: "none",
//                         zIndex: 50,
//                       }}
//                     />
//                   )}

//                   {/* {fragMultiplier?.length > 0 && i > 0 && i !== fragmentCount  && ( */}
//                   {/* Flip */}
//                   {!isRed && i !== 0 && i !== fragmentCount - 1 && (
//                     <>
//                       {isGolden && (
//                         <img
//                           src={barrier}
//                           alt="barrier"
//                           className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 top-1/2 -mt-20 md:-mt-28 "
//                         />
//                       )}
//                       <motion.div
//                         key={flipStates[i] || 0}
//                         initial={{ rotateY: 90 }}
//                         animate={{ rotateY: 0 }}
//                         transition={{ duration: 0.5, ease: "easeInOut" }}
//                         style={{
//                           position: "absolute",
//                           top: "50%",
//                           transform: "translate(-50%, -50%) rotateY(0deg)",
//                           width: "100%",
//                           height: "120px",
//                           backgroundImage: `url(${
//                             isRed
//                               ? RedChicken
//                               : isGolden
//                               ? GoldenChicken
//                               : isGreen
//                               ? ""
//                               : GreyCoin
//                           })`,
//                           backgroundSize: "contain",
//                           backgroundRepeat: "no-repeat",
//                           backgroundPosition: "center",
//                           display: "flex",
//                           alignItems: "center",
//                           justifyContent: "center",
//                           color: "#fff",
//                           fontWeight: "bold",
//                           fontSize: font,
//                           userSelect: "none",
//                           pointerEvents: "none",
//                           textShadow: "0 0 3px rgba(255,255,255,0.8)",
//                           backfaceVisibility: "hidden",
//                           perspective: "1000px",
//                         }}
//                       >
//                         {!isRed &&
//                           !isGolden &&
//                           !isGreen && `x${fragMultiplier[i - 1] || 1}`}
//                       </motion.div>
//                     </>
//                   )}

//                   {/* 🔥 Fire  to roast chicken*/}
//                   {activeFireIndex === i && (
//                     // <img src={randomCars[i]} alt="Fire" className="fire-fall" />
//                     <motion.img
//                       ref={carRef}
//                       src={randomCars[i]}
//                       alt="Crash"
//                       className="absolute left-1/2 transform -translate-x-1/2 w-[70%] h-auto z-20 "
//                       initial={{ top: "-100%" }}
//                       animate={{ top: "100%" }}
//                       transition={{ duration: 1.5, ease: "easeOut" }}
//                     />
//                   )}

//                   {/* {console.log(
//   "🔥 Fire fixed at fragment:",
//   difficultyArray?.multiplier?.indexOf(difficultyArray?.roast_multiplier) + 1
// )
// } */}
//                 </div>
//                 <div
//                   className="text-black text-sm font-semibold w-full text-center"
//                   style={{
//                     height: "30px",
//                     lineHeight: "30px",
//                     zIndex: 1,
//                     backgroundImage: `url(${strip})`,
//                     backgroundSize: "cover", // or "contain"
//                     backgroundRepeat: "no-repeat",
//                     backgroundPosition: "center",
//                   }}
//                 >
//                   {/* ddfdsfdsf */}
//                 </div>
//               </div>
//             </>
//           );
//         })}
//       </div>
//     </div>
//   );
// }



import React, { useEffect, useState, useRef } from "react";
import { motion, useAnimation } from "framer-motion";
import Car from "../assets/Game2/car-4.png";
import Car1 from "../assets/Game2/car_n-2.png";
import Car2 from "../assets/Game2/car_n-4.png";
import Car3 from "../assets/Game2/car_n-5.png";
import Car4 from "../assets/Game2/car_n-7.png";
import Car5 from "../assets/Game2/car_n-8.png";
import Car6 from "../assets/Game2/car-1.png";
import Car7 from "../assets/Game2/car-2.png";
import Car8 from "../assets/Game2/car-3.png";
import Car9 from "../assets/Game2/car-4.png";
import GreyCoin from "../assets/Game/gray_steper.png";
import GreyBackground from "../assets/Game2/sli-1.png";
import ChickenGif from "../assets/Game/CHIK-K-K.gif";
import cuttedChicken from "../assets/Game2/cuttedChicken.gif";
import fregement1 from "../assets/Game2/fregment1.png";
import fregement2 from "../assets/Game2/fragment 2.png";
import goldenBackground from "../assets/Game2/fragment 2.png";
import GoldenChicken from "../assets/Game/goldEgg.png";
import lastWall from "../assets/Game/last-wall.png";
import greenBackground from "../assets/Game2/fragment 2.png";
import greenCoin from "../assets/Game/green-coin.png";
import RedChicken from "../assets/Game/cheken_dead.png";
import feathers from "../assets/Game/feathers.png";
import barrier from "../assets/Game/barrier.png";
import bigFire from "../assets/Game/FIRE--R.gif";
import goldEgg from "../assets/Game/golden_egg.png";
import tandoriPlate from "../assets/Game/tandoorinplate.png";
import "./PlayGame.css";
import Notification from "./Notifiaction";
import strip from "../assets/Game2/strip.png";
import { toast } from "react-toastify";
import { apis } from "../utils/apis";
import useApi from "../hooks/useApi";
import "./PlayGame.css";
import multiplerBackground from "../assets/Game/multiplerBackground.png";
import { div } from "framer-motion/client";

// export default function PlayGame({
//   containerRef,
//   fragmentCount,
//   regularFragmentCount,
//   dinoIndex,
//   multiplier,
//   difficulty,
//   setDifficultyArray,
//   difficultyArray,
//   setActiveDifficulty,
//   activeDifficulty,
//   fragmentWidthVW,
//   currentAmount,
//   goldenEgg,
//   goldEgg2,
//   goldEgg,
//   restartGame,
//   resetCoinsTrigger,
//   setActiveFireIndex,
//   activeFireIndex,
//   setIslastSecondSegment,
//   islastSecondSegment,
//   setCashoutIdByWhenByButton,
//   cashoutIdByWhenByButton,
//   toggleSound,
//   setToggleSound,
//   playChickenDeadSound,
//   setIsProcessingFragment,
//   dinoLandedIndex,
//   setDinoLandedIndex,
// }) {
//   const controls = useAnimation();
//   const [currentX, setCurrentX] = useState(0);

//   const [greenFragments, setGreenFragments] = useState([]);
//   const [goldenFragments, setGoldenFragments] = useState([]);
//   const [redFragments, setRedFragments] = useState([]);

//   const [flipStates, setFlipStates] = useState({});
//   const chickenRef = useRef(null);
//   const carRef = useRef(null);
//   const [carInMotion, setCarInMotion] = useState(false);
//   const [stoppedCars, setStoppedCars] = useState([]);
//   const [currentCarImage, setCurrentCarImage] = useState(null);
//   const [targetCarFragment] = useState(5); // Example: fixed fragment index 5

//   // ✅ NEW: Track active cars on multiple fragments
//   const [activeCars, setActiveCars] = useState({}); // {fragmentIndex: carData}
//   const [carsInMotion, setCarsInMotion] = useState(new Set()); // Set of fragment indices with moving cars

//   // Calculate roast multiplier fragment index
//   const roastMultiplierFragmentIndex = difficultyArray?.multiplier?.indexOf(
//     difficultyArray?.roast_multiplier
//   );
//   // ✅ NEW: Effect to handle localStorage for red fragments
//   useEffect(() => {
//     if (redFragments.length > 0) {
//       // Set red fragment flag in localStorage when any red fragment is active
//       localStorage.setItem("redfragment", "true");
//       console.log("🔴 Red fragment activated - localStorage set");

//       // Remove the localStorage item after 1 second
//       const timer = setTimeout(() => {
//         localStorage.removeItem("redfragment");
//         console.log("🔴 Red fragment localStorage removed after 1 second");
//       }, 2500);

//       return () => clearTimeout(timer);
//     }
//   }, [redFragments]);

//   // ✅ NEW: Effect to handle chicken death at roast_multiplier fragment
//   useEffect(() => {
//     if (
//       roastMultiplierFragmentIndex >= 0 &&
//       dinoIndex === roastMultiplierFragmentIndex + 1
//     ) {
//       console.log("💀 Chicken reached roast_multiplier fragment and died!");

//       // Mark fragment as red immediately
//       setRedFragments((prev) => {
//         if (!prev.includes(roastMultiplierFragmentIndex + 1)) {
//           return [...prev, roastMultiplierFragmentIndex + 1];
//         }
//         return prev;
//       });

//       // Spawn car that will rapidly cross the dead chicken
//       const roastFragmentIndex = roastMultiplierFragmentIndex + 1;
//       setActiveCars((prev) => ({
//         ...prev,
//         [roastFragmentIndex]: {
//           img: getRandomCar(),
//           isRoastCar: true,
//           fragmentIndex: roastFragmentIndex,
//         },
//       }));
//       setCarsInMotion((prev) => new Set([...prev, roastFragmentIndex]));

//       // Play death sound
//       playChickenDeadSound?.();

//       // Restart game after a delay
//       setTimeout(() => {
//         restartGame();
//       }, 2500); // 2.5 second delay to show car crossing animation
//     }
//   }, [
//     dinoIndex,
//     roastMultiplierFragmentIndex,
//     playChickenDeadSound,
//     restartGame,
//   ]);

//   // ✅ FIXED: Random car spawning logic (no longer blocked by roast multiplier)
//   useEffect(() => {
//     let timeoutId;

//     const spawnRandomCar = () => {
//       // Only spawn if we don't have too many cars already
//       if (carsInMotion.size >= 3) return; // Limit concurrent cars

//       const allowedFragments = Array.from({ length: fragmentCount })
//         .map((_, index) => index)
//         .filter(
//           (index) =>
//             index !== 0 &&
//             index !== fragmentCount - 1 &&
//             !goldenFragments.includes(index) &&
//             !activeCars[index] && // Don't spawn where car already exists
//             !stoppedCars.some((car) => car.index === index) // Don't spawn where car is stopped
//         );

//       if (allowedFragments.length > 0) {
//         const randomIndex =
//           allowedFragments[Math.floor(Math.random() * allowedFragments.length)];
//         console.log("🚗 Random Car spawning at fragment", randomIndex);

//         // Check if chicken is on this fragment
//         if (randomIndex === dinoIndex) {
//           console.log(
//             "💥 Instant collision! Chicken was already on fragment",
//             randomIndex
//           );
//           setStoppedCars((prev) => [
//             ...prev,
//             {
//               index: randomIndex,
//               img: getRandomCar(),
//             },
//           ]);
//           // playChickenDeadSound?.();
//           // setTimeout(() => {
//           //   restartGame();
//           // }, 1000);
//         } else {
//           // Spawn moving car
//           setActiveCars((prev) => ({
//             ...prev,
//             [randomIndex]: {
//               img: getRandomCar(),
//               isRoastCar: false,
//               fragmentIndex: randomIndex,
//             },
//           }));
//           setCarsInMotion((prev) => new Set([...prev, randomIndex]));
//         }
//       }

//       // Schedule next random car spawn
//       const nextSpawnDelay = Math.random() * 3000 + 2000; // 2-5 seconds
//       timeoutId = setTimeout(spawnRandomCar, nextSpawnDelay);
//     };

//     // Start random car spawning
//     const initialDelay = Math.random() * 2000 + 1000; // 1-3 seconds initial delay
//     timeoutId = setTimeout(spawnRandomCar, initialDelay);

//     return () => clearTimeout(timeoutId);
//   }, [
//     fragmentCount,
//     goldenFragments,
//     dinoIndex,
//     activeCars,
//     stoppedCars,
//     carsInMotion,
//   ]);

//   // Reset fragments on game restart
//   useEffect(() => {
//     setGreenFragments([]);
//     setGoldenFragments([]);
//     setRedFragments([]);
//     setFlipStates({});
//     setDinoLandedIndex(null);
//     setStoppedCars([]);
//     setActiveCars({});
//     setCarsInMotion(new Set());
//     setCurrentCarImage(null);
//   }, [resetCoinsTrigger]);

//   const vw = window.innerWidth / 100;
//   const fragmentWidth = fragmentWidthVW * vw;
//   const frequency =
//     difficulty?.length > 0 ? difficulty[activeDifficulty - 1]?.frequency : [];

//   const intervalTime = 1000 / frequency;

//   const userid = localStorage.getItem("userid");
//   const { get } = useApi();
//   const [status, setStatus] = useState("");

//   const profileHandler = () => {
//     get(`${apis?.profile}${userid}`)
//       .then((res) => {
//         if (res?.data?.status === true) {
//           if (res?.data?.profile.status == 2) {
//             localStorage.removeItem("userid");
//             restartGame();
//           }
//           setStatus(res?.data?.profile.status);
//         }
//       })
//       .catch(console.error);
//   };

//   // Dino movement logic
//   useEffect(() => {
//     const newX = dinoIndex * fragmentWidth + fragmentWidth / 2 - 20;

//     controls.start({
//       x: newX,
//       transition: { duration: 0.2, ease: "easeInOut" },
//     });

//     controls.start({
//       y: [0, -10, 0],
//       transition: { duration: 0.2, ease: "easeInOut" },
//     });

//     setCurrentX(newX);
//   }, [dinoIndex, activeDifficulty]);

//   useEffect(() => {
//     if (dinoIndex === fragmentCount - 2) {
//       setIslastSecondSegment(true);
//     }
//   }, [dinoIndex, fragmentCount]);

//   const getMultiplierByIndex = (i) => {
//     let base =
//       difficultyArray?.multiplier?.length > 0
//         ? difficultyArray?.multiplier[i - 1]
//         : [];
//     return i >= 1 ? parseFloat(base) : null;
//   };

//   const [font, setFont] = useState("25px");
//   useEffect(() => {
//     const handleResize = () => {
//       const width = window.innerWidth;
//       if (400 < width <= 600) setFont("20px");
//       if (width <= 1024) setFont("40px");
//       if (width <= 400) setFont("25px");
//       else setFont("20px");
//     };

//     handleResize();
//     window.addEventListener("resize", handleResize);
//     return () => window.removeEventListener("resize", handleResize);
//   }, []);

//   const isLoading =
//     !difficultyArray?.multiplier || difficultyArray?.multiplier.length === 0;

//   setTimeout(() => {
//     setIsProcessingFragment(false);
//   }, 2000);

//   const [bottom, setBottom] = useState("52px");
//   const fireBottom = `${parseFloat(bottom) - 20}px`;

//   const cars = [Car, Car1, Car2, Car3, Car4, Car5, Car6, Car7, Car8, Car9];

//   const getRandomCar = () => {
//     const randomIndex = Math.floor(Math.random() * cars.length);
//     return cars[randomIndex];
//   };

//   const [randomCars, setRandomCars] = useState([]);

//   useEffect(() => {
//     const fireCount = 10;
//     const generated = Array.from({ length: fireCount }, () => getRandomCar());
//     setRandomCars(generated);
//   }, []);

//   const isColliding = (el1, el2) => {
//     if (!el1 || !el2) return false;
//     const rect1 = el1.getBoundingClientRect();
//     const rect2 = el2.getBoundingClientRect();

//     return !(
//       rect1.top > rect2.bottom ||
//       rect1.bottom < rect2.top ||
//       rect1.right < rect2.left ||
//       rect1.left > rect2.right
//     );
//   };

//   const previousDinoIndexRef = useRef(dinoIndex);

//   useEffect(() => {
//     if (previousDinoIndexRef.current !== dinoIndex) {
//       console.log(`🐔 Chicken landed on fragment ${dinoIndex}`);
//       previousDinoIndexRef.current = dinoIndex;
//     }
//   }, [dinoIndex]);

//   const [carY, setCarY] = useState(0);

//   // Fragment state management
//   useEffect(() => {
//     if (dinoIndex > 0) {
//       const previousFragment = dinoIndex - 1;

//       // ✅ Mark previous fragment as golden
//       setGoldenFragments((prev) => {
//         if (!prev.includes(previousFragment)) {
//           return [...prev, previousFragment];
//         }
//         return prev;
//       });

//       // ✅ Trigger flip animation for that fragment
//       setFlipStates((prev) => ({
//         ...prev,
//         [previousFragment]: (prev[previousFragment] || 0) + 1,
//       }));
//     }

//     // ✅ Mark current fragment as green (only if not the roast_multiplier fragment)
//     if (dinoIndex >= 0 && dinoIndex !== roastMultiplierFragmentIndex + 1) {
//       setGreenFragments((prev) => {
//         if (!prev.includes(dinoIndex)) {
//           return [...prev, dinoIndex];
//         }
//         return prev;
//       });

//       // ✅ Trigger flip for current fragment (Green)
//       setFlipStates((prev) => ({
//         ...prev,
//         [dinoIndex]: (prev[dinoIndex] || 0) + 1,
//       }));
//     }
//   }, [dinoIndex, roastMultiplierFragmentIndex]);

//   // Keep a map of car images per fragment
//   const [carImages, setCarImages] = useState({});

//   const spawnCarImage = (i) => {
//     const newImg = getRandomCar();
//     setCarImages((prev) => ({ ...prev, [i]: newImg }));
//     return newImg;
//   };

//   // barrier state
//   const [showBarrier, setShowBarrier] = useState(false);

//   // show barrier 500ms after chicken lands (this indicates chicken is "safe")
//   useEffect(() => {
//     if (dinoIndex > 0) {
//       setShowBarrier(false);
//       const timer = setTimeout(() => {
//         setShowBarrier(true);
//         console.log(
//           `🛡️ Barrier up! Chicken is now safe on fragment ${dinoIndex}`
//         );
//       }, 500); // Changed to 500ms to match your requirement

//       return () => clearTimeout(timer);
//     }
//   }, [dinoIndex]);

//   // ✅ ENHANCED: Collision detection for multiple cars (only during movement, not after landing)
//   useEffect(() => {
//     if (carsInMotion.size === 0) return;

//     // Only check collisions BEFORE barrier appears (during chicken movement phase)
//     if (showBarrier) return;

//     const checkCollisions = () => {
//       const chicken = chickenRef.current;
//       if (!chicken) return;

//       // Check collision with each active car
//       Object.entries(activeCars).forEach(([fragmentIndex, carData]) => {
//         const fragIndex = parseInt(fragmentIndex);
//         if (!carsInMotion.has(fragIndex)) return;

//         const carElement = document.querySelector(
//           `[data-car-fragment="${fragmentIndex}"]`
//         );
//         if (!carElement) return;

//         // Only check collision if chicken is on the same fragment OR moving to it
//         if (fragIndex === dinoIndex && isColliding(chicken, carElement)) {
//           console.log(
//             `💥 Car collided with chicken DURING MOVEMENT at fragment ${fragmentIndex}!`
//           );
//           playChickenDeadSound?.();

//           // Mark fragment as red
//           setRedFragments((prev) => [...prev, fragIndex]);

//           // Remove this car from active cars
//           setActiveCars((prev) => {
//             const newActiveCars = { ...prev };
//             delete newActiveCars[fragmentIndex];
//             return newActiveCars;
//           });
//           setCarsInMotion((prev) => {
//             const newSet = new Set(prev);
//             newSet.delete(fragIndex);
//             return newSet;
//           });

//           // Add to stopped cars and restart game
//           setStoppedCars((prev) => [
//             ...prev,
//             { index: fragIndex, img: carData.img },
//           ]);

//           setTimeout(() => {
//             restartGame();
//           }, 1000);
//         }
//       });
//     };

//     const interval = setInterval(checkCollisions, 50);
//     return () => clearInterval(interval);
//   }, [carsInMotion, showBarrier, dinoIndex, activeCars]);

//   useEffect(() => {
//     if (difficultyArray?.multiplier?.length > 0) {
//       console.log("🎯 All multipliers:", difficultyArray);
//     }
//   }, [difficultyArray]);

//   // ✅ NEW: Handle car animation completion with proper collision logic
//   const handleCarAnimationComplete = (fragmentIndex, carData) => {
//     console.log(`🚗 Car animation completed at fragment ${fragmentIndex}`);

//     // Remove from active cars and cars in motion
//     setActiveCars((prev) => {
//       const newActiveCars = { ...prev };
//       delete newActiveCars[fragmentIndex];
//       return newActiveCars;
//     });
//     setCarsInMotion((prev) => {
//       const newSet = new Set(prev);
//       newSet.delete(fragmentIndex);
//       return newSet;
//     });

//     // If this was a roast car crossing over dead chicken, don't add to stopped cars
//     if (carData.isRoastCar && redFragments.includes(fragmentIndex)) {
//       console.log(
//         `🚗 Roast car crossed over dead chicken at fragment ${fragmentIndex}`
//       );
//       return;
//     }

//     // ✅ NEW LOGIC: Check collision based on timing
//     if (fragmentIndex === dinoIndex) {
//       // If chicken is on this fragment, check if barrier is up (chicken has landed successfully)
//       if (showBarrier) {
//         // Chicken has been on this fragment for 500ms+ - car should stop
//         console.log(
//           `🛑 Car stopped! Chicken was already secured on fragment ${fragmentIndex}`
//         );
//         setStoppedCars((prev) => [
//           ...prev,
//           { index: fragmentIndex, img: carData.img },
//         ]);
//       } else {
//         // Chicken just landed or is still moving - collision occurs
//         console.log(
//           `💥 Car collision! Chicken was still vulnerable at fragment ${fragmentIndex}!`
//         );
//         playChickenDeadSound?.();
//         setRedFragments((prev) => [...prev, fragmentIndex]);
//         setStoppedCars((prev) => [
//           ...prev,
//           { index: fragmentIndex, img: carData.img },
//         ]);
//         setTimeout(() => {
//           restartGame();
//         }, 1000);
//       }
//     } else {
//       // Car reached fragment where chicken is not present - just remove it
//       console.log(`🚗 Car passed through empty fragment ${fragmentIndex}`);
//     }
//   };

//   return (
//     <div className="relative h-full overflow-auto">
//       {/* 🔔 Fixed Notification */}
//       <div className="absolute top-0 left-4 z-40">
//         <Notification message="🔥 Watch out! Fire may hit!" />
//       </div>
//       <div
//         ref={containerRef}
//         className="scroll-container"
//         style={{
//           overflowX: "auto",
//           overflowY: "hidden",
//           whiteSpace: "nowrap",
//           position: "relative",
//           scrollBehavior: "smooth",
//           height: "100%",
//         }}
//       >
//         {/* chicken  🐔 Dino - Hide if collided */}
//         <motion.div
//           animate={controls}
//           style={{
//             position: "absolute",
//             top: "50%",
//             transform: "translateY(-50%)",
//             width: "50px",
//             height: "60px",
//             zIndex: 40,
//             display: redFragments.includes(dinoIndex) ? "none" : "flex",
//             alignItems: "center",
//             justifyContent: "center",
//           }}
//         >
//           {dinoIndex === null || dinoIndex === 0 ? (
//             <img
//               className={`max-w-[160px] sm:max-w-[220px] md:max-w-[320px]  lg:max-w-[120px] 2lg:max-w-[180px] h-auto object-contain`}
//               src={cuttedChicken}
//               alt="cutted Chicken"
//               style={{ transform: "translateX(20px)" }}
//             />
//           ) : (
//             <div>
//               {/* Barrier image appears after 500ms */}
//               {showBarrier && dinoIndex !== fragmentCount - 1 && (
//                 <motion.img
//                   src={barrier}
//                   // absolute left-1/2 -translate-x-1/2 -translate-y-1/2 top-1/2 -mt-12 sm:-mt-[90px] md:-mt-36 w-[115px] xsm3:w-[120px] xsm2:w-[130px] xsm:w-32 sm:w-[200px] -ml-2 md:w-[280px]
//                   alt="barrier"
//                   className="-mb-14 lg:-mb-12 w-[115px] xsm3:w-[120px] xsm2:w-[130px] xsm:w-[110px] xsm:ml-1 sm:ml-4 sm:w-[160px] md:w-[200px] md:ml-10 md:-mb-16 2lg:w-[150px] 2lg:ml-0 2lg:-mb-4"
//                   initial={{ y: -100, opacity: 0 }}
//                   animate={{ y: 0, opacity: 1 }}
//                   transition={{ duration: 0.2, ease: "easeOut" }}
//                 />
//               )}
//               <img
//                 className={`max-w-[150px] sm:max-w-[220px] md:max-w-[320px] lg:max-w-[120px] 2lg:max-w-[180px] h-auto object-contain -ml-1 mt-16 `}
//                 ref={chickenRef}
//                 src={ChickenGif}
//                 alt="Chicken"
//               />
//               {/* Multiplier below chicken when it's green */}
//               {difficultyArray?.multiplier?.length > 0 &&
//                 dinoIndex > 0 &&
//                 dinoIndex !== fragmentCount - 1 && (
//                   <div className="relative w-full h-full mx-auto">
//                     <img
//                       src={multiplerBackground}
//                       alt="multiplier"
//                       className="w-full h-full object-contain -ml-2"
//                     />
//                     <div
//                       className="absolute inset-0 flex items-center justify-center text-white font-bold pt-2 -ml-4"
//                       style={{
//                         fontSize: `${
//                           (
//                             difficultyArray?.multiplier?.[dinoIndex - 1] || 1
//                           ).toString().length > 4
//                             ? window.innerWidth >= 1024
//                               ? "24px"
//                               : "20px"
//                             : window.innerWidth >= 1024
//                             ? "40px"
//                             : "28px"
//                         }`,
//                         textShadow: "0 0 3px rgba(255,255,255,0.8)",
//                         pointerEvents: "none",
//                         userSelect: "none",
//                       }}
//                     >
//                       x {difficultyArray.multiplier[dinoIndex - 1] || 1}
//                     </div>
//                   </div>
//                 )}
//             </div>
//           )}
//         </motion.div>

//         {/* 🧱 Fragments */}
//         {isLoading && (
//           <>
//             {Array.from({ length: 10 }).map((_, i) => (
//               <div
//                 key={i}
//                 className="inline-block animate-pulse"
//                 style={{
//                   width: `${fragmentWidthVW}vw`,
//                   height: "100%",
//                   backgroundImage: `url(${i === 0 ? fregement1 : fregement2})`,
//                   backgroundSize: "100% 100%",
//                   backgroundRepeat: "no-repeat",
//                   backgroundPosition: "center",
//                   boxSizing: "border-box",
//                   position: "relative",
//                 }}
//               />
//             ))}
//           </>
//         )}

//         {Array.from({ length: fragmentCount }).map((_, i) => {
//           if (isLoading) {
//             return (
//               <div
//                 key={i}
//                 className="inline-block animate-pulse"
//                 style={{
//                   width: `${fragmentWidthVW}vw`,
//                   height: "100%",
//                   backgroundImage: `url(${fregement2})`,
//                   backgroundSize: "100% 100%",
//                   backgroundRepeat: "no-repeat",
//                   backgroundPosition: "center",
//                   boxSizing: "border-box",
//                   position: "relative",
//                 }}
//               />
//             );
//           }

//           const isSecondLast = i - 1 === fragmentCount - 2;
//           const isLast = i === fragmentCount - 1;

//           if (isSecondLast) {
//             return (
//               <div
//                 className="text-white overflow-hidden w-[80vw] lg:w-[18vw]"
//                 key={i}
//                 style={{
//                   display: "inline-block",
//                   height: "100%",
//                   backgroundImage: `url(${lastWall})`,
//                   backgroundSize: "100% 100%",
//                   backgroundRepeat: "no-repeat",
//                   backgroundPosition: "center",
//                   boxSizing: "border-box",
//                   position: "relative",
//                 }}
//               >
//                 <div
//                   className="text-white font-extrabold"
//                   style={{
//                     position: "absolute",
//                     top: "42%",
//                     left: "40%",
//                     transform: "translate(-50%, -50%)",
//                     color: "white",
//                     fontWeight: "black",
//                     fontSize: "40px",
//                     textShadow: "0 0 5px #ffd700",
//                     textAlign: "center",
//                     whiteSpace: "nowrap",
//                     pointerEvents: "none",
//                   }}
//                 ></div>
//                 <p className="h-8 ml-0.0 w-full absolute bottom-0 left-0 bg-[#333647]"></p>
//               </div>
//             );
//           }

//           const fragMultiplier =
//             difficultyArray?.multiplier?.length > 0
//               ? difficultyArray?.multiplier
//               : 1;
//           const isGolden = goldenFragments.includes(i);
//           const isGreen = greenFragments.includes(i);
//           const isRed = redFragments.includes(i);

//           return (
//             <div
//               key={i}
//               style={{
//                 display: "inline-block",
//                 width: `${fragmentWidthVW}vw`,
//                 height: "100%",
//                 boxSizing: "border-box",
//               }}
//             >
//               <div
//                 className="h-[calc(100%-30px)]"
//                 style={{
//                   position: "relative",
//                   width: "100%",
//                   backgroundImage: `url(${
//                     i === 0
//                       ? fregement1
//                       : isGolden
//                       ? goldenBackground
//                       : isGreen
//                       ? greenBackground
//                       : fregement2
//                   })`,
//                   backgroundSize: "100% 100%",
//                   backgroundRepeat: "no-repeat",
//                   backgroundPosition: "center",
//                 }}
//               >
//                 {/* ✅ Red Coin Display After Fire */}
//                 {redFragments.includes(i) && i !== 0 && (
//                   <>
//                     <motion.div
//                       key={`red-${flipStates[i] || 0}`}
//                       initial={{ x: -5 }}
//                       animate={{ x: [-5, 5, -5, 5, 0] }}
//                       transition={{ duration: 0.4, ease: "easeInOut" }}
//                       style={{
//                         position: "absolute",
//                         top: "50%",
//                         transform: "translate(-50%, -50%)",
//                         width: "100%",
//                         height: window.innerWidth >= 1024 ? "180px" : "120px", // 🔥 responsive height
//                         backgroundImage: `url(${RedChicken})`,
//                         backgroundSize: "contain",
//                         backgroundRepeat: "no-repeat",
//                         backgroundPosition: "center",
//                         pointerEvents: "none",
//                         zIndex: 10,
//                       }}
//                     />
//                   </>
//                 )}

//                 {/* Fragment content */}
//                 {!isRed && i !== 0 && i !== fragmentCount - 1 && (
//                   <>
//                     {isGolden && (
//                       <img
//                         src={barrier}
//                         alt="barrier"
//                         className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 top-1/2 -mt-12 sm:-mt-[90px] md:-mt-36 w-[115px] xsm3:w-[120px] xsm2:w-[130px] xsm:w-32 sm:w-[200px] -ml-2 md:w-[280px] 2lg:top-68 "
//                       />
//                     )}
//                     <motion.div
//                       key={flipStates[i] || 0}
//                       initial={{ rotateY: 90 }}
//                       animate={{ rotateY: 0 }}
//                       transition={{ duration: 0.5, ease: "easeInOut" }}
//                       style={{
//                         position: "absolute",
//                         top: "50%",
//                         transform: "translate(-50%, -50%) rotateY(0deg)",
//                         width: "100%",
//                         height: "120px",
//                         backgroundImage: `url(${
//                           isRed
//                             ? RedChicken
//                             : isGolden
//                             ? GoldenChicken
//                             : isGreen
//                             ? ""
//                             : GreyCoin
//                         })`,
//                         backgroundSize: "contain",
//                         backgroundRepeat: "no-repeat",
//                         backgroundPosition: "center",
//                         display: "flex",
//                         alignItems: "center",
//                         justifyContent: "center",
//                         color: "#fff",
//                         fontWeight: "bold",
//                         fontSize: font,
//                         userSelect: "none",
//                         pointerEvents: "none",
//                         textShadow: "0 0 3px rgba(255,255,255,0.8)",
//                         backfaceVisibility: "hidden",
//                         perspective: "1000px",
//                       }}
//                     >
//                       {!isRed &&
//                         !isGolden &&
//                         !isGreen &&
//                         `x${fragMultiplier[i - 1] || 1}`}
//                     </motion.div>
//                   </>
//                 )}

//                 {/* ✅ ENHANCED: Render active cars (both random and fixed) */}
//                 {activeCars[i] && carsInMotion.has(i) && (
//                   <motion.img
//                     data-car-fragment={i}
//                     src={activeCars[i].img}
//                     alt="Car"
//                     className="absolute left-1/2 transform -translate-x-1/2 w-[70%] h-auto z-20"
//                     initial={{ top: "-100%" }}
//                     animate={{ top: "150%" }}
//                     transition={{
//                       duration:
//                         activeCars[i].isRoastCar && redFragments.includes(i)
//                           ? 0.8
//                           : 1.2,
//                       ease: "easeOut",
//                     }}
//                     onAnimationComplete={() =>
//                       handleCarAnimationComplete(i, activeCars[i])
//                     }
//                   />
//                 )}

//                 {/* ✅ Render stopped car image */}
//                 {(() => {
//                   const stoppedCar = stoppedCars.find((car) => car.index === i);
//                   return stoppedCar ? (
//                     <img
//                       src={stoppedCar.img}
//                       alt="Stopped Car"
//                       className="absolute left-1/2 transform -translate-x-1/2 w-[70%] h-auto z-20 top-[-14%] xsm3:top-[-10%] sm:top-[-18%] lg:top-[-20%] 2lg:top-[-30%]"
//                     />
//                   ) : null;
//                 })()}
//               </div>
//               <div
//                 className="text-black text-sm font-semibold w-full text-center"
//                 style={{
//                   height: "30px",
//                   lineHeight: "30px",
//                   zIndex: 1,
//                   backgroundImage: `url(${strip})`,
//                   backgroundSize: "cover",
//                   backgroundRepeat: "no-repeat",
//                   backgroundPosition: "center",
//                 }}
//               ></div>
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// }

export default function PlayGame({
  containerRef,
  fragmentCount,
  regularFragmentCount,
  dinoIndex,
  multiplier,
  difficulty,
  setDifficultyArray,
  difficultyArray,
  setActiveDifficulty,
  activeDifficulty,
  fragmentWidthVW,
  currentAmount,
  goldenEgg,
  goldEgg2,
  goldEgg,
  restartGame,
  resetCoinsTrigger,
  setActiveFireIndex,
  activeFireIndex,
  setIslastSecondSegment,
  islastSecondSegment,
  setCashoutIdByWhenByButton,
  cashoutIdByWhenByButton,
  toggleSound,
  setToggleSound,
  playChickenDeadSound,
  setIsProcessingFragment,
  dinoLandedIndex,
  setDinoLandedIndex,
}) {
  const controls = useAnimation();
  const [currentX, setCurrentX] = useState(0);

  const [greenFragments, setGreenFragments] = useState([]);
  const [goldenFragments, setGoldenFragments] = useState([]);
  const [redFragments, setRedFragments] = useState([]);

  const [flipStates, setFlipStates] = useState({});
  const chickenRef = useRef(null);
  const carRef = useRef(null);
  const [carInMotion, setCarInMotion] = useState(false);
  const [stoppedCars, setStoppedCars] = useState([]);
  const [currentCarImage, setCurrentCarImage] = useState(null);
  const [targetCarFragment] = useState(5);

  // ✅ Track active cars on multiple fragments
  const [activeCars, setActiveCars] = useState({});
  const [carsInMotion, setCarsInMotion] = useState(new Set());

  // ✅ NEW: Track chicken landing time for 500ms protection window
  const [chickenLandingTime, setChickenLandingTime] = useState(null);
  const [isChickenProtected, setIsChickenProtected] = useState(false);

  // Calculate roast multiplier fragment index
  const roastMultiplierFragmentIndex = difficultyArray?.multiplier?.indexOf(
    difficultyArray?.roast_multiplier
  );

  // ✅ Effect to handle localStorage for red fragments
  useEffect(() => {
    if (redFragments.length > 0) {
      localStorage.setItem("redfragment", "true");
      console.log("🔴 Red fragment activated - localStorage set");

      const timer = setTimeout(() => {
        localStorage.removeItem("redfragment");
        console.log("🔴 Red fragment localStorage removed after 1 second");
      }, 2500);

      return () => clearTimeout(timer);
    }
  }, [redFragments]);

  // ✅ Effect to handle chicken death at roast_multiplier fragment
  useEffect(() => {
    if (
      roastMultiplierFragmentIndex >= 0 &&
      dinoIndex === roastMultiplierFragmentIndex + 1
    ) {
      console.log("💀 Chicken reached roast_multiplier fragment and died!");

      setRedFragments((prev) => {
        if (!prev.includes(roastMultiplierFragmentIndex + 1)) {
          return [...prev, roastMultiplierFragmentIndex + 1];
        }
        return prev;
      });

      const roastFragmentIndex = roastMultiplierFragmentIndex + 1;
      setActiveCars((prev) => ({
        ...prev,
        [roastFragmentIndex]: {
          img: getRandomCar(),
          isRoastCar: true,
          fragmentIndex: roastFragmentIndex,
        },
      }));
      setCarsInMotion((prev) => new Set([...prev, roastFragmentIndex]));

      playChickenDeadSound?.();

      setTimeout(() => {
        restartGame();
      }, 2500);
    }
  }, [
    dinoIndex,
    roastMultiplierFragmentIndex,
    playChickenDeadSound,
    restartGame,
  ]);

  // ✅ FIXED: Track chicken landing time and protection status
  useEffect(() => {
    if (dinoIndex > 0) {
      const landingTime = Date.now();
      setChickenLandingTime(landingTime);
      setIsChickenProtected(false);

      console.log(
        `🐔 Chicken landed on fragment ${dinoIndex} at ${landingTime}`
      );

      // Set protection after 500ms
      const protectionTimer = setTimeout(() => {
        setIsChickenProtected(true);
        console.log(
          `🛡️ Chicken is now PROTECTED on fragment ${dinoIndex} (500ms passed)`
        );
      }, 500);

      return () => clearTimeout(protectionTimer);
    } else {
      setChickenLandingTime(null);
      setIsChickenProtected(false);
    }
  }, [dinoIndex]);

  // ✅ Random car spawning logic
  useEffect(() => {
    let timeoutId;

    const spawnRandomCar = () => {
      if (carsInMotion.size >= 3) return;

      const allowedFragments = Array.from({ length: fragmentCount })
        .map((_, index) => index)
        .filter(
          (index) =>
            index !== 0 &&
            index !== fragmentCount - 1 &&
            !goldenFragments.includes(index) &&
            !activeCars[index] &&
            !stoppedCars.some((car) => car.index === index)
        );

      if (allowedFragments.length > 0) {
        const randomIndex =
          allowedFragments[Math.floor(Math.random() * allowedFragments.length)];
        console.log("🚗 Random Car spawning at fragment", randomIndex);

        setActiveCars((prev) => ({
          ...prev,
          [randomIndex]: {
            img: getRandomCar(),
            isRoastCar: false,
            fragmentIndex: randomIndex,
          },
        }));
        setCarsInMotion((prev) => new Set([...prev, randomIndex]));
      }

      const nextSpawnDelay = Math.random() * 3000 + 2000;
      timeoutId = setTimeout(spawnRandomCar, nextSpawnDelay);
    };

    const initialDelay = Math.random() * 2000 + 1000;
    timeoutId = setTimeout(spawnRandomCar, initialDelay);

    return () => clearTimeout(timeoutId);
  }, [
    fragmentCount,
    goldenFragments,
    dinoIndex,
    activeCars,
    stoppedCars,
    carsInMotion,
  ]);

  // Reset fragments on game restart
  useEffect(() => {
    setGreenFragments([]);
    setGoldenFragments([]);
    setRedFragments([]);
    setFlipStates({});
    setDinoLandedIndex(null);
    setStoppedCars([]);
    setActiveCars({});
    setCarsInMotion(new Set());
    setCurrentCarImage(null);
    setChickenLandingTime(null);
    setIsChickenProtected(false);
  }, [resetCoinsTrigger]);

  const vw = window.innerWidth / 100;
  const fragmentWidth = fragmentWidthVW * vw;
  const frequency =
    difficulty?.length > 0 ? difficulty[activeDifficulty - 1]?.frequency : [];

  const intervalTime = 1000 / frequency;

  const userid = localStorage.getItem("userid");
  const { get } = useApi();
  const [status, setStatus] = useState("");

  const profileHandler = () => {
    get(`${apis?.profile}${userid}`)
      .then((res) => {
        if (res?.data?.status === true) {
          if (res?.data?.profile.status == 2) {
            localStorage.removeItem("userid");
            restartGame();
          }
          setStatus(res?.data?.profile.status);
        }
      })
      .catch(console.error);
  };

  // Dino movement logic
  useEffect(() => {
    const newX = dinoIndex * fragmentWidth + fragmentWidth / 2 - 20;

    controls.start({
      x: newX,
      transition: { duration: 0.2, ease: "easeInOut" },
    });

    controls.start({
      y: [0, -10, 0],
      transition: { duration: 0.2, ease: "easeInOut" },
    });

    setCurrentX(newX);
  }, [dinoIndex, activeDifficulty]);

  useEffect(() => {
    if (dinoIndex === fragmentCount - 2) {
      setIslastSecondSegment(true);
    }
  }, [dinoIndex, fragmentCount]);

  const getMultiplierByIndex = (i) => {
    let base =
      difficultyArray?.multiplier?.length > 0
        ? difficultyArray?.multiplier[i - 1]
        : [];
    return i >= 1 ? parseFloat(base) : null;
  };

  const [font, setFont] = useState("25px");
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (400 < width <= 600) setFont("20px");
      if (width <= 1024) setFont("40px");
      if (width <= 400) setFont("25px");
      else setFont("20px");
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const isLoading =
    !difficultyArray?.multiplier || difficultyArray?.multiplier.length === 0;

  setTimeout(() => {
    setIsProcessingFragment(false);
  }, 2000);

  const [bottom, setBottom] = useState("52px");
  const fireBottom = `${parseFloat(bottom) - 20}px`;

  const cars = [Car, Car1, Car2, Car3, Car4, Car5, Car6, Car7, Car8, Car9];

  const getRandomCar = () => {
    const randomIndex = Math.floor(Math.random() * cars.length);
    return cars[randomIndex];
  };

  const [randomCars, setRandomCars] = useState([]);

  useEffect(() => {
    const fireCount = 10;
    const generated = Array.from({ length: fireCount }, () => getRandomCar());
    setRandomCars(generated);
  }, []);

  const isColliding = (el1, el2) => {
    if (!el1 || !el2) return false;
    const rect1 = el1.getBoundingClientRect();
    const rect2 = el2.getBoundingClientRect();

    return !(
      rect1.top > rect2.bottom ||
      rect1.bottom < rect2.top ||
      rect1.right < rect2.left ||
      rect1.left > rect2.right
    );
  };

  const previousDinoIndexRef = useRef(dinoIndex);

  useEffect(() => {
    if (previousDinoIndexRef.current !== dinoIndex) {
      console.log(`🐔 Chicken landed on fragment ${dinoIndex}`);
      previousDinoIndexRef.current = dinoIndex;
    }
  }, [dinoIndex]);

  const [carY, setCarY] = useState(0);

  // Fragment state management
  useEffect(() => {
    if (dinoIndex > 0) {
      const previousFragment = dinoIndex - 1;

      setGoldenFragments((prev) => {
        if (!prev.includes(previousFragment)) {
          return [...prev, previousFragment];
        }
        return prev;
      });

      setFlipStates((prev) => ({
        ...prev,
        [previousFragment]: (prev[previousFragment] || 0) + 1,
      }));
    }

    if (dinoIndex >= 0 && dinoIndex !== roastMultiplierFragmentIndex + 1) {
      setGreenFragments((prev) => {
        if (!prev.includes(dinoIndex)) {
          return [...prev, dinoIndex];
        }
        return prev;
      });

      setFlipStates((prev) => ({
        ...prev,
        [dinoIndex]: (prev[dinoIndex] || 0) + 1,
      }));
    }
  }, [dinoIndex, roastMultiplierFragmentIndex]);

  const [carImages, setCarImages] = useState({});

  const spawnCarImage = (i) => {
    const newImg = getRandomCar();
    setCarImages((prev) => ({ ...prev, [i]: newImg }));
    return newImg;
  };

  // barrier state - shows when chicken is protected
  const [showBarrier, setShowBarrier] = useState(false);

  useEffect(() => {
    if (dinoIndex > 0) {
      setShowBarrier(false);
      const timer = setTimeout(() => {
        setShowBarrier(true);
        console.log(
          `🛡️ Barrier visible! Chicken is safe on fragment ${dinoIndex}`
        );
      }, 500);

      return () => clearTimeout(timer);
    }
  }, [dinoIndex]);

  // ✅ CORRECTED: Collision detection with proper 500ms timing logic
  useEffect(() => {
    if (carsInMotion.size === 0) return;

    const checkCollisions = () => {
      const chicken = chickenRef.current;
      if (!chicken) return;

      Object.entries(activeCars).forEach(([fragmentIndex, carData]) => {
        const fragIndex = parseInt(fragmentIndex);
        if (!carsInMotion.has(fragIndex)) return;

        const carElement = document.querySelector(
          `[data-car-fragment="${fragmentIndex}"]`
        );
        if (!carElement) return;

        // Check collision if chicken is on the same fragment
        if (fragIndex === dinoIndex && isColliding(chicken, carElement)) {
          // ✅ KEY LOGIC: Check if chicken has been protected for 500ms
          if (isChickenProtected) {
            console.log(
              `🛑 Car hit PROTECTED chicken at fragment ${fragmentIndex}! Car will STOP.`
            );

            // Remove from active cars
            setActiveCars((prev) => {
              const newActiveCars = { ...prev };
              delete newActiveCars[fragmentIndex];
              return newActiveCars;
            });
            setCarsInMotion((prev) => {
              const newSet = new Set(prev);
              newSet.delete(fragIndex);
              return newSet;
            });

            // Add to stopped cars - car stops, chicken survives
            setStoppedCars((prev) => [
              ...prev,
              { index: fragIndex, img: carData.img },
            ]);
          } else {
            console.log(
              `💥 Car hit UNPROTECTED chicken at fragment ${fragmentIndex}! Chicken dies.`
            );

            playChickenDeadSound?.();

            // Mark fragment as red
            setRedFragments((prev) => {
              if (!prev.includes(fragIndex)) {
                return [...prev, fragIndex];
              }
              return prev;
            });

            // Remove from active cars
            setActiveCars((prev) => {
              const newActiveCars = { ...prev };
              delete newActiveCars[fragmentIndex];
              return newActiveCars;
            });
            setCarsInMotion((prev) => {
              const newSet = new Set(prev);
              newSet.delete(fragIndex);
              return newSet;
            });

            // Add to stopped cars and restart game
            setStoppedCars((prev) => [
              ...prev,
              { index: fragIndex, img: carData.img },
            ]);

            setTimeout(() => {
              restartGame();
            }, 1500);
          }
        }
      });
    };

    const interval = setInterval(checkCollisions, 50);
    return () => clearInterval(interval);
  }, [
    carsInMotion,
    dinoIndex,
    activeCars,
    isChickenProtected,
    playChickenDeadSound,
    restartGame,
  ]);

  useEffect(() => {
    if (difficultyArray?.multiplier?.length > 0) {
      console.log("🎯 All multipliers:", difficultyArray);
    }
  }, [difficultyArray]);

  // ✅ CORRECTED: Handle car animation completion
  const handleCarAnimationComplete = (fragmentIndex, carData) => {
    console.log(`🚗 Car animation completed at fragment ${fragmentIndex}`);

    // Remove from active cars and cars in motion
    setActiveCars((prev) => {
      const newActiveCars = { ...prev };
      delete newActiveCars[fragmentIndex];
      return newActiveCars;
    });
    setCarsInMotion((prev) => {
      const newSet = new Set(prev);
      newSet.delete(fragmentIndex);
      return newSet;
    });

    // If this was a roast car crossing over dead chicken, don't add to stopped cars
    if (carData.isRoastCar && redFragments.includes(fragmentIndex)) {
      console.log(
        `🚗 Roast car crossed over dead chicken at fragment ${fragmentIndex}`
      );
      return;
    }

    // ✅ CORRECTED LOGIC: Only check collision timing if chicken is on this fragment
    if (fragmentIndex === dinoIndex) {
      if (isChickenProtected) {
        // Chicken has been protected for 500ms+ - car should stop
        console.log(
          `🛑 Car completed animation and stopped! Chicken was protected on fragment ${fragmentIndex}`
        );
        setStoppedCars((prev) => [
          ...prev,
          { index: fragmentIndex, img: carData.img },
        ]);
      } else {
        // This case should be handled by the collision detection above
        // But if we reach here, it means collision wasn't detected during animation
        console.log(
          `🚗 Car passed through fragment ${fragmentIndex} without collision detection`
        );
      }
    } else {
      // Car reached fragment where chicken is not present
      console.log(`🚗 Car passed through empty fragment ${fragmentIndex}`);
    }
  };

  return (
    <div className="relative h-full overflow-auto">
      {/* Fixed Notification */}
      <div className="absolute top-0 left-4 z-40">
        <Notification message="🔥 Watch out! Fire may hit!" />
      </div>
      <div
        ref={containerRef}
        className="scroll-container"
        style={{
          overflowX: "auto",
          overflowY: "hidden",
          whiteSpace: "nowrap",
          position: "relative",
          scrollBehavior: "smooth",
          height: "100%",
        }}
      >
        {/* Chicken - Hide if collided */}
        <motion.div
          animate={controls}
          style={{
            position: "absolute",
            top: "50%",
            transform: "translateY(-50%)",
            width: "50px",
            height: "60px",
            zIndex: 40,
            display: redFragments.includes(dinoIndex) ? "none" : "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {dinoIndex === null || dinoIndex === 0 ? (
            <img
              className={`max-w-[160px] sm:max-w-[220px] md:max-w-[320px]  lg:max-w-[120px] 2lg:max-w-[180px] h-auto object-contain`}
              src={cuttedChicken}
              alt="cutted Chicken"
              style={{ transform: "translateX(20px)" }}
            />
          ) : (
            <div>
              {/* Barrier image appears after 500ms */}
              {showBarrier && dinoIndex !== fragmentCount - 1 && (
                <motion.img
                  src={barrier}
                  alt="barrier"
                  className="-mb-14 lg:-mb-12 w-[115px] xsm3:w-[120px] xsm2:w-[130px] xsm:w-[110px] xsm:ml-1 sm:ml-4 sm:w-[160px] md:w-[200px] md:ml-10 md:-mb-16 2lg:w-[150px] 2lg:ml-0 2lg:-mb-4"
                  initial={{ y: -100, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                />
              )}
              <img
                className={`max-w-[150px] sm:max-w-[220px] md:max-w-[320px] lg:max-w-[120px] 2lg:max-w-[180px] h-auto object-contain -ml-1 mt-16 `}
                ref={chickenRef}
                src={ChickenGif}
                alt="Chicken"
              />
              {/* Multiplier below chicken when it's green */}
              {difficultyArray?.multiplier?.length > 0 &&
                dinoIndex > 0 &&
                dinoIndex !== fragmentCount - 1 && (
                  <div className="relative w-full h-full mx-auto">
                    <img
                      src={multiplerBackground}
                      alt="multiplier"
                      className="w-full h-full object-contain -ml-2"
                    />
                    <div
                      className="absolute inset-0 flex items-center justify-center text-white font-bold pt-2 -ml-4"
                      style={{
                        fontSize: `${
                          (
                            difficultyArray?.multiplier?.[dinoIndex - 1] || 1
                          ).toString().length > 4
                            ? window.innerWidth >= 1024
                              ? "24px"
                              : "20px"
                            : window.innerWidth >= 1024
                            ? "40px"
                            : "28px"
                        }`,
                        textShadow: "0 0 3px rgba(255,255,255,0.8)",
                        pointerEvents: "none",
                        userSelect: "none",
                      }}
                    >
                      x {difficultyArray.multiplier[dinoIndex - 1] || 1}
                    </div>
                  </div>
                )}
            </div>
          )}
        </motion.div>

        {/* Fragments */}
        {isLoading && (
          <>
            {Array.from({ length: 10 }).map((_, i) => (
              <div
                key={i}
                className="inline-block animate-pulse"
                style={{
                  width: `${fragmentWidthVW}vw`,
                  height: "100%",
                  backgroundImage: `url(${i === 0 ? fregement1 : fregement2})`,
                  backgroundSize: "100% 100%",
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "center",
                  boxSizing: "border-box",
                  position: "relative",
                }}
              />
            ))}
          </>
        )}

        {Array.from({ length: fragmentCount }).map((_, i) => {
          if (isLoading) {
            return (
              <div
                key={i}
                className="inline-block animate-pulse"
                style={{
                  width: `${fragmentWidthVW}vw`,
                  height: "100%",
                  backgroundImage: `url(${fregement2})`,
                  backgroundSize: "100% 100%",
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "center",
                  boxSizing: "border-box",
                  position: "relative",
                }}
              />
            );
          }

          const isSecondLast = i - 1 === fragmentCount - 2;
          const isLast = i === fragmentCount - 1;

          if (isSecondLast) {
            return (
              <div
                className="text-white overflow-hidden w-[80vw] lg:w-[18vw]"
                key={i}
                style={{
                  display: "inline-block",
                  height: "100%",
                  backgroundImage: `url(${lastWall})`,
                  backgroundSize: "100% 100%",
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "center",
                  boxSizing: "border-box",
                  position: "relative",
                }}
              >
                <div
                  className="text-white font-extrabold"
                  style={{
                    position: "absolute",
                    top: "42%",
                    left: "40%",
                    transform: "translate(-50%, -50%)",
                    color: "white",
                    fontWeight: "black",
                    fontSize: "40px",
                    textShadow: "0 0 5px #ffd700",
                    textAlign: "center",
                    whiteSpace: "nowrap",
                    pointerEvents: "none",
                  }}
                ></div>
                <p className="h-8 ml-0.0 w-full absolute bottom-0 left-0 bg-[#333647]"></p>
              </div>
            );
          }

          const fragMultiplier =
            difficultyArray?.multiplier?.length > 0
              ? difficultyArray?.multiplier
              : 1;
          const isGolden = goldenFragments.includes(i);
          const isGreen = greenFragments.includes(i);
          const isRed = redFragments.includes(i);

          return (
            <div
              key={i}
              style={{
                display: "inline-block",
                width: `${fragmentWidthVW}vw`,
                height: "100%",
                boxSizing: "border-box",
              }}
            >
              <div
                className="h-[calc(100%-30px)]"
                style={{
                  position: "relative",
                  width: "100%",
                  backgroundImage: `url(${
                    i === 0
                      ? fregement1
                      : isGolden
                      ? goldenBackground
                      : isGreen
                      ? greenBackground
                      : fregement2
                  })`,
                  backgroundSize: "100% 100%",
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "center",
                }}
              >
                {/* Red Coin Display After Fire */}
                {redFragments.includes(i) && i !== 0 && (
                  <>
                    <motion.div
                      key={`red-${flipStates[i] || 0}`}
                      initial={{ x: -5 }}
                      animate={{ x: [-5, 5, -5, 5, 0] }}
                      transition={{ duration: 0.4, ease: "easeInOut" }}
                      style={{
                        position: "absolute",
                        top: "50%",
                        transform: "translate(-50%, -50%)",
                        width: "100%",
                        height: window.innerWidth >= 1024 ? "180px" : "120px",
                        backgroundImage: `url(${RedChicken})`,
                        backgroundSize: "contain",
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "center",
                        pointerEvents: "none",
                        zIndex: 10,
                      }}
                    />
                  </>
                )}

                {/* Fragment content */}
                {!isRed && i !== 0 && i !== fragmentCount - 1 && (
                  <>
                    {isGolden && (
                      <img
                        src={barrier}
                        alt="barrier"
                        className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 top-1/2 -mt-12 sm:-mt-[90px] md:-mt-36 w-[115px] xsm3:w-[120px] xsm2:w-[130px] xsm:w-32 sm:w-[200px] -ml-2 md:w-[280px] 2lg:top-68 "
                      />
                    )}
                    <motion.div
                      key={flipStates[i] || 0}
                      initial={{ rotateY: 90 }}
                      animate={{ rotateY: 0 }}
                      transition={{ duration: 0.5, ease: "easeInOut" }}
                      style={{
                        position: "absolute",
                        top: "50%",
                        transform: "translate(-50%, -50%) rotateY(0deg)",
                        width: "100%",
                        height: "120px",
                        backgroundImage: `url(${
                          isRed
                            ? RedChicken
                            : isGolden
                            ? GoldenChicken
                            : isGreen
                            ? ""
                            : GreyCoin
                        })`,
                        backgroundSize: "contain",
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "center",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "#fff",
                        fontWeight: "bold",
                        fontSize: font,
                        userSelect: "none",
                        pointerEvents: "none",
                        textShadow: "0 0 3px rgba(255,255,255,0.8)",
                        backfaceVisibility: "hidden",
                        perspective: "1000px",
                      }}
                    >
                      {!isRed &&
                        !isGolden &&
                        !isGreen &&
                        `x${fragMultiplier[i - 1] || 1}`}
                    </motion.div>
                  </>
                )}

                {/* Render active cars */}
                {activeCars[i] && carsInMotion.has(i) && (
                  <motion.img
                    data-car-fragment={i}
                    src={activeCars[i].img}
                    alt="Car"
                    className="absolute left-1/2 transform -translate-x-1/2 w-[70%] h-auto z-20"
                    initial={{ top: "-100%" }}
                    animate={{ top: "150%" }}
                    transition={{
                      duration:
                        activeCars[i].isRoastCar && redFragments.includes(i)
                          ? 0.8
                          : 1.2,
                      ease: "easeOut",
                    }}
                    onAnimationComplete={() =>
                      handleCarAnimationComplete(i, activeCars[i])
                    }
                  />
                )}

                {/* Render stopped car image */}
                {(() => {
                  const stoppedCar = stoppedCars.find((car) => car.index === i);
                  return stoppedCar ? (
                    <img
                      src={stoppedCar.img}
                      alt="Stopped Car"
                      className="absolute left-1/2 transform -translate-x-1/2 w-[70%] h-auto z-20 top-[-14%] xsm3:top-[-10%] sm:top-[-18%] lg:top-[-20%] 2lg:top-[-30%]"
                    />
                  ) : null;
                })()}
              </div>
              <div
                className="text-black text-sm font-semibold w-full text-center"
                style={{
                  height: "30px",
                  lineHeight: "30px",
                  zIndex: 1,
                  backgroundImage: `url(${strip})`,
                  backgroundSize: "cover",
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "center",
                }}
              ></div>
            </div>
          );
        })}
      </div>
    </div>
  );
}