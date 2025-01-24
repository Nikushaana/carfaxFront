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
import Card3 from "../components/cardsStyles/card3";
import { axiosUser } from "../../../useContexts/AxiosClient/AxiosClient";
import { VscSettings } from "react-icons/vsc";
import LoaderCust from "../components/loader/LoaderCust";
import Input1 from "../components/Inputs/Input1";
import Input2 from "../components/Inputs/Input2";
import DropDown2valueSearch from "../components/DropDowns/DropDown2valueSearch";
import CustMap from "../components/customMap/CustMap";
import ReactPaginate from "react-paginate";

export default function Page() {
  const { servData, setServData } = useContext(
    AxiosForSharingStatesAxiosContext
  );

  const [loader, setLoader] = useState(true);
  const [servLatsLngsData, setServLatsLngsData] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [prodwholenum, setProdwholenum] = useState<any>();

  const { servicetype, servicefltrFromParams, setservicefltrForParams } =
    useContext(AxiosForSharingStatesAxiosContext);

  useEffect(() => {
    const buildQueryString = () => {
      const queryParams = [];

      Object.keys(servicefltrFromParams).forEach((key) => {
        const value = servicefltrFromParams[key];

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
      .get(
        `front/Servcenters?page=${
          currentPage + 1
        }&per_page=${20}&${queryString}`
      )
      .then((res) => {
        setServData(res.data.data);
        setProdwholenum(res.data.length);
      })
      .catch((err) => {})
      .finally(() => {
        setLoader(false);
      });
  }, [servicefltrFromParams, currentPage]);

  const pageCount = Math.ceil(prodwholenum / 20);

  const handlePageClick = (event: any) => {
    setCurrentPage(event.selected);
  };

  useEffect(() => {
    const extractLatLng = () => {
      const allLocations = servData.flatMap((center) => {
        if (center.location) {
          try {
            // Parse the location string to an array of objects
            const locationArray = JSON.parse(center.location);
            // Map through the array to extract lat/lng pairs
            return locationArray.map((location) => ({
              id: center.id,
              latlng: {
                lat: location.latlng.lat,
                lng: location.latlng.lng,
              },
            }));
          } catch (error) {
            return []; // Return an empty array on error
          }
        }
        return []; // Return an empty array if location is falsy
      });
      // Set the extracted locations to state
      setServLatsLngsData(allLocations);
    };

    extractLatLng();
  }, [servData]);

  return (
    <div className="bg-[#040A1C] pl-[70px] max-[1100px]:px-0 flex max-[1100px]:flex-col justify-between gap-[30px] relative">
      <div className="flex flex-col gap-[20px] w-[550px] max-[1100px]:px-[70px] max-sm:px-[16px]  max-[1100px]:w-full max-[1100px]:min-h-[145px] py-[150px] max-sm:py-[110px] min-h-[120vh]">
        <div className="w-full text-white flex flex-col gap-y-[20px]">
          <div className="flex items-center gap-[10px]">
            <Input2
              name="servcenterName"
              data={servicetype}
              firstValue={servicefltrFromParams.servcenterName}
              placeholder="სერვისცენტრი"
              setAllValues={setservicefltrForParams}
            />
            <DropDown2valueSearch
              name="services"
              firstValue={servicefltrFromParams.services}
              data={servicetype}
              placeholder="სერვისები"
              searchable={true}
              setAllValues={setservicefltrForParams}
            />
          </div>
        </div>

        <div className={`w-full flex flex-col gap-[20px] `}>
          <div className="flex items-center justify-between">
            <p className="text-[15px] text-[#EBEDF0]">
              ნაჩვენებია {servData.length ? servData.length : 0} ავტომობილი{" "}
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
          {servData.length === 20 ? (
            <p className="text-gray-400 w-full text-[14px]">
              {loader ? "ინფორმაცია იძებნება.." : "ინფორმაცია ვერ მოიძებნა"}
            </p>
          ) : (
            <div className="w-full grid grid-cols-2 max-tiny:grid-cols-1 gap-[20px] gap-y-[40px] ">
              {servData.map((item: any) => (
                <Card3 key={item.id} item={item} />
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
      <div
        className="w-[calc(100%-580px)] max-[1100px]:w-full h-[100vh] max-[1100px]:h-[600px] mt-[100px] sticky top-[20px] max-[1100px]:pt-[0px]
 pb-[50px] "
      >
        <CustMap AllMarkersPosition={servLatsLngsData} hasAllMarkers={true} />
      </div>
    </div>
  );
}
