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

export default function Slider2({ data, dataVideo, service }: any) {
  const { setOpenServImgPopup } = useContext(AxiosForSharingStatesAxiosContext);
  let swiperRef = useRef<SwiperClass>(null!);
  const screenWidth = ScreenWidth();
  return (
    <div className="flex flex-col items-center w-full h-[550px] max-xl:h-[400px] max-tiny:h-[250px] gap-5 relative rounded-[15px] overflow-hidden">
      <Swiper
        modules={[Autoplay, EffectFade]}
        slidesPerView={service ? (screenWidth > 720 ? 3 : (screenWidth <= 720 && screenWidth > 580) ? 2 : 1) : 1}
        spaceBetween={20}
        loop={true}
        className="w-full h-full items-stretch"
        // autoplay={{
        //   delay: 2000,
        //   disableOnInteraction: false,
        //   pauseOnMouseEnter: true,
        // }}
        onBeforeInit={(swiper) => {
          swiperRef.current = swiper;
        }}
        speed={800}
      >
        {data?.map((item: any) => (
          <SwiperSlide
            key={item.id}
            className="relative w-full h-full rounded-[15px] overflow-hidden"
          >
            <Image
              src={item.url && `${process.env.NEXT_PUBLIC_API_URL}/${item.url}`}
              alt={""}
              sizes="500px"
              fill
              style={{
                objectFit: "cover",
              }}
            />
          </SwiperSlide>
        ))}
        {dataVideo?.map((item: any) => (
          <SwiperSlide
            key={item.id}
            className="relative w-full h-full rounded-[15px] overflow-hidden"
          >
            <video
              src={`${process.env.NEXT_PUBLIC_API_URL}/${item.url}`}
              className="w-full h-full object-cover rounded-[6px]"
              controls
            />
          </SwiperSlide>
        ))}
      </Swiper>

      {(data?.length > 1 || dataVideo?.length > 1) && (
        <div className="">
          <button
            className={`absolute top-[50%] translate-y-[-50%] left-[10px] w-[60px] h-[40px] flex items-center justify-center text-[22px] bg-gray-400 text-white z-[2] rounded-full`}
            onClick={() => swiperRef.current?.slidePrev()}
          >
            <BiChevronLeft className="" />
          </button>
          {service && (
            <div
              onClick={() => {
                setOpenServImgPopup({data, dataVideo});
              }}
              className={`absolute bottom-[40px] left-[55%] max-xl:left-[50%] max-lg:left-[40%] max-md:left-[60%] max-tiny:left-[55%] px-[10px] h-[35px] flex items-center gap-[10px] justify-center bg-white text-black z-[2] rounded-[12px] cursor-pointer`}
            >
              <IoCameraOutline />
              <p className="text-[14px]">ყველა ფოტო</p>
            </div>
          )}
          <button
            className={`absolute top-[50%] translate-y-[-50%] right-[10px] w-[60px] h-[40px] flex items-center justify-center text-[22px] bg-gray-400 text-white z-[2] rounded-full
            `}
            onClick={() => swiperRef.current?.slideNext()}
          >
            <BiChevronRight className="" />
          </button>
        </div>
      )}
    </div>
  );
}
