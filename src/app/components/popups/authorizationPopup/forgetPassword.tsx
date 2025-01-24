import { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import LoaderCust from "../../loader/LoaderCust";

export default function ForgetPassword() {
  const [loader, setLoader] = useState(false);
  const [show, setshow] = useState(false);

  const handleshow = () => {
    setshow((pre) => !pre);
  };
  return (
    <div className="w-full flex flex-col gap-y-[20px]">
      <h1 className="text-center">პაროლის აღდგენა</h1>
      <div className="flex flex-col gap-y-[10px]">
        <p className="   text-[#010125]">ტელეფონის ნომერი</p>
        <input
          type="text"
          className="w-[100%] h-[50px] text-[#010125] px-[10px] border-[1px] rounded-[10px] outline-none"
        />
      </div>

      <div className="flex flex-col gap-y-[10px]">
        <p className="   text-[#010125]">კოდი</p>
        <div className="flex w-[100%] h-[50px] border-[1px] rounded-[10px] items-center pr-[10px]">
          <input
            type="text"
            className="w-[100%] h-[100%] text-[#010125] shadow-none px-[10px] outline-none rounded-[10px] appearance-none"
          />
        </div>
      </div>

      <div className="flex flex-col gap-y-[10px]">
        <p className="   text-[#010125]">ახალი პაროლი</p>
        <div className="flex w-[100%] h-[50px] border-[1px] rounded-[10px] items-center pr-[10px] gap-[10px]">
          <input
            type={show ? "text" : "password"}
            name="password"
            id="password"
            placeholder="***********"
            className="w-[100%] h-[100%] text-[#010125] shadow-none px-[10px] outline-none rounded-[10px] appearance-none"
          />
          <div onClick={handleshow} className="text-[20px] text-[#010125]">
            {show ? (
              <AiOutlineEye className="cursor-pointer " />
            ) : (
              <AiOutlineEyeInvisible className="cursor-pointer" />
            )}
          </div>
        </div>
      </div>

      {loader ? (
        <LoaderCust />
      ) : (
        <div className="flex gap-[5px] items-center pt-[2px] w-[100%] h-[50px] rounded-[10px]  text-white justify-center  text-[18px] cursor-pointer bg-black  border-[1px]  duration-200 hover:bg-[#000000c1]">
          <h1>აღდგენა</h1>
        </div>
      )}
    </div>
  );
}
