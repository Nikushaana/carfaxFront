"use client";

import React, { useEffect, useState } from "react";
import EditCarCards from "../../../components/cardsStyles/EditCarCards";
import LoaderCust from "../../../components/loader/LoaderCust";
import { axiosUser } from "../../../../../useContexts/AxiosClient/AxiosClient";
import EditPartCards from "../../../components/cardsStyles/EditPartCards";
import EditPartServs from "../../../components/cardsStyles/EditPartServs";

export default function Page() {
  const [servdata, setServData] = useState([]);
  const [isLoader, setIsLoader] = useState(true);
  const [newRenderServs, setNewRenderServs] = useState();

  useEffect(() => {
    axiosUser
      .get("user/Servcenters")
      .then((res) => {
        setServData(res.data);
        setIsLoader(false);
      })
      .catch((error) => {});
  }, [newRenderServs]);

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
          {servdata.length > 0 ? (
            <div className="grid grid-cols-4 max-2xl:grid-cols-3 max-xl:grid-cols-2 max-sm:grid-cols-1 gap-[20px] gap-y-[30px] ">
              {servdata.map((item) => (
                <EditPartServs
                  key={item.id}
                  item={item}
                  setNewRender={setNewRenderServs}
                  setIsLoader={setIsLoader}
                />
              ))}
            </div>
          ) : (
            <p>სერვისები დამატებული არ არის</p>
          )}
        </div>
      )}
    </div>
  );
}
