"use client";

import React, { useContext, useEffect, useState } from "react";
import Card1 from "../components/cardsStyles/card1";
import DropDown1ValSearch from "../components/DropDowns/DropDown1ValSearch";
import { AxiosForSharingStatesAxiosContext } from "../../../useContexts/sharedStates";
import { axiosUser } from "../../../useContexts/AxiosClient/AxiosClient";
import { VscSettings } from "react-icons/vsc";
import LoaderCust from "../components/loader/LoaderCust";
import { useRouter, useSearchParams } from "next/navigation";
import DropDown2valueSearch from "../components/DropDowns/DropDown2valueSearch";
import { BsTrash2 } from "react-icons/bs"; 
import { FaTrashCan } from "react-icons/fa6";
import ReactPaginate from "react-paginate";

export default function Page() {
  const [loader, setLoader] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const [prodwholenum, setProdwholenum] = useState<any>();

  const {
    setCarsfilterPopup,
    carsfltrForParams,
    setCarsfltrForParams,
    carsfltrFromParams,
    cardata,
    setCarData,
    handleClearCarsFilter,
    FirmsData,
    ModelsData,
  } = useContext(AxiosForSharingStatesAxiosContext);

  useEffect(() => {
    const buildQueryString = () => {
      const queryParams = [];

      Object.keys(carsfltrFromParams).forEach((key) => {
        const value = carsfltrFromParams[key];

        if (Array.isArray(value) && value.length > 0) {
          if (value.find((item) => item === "ლუქი")) {
            queryParams.push(`Hatch=true`);
          } else if (value.find((item) => item === "პანორამა")) {
            queryParams.push(`Panorama=true`);
          } else if (value.find((item) => item === "მულტიმედია")) {
            queryParams.push(`multimedia=true`);
          } else if (value.find((item) => item === "კამერა")) {
            queryParams.push(`camera=true`);
          } else {
            queryParams.push(`${key}=${JSON.stringify(value)}`);
          }
        } else if (value !== "" && value !== null) {
          queryParams.push(`${key}=${value}`);
        }
      });

      return queryParams.length > 0 ? queryParams.join("&") : "";
    };

    setLoader(true);

    const queryString = buildQueryString();

    axiosUser
      .get(`front/cars?page=${currentPage + 1}&per_page=${20}&${queryString}`)
      .then((res) => {
        setCarData(res.data.data);
        setProdwholenum(res.data.length);
      })
      .catch((err) => {})
      .finally(() => {
        setLoader(false);
      });
  }, [carsfltrFromParams, currentPage]);

  const pageCount = Math.ceil(prodwholenum / 20);

  const handlePageClick = (event: any) => {
    setCurrentPage(event.selected);
  };

  return (
    <div className="bg-[#040A1C] flex flex-col gap-[70px] px-[100px] max-md:px-[50px] max-sm:px-[16px] py-[150px] max-sm:py-[110px] min-h-[120vh]">
      <div className="w-full text-white flex flex-col gap-y-[20px]">
        <p className="text-[13px]">მთავარი / ავტომობილები</p>
        <h1 className="text-[30px]">ავტომობილები</h1>
        <div className="flex items-center  gap-[10px]">
          <div className="flex items-center gap-[10px] max-md:hidden">
            <div className="w-[200px]">
              <DropDown2valueSearch
                name="firm"
                data={FirmsData}
                firstValue={carsfltrFromParams.firm}
                placeholder="მწარმოებელი"
                searchable={true}
                setAllValues={setCarsfltrForParams}
                filterW={true}
              />
            </div>

            <div className="w-[200px]">
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
                filterW={true}
              />
            </div>
          </div>

          <div
            onClick={() => {
              setCarsfilterPopup(true);
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
              handleClearCarsFilter();
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
            ნაჩვენებია {cardata.length ? cardata.length : 0} ავტომობილი{" "}
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
        {cardata.length === 20 ? (
          <p className="text-gray-400 w-full text-[14px]">
            {loader ? "ინფორმაცია იძებნება.." : "ინფორმაცია ვერ მოიძებნა"}
          </p>
        ) : (
          <div className="w-full grid grid-cols-4 max-xl:grid-cols-3 max-lg:grid-cols-2 max-tiny:grid-cols-1 gap-[20px] gap-y-[40px] ">
            {cardata.map((item: any) => (
              <Card1 key={item.id} item={item} />
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
              breakLinkClassName={"font-bold text-gray-400"}
              breakClassName={"w-8 h-8 flex items-center justify-center"}
              //main container
              containerClassName={`flex items-center gap-1`}
              //single page number
              pageLinkClassName={`w-[40px] h-[40px] text-md  border border-[black]
           flex items-center justify-center rounded-lg`}
              //previous page number
              previousLinkClassName={`hidden`}
              //next page number
              nextLinkClassName={`hidden`}
              //active page
              activeLinkClassName={"bg-[white] !important text-black"}
              forcePage={currentPage}
            />
          </div>
        )}
      </div>
    </div>
  );
}
