"use client";

import React, { useContext } from "react";
import { AxiosForSharingStatesAxiosContext } from "../../../../../useContexts/sharedStates";
import DropDown1ValSearch from "../../DropDowns/DropDown1ValSearch";
import DropDownFromTo from "../../DropDowns/DropDownFromTo";
import { AiOutlineClose } from "react-icons/ai";
import DropDown2valueSearch from "../../DropDowns/DropDown2valueSearch";

export default function Carsfilterpopup() {
  const {
    carsfilterpopup,
    setCarsfilterPopup,
    vehicleType,
    years,
    price,
    engine,
    transmission,
    petrol,
    weel,
    colors,
    adress,
    pullingWheels,
    cylinders,
    leather,
    moreInfoBtn,

    handleClearCarsFilter,
    setCarsfltrForParams,
    carsfltrForParams,
    carsfltrFromParams,

    cardata,FirmsData, ModelsData
  } = useContext(AxiosForSharingStatesAxiosContext);

  return (
    <div
      className={`w-[100vw] fixed h-[100vh] max-tiny:pb-[100px] top-0 left-0 flex py-[50px] justify-center items-center bg-[#000000c8] backdrop-blur overflow-y-auto duration-100 ${
        carsfilterpopup ? " z-[50]" : "z-[-5]"
      }`}
    >
      <div className="rounded-[15px] w-[800px] self-start bg-[#093a58]">
        <div className="px-[30px] py-[20px] bg-[#072436] rounded-t-[15px] border-b-[1px] flex justify-between items-center">
          <h1 className="text-[19px] text-white">
            ავტომობილების დეტალური ფილტრი
          </h1>
          <div
            className="w-[40px] h-[40px] rounded-full flex items-center justify-center duration-200 cursor-pointer hover:bg-gray-300 bg-white"
            onClick={() => {
              setCarsfilterPopup(false);
            }}
          >
            <AiOutlineClose className="text-[23px]" />
          </div>
        </div>

        <div className="p-[20px] flex flex-col gap-[20px]">
          <div className="grid grid-cols-2 max-tiny:grid-cols-1 gap-[20px] ">
            <DropDown2valueSearch
              name="firm"
              data={FirmsData}
              firstValue={carsfltrFromParams.firm}
              placeholder="მწარმოებელი"
              searchable={true}
              setAllValues={setCarsfltrForParams}
            />

            <DropDown2valueSearch
              name="model"
              firstValue={carsfltrFromParams.model}
              data={ModelsData.filter((model) =>
                FirmsData.filter((firm) =>
                  carsfltrForParams.firm?.includes(firm.name)
                )
                  .map((firm) => firm.id)
                  .includes(model.firm_id)
              )}
              placeholder="მოდელი"
              render={carsfltrFromParams.firm.length <= 0}
              searchable={true}
              setAllValues={setCarsfltrForParams}
            />
            <DropDown2valueSearch
              name="vehicleType"
              firstValue={carsfltrFromParams.vehicleType}
              data={vehicleType}
              placeholder="მანქანის ტიპი"
              searchable={true}
              setAllValues={setCarsfltrForParams}
            />
            {/* <DropDown2valueSearch
            name="cylinders"
            firstValue={carsfltrFromParams.cylinders}
            data={cylinders}
            placeholder="ცილინდრები"
            searchable={true}
            setAllValues={setCarsfltrForParams}
          /> */}
            <DropDownFromTo
              name1="minPrice"
              name2="maxPrice"
              firstValue1={carsfltrFromParams.minPrice}
              firstValue2={carsfltrFromParams.maxPrice}
              data1={price}
              data2={price}
              placeholder="ფასი"
              setAllValues={setCarsfltrForParams}
              filterW={true}
            />
            <DropDownFromTo
              name1="minYear"
              name2="maxYear"
              firstValue1={carsfltrFromParams.minYear}
              firstValue2={carsfltrFromParams.maxYear}
              data1={years}
              data2={years}
              data={vehicleType}
              placeholder="წელი"
              setAllValues={setCarsfltrForParams}
              filterW={true}
            />
            <DropDownFromTo
              name1="minMetersRun"
              name2="maxMetersRun"
              firstValue1={carsfltrFromParams.minMetersRun}
              firstValue2={carsfltrFromParams.maxMetersRun}
              data1={price}
              data2={price}
              data={vehicleType}
              placeholder="გარბენი"
              setAllValues={setCarsfltrForParams}
              filterW={true}
            />
            <DropDown2valueSearch
              name="country"
              firstValue={carsfltrFromParams.country}
              data={adress}
              placeholder="მდებარეობა"
              searchable={false}
              setAllValues={setCarsfltrForParams}
            />
            <DropDownFromTo
              name1="minEngine"
              name2="maxEngine"
              firstValue1={carsfltrFromParams.minEngine}
              firstValue2={carsfltrFromParams.maxEngine}
              data1={engine}
              data2={engine}
              data={vehicleType}
              placeholder="ძრავი"
              setAllValues={setCarsfltrForParams}
              filterW={true}
            />

            <DropDown2valueSearch
              name="petrol"
              firstValue={carsfltrFromParams.petrol}
              data={petrol}
              placeholder="საწვავის ტიპი"
              searchable={false}
              setAllValues={setCarsfltrForParams}
            />

            <DropDown2valueSearch
              name="transmission"
              firstValue={carsfltrFromParams.transmission}
              data={transmission}
              placeholder="გადაცემათა კოლოფი"
              searchable={true}
              setAllValues={setCarsfltrForParams}
            />

            <DropDown2valueSearch
              name="color"
              data={colors}
              firstValue={carsfltrFromParams.color}
              placeholder="ფერი"
              searchable={false}
              setAllValues={setCarsfltrForParams}
            />
            <DropDown2valueSearch
              name="salonColor"
              data={colors}
              firstValue={carsfltrFromParams.salonColor}
              placeholder="სალონის ფერი"
              searchable={false}
              setAllValues={setCarsfltrForParams}
            />
            <DropDown2valueSearch
              name="leather"
              firstValue={carsfltrFromParams.leather}
              data={leather}
              placeholder="სალონის მასალა"
              searchable={false}
              setAllValues={setCarsfltrForParams}
            />
            <DropDown2valueSearch
              name="parameters"
              data={moreInfoBtn}
              firstValue={carsfltrFromParams.parameters}
              placeholder="პარამეტრები"
              searchable={false}
              setAllValues={setCarsfltrForParams}
            />
            <DropDown2valueSearch
              name="weel"
              firstValue={carsfltrFromParams.weel}
              data={weel}
              placeholder="საჭე"
              searchable={false}
              setAllValues={setCarsfltrForParams}
            />
            <DropDown2valueSearch
              name="pullingWheels"
              firstValue={carsfltrFromParams.pullingWheels}
              data={pullingWheels}
              placeholder="წამყვანი თვლები"
              searchable={false}
              setAllValues={setCarsfltrForParams}
            />
          </div>
          <div
            className={`h-full 
     w-full flex gap-[10px] items-end justify-between px-[20px] text-white `}
          >
            <p
              onClick={() => {
                setCarsfilterPopup(true);
              }}
              className={`text-[14px] truncate text-start underline`}
            >
              ძიების {cardata ? cardata.length : 0} შედეგი
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
