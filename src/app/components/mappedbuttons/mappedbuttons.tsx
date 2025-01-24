"use client";

import React, { useEffect, useRef, useState } from "react";
import { AiOutlineCheck, AiOutlinePlus } from "react-icons/ai";
import { FaCheck } from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";

export default function MappedButtons({
  data,
  name,
  setAllValues,
  firstValue,
}: any) {
  const [values, setValues] = useState<any>([]);

  useEffect(() => {
    const initialValues: string[] = [];

    if (firstValue?.Hatch === "true") {
      initialValues.push("ლუქი");
    }
    if (firstValue?.Panorama === "true") {
      initialValues.push("პანორამა");
    }
    if (firstValue?.multimedia === "true") {
      initialValues.push("მულტიმედია");
    }
    if (firstValue?.camera === "true") {
      initialValues.push("კამერა");
    }
    setValues(initialValues);
  }, [firstValue]);

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

  return (
    <div className="grid grid-cols-5 max-2xl:grid-cols-4 max-xl:grid-cols-3 max-tiny:grid-cols-2 w-full gap-y-[20px] gap-[20px] max-sm:gap-[10px]">
      {data.map((item) => (
        <div
          key={item.id}
          onClick={() => handleAddValueInData(item.name)}
          className={`flex justify-between w-full h-[60px] duration-200 items-center px-[10px] rounded-[10px] cursor-pointer
                  ${
                    values.includes(item.name)
                      ? "bg-[#335f7a] text-white"
                      : "shadow-md shadow-[#3d7294] bg-[#0e1420]"
                  }`}
        >
          <p className="text-[14px]">{item.name}</p>
          <div
            className={`w-[30px] h-[30px] rounded-full flex items-center justify-center duration-200 
          ${
            values.includes(item.name)
              ? "bg-[#3d7294] border-[1px] text-[22px] text-white"
              : "bg-[#335f7a]"
          }`}
          >
            {values.includes(item.name) ? (
              <AiOutlineCheck />
            ) : (
              <AiOutlinePlus />
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
