"use client";

import React, { useContext, useEffect, useState } from "react";
import ScreenWidth from "../components/screenwidth/ScreenWidth";
import { FiFilter } from "react-icons/fi";
import { AiOutlineClose } from "react-icons/ai";
import Card1 from "../components/cardsStyles/card1";
import DropDown1ValSearch from "../components/DropDowns/DropDown1ValSearch";
import { AxiosForSharingStatesAxiosContext } from "../../../useContexts/sharedStates";
import DropDownFromTo from "../components/DropDowns/DropDownFromTo";
import Image from "next/image";
import Card2 from "../components/cardsStyles/card2";
import { axiosUser } from "../../../useContexts/AxiosClient/AxiosClient";
import { VscSettings } from "react-icons/vsc";
import LoaderCust from "../components/loader/LoaderCust";
import DropDown2valueSearch from "../components/DropDowns/DropDown2valueSearch";
import { FaTrashCan } from "react-icons/fa6";
import ReactPaginate from "react-paginate";

export default function Page() {
  const [loader, setLoader] = useState(true);

  const [currentPage, setCurrentPage] = useState(0);
  const [prodwholenum, setProdwholenum] = useState<any>();

  const {
    parts,
    setPartsfilterPopup,
    setPartsfltrForParams,
    partsfltrFromParams,
    partData,
    setPartData,
    handleClearPartsFilter,
    FirmsData,
  } = useContext(AxiosForSharingStatesAxiosContext);

  useEffect(() => {
    const buildQueryString = () => {
      const queryParams = [];

      Object.keys(partsfltrFromParams).forEach((key) => {
        const value = partsfltrFromParams[key];

        if (Array.isArray(value) && value.length > 0) {
          queryParams.push(`${key}=${JSON.stringify(value)}`);
        } else if (value !== "" && value !== null) {
          queryParams.push(`${key}=${value}`);
        }
      });

      return queryParams.length > 0 ? queryParams.join("&") : "";
    };

    setLoader(true);

    const queryString = buildQueryString();

    axiosUser
      .get(`front/parts?page=${currentPage + 1}&per_page=${20}&${queryString}`)
      .then((res) => {
        setPartData(res.data.data);
        setProdwholenum(res.data.length);
      })
      .catch((err) => {})
      .finally(() => {
        setLoader(false);
      });
  }, [partsfltrFromParams, currentPage]);

  const pageCount = Math.ceil(prodwholenum / 20);

  const handlePageClick = (event: any) => {
    setCurrentPage(event.selected);
  };

  return (
    <div className="bg-[#040A1C] flex flex-col gap-[20px] px-[100px] max-md:px-[50px] max-sm:px-[16px] py-[150px] max-sm:py-[110px] min-h-[120vh]">
      <div className="w-full text-white flex flex-col gap-y-[20px]">
        <p className="text-[13px]">მთავარი / ნაწილები</p>
        <h1 className="text-[30px]">ნაწილები</h1>
        <div className="flex items-center self-start gap-[10px]">
          <div className="flex items-center gap-[10px] max-md:hidden">
            <div className="w-[200px]">
              <DropDown2valueSearch
                name="partName"
                data={parts}
                placeholder="ნაწილი"
                firstValue={partsfltrFromParams.partName}
                setAllValues={setPartsfltrForParams}
                searchable={true}
                filterW={true}
              />
            </div>
            <div className="w-[200px]">
              <DropDown2valueSearch
                name="firm"
                data={FirmsData}
                firstValue={partsfltrFromParams.firm}
                placeholder="მწარმოებელი"
                searchable={true}
                setAllValues={setPartsfltrForParams}
                filterW={true}
              />
            </div>
          </div>

          <div
            onClick={() => {
              setPartsfilterPopup(true);
            }}
            className={`h-full rounded-full duration-100 border-[1px] border-white
 flex gap-[10px] items-center cursor-pointer justify-between px-[20px] `}
          >
            <div className="w-[20px] h-[40px] flex items-center justify-center text-[20px] cursor-pointer">
              <VscSettings />
            </div>

            <p className={`text-[14px] truncate text-start `}>
              დეტალური ფილტრი
            </p>
          </div>
          <div
            onClick={() => {
              handleClearPartsFilter();
            }}
            className={` w-[40px] h-[40px] border-[1px] border-white hover:border-[red] flex items-center justify-center rounded-full truncate text-start cursor-pointer hover:text-[red] duration-100`}
          >
            <FaTrashCan />
          </div>
        </div>
      </div>

      <div className={`w-full flex flex-col gap-[20px]`}>
        <div className="flex items-center justify-between">
          <p className="text-[15px] text-[#EBEDF0]">
            ნაჩვენებია {partData.length ? partData.length : 0} ავტომობილი{" "}
            {prodwholenum ? prodwholenum : 0} დან
          </p>
        </div>
        {loader && (
          <div
            className="h-[50px] 
            pointer-event-none flex items-center justify-center"
          >
            <div className="w-[40px] h-[40px] flex items-center justify-center text-white">
              <LoaderCust />
            </div>
          </div>
        )}
        {partData.length === 20 ? (
          <p className="text-gray-400 w-full text-[14px]">
            {loader ? "ინფორმაცია იძებნება.." : "ინფორმაცია ვერ მოიძებნა"}
          </p>
        ) : (
          <div className="w-full grid grid-cols-4 max-xl:grid-cols-3 max-sm:grid-cols-2 max-tiny:grid-cols-1  gap-[20px] gap-y-[40px]">
            {partData.map((item: any) => (
              <Card2 key={item.id} item={item} />
            ))}
          </div>
        )}
        {prodwholenum > 20 && (
          <div className="pt-[50px] flex justify-center">
            <ReactPaginate
              breakLabel="..."
              nextLabel="next >"
              onPageChange={handlePageClick}
              pageRangeDisplayed={5}
              pageCount={pageCount}
              previousLabel="< previous"
              renderOnZeroPageCount={null}
              breakLinkClassName={"font-bold text-white "}
              breakClassName={"w-8 h-8 flex items-center justify-center"}
              // main container
              containerClassName={`flex items-center gap-1`}
              // single page number
              pageLinkClassName={`w-[40px] h-[40px] text-md border border-[white] flex items-center justify-center duration-100 rounded-lg bg-gray-500 hover:bg-gray-300`} // Default non-active color
              // previous page number
              previousLinkClassName={`hidden`}
              // next page number
              nextLinkClassName={`hidden`}
              // active page
              activeLinkClassName="bg-white text-black" // Active class
              forcePage={currentPage}
            />
          </div>
        )}
      </div>
    </div>
  );
}
