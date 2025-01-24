"use client";

import Link from "next/link";
import React, { useContext } from "react";
import { MdSpeed } from "react-icons/md";
import { FaGasPump } from "react-icons/fa";
import { TbFileSettings, TbManualGearbox } from "react-icons/tb";
import Image from "next/image";
import { BsArrowUpRight } from "react-icons/bs";
import { CurrencyAxiosContext } from "../../../../useContexts/CurrencyAxios";
import { ProductserviceAxiosContext } from "../../../../useContexts/ProductServicesAxios";

export default function Card2({ item }) {
  const { actCurrency, setActCurrency, currency, CurrencyData } =
    useContext(CurrencyAxiosContext);
  const { Productservice } = useContext(ProductserviceAxiosContext);
  return (
    <div className="w-full rounded-[16px] relative overflow-hidden">
      <div className="absolute z-[1] top-[10px] left-0 px-[10px] w-full flex justify-between gap-[10px]">
        {item.service_id && Productservice.length > 0 && (
          <h1 className="text-[13px] bg-[#171c30] text-white pointer-events-none w-[40px] h-[40px] rounded-full flex items-center justify-center">
            {Productservice.find((item1) => item1.id === item.service_id).name}
          </h1>
        )}
        {item.condition && (
          <p className="bg-[green] text-white h-[30px] items-center flex justify-center p-1 px-[20px] rounded-full text-[13px] text-center">
            {item.condition}
          </p>
        )}
      </div>

      <div className="relative h-[180px] w-full">
        <Link href={`/parts/${item.id}`}>
          {item.parts_imgs.length > 0 ? (
            <Image
              src={
                item.parts_imgs &&
                `${process.env.NEXT_PUBLIC_API_URL}/${item.parts_imgs[0].url}`
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
        <div className="flex items-center gap-[5px] truncate w-full">
          {item.Parts_models &&
            item.Parts_models.map((item2, index) => (
              <div
                key={item2.id}
                className="flex items-center gap-[5px] text-white"
              >
                <h1 className=" flex text-white text-[15px] ">{item2.firm}</h1>
                <h1 className=" flex text-white text-[15px] ">{item2.model}</h1>
                <h1 className=" flex text-white text-[15px] ">{item2.fyear}</h1>
                -
                <h1 className=" flex text-white text-[15px] ">{item2.tyear}</h1>
                <h1 className=" flex text-white text-[15px] ">
                  {index < item.Parts_models.length - 1 && ","}
                </h1>
              </div>
            ))}
        </div>
        <p className="text-gray-300">{item.partName}</p>

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
            <Link href={`/parts/${item.id}`}>
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
