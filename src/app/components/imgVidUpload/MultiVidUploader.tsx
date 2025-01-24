"use client";

import Image from "next/image";
import React, { useState } from "react";
import { BsXLg } from "react-icons/bs";
import { LuUpload } from "react-icons/lu";
import { RiVideoUploadLine } from "react-icons/ri";

export default function MultiVidUploader({ inputName }) {
  const [videos, setvideos] = useState<any>([]);

  const removevideo = (index: any) => {
    const updatedvideos = [...videos];
    updatedvideos.splice(index, 1);
    setvideos(updatedvideos);
  };

  const handleFileSelect = (e: any) => {
    const selectedFiles = Array.from(e.target.files);
    setvideos([...videos, ...selectedFiles]);
  };

  return (
    <div
      className={`grid grid-cols-5 max-2xl:grid-cols-4 max-xl:grid-cols-3 max-sm:grid-cols-2 gap-4 items-center`}
    >
      {videos.map((video: any, index: any) => (
        <div
          key={index}
          className="relative w-full h-32 bg-[#F0F5F7] rounded-[8px] overflow-hidden group"
        >
          <video
            src={URL.createObjectURL(video)}
            className="w-full h-full object-cover rounded-[6px]"
            controls
          />
          <button
            className="rounded-full absolute group-hover:flex max-lg:flex top-[7px] right-[10px] w-8 h-8 bg-[#21335a] cursor-pointer hidden items-center justify-center"
            onClick={() => removevideo(index)}
          >
            <BsXLg />
          </button>
        </div>
      ))}
      <label
        className={`flex items-center justify-center h-32 shadow-[#3d7294] bg-[#0e1420] hover:shadow-md shadow duration-200 rounded-[8px] cursor-pointer w-full`}
      >
        <input
          name={inputName}
          type="file"
          className="hidden"
          onChange={handleFileSelect}
          multiple
          accept="video/*"
        />
        <RiVideoUploadLine className="text-4xl text-gray-300" />
      </label>
    </div>
  );
}
