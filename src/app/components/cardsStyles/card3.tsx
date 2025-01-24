"use client";

import Link from "next/link";
import React, { useContext } from "react";
import { MdSpeed } from "react-icons/md";
import { FaGasPump } from "react-icons/fa";
import { TbManualGearbox } from "react-icons/tb";
import { BsArrowUpRight, BsGeoAlt } from "react-icons/bs";
import Image from "next/image";
import { ProductserviceAxiosContext } from "../../../../useContexts/ProductServicesAxios";

export default function Card3({ item }) {
  const { Productservice } = useContext(ProductserviceAxiosContext);
  return (
    <div className="w-full rounded-[16px] relative overflow-hidden">
      <div className="absolute z-[1] top-[10px] left-0 px-[10px] w-full flex justify-between gap-[10px]">
        {item.service_id && Productservice.length > 0 && (
          <h1 className="text-[13px] bg-[#171c30] text-white pointer-events-none w-[40px] h-[40px] rounded-full flex items-center justify-center">
            {Productservice.find((item1) => item1.id === item.service_id).name}
          </h1>
        )}
      </div>

      <div className="relative h-[180px] w-full">
        <Link href={`/services/${item.id}`}>
          {item.servcenters_imgs.length > 0 ? (
            <Image
              src={
                item.servcenters_imgs &&
                `${process.env.NEXT_PUBLIC_API_URL}/${item.servcenters_imgs[0].url}`
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
        <p className="text-gray-300">{item.servcenterName}</p>
        {item.location && (
          <div className="flex items-center justify-center gap-[5px]  rounded-full ">
            <BsGeoAlt className="text-[12px] text-center text-white" />
            <p className="text-[14px] text-white w-full text-ellipsis line-clamp-1">
              {(() => {
                try {
                  const locations = item.location
                    ? JSON.parse(item.location)
                    : [];
                  return locations
                    .map(
                      (item1, index, array) =>
                        `${item1.city}${index < array.length - 1 ? ", " : ""}`
                    )
                    .join("");
                } catch {
                  return "...";
                }
              })()}
            </p>
          </div>
        )}

        <hr className="w-full h-[1px] bg-gray-700 border-none" />
        <div className="w-full flex items-center justify-center">
          <Link href={`/services/${item.id}`}>
            <div className="flex items-center justify-center gap-[10px] cursor-pointer hover:opacity-50 duration-200 text-white">
              <p className="text-blue text-[13px] underline shrink-0">
                სერვის ცენტრის ინფორმაცია
              </p>
              <BsArrowUpRight />
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
