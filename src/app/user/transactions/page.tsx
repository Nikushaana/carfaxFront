"use client";

import { useState } from "react";
import { BsArrowDownUp } from "react-icons/bs";
import TransactionCard from "../../components/cardsStyles/transactionCard";

export default function Transactions() {
  const [transactionsData, setTransactionsData] = useState([
    {
      id: 1,
      amount: "200",
      date: "01/05/2021",
    },
    {
      id: 2,
      amount: "50",
      date: "11/08/2021",
    },
    {
      id: 3,
      amount: "65",
      date: "01/12/2021",
    },
    {
      id: 4,
      amount: "12",
      date: "15/10/2021",
    },
  ]);
  return (
    <div className="w-full flex flex-col gap-7 text-white">
      <h1 className="text-[22px] hidden max-lg:flex  text-white">
        ტრანზაქციები
      </h1>
      <div className="w-full flex flex-col gap-y-[10px] px-[10px] py-[20px] shadow-md shadow-[#3d7294] bg-[#0e1420] text-white rounded-[10px] max-sm:px-[16px] overflow-x-auto">
        <div className="flex  items-center gap-[20px] min-w-[560px]">
          <div className="flex gap-[5px] items-center ">
            <input
              className="shadow shadow-[#3d7294] bg-[#1d263a] rounded-[8px] px-[5px] h-[40px] outline-none"
              type="date"
            />
            დან
          </div>
          -
          <div className="flex gap-[5px] items-center ">
            <input
              className="shadow shadow-[#3d7294] bg-[#1d263a] rounded-[8px] px-[5px] h-[40px] outline-none"
              type="date"
            />
            მდე
          </div>
          <div
            className="h-[40px] rounded-[8px] bg-[black] shadow shadow-[#3d7294]
      hover:bg-[#3d7294] duration-200 cursor-pointer flex items-center px-[10px]"
          >
            <p>მოძებნე</p>
          </div>
        </div>
        <div className="flex items-center bg-[#495c85] text-white shadow shadow-[#3d7294] rounded-[8px] justify-between h-[40px] min-w-[560px]">
          <div className="w-[10%] flex items-center gap-[5px] justify-center ">
            <p>#</p> <BsArrowDownUp />
          </div>
          <p className="w-[20%] flex justify-center">ოპერაცია</p>
          <p className="w-[25%] flex justify-center">განცხადების ID</p>
          <p className="w-[20%] flex justify-center">თანხა</p>
          <p className="w-[25%] flex justify-center">თარიღი</p>
        </div>

        {transactionsData.map((item) => (
          <TransactionCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}
