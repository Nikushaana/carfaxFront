"use client";

import { usePathname, useRouter } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";
import { AiOutlineLogout } from "react-icons/ai";
import { BsBoxSeam, BsList, BsPerson } from "react-icons/bs";
import { GoPaperAirplane } from "react-icons/go";
import { HiOutlineNewspaper } from "react-icons/hi";
import { IoNewspaperOutline } from "react-icons/io5";
import { LiaUserTieSolid } from "react-icons/lia";
import { MdOutlineBusinessCenter } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";
import { VscListSelection } from "react-icons/vsc";
import Link from "next/link";
import Image from "next/image";
import LoaderCust from "../components/loader/LoaderCust";
import { UserContext } from "../../../useContexts/UserAxios";
import Input1 from "../components/Inputs/Input1";
import Router from "../components/user/router";
import Input2 from "../components/Inputs/Input2";
import { AxiosForSharingStatesAxiosContext } from "../../../useContexts/sharedStates";
import Userbalance from "../components/user/userbalance";

export default function Layout({ children }: Children) {
  const { isLoaderUser, user } = useContext(UserContext);

  return (
    <div className="w-[100%] flex flex-col items-center gap-y-[20px] pb-[100px] bg-[#040A1C] ">
      <div className="w-full flex flex-col h-[250px] gap-3 relative select-none">
        <Image
          src={"/images/bground.jpg"}
          alt={""}
          sizes="500px"
          fill
          style={{
            objectFit: "cover",
          }}
        />
        <div className="flex justify-between px-[190px] max-xl:px-[100px] max-md:px-[50px] max-sm:px-[16px] text-[30px] text-white w-[100%] absolute top-[135px] ">
          <h1>პროფილი</h1>
        </div>
      </div>
      <div className="w-full relative flex  py-[55px] max-md:py-[30px] gap-[35px] max-xl:gap-[20px] px-[190px] max-xl:px-[100px] max-md:px-[50px] max-sm:px-[16px] max-lg:flex-col">
        <div className="w-[300px] flex flex-col gap-y-5 max-lg:hidden">
          <div className="bg-[#0e1420] shadow-md shadow-[#3d7294] flex flex-col items-center gap-5 p-7 rounded-[10px]">
            {isLoaderUser ? (
              <div className="w-full h-full flex justify-center items-center">
                <div className="w-[40px] h-[40px] text-white flex items-center justify-center">
                  <LoaderCust />
                </div>
              </div>
            ) : (
              <Userbalance />
            )}
          </div>

          <Router />
        </div>

        <div className="w-[calc(100%-12px-300px)] max-lg:w-full flex flex-col gap-7">
          {children}
        </div>
      </div>
    </div>
  );
}
