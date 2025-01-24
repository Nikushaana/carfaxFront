"use client";

import Link from "next/link";
import React, { useContext } from "react";
import { MdSpeed } from "react-icons/md";
import { FaGasPump } from "react-icons/fa";
import { TbManualGearbox } from "react-icons/tb";
import Image from "next/image";
import { IoIosArrowRoundUp } from "react-icons/io";
import { BsArrowUpRight } from "react-icons/bs";
import { CurrencyAxiosContext } from "../../../../useContexts/CurrencyAxios";
import { ProductserviceAxiosContext } from "../../../../useContexts/ProductServicesAxios";

export default function Card1({ item }) {
  const { actCurrency, setActCurrency, currency, CurrencyData } =
    useContext(CurrencyAxiosContext);
  const { Productservice } = useContext(ProductserviceAxiosContext);
  return (
    <div className="w-full rounded-[16px] relative overflow-hidden">
      {item.service_id && Productservice.length > 0 && (
        <h1 className="absolute z-[1] top-[10px] left-[10px] text-[13px] bg-[#171c30] text-white pointer-events-none w-[40px] h-[40px] rounded-full flex items-center justify-center">
          {Productservice.find((item1) => item1.id === item.service_id).name}
        </h1>
      )}
      <div className="relative h-[230px] max-sm:h-[160px] w-full">
        <Link href={`/cars/${item.id}`}>
          {item.cars_imgs.length > 0 ? (
            <Image
              src={
                item.cars_imgs &&
                `${process.env.NEXT_PUBLIC_API_URL}/${item.cars_imgs[0].url}`
              }
              alt={""}
              sizes="500px"
              fill
              style={{
                objectFit: "cover",
              }}
            />
          ) : (
            <Image
              src="/images/tllogo.webp"
              alt={""}
              sizes="500px"
              fill
              style={{
                objectFit: "contain",
              }}
            />
          )}
        </Link>
      </div>

      <div className="w-full rounded-bl-[16px] rounded-br-[16px] pt-5 px-6 pb-3 flex flex-col gap-4 bg-[#171c30]">
        <div className="w-full flex flex-col gap-[2px]">
          <div className="flex items-center gap-[10px]">
            <p className="text-center text-white">
              {item.firm && item.firm && `${item.firm}`}
            </p>
            <p className="text-center text-white">
              {item.model && item.model && `${item.model}`}
            </p>
          </div>
        </div>
        <hr className="w-full h-[1px] bg-gray-700 border-none" />
        <div className="flex flex-row items-start justify-between w-full">
          <div className="flex items-center">
            <div className="flex flex-col gap-[7px] items-center ">
              <FaGasPump className="text-white text-[12px]" />
              <p className="text-[12px] text-center text-white">
                {item.petrol && item.petrol && `${item.petrol}`}
              </p>
            </div>
          </div>
          <div className="flex items-center">
            <div className="flex flex-row gap-[5px] items-center justify-between ">
              <div className="flex flex-col items-center gap-[5px]">
                <MdSpeed className="text-white  text-[14px]" />
                <p className="text-[12px] text-center text-white">
                  {item.metersRun || 0}მილი
                </p>
              </div>
            </div>
          </div>
          <div className="flex items-center">
            <div className="flex flex-col gap-1.5 items-center ">
              <TbManualGearbox className="text-white  text-[14px]" />
              <p className="text-[12px] text-center text-white">
                {item.transmission &&
                  item.transmission &&
                  `${item.transmission}`}
              </p>
            </div>
          </div>
        </div>
        <hr className="w-full h-[1px] bg-gray-700 border-none" />
        <div className="w-full flex flex-col text-white">
          <div className="w-full flex items-center justify-between">
            <div className="flex items-center gap-[5px]">
              <p className="text-mainColor font-bold text-[18px]">
                {item.currency === "ლარი"
                  ? actCurrency === "GEL"
                    ? item.price || 0
                    : Math.round(item.price / CurrencyData.rate) || 0
                  : actCurrency === "USD"
                  ? item.price || 0
                  : Math.round(item.price * CurrencyData.rate) || 0}
              </p>
              <div className="rounded-[10px] border-[1px] border-white flex items-center overflow-hidden p-[3px]">
                {currency.map((item1) => (
                  <p
                    key={item1.id}
                    onClick={() => {
                      setActCurrency(item1.currency);
                    }}
                    className={`px-[7px] py-[0px] text-[12px] cursor-pointer duration-100
                      
                      ${
                        actCurrency === item1.currency
                          ? "bg-[white] text-[black]"
                          : ""
                      } 
                      
                    
                    ${item1.id === 1 ? "rounded-l-[6px]" : " rounded-r-[6px]"}`}
                  >
                    {item1.icon}
                  </p>
                ))}
              </div>
            </div>
            <Link href={`/cars/${item.id}`}>
              <div className="flex items-center gap-[10px] cursor-pointer hover:opacity-50 duration-200">
                <p className="text-blue text-[14px] underline">სრულად</p>
                <BsArrowUpRight />
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
