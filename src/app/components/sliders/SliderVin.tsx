"use client";

import React, { useContext, useRef } from "react";
import { Swiper, SwiperClass, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, EffectFade } from "swiper/modules";
import { BiChevronLeft } from "react-icons/bi";
import { BiChevronRight } from "react-icons/bi";
import Image from "next/image";
import { IoCameraOutline } from "react-icons/io5";
import { AxiosForSharingStatesAxiosContext } from "../../../../useContexts/sharedStates";
import ScreenWidth from "../screenwidth/ScreenWidth";

export default function SliderVin({ data, service }) {
  const { setOpenVinImgPopup } = useContext(AxiosForSharingStatesAxiosContext);
  let swiperRef = useRef<SwiperClass>(null!);
  const screenWidth = ScreenWidth();
  return (
    <div className="grid grid-cols-3 max-lg:grid-cols-2 max-sm:grid-cols-1 grid-rows-1 items-center w-full h-full  relative overflow-hidden">
      {data.map((item) => (
        <div key={item} className="relative w-full h-full">
          <Image
            src={item}
            alt={""}
            sizes="500px"
            fill
            style={{
              objectFit: "cover",
            }}
          />
        </div>
      ))}
      <div
        onClick={() => {
          setOpenVinImgPopup(data);
        }}
        className={`absolute bottom-[50px] left-[55%] max-xl:left-[50%] max-lg:left-[40%] max-md:left-[60%] max-tiny:left-[55%] px-[10px] h-[35px] flex items-center gap-[10px] justify-center bg-white text-black z-[2] rounded-[12px] cursor-pointer`}
      >
        <IoCameraOutline />
        <p className="text-[14px]">All Image</p>
      </div>
    </div>
  );
}
