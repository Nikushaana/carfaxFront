"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useContext, useState } from "react";
import {
  BsArrowRightCircle,
  BsFillPersonFill,
  BsList,
  BsPerson,
} from "react-icons/bs";
import { AxiosForSharingStatesAxiosContext } from "../../../../useContexts/sharedStates";
import { UserContext } from "../../../../useContexts/UserAxios";
import { FiPlus } from "react-icons/fi";
import { FaDoorOpen } from "react-icons/fa";
import { MdCurrencyExchange } from "react-icons/md";
import { GrLanguage } from "react-icons/gr";
import CurrLangSwitcher from "./currLangSwitcher";

export default function Header() {
  const { isAuthorizedUser, setAuthorization, setShowMenu } = useContext(
    AxiosForSharingStatesAxiosContext
  );
  const { HandleLogOut } = useContext(UserContext);
  return (
    <div
      className={`absolute top-0 flex px-[100px] max-md:px-[50px] max-sm:px-[16px] h-[100px] max-sm:h-[80px] items-center justify-between w-full z-[11]`}
    >
      <Link href="/" className="w-[200px] h-full relative">
        <Image
          src={"/images/logo.png"}
          alt={""}
          sizes="500px"
          fill
          style={{
            objectFit: "contain",
          }}
        />
      </Link>

      <div className="flex gap-7 items-center justify-center max-xl:hidden">
        <Link href="/checkvin">
          <h1 className="text-white">ვინ კოდის შემოწმება</h1>
        </Link>
        <Link href="/cars">
          <h1 className="text-white">ავტომობილები</h1>
        </Link>
        <Link href="/parts">
          <h1 className="text-white">ნაწილები</h1>
        </Link>
        <Link href="/services">
          <h1 className="text-white">სერვის ცენტრები</h1>
        </Link>
      </div>

      <div className="flex items-center gap-[10px]">
        {isAuthorizedUser ? (
          <div className="flex items-center gap-[10px]">
            <Link href="/user/addcar">
              <div className="border border-solid border-white text-[25px] max-sm:text-[20px] text-white cursor-pointer flex items-center justify-center w-[47px] max-sm:w-[35px] h-[47px] max-sm:h-[35px] rounded-full ">
                <BsFillPersonFill />
              </div>
            </Link>
            <div
              onClick={() => {
                HandleLogOut();
              }}
              className="border border-solid border-white text-[25px] max-sm:text-[20px] text-white cursor-pointer flex items-center justify-center w-[47px] max-sm:w-[35px] h-[47px] max-sm:h-[35px] rounded-full "
            >
              <FaDoorOpen />
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-[10px]">
            <div
              onClick={() => {
                setAuthorization("signin");
              }}
              className="cursor-pointer flex gap-[7px] items-center justify-center px-[20px] h-[47px] max-sm:h-[35px] rounded-[16px] "
            >
              <BsPerson className="h-6 w-6 max-sm:h-5 max-sm:w-5 ml-1 text-white max-tiny:hidden" />
              <h1 className="text-white max-sm:text-[14px]">ავტორიზაცია</h1>
            </div>
          </div>
        )}
        <div className="max-tiny:hidden">
          <CurrLangSwitcher />
        </div>

        <div
          onClick={() => setShowMenu(true)}
          className="hidden text-white cursor-pointer max-xl:flex items-center justify-center text-5xl max-sm:text-4xl"
        >
          <BsList />
        </div>
      </div>
    </div>
  );
}
