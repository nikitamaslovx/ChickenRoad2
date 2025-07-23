import React, { useState, useEffect } from "react";
import { RiFireFill } from "react-icons/ri";
import micphone from "../assets/micphone.png";

const notes = [
  "Welcome to the Chicken Road Game! Greetings, Gamers and Enthusiasts! the Chicken Road Game",
  "Please be sure to always use our official website for playing the games with the fol",
  "If your deposit is not received, Please send it directly to Chicken Road Game Self-service Ce",
];



export default function Announce()

{
    const [currentIndex, setCurrentIndex] = useState(0);
    const [noteValue, setNoteValue] = useState(notes[0]);
    const [animate, setAnimate] = useState(false);


    useEffect(() => {
      const intervalId = setInterval(() => {
        setAnimate(true);
        setTimeout(() => {
          setCurrentIndex((prevIndex) => (prevIndex + 1) % notes.length);
          setNoteValue(notes[(currentIndex + 1) % notes.length]);

          setAnimate(false);
        }, 1000);
      }, 2000);

      return () => clearInterval(intervalId);
    }, [currentIndex, notes]);
  return (
    <div>
      <div className="p-4 flex items-center justify-center w-full">
        <div className="px-3 flex shadow-lg justify-between w-full gap-1 items-center bg-[#374992]  p-1 rounded-full ">
          <div className="shrink-0">
            {" "}
            <img className="h-5 w-5" src={micphone} alt="ds" />{" "}
          </div>
          <div className="h-10 flex items-center overflow-hidden">
            <div
              className={`flex-1 font-bold xsm:flex-0 text-white w-[80%] xsm:w-[19rem] text-[10px] xsm:text-[8px] overflow-hidden text-ellipsis whitespace-normal break-words transition-transform duration-1000 ease-in-out ${
                animate
                  ? "transform -translate-y-full"
                  : "transform translate-y-0"
              }`}
              style={{
                transform: animate ? "translateY(-100%)" : "translateY(0)",
              }}
            >
              {noteValue}
            </div>
          </div>
          <div className="shrink-0 w-[20%] font-bold xsm:w-[22%] py-1 text-white text-xs bg-red flex gap-1 justify-center items-center  rounded-3xl">
            <RiFireFill className="" />
            Detail
          </div>
        </div>
      </div>
    </div>
  );
}
