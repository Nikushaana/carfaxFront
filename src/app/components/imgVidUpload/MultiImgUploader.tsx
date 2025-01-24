"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { BsImage } from "react-icons/bs";
import { MdOutlineAddPhotoAlternate } from "react-icons/md";

export default function MultiImgUploader({ inputName }) {
  const [multipleFiles, setMultipleFiles] = useState([]);
  const inputElement = useRef(null);

  const handleMultipleFilesChange = (event) => {
    let tmpImageList = [];
    for (let i = 0; i < event.target.files.length; i++) {
      tmpImageList.push(event.target.files[i]);
    }
    setMultipleFiles((prev) => tmpImageList);
  };

  const HandleRemovePhoto = (index) => {
    let tmp = [...multipleFiles];
    tmp.splice(index, 1);
    setMultipleFiles(tmp);
  };

  const handleOpenInput = () => {
    inputElement.current.click();
  };

  return (
    <div className="grid grid-cols-5 max-2xl:grid-cols-4 max-xl:grid-cols-3 max-sm:grid-cols-2 gap-4 items-center">
      {multipleFiles ? (
        multipleFiles.map((single, index) => {
          let fileUrl = URL.createObjectURL(single);
          let fileName = single.name;
          return (
            <div
              key={index}
              className={`group shadow-md shadow-[#3d7294] rounded-[8px] overflow-hidden bg-[#182540] relative flex items-center h-32 w-full`}
            >
              <div className="relative flex items-center w-full h-full gap-2 max-sm:flex-col">
                <Image
                  src={fileUrl}
                  alt={""}
                  sizes="500px"
                  fill
                  style={{
                    objectFit: "cover",
                  }}
                />
              </div>
              <div
                className="rounded-full absolute group-hover:flex max-lg:flex top-[7px] right-[10px] w-8 h-8 bg-[#21335a] cursor-pointer hidden items-center justify-center"
                onClick={() => {
                  HandleRemovePhoto(index);
                }}
              >
                <AiOutlineClose className="text-gray-100 text-2xl" />
              </div>
            </div>
          );
        })
      ) : (
        <></>
      )}
      <div className="">
        <div
          onClick={handleOpenInput}
          className={`flex items-center justify-center shadow-[#3d7294] bg-[#0e1420] hover:shadow-md shadow duration-200 rounded-[8px] cursor-pointer h-32 w-full`}
        >
          <MdOutlineAddPhotoAlternate className="text-4xl text-gray-300" />
        </div>
        <input
          name={inputName}
          ref={inputElement}
          multiple
          className="hidden"
          type="file"
          onChange={handleMultipleFilesChange}
          accept="image/*"
        />
      </div>
    </div>
  );
}
