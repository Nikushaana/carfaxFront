"use client";

import React, { useEffect, useRef, useState } from "react";
import { Swiper, SwiperClass, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, EffectFade } from "swiper/modules";
import ScreenWidth from "../screenwidth/ScreenWidth";
import Card1 from "../cardsStyles/card1";
import { BiChevronLeft } from "react-icons/bi";
import { BiChevronRight } from "react-icons/bi";
import Card2 from "../cardsStyles/card2";
import Card3 from "../cardsStyles/card3";
import LoaderCust from "../loader/LoaderCust";

export default function Slider1({ title, data, loader }: any) {
  let swiperRef = useRef<SwiperClass>(null!);
  const screenWidth = ScreenWidth();
  const [slidesPerView, setSlidesPerView] = useState(6);

  useEffect(() => {
    if (screenWidth >= 1540) {
      setSlidesPerView(5);
    } else if (screenWidth <= 1540 && screenWidth >= 1300) {
      setSlidesPerView(4);
    } else if (screenWidth <= 1300 && screenWidth >= 900) {
      setSlidesPerView(3);
    } else if (screenWidth <= 900 && screenWidth >= 530) {
      setSlidesPerView(2);
    } else if (screenWidth <= 530) {
      setSlidesPerView(1);
    }
  }, [screenWidth]);

  return (
    <div className="flex flex-col gap-5 items-center">
      <h1 className="text-white text-[25px] text-center">{title}</h1>

      <hr className="h-[1px] bg-white w-full" />

      {loader ? (
        <div
          className="h-[100px] 
              pointer-event-none flex items-center justify-center"
        >
          <div className="w-[40px] h-[40px] flex items-center justify-center text-white">
            <LoaderCust />
          </div>
        </div>
      ) : data.length > 0 ?
        <div className="flex flex-col items-center w-full gap-5">
          <Swiper
            modules={[Autoplay, EffectFade]}
            slidesPerView={slidesPerView}
            spaceBetween={20}
            loop={true}
            className="w-full items-stretch"
            autoplay={{
              delay: 2000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            onBeforeInit={(swiper) => {
              swiperRef.current = swiper;
            }}
            speed={1200}
          >
            {data.map((item: any) => (
              <SwiperSlide key={item.id}>
                {(title == "ავტომობილები" ||
                  title == "შემოთავაზებული ავტომობილები") && (
                  <Card1 item={item} />
                )}
                {(title == "ავტონაწილები" ||
                  title == "შემოთავაზებული ავტონაწილები") && (
                  <Card2 item={item} />
                )}
                {(title == "სერვისები" ||
                  title == "შემოთავაზებული სერვის ცენტრები") && (
                  <Card3 item={item} />
                )}
              </SwiperSlide>
            ))}
          </Swiper>
          {data.length > 4 && (
            <div className="flex gap-[10px] items-center">
              <button
                className={`w-[60px] h-[40px] flex items-center justify-center text-[22px] text-white hover:bg-white hover:text-black duration-100 border-[1px] rounded-full`}
                onClick={() => swiperRef.current?.slidePrev()}
              >
                <BiChevronLeft className="" />
              </button>
              <button
                className={`w-[60px] h-[40px] flex items-center justify-center text-[22px] text-white hover:bg-white hover:text-black duration-100 border-[1px] rounded-full
            `}
                onClick={() => swiperRef.current?.slideNext()}
              >
                <BiChevronRight className="" />
              </button>
            </div>
          )}
        </div>
      : <p className="text-gray-400 w-full text-[14px]">ინფორმაცია ვერ მოიძებნა..</p>}
    </div>
  );
}
