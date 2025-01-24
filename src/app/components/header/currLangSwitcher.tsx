"use client";

import React, { useContext, useEffect, useRef, useState } from "react";
import { GrLanguage } from "react-icons/gr";
import { MdCurrencyExchange } from "react-icons/md";
import { CurrencyAxiosContext } from "../../../../useContexts/CurrencyAxios";

export default function CurrLangSwitcher() {
  const { actCurrency, setActCurrency, currency } =
    useContext(CurrencyAxiosContext);
  const targetRef = useRef<HTMLDivElement>(null);
  const [drop, setDrop] = useState(false);
  const handleClickOutside = (event: MouseEvent) => {
    if (
      targetRef.current &&
      !(targetRef.current as HTMLDivElement).contains(event.target as Node)
    ) {
      setDrop(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div ref={targetRef} className="relative">
      <div
        onClick={() => {
          setDrop((pre) => !pre);
        }}
        className="border border-solid border-white text-white cursor-pointer flex  gap-[7px] px-[10px] items-center justify-center h-[47px] max-sm:h-[35px] rounded-[16px] "
      >
        <MdCurrencyExchange />
        <GrLanguage />
      </div>
      <div
        className={`absolute top-[50px] right-0 
       w-[130px]
    border border-solid border-white  flex-col gap-y-[10px] text-white p-[10px] bg-black rounded-[16px] duration-200 ${
      drop ? "flex opacity-1" : "opacity-0 hidden"
    } `}
      >
        <p className="select-none">ვალუტა</p>
        <div className="flex flex-col gap-y-[5px]">
          {currency.map((item) => (
            <div
              key={item.id}
              onClick={() => {
                setActCurrency(item.currency);
              }}
              className="flex items-center gap-[10px] cursor-pointer"
            >
              <div
                className={`w-[25px] h-[25px] rounded-full shrink-0 border-[1px] flex items-center justify-center border-[#3d7294] duration-100 `}
              >
                <div
                  className={`w-[70%] h-[70%] rounded-full ${
                    actCurrency === item.currency ? "bg-[#3d7294]" : ""
                  } `}
                ></div>
              </div>
              <p
                className={`shrink-0 text-[13px] duration-100 ${
                  actCurrency === item.currency ? "" : "text-gray-400"
                }`}
              >
                {item.name}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
