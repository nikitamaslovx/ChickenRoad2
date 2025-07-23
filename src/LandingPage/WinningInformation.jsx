import React, {useState, useEffect} from 'react'
import gamecategorycasino from "../assets/usaAsset/homeScreen/rummyicon.png";
import gamecategoryloby from "../assets/usaAsset/homeScreen/sportsicon.png";
import gamecategorypoker from "../assets/usaAsset/homeScreen/gamecategorypoker.png";
import lotterycategorywingo from "../assets/usaAsset/homeScreen/lotterycategorywingo.png";
import lotterycategorytrx from "../assets/usaAsset/homeScreen/lotterycategorytrx.png";
import person1 from "../assets/usaAsset/homeScreen/person1.png";
import person2 from "../assets/usaAsset/homeScreen/person2.png";
import person3 from "../assets/usaAsset/homeScreen/person3.png";
import person4 from "../assets/usaAsset/homeScreen/person4.png";
import person5 from "../assets/usaAsset/homeScreen/person5.png";
import person6 from "../assets/usaAsset/homeScreen/person6.png";
import person7 from "../assets/usaAsset/homeScreen/person7.png";
import person8 from "../assets/usaAsset/homeScreen/person8.png";
import person9 from "../assets/usaAsset/homeScreen/person9.png";
import person10 from "../assets/usaAsset/homeScreen/person10.png";
import person11 from "../assets/usaAsset/homeScreen/person11.png";
import person12 from "../assets/usaAsset/homeScreen/person12.png";
import person13 from "../assets/usaAsset/homeScreen/person13.png";
import person14 from "../assets/usaAsset/homeScreen/person14.png";
import person15 from "../assets/usaAsset/homeScreen/person15.png";
import person16 from "../assets/usaAsset/homeScreen/person16.png";
import person17 from "../assets/usaAsset/homeScreen/person17.png";
import person18 from "../assets/usaAsset/homeScreen/person18.png";
import person19 from "../assets/usaAsset/homeScreen/person19.png";
import person20 from "../assets/usaAsset/homeScreen/person20.png";
import DailyProfitRankStage from "../assets/usaAsset/homeScreen/Stage.png";
import rankbg1 from "../assets/usaAsset/homeScreen/rankbg1.png";
import rankbg2 from "../assets/usaAsset/homeScreen/rankbg2.png";
import rankbg3 from "../assets/usaAsset/homeScreen/rankbg3.png";
import no1badge from "../assets/usaAsset/homeScreen/no1badge.png";
import no2badge from "../assets/usaAsset/homeScreen/no2badge.png";
import no3badge from "../assets/usaAsset/homeScreen/no3badge.png";
import crownno1 from "../assets/usaAsset/homeScreen/crownno1.png";
import crownno2 from "../assets/usaAsset/homeScreen/crownno2.png";
import crownno3 from "../assets/usaAsset/homeScreen/crownno3.png";

export default function WinningInformation() {
  const [currentIndexWin, setCurrentIndexWin] = useState(0);
  const winningData = [
    {
      id: 1,
      avatar: person1,
      gameImage: gamecategorycasino,
      name: "Mem***CQF",
      amount: "600.00",
    },
    {
      id: 2,
      avatar: person2,
      gameImage: lotterycategorywingo,
      name: "Mem***CDM",
      amount: "95.00",
    },
    {
      id: 3,
      avatar: person3,
      gameImage: lotterycategorytrx,
      name: "Mem***JVW",
      amount: "540.00",
    },
    {
      id: 4,
      avatar: person4,
      gameImage: gamecategorycasino,
      name: "Mem***QGS",
      amount: "170.00",
    },
    {
      id: 5,
      avatar: person5,
      gameImage: gamecategorycasino,
      name: "Mem***UUQ",
      amount: "600.00",
    },
    {
      id: 6,
      avatar: person6,
      gameImage: gamecategorycasino,
      name: "Mem***GTR",
      amount: "85.00",
    },
    {
      id: 7,
      avatar: person7,
      gameImage: lotterycategorywingo,
      name: "Mem***WTY",
      amount: "430.00",
    },
    {
      id: 8,
      avatar: person8,
      gameImage: gamecategorycasino,
      name: "Mem***HSD",
      amount: "190.00",
    },
    {
      id: 9,
      avatar: person9,
      gameImage: lotterycategorytrx,
      name: "Mem***JKL",
      amount: "310.00",
    },
    {
      id: 10,
      avatar: person10,
      gameImage: gamecategorycasino,
      name: "Mem***PQR",
      amount: "725.00",
    },
    {
      id: 11,
      avatar: person11,
      gameImage: gamecategorycasino,
      name: "Mem***XYZ",
      amount: "245.00",
    },
    {
      id: 12,
      avatar: person12,
      gameImage: lotterycategorywingo,
      name: "Mem***AAA",
      amount: "560.00",
    },
    {
      id: 13,
      avatar: person13,
      gameImage: lotterycategorytrx,
      name: "Mem***BBB",
      amount: "670.00",
    },
    {
      id: 14,
      avatar: person14,
      gameImage: gamecategorycasino,
      name: "Mem***CCC",
      amount: "380.00",
    },
    {
      id: 15,
      avatar: person15,
      gameImage: lotterycategorywingo,
      name: "Mem***DDD",
      amount: "290.00",
    },
    {
      id: 16,
      avatar: person16,
      gameImage: lotterycategorytrx,
      name: "Mem***EEE",
      amount: "820.00",
    },
    {
      id: 17,
      avatar: person17,
      gameImage: lotterycategorytrx,
      name: "Mem***FFF",
      amount: "430.00",
    },
    {
      id: 18,
      avatar: person18,
      gameImage: lotterycategorytrx,
      name: "Mem***GGG",
      amount: "600.00",
    },
    {
      id: 19,
      avatar: person19,
      gameImage: gamecategorycasino,
      name: "Mem***HHH",
      amount: "950.00",
    },
    {
      id: 20,
      avatar: person20,
      gameImage: gamecategorycasino,
      name: "Mem***III",
      amount: "110.00",
    },
  ];
  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentIndexWin((prevIndex) =>
        prevIndex + 1 >= winningData.length ? 0 : prevIndex + 1
      );
    }, 2000);

    return () => clearInterval(intervalId);
  }, [winningData.length]);

  const visibleData = [
    ...winningData.slice(currentIndexWin, currentIndexWin + 5),
    ...(currentIndexWin + 5 > winningData.length
      ? winningData.slice(0, (currentIndexWin + 5) % winningData.length)
      : []),
  ].slice(0, 5);

  return (
    <div>
      <div className="p-3 text-white  mx-auto ">
        <h2 className="text-lg font-semibold mb-4">Winning information</h2>
        <div className="space-y-2 overflow-hidden">
          {visibleData
            .slice()
            .reverse() // Reverse to add new data at the top
            .map((data) => (
              <div
                key={data.id}
                className="flex items-center justify-start gap-6 p-3 rounded-lg shadow-md transform transition-transform duration-500 ease-in-out bg-[#2B3270]"
                style={{
                  animation: `fadeInFromTop 300ms ease-in-out`,
                }}
              >
                <div className="flex items-center space-x-1 xsm:space-x-2 w-[35%]">
                  <img
                    src={data.avatar}
                    alt="Avatar"
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <p className="text-xs 3xl:text-xs font-semibold">
                    {data.name}
                  </p>
                </div>
                <div className="flex w-[65%] gap-2">
                  <div className="bg-[#374992] flex justify-center items-center rounded-lg w-[4.2rem] h-12">
                    <img
                      src={data.gameImage}
                      alt="Game"
                      className="w-12 h-9 rounded-md object-fill"
                    />
                  </div>
                  <div className="flex flex-col justify-start items-start">
                    <p className="text-xsm text-nowrap text-white font-bold">
                      Receive {data.amount}
                    </p>
                    <p className="text-[10px] text-nowrap text-slate-300 font-normal ">
                      Winning amount
                    </p>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
