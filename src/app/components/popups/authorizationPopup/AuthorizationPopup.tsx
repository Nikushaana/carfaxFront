"use client";

import { useContext, useEffect, useRef, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import SignIn from "./signIn";
import NewAccount from "./newAccount";
import ForgetPassword from "./forgetPassword";
import { AxiosForSharingStatesAxiosContext } from "../../../../../useContexts/sharedStates";

export default function LoginRegister() {
  const { authorization, setAuthorization } = useContext(
    AxiosForSharingStatesAxiosContext
  );

  return (
    <div
      className={`w-[100vw] fixed h-[100vh] top-0 left-0 flex py-[50px] justify-center bg-[#000000c8] backdrop-blur overflow-y-auto duration-100 ${
        authorization ? " z-[50]" : "z-[-5]"
      }`}
    >
      <div className="rounded-[15px] w-[500px] self-start bg-white">
        <div className="px-[30px] py-[20px] border-b-[1px] flex justify-between items-center">
          <h1 className="text-[19px]">ავტორიზაცია</h1>
          <div
            className="w-[40px] h-[40px] rounded-full flex items-center justify-center  text-white duration-200 cursor-pointer hover:bg-[#000000c1] bg-black"
            onClick={() => {
              setAuthorization("");
            }}
          >
            <AiOutlineClose className="text-[23px]" />
          </div>
        </div>
        <div className="px-[30px] py-[20px] flex flex-col gap-y-[20px]">
          <div className="flex">
            <p
              className={`px-[8px] py-[10px] cursor-pointer border-b-[2px]  ${
                authorization === "signin"
                  ? "border-black text-black duration-100"
                  : "border-transparent text-gray-500 hover:text-black duration-100"
              }`}
              onClick={() => {
                setAuthorization("signin");
              }}
            >
              შესვლა
            </p>
            <p
              className={`px-[8px] py-[10px] cursor-pointer border-b-[2px] ${
                authorization === "registration"
                  ? " border-black text-black duration-100"
                  : " border-transparent text-gray-500 hover:text-black duration-100"
              }`}
              onClick={() => {
                setAuthorization("registration");
              }}
            >
              რეგისტრაცია
            </p>
          </div>

          {authorization === "signin" && <SignIn />}
          {authorization === "registration" && <NewAccount />}
          {authorization === "forgetpassword" && <ForgetPassword />}
        </div>
      </div>
    </div>
  );
}
