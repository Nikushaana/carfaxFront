"use client";

import React, { useEffect, useState } from "react";

export default function Toggle2value({
  name,
  setAllValues,
  firstValue,
  title1,
  title2
}: any) {
  const [value, setValue] = useState<string>("");

  useEffect(() => {
    if (setAllValues && value !== undefined) {
      setAllValues((prev: any) => ({
        ...prev,
        [name]: value,
      }));
    }
  }, [value]);

  useEffect(() => {
    setValue(firstValue);
  }, [firstValue]);

  return (
    <div
      onClick={() => {
        setValue(value === title1 ? title2 : title1);
      }}
      className="cursor-pointer flex items-center justify-end gap-[5px] h-[20px]"
    >
      <p
        className={`duration-100 ${
            value === title1 ? "text-white" : "text-gray-400"
        }`}
      >
        {title1}
      </p>
      <div className="flex relative h-full w-[40px] rounded-full bg-white">
        <div
          className={`absolute bg-[#3d7294] rounded-full duration-100 top-[3px] w-[15px] h-[15px] ${
            value === title1 ? "left-[3px]" : value === title2 ? "left-[23px]" : "left-[13px]"
          }`}
        ></div>
      </div>
      <p
        className={`duration-100 ${
            value === title2 ? "text-white" : "text-gray-400"
        }`}
      >
        {title2}
      </p>
    </div>
  );
}
