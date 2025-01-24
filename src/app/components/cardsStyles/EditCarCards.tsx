"use client";

import React, { useContext, useState } from "react";
import { MdSpeed } from "react-icons/md";
import { FaGasPump } from "react-icons/fa";
import { TbManualGearbox } from "react-icons/tb";
import { FiEdit3 } from "react-icons/fi";
import { BsTrash } from "react-icons/bs";
import { axiosUser } from "../../../../useContexts/AxiosClient/AxiosClient";
import Link from "next/link";
import logo from "../../../../public/images/logo.png";
import Image from "next/image";
import { IoIosArrowRoundUp } from "react-icons/io";
import { ProductserviceAxiosContext } from "../../../../useContexts/ProductServicesAxios";
import { CurrencyAxiosContext } from "../../../../useContexts/CurrencyAxios";

export default function EditCarCards({ item, setNewRender, setIsLoader }: any) {
  const { Productservice } = useContext(ProductserviceAxiosContext);
  const { actCurrency, setActCurrency, currency, CurrencyData } =
    useContext(CurrencyAxiosContext);

  const handelDelete = (Id) => {
    setIsLoader(true);
    axiosUser
      .delete(`user/car/${Id}`)
      .then((response) => {
        setNewRender(response);
      })
      .catch((error) => {})
      .finally(() => {});
  };

  return (
    <div className="w-full rounded-[16px] relative overflow-hidden">
      {item.service_id && Productservice.length > 0 && (
        <div className="absolute z-[1] top-[10px] left-[10px] bg-[#171c30] pointer-events-none px-[10px] h-[40px] rounded-[10px] flex flex-col items-center justify-center">
          <h1 className="text-[13px] ">
            {Productservice.find((item1) => item1.id === item.service_id).name}
          </h1>
          <p className="text-[10px] text-gray-400">
            დარჩა {item.service_term} დღე
          </p>
        </div>
      )}
      <div
        onClick={() => {
          handelDelete(item.id);
        }}
        className="absolute z-[1] top-[10px] right-[10px] bg-[#c92929] cursor-pointer hover:scale-105 duration-100  w-[40px] h-[40px] rounded-full flex items-center justify-center"
      >
        <BsTrash />
      </div>

      <div className="relative aspect-[4/3] w-full">
        <Link href={`/cars/${item.id}`}>
          {item.cars_imgs[0]?.url ? (
            <Image
              src={
                item.cars_imgs &&
                `${process.env.NEXT_PUBLIC_API_URL}/${item.cars_imgs[0]?.url}`
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
          <div className="flex items-center gap-[5px]">
            <p className="text-center text-white">
              {item.firm && item.firm && `${item.firm}`},
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
                  {item.metersRun}მილი
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
        <div className="w-full flex flex-col">
          <div className="w-full flex items-center justify-between">
            <p className="text-mainColor font-bold text-[18px]">
              {item.currency === "ლარი"
                ? actCurrency === "GEL"
                  ? item.price
                  : Math.round(item.price / CurrencyData.rate)
                : actCurrency === "USD"
                ? item.price
                : Math.round(item.price * CurrencyData.rate)}{" "}
              {actCurrency === "USD" ? "$" : "₾"}
            </p>
            <Link href={`/user/mystatements/cars/editcar/${item.id}`}>
              <div className="flex items-center gap-[10px] cursor-pointer hover:opacity-50 duration-200">
                <p className="text-blue text-[14px] underline">რედაქტირება</p>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
