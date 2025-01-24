"use client";

import React, { useEffect, useState } from "react";
import EditCarCards from "../../../components/cardsStyles/EditCarCards";
import LoaderCust from "../../../components/loader/LoaderCust";
import { axiosUser } from "../../../../../useContexts/AxiosClient/AxiosClient";

export default function Page() {
  const [cardata, setCarData] = useState([]);
  const [isLoader, setIsLoader] = useState(true);
  const [newRenderCars, setNewRenderCars] = useState();

  useEffect(() => {
    axiosUser
      .get("user/car")
      .then((res) => {
        setCarData(res.data);
        setIsLoader(false);
      })
      .catch((error) => {});
  }, [newRenderCars]);

  return (
    <div>
      {isLoader ? (
        <div
          className=" w-full h-[50px] rounded-[10px] 
pointer-event-none flex items-center justify-center"
        >
          <div className="w-[40px] h-[40px] flex items-center justify-center">
            <LoaderCust />
          </div>
        </div>
      ) : (
        <div>
          {cardata.length > 0 ? (
            <div className="grid grid-cols-4 max-2xl:grid-cols-3 max-xl:grid-cols-2 max-sm:grid-cols-1 gap-[20px] gap-y-[30px] ">
              {cardata.map((item) => (
                <EditCarCards
                  key={item.id}
                  item={item}
                  setNewRender={setNewRenderCars}
                  setIsLoader={setIsLoader}
                />
              ))}
            </div>
          ) : (
            <p>ავტომობილი დამატებული არ არის</p>
          )}
        </div>
      )}
    </div>
  );
}
