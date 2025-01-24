"use client";

import React, { ChangeEvent, useEffect, useState } from "react";

export default function TextArea1({
  firstValue,
  placeholder,
  name,
  setAllValues,
  isNumber,
  digit,
  handleInputKeyPress,
}: any) {
  const [isFocused, setIsFocused] = useState(false);

  const [inputText, setInputText] = useState<string>();

  useEffect(() => {
    if (setAllValues) {
      setAllValues((prev: any) => ({ ...prev, [name]: inputText }));
    }
  }, [inputText]);

  useEffect(() => {
    setInputText(firstValue);
  }, [firstValue]);

  const handleInputChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
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
      className={`rounded-[8px] p-[15px] w-full shadow-[#3d7294] bg-[#0e1420] text-white outline-none px-[10px] flex duration-100 ${
        isFocused ? "shadow-md" : " shadow"
      }`}
    >
      <textarea
        onChange={handleInputChange}
        onKeyPress={handleInputKeyPress}
        value={inputText}
        name={name}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        placeholder={placeholder}
        className={`select-none outline-none bg-transparent w-full min-h-[150px] showScrollVert`}
      ></textarea>
    </div>
  );
}
