"use client";

import { createContext, useEffect, useState } from "react";
import { axiosUser } from "./AxiosClient/AxiosClient";

export const ProductserviceAxiosContext = createContext<any>(null);

const ProductserviceContext = ({ children }: any) => {
  const [Productservice, setProductService] = useState<any>([]);
  const [ProductserviceLoader, setProductserviceLoader] =
    useState<boolean>(true);

  useEffect(() => {
    setProductserviceLoader(true);
    axiosUser
      .get("front/service?type=Product")
      .then((res) => {
        setProductService(res.data.data);
        setProductserviceLoader(false);
      })
      .finally(() => {});
  }, []);

  return (
    <ProductserviceAxiosContext.Provider
      value={{
        Productservice,
        ProductserviceLoader,
      }}
    >
      {children}
    </ProductserviceAxiosContext.Provider>
  );
};

export default ProductserviceContext;
