"use client";

import { useContext, useEffect, useRef, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { AxiosForSharingStatesAxiosContext } from "../../../../useContexts/sharedStates";
import { Swiper, SwiperClass, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import Image from "next/image";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import ScreenWidth from "../screenwidth/ScreenWidth";

export default function ServiceImgPopUp() {
  const { OpenServImgPopup, setOpenServImgPopup } = useContext(
    AxiosForSharingStatesAxiosContext
  );

  let swiperRef = useRef<SwiperClass>(null!);
  const screenWidth = ScreenWidth();
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperClass>(null!);
  const cvladi: {} = {
    "--swiper-navigation-color": "transparent",
    "--swiper-pagination-color": "#fff",
  };

  return (
    <div
      className={`w-[100vw] fixed h-[100vh] top-0 left-0 flex items-center py-[20px] justify-center bg-[#000000c8] backdrop-blur overflow-y-auto duration-100 ${
        OpenServImgPopup?.data?.length > 0 ||
        OpenServImgPopup?.dataVideo?.length > 0
          ? " z-[50]"
          : "z-[-5]"
      }`}
    >
      <div className="w-[70%] max-lg:w-[90%] max-sm:w-[calc(100%-32px)] h-full max-sm:h-[60vh] flex flex-col gap-y-[20px]  relative">
        <div
          className="absolute top-[20px] right-[20px] z-[2] w-[40px] h-[40px] rounded-full flex items-center justify-center  text-white duration-200 cursor-pointer hover:bg-[#000000c1] bg-black"
          onClick={() => {
            setOpenServImgPopup({});
          }}
        >
          <AiOutlineClose className="text-[23px]" />
        </div>
        <div className="flex flex-col w-full h-full  gap-[10px] max-xl:gap-[20px]">
          <div className="w-full h-[calc(100%-110px)] max-sm:h-[calc(100%-90px)]">
            <Swiper
              style={cvladi}
              loop={true}
              slidesPerView={1}
              navigation={true}
              onBeforeInit={(swiper) => {
                swiperRef.current = swiper;
              }}
              thumbs={{
                swiper:
                  thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
              }}
              modules={[FreeMode, Navigation, Thumbs]}
              className="mySwiper w-full h-full"
            >
              {OpenServImgPopup?.data?.length &&
                OpenServImgPopup?.data?.map((item: any) => (
                  <SwiperSlide key={item.id}>
                    <div className="w-full h-full bg-white shadow-md border-[1px] cursor-pointer rounded-[10px] p-[3px]">
                      <Image
                        src={`${process.env.NEXT_PUBLIC_API_URL}/${item.url}`}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                          borderRadius: "8px",
                        }}
                        width={500}
                        height={300}
                        alt=""
                      />
                    </div>
                  </SwiperSlide>
                ))}
              {OpenServImgPopup?.dataVideo?.length &&
                OpenServImgPopup?.dataVideo?.map((item: any) => (
                  <SwiperSlide key={item.id}>
                    <div className="w-full h-full bg-white shadow-md border-[1px] cursor-pointer rounded-[10px] p-[3px]">
                      <video
                        src={`${process.env.NEXT_PUBLIC_API_URL}/${item.url}`}
                        className="w-full h-full object-cover rounded-[6px]"
                        controls
                      />
                    </div>
                  </SwiperSlide>
                ))}
            </Swiper>
          </div>
          <div className="flex relative group">
            <button
              className={`absolute max-md:hidden top-[50%] translate-y-[-50%] group-hover:border-[1px] group-hover:shadow-md left-[60px] group-hover:left-[20px] z-10 group-hover:bg-[white]  duration-100 rounded-full h-[50px] w-[50px] max-sm:h-[40px] max-sm:w-[40px] flex justify-center items-center ${
                OpenServImgPopup?.data?.length > 0 ||
                OpenServImgPopup?.dataVideo?.length > 0
                  ? "flex"
                  : "hidden"
              }`}
              onClick={() => swiperRef.current?.slidePrev()}
            >
              <BsChevronLeft className="group-hover:text-black text-transparent text-[24px]" />
            </button>
            <button
              className={`absolute max-md:hidden top-[50%] translate-y-[-50%] group-hover:border-[1px] group-hover:shadow-md right-[60px] group-hover:right-[20px] z-10 group-hover:bg-[white] duration-100 rounded-full h-[50px] w-[50px] max-sm:h-[40px] max-sm:w-[40px] flex justify-center items-center ${
                OpenServImgPopup?.data?.length > 0 ||
                OpenServImgPopup?.dataVideo?.length > 0
                  ? "flex"
                  : "hidden"
              }`}
              onClick={() => swiperRef.current?.slideNext()}
            >
              <BsChevronRight className="group-hover:text-black text-transparent  text-[24px]" />
            </button>
            <Swiper
              onSwiper={setThumbsSwiper}
              loop={true}
              direction="horizontal"
              spaceBetween={10}
              slidesPerView={screenWidth >= 700 ? 5 : (screenWidth >= 500 && screenWidth < 700) ? 4 : 3}
              freeMode={true}
              watchSlidesProgress={true}
              modules={[FreeMode, Navigation, Thumbs]}
              className="mySwiper w-full h-[100px] max-sm:h-[80px]"
            >
              {OpenServImgPopup?.data?.length &&
                OpenServImgPopup?.data?.map((item: any) => (
                  <SwiperSlide key={item.id}>
                    <div className="w-full h-full bg-white shadow-md border-[1px] cursor-pointer rounded-[10px] p-[3px]">
                      <Image
                        src={`${process.env.NEXT_PUBLIC_API_URL}/${item.url}`}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                          borderRadius: "8px",
                        }}
                        width={500}
                        height={300}
                        alt=""
                      />
                    </div>
                  </SwiperSlide>
                ))}
              {OpenServImgPopup?.dataVideo?.length &&
                OpenServImgPopup?.dataVideo?.map((item: any) => (
                  <SwiperSlide key={item.id}>
                    <div className="w-full h-full bg-white shadow-md border-[1px] cursor-pointer rounded-[10px] p-[3px]">
                      <video
                        src={`${process.env.NEXT_PUBLIC_API_URL}/${item.url}`}
                        className="w-full h-full object-cover rounded-[6px] "
                        
                      />
                    </div>
                  </SwiperSlide>
                ))}
            </Swiper>
          </div>
        </div>
      </div>
    </div>
  );
}
