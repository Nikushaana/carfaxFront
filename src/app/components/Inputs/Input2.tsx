"use client";

import React, { ChangeEvent, useEffect, useState } from "react";
import { BsEye, BsEyeSlash } from "react-icons/bs";

export default function Input2({
  firstValue,
  render,
  placeholder,
  name,
  setAllValues,
  isNumber,
  time,
  digit,
  firstIcn,
  isPassword,
  handleInputKeyPress,
}: any) {
  const [isFocused, setIsFocused] = useState(false);

  const [show, setshow] = useState(false);
  const handleshow = () => {
    setshow((pre) => !pre);
  };

  const [inputText, setInputText] = useState<string>();

  useEffect(() => {
    if (setAllValues) {
      setAllValues((prev: any) => ({ ...prev, [name]: isNumber ? inputText?.replace(/\s/g, "") : inputText }));
    }
  }, [inputText]);

  useEffect(() => {
    setInputText(firstValue);
  }, [firstValue]);

  useEffect(() => {
    if (render) {
      setInputText("");
    }
  }, [render]);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    let newText = event.target.value;

    if (isNumber) {
      newText = newText
        .replace(/[^0-9]/g, "")
        .replace(/\s/g, "")
        .replace(/(.{3})/g, "$1 ")
        .trim()
        .slice(0, 11);
    }

    if (digit) {
      newText = newText.replace(/[^0-9]/g, "");
    }

    setInputText(newText);
  };

  return (
    <div
      className={`rounded-full w-full h-[45px] 
border-[1px] text-white outline-none px-[5px] flex items-center duration-100 ${
        isFocused ? "shadow-md" : " shadow"
      }`}
    >
      {firstIcn && (
        <div className="h-[100%] w-[40px] rounded-l-[16px] flex justify-center items-center text-[20px]">
          {firstIcn}
        </div>
      )}
      <input
        onChange={handleInputChange}
        onKeyPress={handleInputKeyPress}
        value={inputText}
        type={
          isPassword ? (show ? "text" : "password") : time ? "time" : "text"
        }
        name={name}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        placeholder={placeholder}
        className={`select-none outline-none h-[90%] rounded-[8px] pl-[5px] ${
          firstIcn
            ? isPassword
              ? "w-[calc(100%-75px)]"
              : "w-[calc(100%-35px)]"
            : isPassword
            ? "w-[calc(100%-40px)]"
            : "w-full"
        } bg-transparent`}
      />
      {isPassword && (
        <div
          onClick={handleshow}
          className="text-[20px] w-[30px] flex items-center justify-center text-white"
        >
          {show ? (
            <BsEye className="cursor-pointer" />
          ) : (
            <BsEyeSlash className="cursor-pointer" />
          )}
        </div>
      )}
    </div>
  );
}
