"use client";

import { useContext } from "react";
import { AxiosForSharingStatesAxiosContext } from "../../../../useContexts/sharedStates";
import Input1 from "../Inputs/Input1";
import DropDown1ValSearch from "../DropDowns/DropDown1ValSearch";
import Input2 from "../Inputs/Input2";

export default function AddContact({ setAllValues, data, isService }: any) {
  const { adress } = useContext(AxiosForSharingStatesAxiosContext);

  return (
    <div className="w-full shadow-md shadow-[#3d7294] bg-[#0e1420] text-white rounded-[10px] flex flex-col gap-y-[20px] px-[20px] py-[30px] max-sm:px-[10px]">
      <p className="text-[17px]">კონტაქტი</p>

      <div className="flex items-center justify-between max-sm:flex-col max-sm:items-start max-sm:gap-y-[10px]">
        <p>{isService ? "კომპანიის სახელი" : "სახელი"}</p>
        <div className="w-[300px] h-[40px] max-sm:w-full">
          <Input2
            setAllValues={setAllValues}
            firstValue={
              isService ? data && data.servcenterName : data && data.o_name
            }
            name={isService ? "servcenterName" : "o_name"}
          />
        </div>
      </div>
      <div className="flex items-center justify-between max-sm:flex-col max-sm:items-start max-sm:gap-y-[10px]">
        <p>ტელეფონის ნომერი *</p>
        <div className="h-[40px] w-[300px] max-sm:w-full">
          <Input2
            setAllValues={setAllValues}
            firstValue={
              isService
                ? data &&
                  data.phone
                    .replace(/[^0-9]/g, "")
                    .replace(/\s/g, "")
                    .replace(/(.{3})/g, "$1 ")
                    .trim()
                    .slice(0, 11)
                : data &&
                  data.o_phone
                    .replace(/[^0-9]/g, "")
                    .replace(/\s/g, "")
                    .replace(/(.{3})/g, "$1 ")
                    .trim()
                    .slice(0, 11)
            }
            name={isService ? "phone" : "o_phone"}
            isNumber={true}
          />
        </div>
      </div>
      {!isService && (
        <div className="flex items-center justify-between max-sm:flex-col max-sm:items-start max-sm:gap-y-[10px]">
          <p>მდებარეობა</p>
          <div className="w-[300px] h-[40px] max-sm:w-full">
            <DropDown1ValSearch
              name="o_city"
              setAllValues={setAllValues}
              firstValue={data?.o_city}
              data={adress}
              placeholder="მდებარეობა"
              searchable={true}
            />
          </div>
        </div>
      )}
    </div>
  );
}
