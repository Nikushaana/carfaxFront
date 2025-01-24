"use client";

import React, { useEffect, useState } from "react";
import { axiosUser } from "../../../../useContexts/AxiosClient/AxiosClient";
import EditCarCards from "../../components/cardsStyles/EditCarCards";
import EditPartCards from "../../components/cardsStyles/EditPartCards";
import LoaderCust from "../../components/loader/LoaderCust";
import EditPartServs from "../../components/cardsStyles/EditPartServs";
import { usePathname, useRouter } from "next/navigation";

export default function Layout({ children }: Children) {
  const router = useRouter();
  const pathname = usePathname();
  const [active, setActive] = useState(pathname.split("/")[3]);

  return (
    <div className="w-full flex flex-col gap-7 text-white">
      <h1 className="text-[22px] hidden max-lg:flex  text-white">
        ჩემი განცხადებები
      </h1>
      <div className="w-full flex flex-col text-white">
        <div className="flex items-center self-start rounded-t-[10px] shadow-md shadow-[#3d7294]">
          <p
            onClick={() => {
              setActive("cars");
              router.push("/user/mystatements/cars");
            }}
            className={`px-[10px] h-[35px] flex items-center  bg-[#1a4865] hover:bg-[#3d7294] duration-100 cursor-pointer rounded-tl-[10px] ${
              active === "cars" && "bg-[#3d7294]"
            }`}
          >
            ავტომობილები
          </p>
          <p
            onClick={() => {
              setActive("parts");
              router.push("/user/mystatements/parts");
            }}
            className={`px-[10px] h-[35px] flex items-center bg-[#1a4865] hover:bg-[#3d7294] duration-100 cursor-pointer ${
              active === "parts" && "bg-[#3d7294]"
            }`}
          >
            ნაწილები
          </p>
          <p
            onClick={() => {
              setActive("services");
              router.push("/user/mystatements/services");
            }}
            className={`px-[10px] h-[35px] flex items-center bg-[#1a4865] hover:bg-[#3d7294] duration-100 cursor-pointer rounded-tr-[10px] ${
              active === "services" && "bg-[#3d7294]"
            }`}
          >
            სერვისები
          </p>
        </div>

        <div className="shadow-md shadow-[#3d7294] bg-[#0e1420] w-full p-[15px] rounded-b-[10px] rounded-tr-[10px]">
          {children}
        </div>
      </div>
    </div>
  );
}
