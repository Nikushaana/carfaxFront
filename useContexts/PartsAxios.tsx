"use client";

import { createContext, useEffect, useState } from "react";
import { axiosUser } from "./AxiosClient/AxiosClient";

export const PartsAxiosContext = createContext<any>(null);

const PartsContext = ({ children }: any) => {
  const [newRenderParts, setNewRenderParts] = useState(null);
  const [PartsData, setPartsData] = useState<any>([]);
  const [PartsLoader, setPartsLoader] = useState<boolean>(true);

  useEffect(() => {
    axiosUser
      .get("front/parts")
      .then((res) => {
        setPartsData(res.data.data);
      })
      .finally(() => {
        setPartsLoader(false);
      });
  }, [newRenderParts]);

  return (
    <PartsAxiosContext.Provider
      value={{
        PartsData,
        setNewRenderParts,
        PartsLoader,
      }}
    >
      {children}
    </PartsAxiosContext.Provider>
  );
};

export default PartsContext;
