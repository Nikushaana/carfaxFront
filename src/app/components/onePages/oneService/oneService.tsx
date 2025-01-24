"use client";

import React, { useContext, useEffect, useState } from "react";
import {
  PiCylinder,
  PiEngine,
  PiGasPump,
  PiPlus,
  PiSteeringWheel,
  PiUploadSimple,
} from "react-icons/pi";
import {
  IoCalendarOutline,
  IoCarSportOutline,
  IoDocumentTextOutline,
  IoLocationOutline,
  IoPersonOutline,
  IoPricetagOutline,
} from "react-icons/io5";
import { FiPhoneCall } from "react-icons/fi";
import Image from "next/image";
import { Bs2Circle } from "react-icons/bs";
import { SiSpeedtest } from "react-icons/si";
import { TbManualGearbox } from "react-icons/tb";
import { GiCarDoor } from "react-icons/gi";
import { BiColorFill } from "react-icons/bi";
import { CurrencyAxiosContext } from "../../../../../useContexts/CurrencyAxios";
import { PartsAxiosContext } from "../../../../../useContexts/PartsAxios";
import { ProductserviceAxiosContext } from "../../../../../useContexts/ProductServicesAxios";
import Slider2 from "../../sliders/Slider2";
import Slider1 from "../../sliders/Slider1";
import { ServcenterAxiosContext } from "../../../../../useContexts/ServCenterAxios";

export default function OneService({ data }) {
  const { Productservice } = useContext(ProductserviceAxiosContext);
  const { ServcenterData, ServcenterLoader } = useContext(
    ServcenterAxiosContext
  );

  return (
    <div className="bg-[#040A1C] text-white min-h-[100vh] flex flex-col gap-[30px] py-[150px] max-sm:py-[110px]">
      <div className="flex flex-col gap-[30px] max-md:gap-[10px] px-[100px] max-md:px-[50px] max-sm:px-[16px] ">
        <div className="w-full text-white flex flex-col gap-y-[20px]">
          <p className="text-[13px]">
            მთავარი / სერვისცენტრი / {data?.servcenterName}
          </p>
        </div>
        <div className="">
          <h1 className="text-[40px]">{data?.servcenterName}</h1>
        </div>
      </div>

      <div className="relative w-full px-[50px] max-sm:px-[16px]">
        <Slider2
          data={data?.servcenters_imgs}
          dataVideo={data?.servcenters_videos}
          service={true}
        />
        {data?.service_id && Productservice.length > 0 && (
          <h1 className="absolute z-[1] top-[30px] left-[70px] max-sm:top-[20px] max-sm:left-[30px] text-[13px] text-white bg-[#171c30] pointer-events-none w-[40px] h-[40px] rounded-full flex items-center justify-center">
            {Productservice.find((item1) => item1.id === data?.service_id).name}
          </h1>
        )}
      </div>
      <div className="flex flex-col gap-[30px] px-[100px] max-md:px-[50px] max-sm:px-[16px]">
        <div className="flex max-md:flex-col max-md:items-center gap-[80px] my-[100px] max-md:my-[50px] max-md:mt-[20px]">
          <div className="w-[calc(100%-480px)] max-xl:w-[calc(100%-380px)]  max-md:w-full  flex flex-col gap-y-[80px]">
            <div className="flex flex-col gap-y-[10px]">
              <h1 className="text-[25px]">აღწერა</h1>
              <p className="text-[15px]">{data?.description}</p>
            </div>
            <div className="flex flex-col gap-y-[10px]">
              <h1 className="text-[40px]">სერვისები</h1>
              <div>
                {data?.services &&
                  JSON.parse(data?.services).map((item, index) => (
                    <div
                      key={item}
                      className={`py-[10px] ${
                        JSON.parse(data?.services).length - 1 !== index &&
                        "border-b-[1px]"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <p>{item}</p>
                        <PiPlus className="text-[25px]" />
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
          <div className="w-[400px] max-xl:w-[300px] max-[330px]:w-full flex flex-col gap-y-[20px]">
            <div className="border-[1px] border-white rounded-[15px] p-[20px] flex flex-col gap-y-[10px]">
              <div
                className={`w-[70px] h-[70px] relative bg-white text-[black] flex items-center justify-center text-[25px] rounded-full overflow-hidden`}
              >
                {data?.user?.image?.url ? (
                  <Image
                    src={
                      data?.user &&
                      `${process.env.NEXT_PUBLIC_API_URL}/${data?.user?.image?.url}`
                    }
                    alt={""}
                    sizes="500px"
                    fill
                    style={{
                      objectFit: "contain",
                    }}
                  />
                ) : (
                  <IoPersonOutline />
                )}
              </div>
              <h1 className="text-[20px]">{data?.user.name}</h1>
              {data?.location &&
                JSON.parse(data?.location).map((item) => (
                  <p key={item.id} className="text-[14px]">
                    {item?.city}, {item?.adress}
                  </p>
                ))}

              <div className="flex items-center gap-[5px] ">
                <div className="border-[1px] bg-white rounded-full text-[#0047B1] text-[18px] h-[40px] w-[40px] flex items-center justify-center">
                  <FiPhoneCall />
                </div>
                <p>
                  {data?.phone
                    .replace(/[^0-9]/g, "")
                    .replace(/\s/g, "")
                    .replace(/(.{3})/g, "$1 ")
                    .trim()
                    .slice(0, 11)}
                </p>
              </div>
            </div>
          </div>
        </div>
        <Slider1
          title="შემოთავაზებული სერვის ცენტრები"
          data={ServcenterData}
          loader={ServcenterLoader}
        />
      </div>
    </div>
  );
}
