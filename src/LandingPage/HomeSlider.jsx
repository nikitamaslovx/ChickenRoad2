// // components/GameSlider.jsx
// import React, {useState, useEffect} from "react";
// import { Swiper, SwiperSlide } from "swiper/react";
// import "swiper/css";
// import "swiper/css/pagination";
// import slider1 from "../assets/chicken Slider.png";
// import slider2 from "../assets/chicken Slider2.png";
// import useApi from "../hooks/useApi";
// import { apis } from "../utils/apis";
// // import slider1 from "../assets/chicken Slider1.jpg";
// // import slider2 from "../assets/chicken Slider2.jpg";

// import { Pagination, Autoplay } from "swiper/modules";

// const HomeSlider = () => {
//   const { get } = useApi();
//   const [sliderImage, setSliderImage] = useState('')

//   const fetchData=async()=>{
//        try {
//           const res = await get(
//             `${apis?.banner_image}`
//           );
//           console.log("res :", res.data);
//           setSliderImage(res.data.data.image);
//           // if (res?.data?.status === true) {
//           //   profileHandler();
//           // }
//         } catch (error) {
//           console.error(error);
//         }
//   }

//   useEffect(()=>{
//     fetchData()
//   },[])
  
//   const slides = [
//     {
//       id: 1,
//       image: slider1, // 🔁 Replace with your image path
//       link: "",
//       title: "",
//       subtitle: "",
//     },
//     {
//       id: 2,
//       image: slider2,
//       link: "",
//       title: "",
//       subtitle: "",
//     },
//   ];

//   return (
//     <div className="w-full  mx-auto px-4 py-6 lg:px-0 lg:py-2 lg:w-[95vw]">
//       <style>
//         {`
//           .swiper-pagination-bullet {
//             background-color: white;
//             opacity: 0.6;
//           }
//           .swiper-pagination-bullet-active {
//             background-color: white;
//             opacity: 1;
//           }
//         `}
//       </style>
//       <Swiper
//         modules={[Pagination, Autoplay]}
//         pagination={{ clickable: true }}
//         autoplay={{ delay: 3000 }}
//         loop={true}
//         className="rounded-xl overflow-hidden"
//       >
//         {slides.map((slide) => (
//           <SwiperSlide key={slide.id}>
//             <div className="relative">
//               <img
//                 src={slide.image}
//                 alt={slide.title}
//                 className="w-full h-auto  block"
//               />
//             </div>
//           </SwiperSlide>
//         ))}
//       </Swiper>
//     </div>
//   );
// };

// export default HomeSlider;


import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination, Autoplay } from "swiper/modules";
import useApi from "../hooks/useApi";
import { apis } from "../utils/apis";

const HomeSlider = () => {
  const { get } = useApi();
  const [sliderImages, setSliderImages] = useState([]);

  const fetchData = async () => {
    try {
      const res = await get(`${apis?.banner_image}`);
      if (res?.data?.data) {
        setSliderImages(res.data.data);
      }
    } catch (error) {
      console.error("Failed to fetch slider images:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="w-full mx-auto px-4 py-6 lg:px-0 lg:py-2 lg:w-[95vw]">
      <style>
        {`
          .swiper-pagination-bullet {
            background-color: white;
            opacity: 0.6;
          }
          .swiper-pagination-bullet-active {
            background-color: white;
            opacity: 1;
          }
        `}
      </style>

      <Swiper
        modules={[Pagination, Autoplay]}
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000 }}
        loop={true}
        className="rounded-xl overflow-hidden"
      >
        {sliderImages.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div className="relative">
              <a  target="_blank" rel="noopener noreferrer">
                <img
                  src={slide.image}
                  alt={slide.title}
                  className="w-full h-auto block"
                />
              </a>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default HomeSlider;
