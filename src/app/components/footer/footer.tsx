import React from "react";
import { BsAt } from "react-icons/bs";
import { GoDotFill } from "react-icons/go";

export default function Footer() {
  return (
    <div
      className={`flex px-[100px] border-t-[1px] border-white max-md:px-[50px] max-sm:px-[16px] py-7 items-center justify-between w-full max-[1300px]:flex-wrap max-[1300px]:gap-[20px] max-tiny:gap-y-[5px] max-tiny:py-2  `}
    >
      <div className="flex items-center w-[30%] gap-[20px] max-[1300px]:w-full max-[1300px]:justify-center ">
        <div className="flex items-center gap-[2px]">
          <BsAt className="text-white text-[20px]" />
          <h1 className="text-base text-center  text-white">2024</h1>
        </div>
        <h1 className="text-base text-center text-white">
          ყველა უფლება დაცულია
        </h1>
      </div>
      <div className="flex max-[1300px]:w-full gap-4 max-tiny:gap-y-[0px] items-center max-[1004px]:flex-col max-[1300px]:justify-center ">
        <p className="text-white cursor-pointer text-[15px] text-center">
          წესები და პირობები
        </p>
        <GoDotFill className="text-white text-[14px]" />
        <p className="text-white cursor-pointer text-[15px] text-center">
          კონფიდენციალურობის პოლიტიკა
        </p>
      </div>
    </div>
  );
}
