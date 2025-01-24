import React, { useContext } from "react";
import { FiEdit3, FiSettings } from "react-icons/fi";
import { BsGeoAlt, BsTrash } from "react-icons/bs";
import { axiosUser } from "../../../../useContexts/AxiosClient/AxiosClient";
import Link from "next/link";
import Image from "next/image";
import { ProductserviceAxiosContext } from "../../../../useContexts/ProductServicesAxios";
import { CurrencyAxiosContext } from "../../../../useContexts/CurrencyAxios";

export default function EditPartCards({
  item,
  setNewRender,
  setIsLoader,
}: any) {
  const { Productservice } = useContext(ProductserviceAxiosContext);
  const { actCurrency, setActCurrency, currency, CurrencyData } =
    useContext(CurrencyAxiosContext);

  const handelDelete = (Id) => {
    axiosUser
      .delete(`user/part/${Id}`)
      .then((response) => {
        setNewRender(response);
      })
      .catch((error) => {})
      .finally(() => {});
  };

  return (
    <div className="w-full rounded-[16px] relative overflow-hidden">
      <div className="absolute top-[10px] left-[10px] z-[2] flex flex-col gap-y-[10px]">
        {item.condition && (
          <p className="bg-[green] text-white h-[30px] items-center flex justify-center p-1 px-[20px] rounded-full text-[13px] text-center">
            {item.condition}
          </p>
        )}
        {item.service_id && Productservice.length > 0 && (
          <div className="bg-[#171c30] pointer-events-none px-[10px] h-[40px] rounded-[10px] flex flex-col items-center justify-center">
            <h1 className="text-[13px] ">
              {
                Productservice.find((item1) => item1.id === item.service_id)
                  .name
              }
            </h1>
            <p className="text-[10px] text-gray-400">
              დარჩა {item.service_term} დღე
            </p>
          </div>
        )}
      </div>
      <div
        onClick={() => {
          handelDelete(item.id);
          setIsLoader(true);
        }}
        className="absolute z-[1] top-[10px] right-[10px] bg-[#c92929] cursor-pointer hover:scale-105 duration-100  w-[40px] h-[40px] rounded-full flex items-center justify-center"
      >
        <BsTrash />
      </div>

      <div className="relative h-[180px] w-full">
        <Link href={`/parts/${item.id}`}>
          {item.parts_imgs[0]?.url ? (
            <Image
              src={
                item.parts_imgs &&
                `${process.env.NEXT_PUBLIC_API_URL}/${item.parts_imgs[0]?.url}`
              }
              alt={""}
              sizes="500px"
              fill
              style={{
                objectFit: "cover",
              }}
            />
          ) : (
            <Image
              src="/images/tllogo.webp"
              alt={""}
              sizes="500px"
              fill
              style={{
                objectFit: "contain",
              }}
            />
          )}
        </Link>
      </div>

      <div className="w-full rounded-bl-[16px] rounded-br-[16px] pt-5 px-6 pb-3 flex flex-col gap-4 bg-[#171c30]">
        <div className="flex items-center gap-[5px] truncate w-full">
          {item.Parts_models &&
            item.Parts_models.map((item2, index) => (
              <div key={item2.id} className="flex items-center gap-[5px]">
                <h1 className=" flex text-white text-[15px] ">{item2.firm}</h1>
                <h1 className=" flex text-white text-[15px] ">{item2.model}</h1>
                <h1 className=" flex text-white text-[15px] ">
                  {index < item.Parts_models.length - 1 && ","}
                </h1>
              </div>
            ))}
        </div>
        <p className="text-gray-300">{item.partName}</p>

        <hr className="w-full h-[1px] bg-gray-700 border-none" />
        <div className="w-full flex flex-col">
          <div className="w-full flex items-center justify-between">
            <p className="text-mainColor font-bold text-[18px]">
              {item.currency === "ლარი"
                ? actCurrency === "GEL"
                  ? item.price
                  : Math.round(item.price / CurrencyData.rate)
                : actCurrency === "USD"
                ? item.price
                : Math.round(item.price * CurrencyData.rate)}{" "}
              {actCurrency === "USD" ? "$" : "₾"}
            </p>
            <Link href={`/user/mystatements/parts/editpart/${item.id}`}>
              <div className="flex items-center gap-[10px] cursor-pointer hover:opacity-50 duration-200">
                <p className="text-blue text-[14px] underline">რედაქტირება</p>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
