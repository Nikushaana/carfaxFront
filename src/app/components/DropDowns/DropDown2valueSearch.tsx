"use client";

import React, { useEffect, useRef, useState } from "react";
import { FaCheck } from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";

export default function DropDown2valueSearch({
  data,
  icon,
  placeholder,
  name,
  setAllValues,
  firstValue,
  render,
  searchable,
  filterW,
}: any) {
  const targetRef = useRef<HTMLDivElement>(null);
  const dropRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [drop, setDrop] = useState(false);
  const [search, setSearch] = useState<string>("");
  const [values, setValues] = useState<any>([]);
  const [filteredData, setFilteredData] = useState<any[]>([]);
  const [dropHeight, setDropHeight] = useState(0);

  useEffect(() => {
    if (firstValue) {
      setValues(firstValue);
    }
  }, [firstValue]);

  useEffect(() => {
    if (render) {
      setValues([]);
    }
  }, [render]);

  useEffect(() => {
    if (setAllValues && values !== undefined) {
      setAllValues((prev: any) => ({ ...prev, [name]: values }));
    }
  }, [values]);

  const handleAddValueInData = (item: any) => {
    const isSelected = values.includes(item);

    if (isSelected) {
      setValues((prevData: any) =>
        prevData.filter((value: any) => value !== item)
      );
    } else {
      setValues((prevData: any) => [...prevData, item]);
    }
  };

  useEffect(() => {
    if (drop) {
      inputRef.current?.focus();
    }
  }, [drop]);

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

  // search

  useEffect(() => {
    if (searchable) {
      if (search) {
        setFilteredData(
          data.filter(
            (item: any) =>
              item.name.toLowerCase().startsWith(search?.toLowerCase()) ||
              item.models?.some((item1) =>
                item1.name.toLowerCase().startsWith(search?.toLowerCase())
              )
          )
        );
      } else {
        setFilteredData(data);
      }
    } else {
      setFilteredData(data);
    }
  }, [data, searchable, search]);

  useEffect(() => {
    if (drop && dropRef.current) {
      if (dropRef.current.clientHeight > 250) {
        setDropHeight(250);
      } else {
        setDropHeight(dropRef.current.clientHeight);
      }
    } else {
      setDropHeight(0);
    }
  }, [drop, filteredData]);

  return (
    <div ref={targetRef} className="relative w-full h-full text-custgray">
      <div
        onClick={() => {
          setDrop((pre) => !pre);
        }}
        className="rounded-full w-full h-full flex items-center cursor-pointer justify-between duration-100 border-[1px] border-white text-white px-[20px]"
      >
        <div className="flex items-center gap-[10px] w-[calc(100%-30px)]">
          {icon && (
            <div className="w-[20px] h-[40px] flex items-center justify-center text-[20px] cursor-pointer">
              {icon}
            </div>
          )}

          <div
            className={`flex items-center gap-[10px] truncate ${
              icon ? "w-[calc(100%-30px)]" : "w-full"
            }`}
          >
            <p className="text-[14px]">
              {values.length > 0 && values.length} {placeholder}
            </p>
          </div>
        </div>
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
          height: `${dropHeight + 10}px`,
          overflowY: dropHeight >= 250 ? "scroll" : "hidden",
        }}
        className={`absolute rounded-[8px] ${
          filterW ? "w-[200px]" : "w-full"
        }  showScroll shadow-white bg-[#0e1420] text-white shadow-md duration-100   ${
          drop ? `top-[55px] z-[2] py-[5px]` : "top-[40px] z-[-2] py-0"
        }`}
      >
        <div ref={dropRef}>
          {searchable && (
            <input
              ref={inputRef}
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="ძებნა.."
              className={`text-[14px] sticky top-[0px] truncate select-none outline-none h-[30px] mx-[5px] w-[calc(100%-10px)] rounded-[4px] px-[3px] bg-[#233b49] mb-[5px]`}
            />
          )}

          <div className={`flex flex-col  `}>
            {filteredData?.map((item: any, index: any) => (
              <div
                key={item.id}
                onClick={() => {
                  handleAddValueInData(item.name);
                }}
                className={`px-[10px] gap-[10px] flex items-center w-full h-[30px] text-[13px] truncate cursor-pointer duration-100 select-none ${
                  index % 2 === 0 ? "bg-[#072436]" : ""
                } ${
                  values.includes(item.name)
                    ? "bg-[#093a58] "
                    : "hover:bg-[#093a58]"
                }`}
              >
                <div
                  className={`w-[20px] h-[20px] flex items-center justify-center text-[10px] rounded-[8px] border-[1px] shadow  duration-100 ${
                    values.includes(item.name) ? "bg-[#58c558]" : "bg-white"
                  }`}
                >
                  <FaCheck />
                </div>
                <p className="text-წჰიტე">{item.name}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
