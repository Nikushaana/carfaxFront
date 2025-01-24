"use client";

import React, { useContext } from "react";
import { AxiosForSharingStatesAxiosContext } from "../../../../../useContexts/sharedStates";
import DropDown1ValSearch from "../../DropDowns/DropDown1ValSearch";
import DropDownFromTo from "../../DropDowns/DropDownFromTo";
import { AiOutlineClose } from "react-icons/ai";
import DropDown2valueSearch from "../../DropDowns/DropDown2valueSearch";
import Toggle2value from "../../toggle2value/toggle2value";

export default function Partsfilterpopup() {
  const {
    partsfilterpopup,
    setPartsfilterPopup,
    vehicleType,
    years,
    price,
    parts,
    adress,

    partsfltrFromParams,
    setPartsfltrForParams,
    partsfltrForParams,
    handleClearCarsFilter,
    partData,FirmsData, ModelsData
  } = useContext(AxiosForSharingStatesAxiosContext);

  return (
    <div
      className={`w-[100vw] fixed h-[100vh] max-tiny:pb-[100px] top-0 left-0 flex py-[50px] justify-center items-center bg-[#000000c8] backdrop-blur overflow-y-auto duration-100 ${
        partsfilterpopup ? " z-[50]" : "z-[-5]"
      }`}
    >
      <div className="rounded-[15px] w-[800px] self-start bg-[#093a58]">
        <div className="px-[30px] py-[20px] bg-[#072436] rounded-t-[15px] border-b-[1px] flex justify-between items-center">
          <h1 className="text-[19px] text-white">ნაწილების დეტალური ფილტრი</h1>
          <div
            className="w-[40px] h-[40px] rounded-full flex items-center justify-center duration-200 cursor-pointer hover:bg-gray-300 bg-white"
            onClick={() => {
              setPartsfilterPopup(false);
            }}
          >
            <AiOutlineClose className="text-[23px]" />
          </div>
        </div>

        <div className="p-[20px] flex flex-col gap-[20px]">
          <div className="grid grid-cols-2 max-tiny:grid-cols-1 gap-[20px] ">
            <DropDown2valueSearch
              name="partName"
              data={parts}
              placeholder="ნაწილი"
              firstValue={partsfltrFromParams.partName}
              setAllValues={setPartsfltrForParams}
              searchable={true}
              filterW={false}
            />
            <DropDown2valueSearch
              name="firm"
              data={FirmsData}
              firstValue={partsfltrFromParams.firm}
              placeholder="მწარმოებელი"
              searchable={true}
              setAllValues={setPartsfltrForParams}
              filterW={false}
            />
            <DropDown2valueSearch
              name="model"
              firstValue={partsfltrFromParams.model}
              data={ModelsData.filter((model) =>
                FirmsData.filter((firm) =>
                  partsfltrForParams.firm?.includes(firm.name)
                )
                  .map((firm) => firm.id)
                  .includes(model.firm_id)
              )}
              placeholder="მოდელი"
              render={partsfltrFromParams.firm.length <= 0}
              searchable={true}
              setAllValues={setPartsfltrForParams}
              filterW={false}
            />

            <DropDown1ValSearch
              name="o_city"
              firstValue={partsfltrFromParams.o_city}
              data={adress}
              placeholder="მდებარეობა"
              setAllValues={setPartsfltrForParams}
              searchable={true}
            />

            <DropDownFromTo
              name1="minPrice"
              name2="maxPrice"
              firstValue1={partsfltrFromParams.minPrice}
              firstValue2={partsfltrFromParams.maxPrice}
              data1={price}
              data2={price}
              setAllValues={setPartsfltrForParams}
              placeholder="ფასი"
              filterW={true}
            />
            <DropDownFromTo
              name1="fyear"
              name2="tyear"
              firstValue1={partsfltrFromParams.fyear}
              firstValue2={partsfltrFromParams.tyear}
              data1={years}
              data2={years}
              data={vehicleType}
              setAllValues={setPartsfltrForParams}
              placeholder="წელი"
              filterW={true}
            />
            <div className="flex items-center justify-around max-tiny:flex-col max-tiny:items-start max-tiny:gap-y-[10px]">
              <p className="flex items-center gap-[10px] text-[white]">
                მდგომარეობა
              </p>
              <Toggle2value
                name="condition"
                setAllValues={setPartsfltrForParams}
                firstValue=""
                title1="ახალი"
                title2="მეორადი"
              />
            </div>
            <div className="flex items-center justify-around max-tiny:flex-col max-tiny:items-start max-tiny:gap-y-[10px]">
              <p className="flex items-center gap-[10px] text-[white]">
                ორიგინალი
              </p>
              <Toggle2value
                name="original"
                setAllValues={setPartsfltrForParams}
                firstValue=""
                title1="კი"
                title2="არა"
              />
            </div>
          </div>
          <div
            className={`h-full 
     w-full flex gap-[10px] items-end justify-between px-[20px] text-white `}
          >
            <p
              onClick={() => {
                setPartsfilterPopup(true);
              }}
              className={`text-[14px] truncate text-start underline`}
            >
              ძიების {partData ? partData.length : 0} შედეგი
            </p>
            <p
              onClick={() => {
                handleClearCarsFilter();
              }}
              className={`text-[14px] truncate text-start cursor-pointer hover:text-[red] duration-100`}
            >
              გასუფთავება
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
