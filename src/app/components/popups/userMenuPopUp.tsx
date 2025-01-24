"use client";

import React, { useContext, useEffect, useRef } from "react";
import Router from "../user/router";
import Input2 from "../Inputs/Input2";
import Image from "next/image";
import LoaderCust from "../loader/LoaderCust";
import { UserContext } from "../../../../useContexts/UserAxios";
import { AxiosForSharingStatesAxiosContext } from "../../../../useContexts/sharedStates";
import { BsList, BsPerson } from "react-icons/bs";
import Userbalance from "../user/userbalance";
import { usePathname } from "next/navigation";

export default function UserMenuPopUp() {
  const targetRef = useRef<HTMLDivElement>(null);
  const { isLoaderUser, user } = useContext(UserContext);
  const { showMenuUser, setShowMenuUser } = useContext(
    AxiosForSharingStatesAxiosContext
  );

  const pathname = usePathname();

  const handleClickOutside = (event: MouseEvent) => {
    if (
      targetRef.current &&
      !(targetRef.current as HTMLDivElement).contains(event.target as Node)
    ) {
      setShowMenuUser(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div
      ref={targetRef}
      className={`w-[300px] fixed top-0 flex flex-col justify-center gap-y-5 bg-[black] p-[10px] h-[100vh] duration-300 ${
        pathname.split("/")[1] === "user" ? "flex" : "hidden"
      } ${showMenuUser ? "left-0 z-[20]" : "left-[-300px]"}`}
    >
      <div
        onClick={() => {
          setShowMenuUser((pre) => !pre);
        }}
        className={`absolute top-[30%] w-[40px] h-[40px] bg-white items-center justify-center text-[20px] cursor-pointer rounded-[10px] hidden max-lg:flex duration-200 z-[20] right-[-60px]`}
      >
        <BsList />
      </div>
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
  );
}
