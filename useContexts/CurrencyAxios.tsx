"use client";

import { createContext, useEffect, useState } from "react";
import { axiosUser } from "./AxiosClient/AxiosClient";

export const CurrencyAxiosContext = createContext<any>(null);

const CurrencyContext = ({ children }: any) => {
  const [CurrencyData, setCurrencyData] = useState<any>([]);

  useEffect(() => {
    axiosUser.get("front/currency").then((res) => {
      setCurrencyData(res.data);
    });
  }, []);

  const [currency, setCurrency] = useState([
    {
      id: 1,
      name: "GEL - ₾",
      currency: "GEL",
      icon: "₾"
    },
    {
      id: 2,
      name: "USD - $",
      currency: "USD",
      icon: "$"
    },
  ]);

  const [actCurrency, setActCurrency] = useState("GEL");

  return (
    <CurrencyAxiosContext.Provider
      value={{
        CurrencyData,
        currency,
        actCurrency,
        setActCurrency,
      }}
    >
      {children}
    </CurrencyAxiosContext.Provider>
  );
};

export default CurrencyContext;
