import React, { useContext } from "react";
import { FiEdit3, FiSettings } from "react-icons/fi";
import { BsGeoAlt, BsTrash } from "react-icons/bs";
import { axiosUser } from "../../../../useContexts/AxiosClient/AxiosClient";
import Link from "next/link";
import Image from "next/image";
import { CurrencyAxiosContext } from "../../../../useContexts/CurrencyAxios";
import { ProductserviceAxiosContext } from "../../../../useContexts/ProductServicesAxios";

export default function EditPartServs({
  item,
  setNewRender,
  setIsLoader,
}: any) {
  const { Productservice } = useContext(ProductserviceAxiosContext);
  const { actCurrency, setActCurrency, currency, CurrencyData } =
    useContext(CurrencyAxiosContext);

  const handelDelete = (Id) => {
    axiosUser
      .delete(`user/Servcenters/${Id}`)
      .then((response) => {
        setNewRender(response);
      })
      .catch((error) => {})
      .finally(() => {});
  };

  return (
    <div className="w-full rounded-[16px] relative overflow-hidden">
      {item.service_id && Productservice.length > 0 && (
        <h1 className="absolute z-[1] top-[10px] left-[10px] bg-[#171c30] text-[13px] cursor-pointer hover:scale-105 duration-100  w-[40px] h-[40px] rounded-full flex items-center justify-center">
          {Productservice.find((item1) => item1.id === item.service_id).name}
        </h1>
      )}

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
        <Link href={`/servs/${item.id}`}>
          {item.servcenters_imgs[0]?.url ? (
            <Image
              src={
                item.servcenters_imgs &&
                `${process.env.NEXT_PUBLIC_API_URL}/${item.servcenters_imgs[0]?.url}`
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
        <p className="text-gray-300">{item.servcenterName}</p>
        {item.location && (
          <div className="flex items-center justify-center gap-[5px]  rounded-full ">
            <BsGeoAlt className="text-[12px] text-center text-white" />
            <p className="text-[14px] text-white w-full text-ellipsis line-clamp-1">
              {item.location.map((item1, index) => {
                return `${item1.city} ${
                  index < item.location.length - 1 ? "," : ""
                } `;
              })}
            </p>
          </div>
        )}

        <hr className="w-full h-[1px] bg-gray-700 border-none" />
        <div className="w-full flex items-center justify-center">
          <Link href={`/user/mystatements/editservice/${item.id}`}>
            <div className="flex items-center  gap-[10px] cursor-pointer hover:opacity-50 duration-200">
              <p className="text-blue text-[14px] underline">რედაქტირება</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
