"use client"

import { AiOutlineClose } from "react-icons/ai";
import { BsArrowRightCircle } from "react-icons/bs";
import { useContext } from "react";
import { UserContext } from "../../../../useContexts/UserAxios";
import Link from "next/link";
import { FaDoorOpen } from "react-icons/fa";
import { AxiosForSharingStatesAxiosContext } from "../../../../useContexts/sharedStates";
import CurrLangSwitcher from "../header/currLangSwitcher";

export default function MenuPopUp() {
  const { isAuthorizedUser, showMenu, setShowMenu } = useContext(
    AxiosForSharingStatesAxiosContext
  );

  const { HandleLogOut } = useContext(UserContext);
  return (
    <div
      className={`ChromePopUp fixed bg-[#00000078] w-full h-[100vh] top-0 left-0 flex justify-end ${
        showMenu
          ? "z-[11] duration-100 opacity-1"
          : "z-[-1] duration-200 opacity-0"
      }`}
    >
      <div
        onClick={() => setShowMenu(false)}
        className="absolute top-[40px] left-[40px] flex items-center justify-center text-5xl max-tiny:text-4xl text-[white]"
      >
        <AiOutlineClose />
      </div>
      <div
        className={`p-[40px] max-tiny:px-[20px] h-full bg-black shadow-md shadow-white  ${
          showMenu
            ? "w-[350px] max-tiny:w-[270px] duration-200"
            : "w-0 duration-200"
        }`}
      >
        <div className="flex flex-col gap-y-[20px] text-[18px]">
          <Link href="/">
            <h1 onClick={() => setShowMenu(false)} className="text-white">
              მთავარი
            </h1>
          </Link>
          <Link href="/checkvin">
            <h1 className="text-white  w-[220px] overflow-hidden">
              ვინ კოდის შემოწმება
            </h1>
          </Link>
          <Link href="/cars">
            <h1 onClick={() => setShowMenu(false)} className="text-white">
              ავტომობილები
            </h1>
          </Link>
          <Link href="/parts">
            <h1 onClick={() => setShowMenu(false)} className="text-white">
              ნაწილები
            </h1>
          </Link>
          <Link href="/services">
            <h1 onClick={() => setShowMenu(false)} className="text-white">
              სერვის ცენტრები
            </h1>
          </Link>
          {isAuthorizedUser && (
            <div
              onClick={() => {
                HandleLogOut();
                setShowMenu(false);
              }}
              className="border border-solid border-white cursor-pointer hidden max-tiny:flex flex-row gap-[7px]  items-center justify-center w-full h-[47px] rounded-[16px] "
            >
              <FaDoorOpen className=" text-white " />
              <h1 className="text-white max-sm:text-[14px]">გასვლა</h1>
            </div>
          )}
          <div className="max-tiny:flex hidden justify-end">
          <CurrLangSwitcher />
        </div>
        </div>
      </div>
    </div>
  );
}
