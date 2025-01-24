import Image from "next/image";
import React, { useContext, useState } from "react";
import { BsPerson } from "react-icons/bs";
import { UserContext } from "../../../../useContexts/UserAxios";
import Input2 from "../Inputs/Input2";
import { CurrencyAxiosContext } from "../../../../useContexts/CurrencyAxios";
import { axiosUser } from "../../../../useContexts/AxiosClient/AxiosClient";

export default function Userbalance() {
  const { user } = useContext(UserContext);
  const { actCurrency, currency } = useContext(CurrencyAxiosContext);

  const [addValueBalance, setAddValueBalance] = useState({
    balance: "",
  });

  const handelAddBalance = () => {
    axiosUser
      .get(`/user/bogPay?amount=${addValueBalance.balance}`)
      .then((res) => {
        window.location.replace(res.data);
      })
      .catch((err) => {});
  };

  return (
    <div className="flex w-full flex-col gap-y-[10px] items-center ">
      <div className="flex items-center gap-[10px]">
        <div className="w-[60px] h-[60px] rounded-full flex items-center justify-center relative overflow-hidden shadow shadow-[#3d7294]">
          {user.img ? (
            <Image
              src={user.img}
              alt={""}
              sizes="500px"
              fill
              style={{
                objectFit: "cover",
              }}
            />
          ) : (
            <div className="w-full h-full text-white flex items-center justify-center text-[25px]">
              <BsPerson />
            </div>
          )}
        </div>
        <div className="flex gap-[5px] text-white">
          <p>ID: {user.id}</p>
        </div>
      </div>
      <div className="flex flex-col items-center">
        <div>
          <p className="text-white">მომხმარებელი: {user.name}</p>
        </div>

        <div className="flex items-center gap-[5px]">
          <p className="text-white">ბალანსი:</p>
          <p className="text-white">
            {actCurrency === "USD"
              ? `${
                  Math.round(user.balance / currency.rate)
                    ? Math.round(user.balance / currency.rate)
                    : 0
                } $`
              : `${user.balance} ₾`}
          </p>
        </div>
        <div className="flex flex-col items-center gap-[10px] mt-[10px]">
          <div
            className={`w-full flex items-center duration-200 gap-[10px] ${
              true ? "h-[40px]" : "h-0"
            }`}
          >
            <Input2
              digit={true}
              name="balance"
              setAllValues={setAddValueBalance}
            />
            <p className="text-white w-[40px] h-full overflow-hidden flex items-center justify-center rounded-[10px] shadow shadow-[#3d7294] bg-[#0e1420] text-[18px]">
              ₾
            </p>
          </div>
          <p
            onClick={() => handelAddBalance()}
            className="bg-[#0e1420] shadow overflow-hidden shadow-[#3d7294] text-white cursor-pointer duration-200 flex items-center justify-center rounded-[10px] w-full h-[40px] px-[10px]"
          >
            ბალანსის შევსება
          </p>
        </div>
      </div>
    </div>
  );
}
