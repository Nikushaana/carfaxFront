"use client";

import React, { useEffect, useState } from "react";
import EditCarCards from "../../../components/cardsStyles/EditCarCards";
import LoaderCust from "../../../components/loader/LoaderCust";
import { axiosUser } from "../../../../../useContexts/AxiosClient/AxiosClient";
import EditPartCards from "../../../components/cardsStyles/EditPartCards";

export default function Page() {
  const [partdata, setPartData] = useState([]);
  const [isLoader, setIsLoader] = useState(true);
  const [newRenderParts, setNewRenderParts] = useState();

  useEffect(() => {
    axiosUser
      .get("user/part")
      .then((res) => {
        setPartData(res.data);
        setIsLoader(false);
      })
      .catch((error) => {});
  }, [newRenderParts]);

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
          {partdata.length > 0 ? (
            <div className="grid grid-cols-4 max-2xl:grid-cols-3 max-xl:grid-cols-2 max-sm:grid-cols-1 gap-[20px] gap-y-[30px] ">
              {partdata.map((item) => (
                <EditPartCards
                  key={item.id}
                  item={item}
                  setNewRender={setNewRenderParts}
                  setIsLoader={setIsLoader}
                />
              ))}
            </div>
          ) : (
            <p>ნაწილები დამატებული არ არის</p>
          )}
        </div>
      )}
    </div>
  );
}
