"use client";

import { useContext } from "react";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { AiOutlineExclamationCircle } from "react-icons/ai";
import { AxiosForSharingStatesAxiosContext } from "../../../../useContexts/sharedStates";

export default function AlertCust() {
  const { alertShow, alertStatus, alertText } = useContext(AxiosForSharingStatesAxiosContext);
  return (
    <div
      style={{
        top: `${alertShow ? 30 : -90}px`,
        background: `${alertStatus ? "#dcf3dc" : "#fdeded"}`,
        color: `${alertStatus ? "#408944" : "#d94545"}`,
      }}
      className={`z-[70] p-[20px] fixed flex gap-[20px] min-w-[400px] items-center rounded-[5px] shadow text-[17px] left-[50%] translate-x-[-50%] duration-100 pointer-events-none ${
        alertStatus ? "shadow-[#edf7ed]" : "shadow-[#fdeded]"
      } `}
    >
      <div className={`text-[32px]`}>
        {alertStatus ? (
          <IoMdCheckmarkCircleOutline />
        ) : (
          <AiOutlineExclamationCircle />
        )}
      </div>
      <p className="flex items-center text-center">{alertText}</p>
    </div>
  );
}
