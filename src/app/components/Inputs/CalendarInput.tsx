"use client";

import React, { ChangeEvent, useEffect, useState } from "react";

export default function CalendarInput({
  firstValue,
  name,
  setAllValues,
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

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    let newText = event.target.value;

    setInputText(newText);
  };

  return (
    <div
      className={`rounded-[8px] w-full h-[40px] outline-none px-[10px] border-[1px] flex ${
        isFocused ? " border-gray-400" : "border-gray-300"
      }`}
    >
      <input
        onChange={handleInputChange}
        onKeyPress={handleInputKeyPress}
        value={inputText}
        type="date"
        name={name}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className={`select-none outline-none w-full bg-transparent`}
      />
    </div>
  );
}
