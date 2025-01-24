"use client";

import React, { useEffect, useRef, useState } from "react";
import { BsXLg } from "react-icons/bs";
import { IoIosArrowDown } from "react-icons/io";

export default function DropDownFromTo({
  icon,
  placeholder,
  name1,
  name2,
  setAllValues,
  firstValue1,
  firstValue2,
  data1,
  data2,
  render,
  filterW,
}: any) {
  const targetRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [drop, setDrop] = useState(false);
  const [value1, setValue1] = useState<string>("");
  const [value2, setValue2] = useState<string>("");

  const [currency, setCurrency] = useState<string>("ლარი");
  const [mileKm, setMileKm] = useState<string>("კმ");

  useEffect(() => {
    if (setAllValues && value1 !== undefined) {
      setAllValues((prev: any) => ({
        ...prev,
        [name1]: value1,
      }));
    }
  }, [value1]);
  useEffect(() => {
    if (setAllValues && value2 !== undefined) {
      setAllValues((prev: any) => ({
        ...prev,
        [name2]: value2,
      }));
    }
  }, [value2]);

  useEffect(() => {
    setValue1(firstValue1);
    setValue2(firstValue2);
  }, [firstValue1, firstValue1]);

  useEffect(() => {
    if (render) {
      setValue1("");
      setValue2("");
    }
  }, [render]);

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

  useEffect(() => {
    if (drop) {
      inputRef.current?.focus();
    }
  }, [drop]);

  return (
    <div ref={targetRef} className="relative w-full h-full">
      <div
        onClick={() => {
          setDrop((pre) => !pre);
        }}
        className={`shadow  rounded-full duration-100 border-[1px] border-white w-full flex gap-[10px] h-[45px] items-center cursor-pointer justify-between px-[20px] ${
          drop ? "bg-white text-black" : "text-white"
        }`}
      >
        <div className="flex items-center gap-[10px] w-[calc(100%-30px)] h-full">
          {icon && (
            <div className="w-[20px] h-[40px] flex items-center justify-center text-[20px] cursor-pointer">
              {icon}
            </div>
          )}

          <div
            className={`text-[14px] flex items-center truncate line-clamp-1 text-start ${
              icon ? "w-[calc(100%-30px)]" : "w-full"
            }`}
          >
            {value1 || value2 ? (
              <div className="flex items-center gap-[5px] text-[12px]">
                <p>{value1 ? value1 : ""}</p> - <p>{value2 ? value2 : ""}</p>
              </div>
            ) : (
              placeholder
            )}
          </div>
        </div>
        {(value1 || value2) && (
          <div
            onClick={() => {
              setValue1("");
              setValue2("");
            }}
            className={`w-[20px] h-[40px] flex items-center justify-center cursor-pointer `}
          >
            <BsXLg />
          </div>
        )}
        <div
          className={`w-[20px] h-[40px] flex items-center justify-center text-[20px] cursor-pointer `}
        >
          <IoIosArrowDown
            className={`duration-200 ${drop ? "rotate-[180deg]" : ""}`}
          />
        </div>
      </div>
      <div
        style={{
          height: `${drop ? 200 : 0}px`,
        }}
        className={`absolute rounded-[8px] flex flex-col gap-[10px] ${
          filterW ? "w-full" : "w-[300px]"
        } shadow-[#3d7294] bg-[#0e1420] text-white shadow-md duration-100 px-[10px]
        
        ${drop ? `top-[55px] z-[1] py-[5px]` : "top-[40px] z-[-2] py-0"}
        
        `}
      >
        {placeholder === "ფასი" && (
          <div
            onClick={() => {
              setCurrency(currency === "ლარი" ? "დოლარი" : "ლარი");
            }}
            className="cursor-pointer flex items-center justify-end gap-[5px] h-[20px]"
          >
            <p
              className={`duration-100 ${
                currency === "ლარი" ? "text-white" : "text-gray-400"
              }`}
            >
              ₾
            </p>
            <div className="flex relative h-full w-[40px] rounded-full bg-white">
              <div
                className={`absolute bg-[#3d7294] rounded-full duration-100 top-[3px] w-[15px] h-[15px] ${
                  currency === "ლარი" ? "left-[3px]" : "left-[23px]"
                }`}
              ></div>
            </div>
            <p
              className={`duration-100 ${
                currency === "დოლარი" ? "text-white" : "text-gray-400"
              }`}
            >
              $
            </p>
          </div>
        )}
        {placeholder === "გარბენი" && (
          <div
            onClick={() => {
              setMileKm(mileKm === "კმ" ? "მილი" : "კმ");
            }}
            className="cursor-pointer flex items-center justify-end gap-[5px] h-[20px]"
          >
            <p
              className={`duration-100 ${
                mileKm === "კმ" ? "text-white" : "text-gray-400"
              }`}
            >
              კმ
            </p>
            <div className="flex relative h-full w-[40px] rounded-full bg-white">
              <div
                className={`absolute bg-[#3d7294] rounded-full duration-100 top-[3px] w-[15px] h-[15px] ${
                  mileKm === "კმ" ? "left-[3px]" : "left-[23px]"
                }`}
              ></div>
            </div>
            <p
              className={`duration-100 ${
                mileKm === "მილი" ? "text-white" : "text-gray-400"
              }`}
            >
              მილი
            </p>
          </div>
        )}
        <div className="grid grid-cols-2 gap-[20px] h-[30px]">
          <input
            ref={inputRef}
            type="text"
            value={value1}
            onChange={(e) => setValue1(e.target.value)}
            placeholder="დან.."
            className={`text-[14px] truncate select-none outline-none h-full w-full rounded-[4px] px-[5px] bg-[#233b49]`}
          />
          <input
            ref={inputRef}
            type="text"
            value={value2}
            onChange={(e) => setValue2(e.target.value)}
            placeholder="მდე.."
            className={`text-[14px] truncate select-none outline-none h-full w-full rounded-[4px] px-[5px] bg-[#233b49]`}
          />
        </div>
        <div
          className={`grid grid-cols-2 gap-[20px] ${
            placeholder === "ფასი" || placeholder === "გარბენი"
              ? "h-[calc(100%-70px)]"
              : "h-[calc(100%-40px)]"
          }`}
        >
          <div className="overflow-y-scroll showScroll h-full">
            {data1?.map((item: any, index: any) => (
              <p
                key={item.id}
                onClick={() => {
                  setValue1(item.name);
                }}
                className={`px-[10px] flex items-center w-full h-[30px] text-[13px] truncate  cursor-pointer duration-100 select-none ${
                  index % 2 === 0 ? "bg-[#072436]" : ""
                }
              ${item.name === value1 ? "bg-[#093a58] " : "hover:bg-[#093a58]"}`}
              >
                {item.name}
              </p>
            ))}
          </div>
          <div className="overflow-y-scroll showScroll h-full">
            {data2?.map((item: any, index: any) => (
              <p
                key={item.id}
                onClick={() => {
                  setValue2(item.name);
                }}
                className={`px-[10px] flex items-center w-full h-[30px] text-[13px] truncate  cursor-pointer duration-100 select-none ${
                  index % 2 === 0 ? "bg-[#072436]" : ""
                }
              ${item.name === value2 ? "bg-[#093a58] " : "hover:bg-[#093a58]"}`}
              >
                {item.name}
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
