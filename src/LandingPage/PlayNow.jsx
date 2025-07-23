// import React from 'react'
// import chickenRoadGame from "../assets/chickenRoadGameCoverImage.png";

// export default function PlayNow() {
//   return (
//     <div>
//       <div
//         style={{ backgroundImage: `url(${chickenRoadGame})` }}
//         className="w-full gap-2 pt-2 bg-cover bg-center h-[100px] rounded-[15px] mt-1 cursor-pointer"
//         onClick={() => navigate("/chickenroad")}
//       >
//         {/* <h1>Chicken Road</h1> */}
//       </div>
//     </div>
//   );
// }


import React from "react";
import chickenRoadGame from "../assets/chickenRoadGameCoverImage.png";
import { useNavigate } from "react-router-dom";

export default function PlayNow() {
  const navigate = useNavigate();

  return (
    <div
      className="mt-1 cursor-pointer rounded-[15px] overflow-hidden p-2"
      onClick={() => navigate("/chickenroad")}
    >
      <img
        src={chickenRoadGame}
        alt="Chicken Road Game"
        className="w-full h-auto  block"
      />
    </div>
  );
}
