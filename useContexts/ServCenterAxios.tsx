"use client";

import { createContext, useEffect, useState } from "react";
import { axiosUser } from "./AxiosClient/AxiosClient";

export const ServcenterAxiosContext = createContext<any>(null);

const ServcenterContext = ({ children }: any) => {
  const [newRenderServcenter, setNewRenderServcenter] = useState(null);
  const [ServcenterData, setServcenterData] = useState<any>([]);
  const [ServcenterLoader, setServcenterLoader] = useState<boolean>(true);

  useEffect(() => {
    setServcenterLoader(true);
    axiosUser
      .get("front/Servcenters")
      .then((res) => {
        setServcenterData(res.data.data);
      })
      .finally(() => {
        setServcenterLoader(false);
      });
  }, [newRenderServcenter]);

  return (
    <ServcenterAxiosContext.Provider
      value={{
        ServcenterData,
        setNewRenderServcenter,
        ServcenterLoader,
      }}
    >
      {children}
    </ServcenterAxiosContext.Provider>
  );
};

export default ServcenterContext;
