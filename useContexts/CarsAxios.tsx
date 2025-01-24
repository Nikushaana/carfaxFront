"use client";

import { createContext, useEffect, useState } from "react";
import { axiosUser } from "./AxiosClient/AxiosClient";

export const CarsAxiosContext = createContext<any>(null);

const CarsContext = ({ children }: any) => {
  const [newRenderCars, setNewRenderCars] = useState(null);
  const [CarsData, setCarsData] = useState<any>([]);
  const [CarsLoader, setCarsLoader] = useState<boolean>(true);

  useEffect(() => {
    setCarsLoader(true)
    axiosUser
      .get("front/cars")
      .then((res) => {
        setCarsData(res.data.data);
      })
      .finally(() => {
        setCarsLoader(false);
      });
  }, [newRenderCars]);

  return (
    <CarsAxiosContext.Provider
      value={{
        CarsData,
        setNewRenderCars,
        CarsLoader,
      }}
    >
      {children}
    </CarsAxiosContext.Provider>
  );
};

export default CarsContext;
