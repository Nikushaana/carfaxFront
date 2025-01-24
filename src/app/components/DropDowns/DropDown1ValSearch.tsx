"use client";

import React, { useEffect, useRef, useState } from "react";
import { BsXLg } from "react-icons/bs";
import { IoIosArrowDown } from "react-icons/io";

export default function DropDown1ValSearch({
  data,
  icon,
  placeholder,
  name,
  setAllValues,
  firstValue,
  searchable,
  render,
  filterW,
}: any) {
  const targetRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [drop, setDrop] = useState(false);
  const [search, setSearch] = useState<string>("");
  const [value, setValue] = useState<string>("");
  const [filteredData, setFilteredData] = useState<any[]>([]);

  useEffect(() => {
    if (setAllValues && value !== undefined) {
      setAllValues((prev: any) => ({ ...prev, [name]: value }));
    }
  }, [value]);

  useEffect(() => {
    setValue(firstValue);
  }, [firstValue]);

  useEffect(() => {
    if (render) {
      setValue("");
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

  // search

  useEffect(() => {
    if (searchable) {
      if (search) {
        setFilteredData(
          data.filter((item: any) =>
            item.name.toLowerCase().startsWith(search?.toLowerCase())
          )
        );
      } else {
        setFilteredData(data);
      }
    } else {
      setFilteredData(data);
    }
  }, [data, searchable, search]);

  return (
    <div ref={targetRef} className="relative w-full h-[45px]">
      <div
        onClick={() => {
          setDrop((pre) => !pre);
        }}
        className={`h-full shadow rounded-full duration-100 border-[1px] border-white
     w-full flex gap-[10px] items-center cursor-pointer justify-between px-[20px] ${
       drop ? "bg-white text-black" : "text-white"
     }`}
      >
        <div className="flex items-center gap-[10px] w-[calc(100%-30px)] h-full ">
          {icon && (
            <div className="w-[20px] h-[40px] flex items-center justify-center text-[20px] cursor-pointer">
              {icon}
            </div>
          )}

          <p
            className={`text-[14px] truncate text-start ${
              icon ? "w-[calc(100%-30px)]" : "w-full"
            }`}
          >
            {value ? value : placeholder}
          </p>
        </div>
        {value && (
          <div
            onClick={() => {
              setValue("");
            }}
            className={`w-[20px] h-[40px] flex items-center justify-center cursor-pointer `}
          >
            <BsXLg />
          </div>
        )}
        <div
          className={`h-[40px] flex items-center justify-center text-[20px] cursor-pointer `}
        >
          <IoIosArrowDown
            className={`duration-200 ${drop ? "rotate-[180deg]" : ""}`}
          />
        </div>
      </div>
      <div
        style={{
          height: `${
            drop
              ? filteredData?.length > 5
                ? 230
                : searchable
                ? filteredData?.length * 30 + 45
                : filteredData?.length * 30 + 10
              : 0
          }px`,
        }}
        className={`absolute rounded-[8px] ${
          filterW ? "w-[200px]" : "w-full"
        }  shadow-white bg-[#0e1420] text-white shadow-md duration-100 overflow-hidden ${
          filteredData?.length > 6 && "overflow-y-scroll showScroll"
        } ${drop ? `top-[55px] z-[1] py-[5px]` : "top-[40px] z-[-2] py-0"}`}
      >
        {searchable && (
          <input
            ref={inputRef}
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="ძებნა.."
            className={`text-[14px] truncate select-none sticky top-0 outline-none h-[30px] mx-[5px] w-[calc(100%-10px)] rounded-[4px] px-[3px] bg-[#233b49] mb-[5px]`}
          />
        )}
        {filteredData?.map((item: any, index: any) => (
          <p
            key={item.id}
            onClick={() => {
              setValue(item.name);
              setDrop(false);
            }}
            className={`px-[10px] flex items-center w-full h-[30px] text-[13px] truncate  cursor-pointer duration-100 select-none ${
              index % 2 === 0 ? "bg-[#072436]" : ""
            }
              ${item.name === value ? "bg-[#093a58] " : "hover:bg-[#093a58]"}`}
          >
            {item.name}
          </p>
        ))}
      </div>
    </div>
  );
}
