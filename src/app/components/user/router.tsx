"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";

export default function Router() {
  const [router, setRouter] = useState([
    {
      id: 1,
      route: "ავტომობილის დამატება",
      link: "addcar",
    },
    {
      id: 2,
      route: "ნაწილის დამატება",
      link: "addpart",
    },
    {
      id: 3,
      route: "სერვისის დამატება",
      link: "addservice",
    },
    {
      id: 4,
      route: "ჩემი განცხადებები",
      link: "mystatements/cars",
    },
    {
      id: 5,
      route: "ტრანზაქციები",
      link: "transactions",
    },
    {
      id: 6,
      route: "პროფილის რედაქტირება",
      link: "profile-edit",
    },
  ]);

  const pathname = usePathname();

  return (
    <div className="bg-[#0e1420] shadow-md shadow-[#3d7294] text-white rounded-[10px] flex items-center gap-5  py-4">
      <ul className="flex flex-col w-full overflow-x-hidden">
        {router.map((item) => (
          <Link href={`/user/${item.link}`} key={item.id}>
            <li
              className={`flex items-center gap-5 justify-between pr-2 h-[50px]  hover:bg-[#1a4865] duration-100 cursor-pointer ${
                pathname.split("/")[2] === item.link.split("/")[0] &&
                "bg-[#1a4865]"
              }`}
            >
              <div className="flex items-center gap-5 h-full">
                <div
                  className={`w-[2px] h-full  duration-100 ${
                    pathname.split("/")[2] === item.link.split("/")[0] &&
                    "bg-[#3d7294]"
                  }`}
                ></div>

                <p className="">{item.route}</p>
              </div>
            </li>
          </Link>
        ))}
      </ul>
    </div>
  );
}
