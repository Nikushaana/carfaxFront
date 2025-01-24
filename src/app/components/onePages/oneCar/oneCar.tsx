"use client";

import React, { useContext, useEffect, useState } from "react";
import { axiosUser } from "../../../../../useContexts/AxiosClient/AxiosClient";
import {
  PiCylinder,
  PiEngine,
  PiGasPump,
  PiSteeringWheel,
  PiUploadSimple,
} from "react-icons/pi";
import {
  IoCalendarOutline,
  IoCarSportOutline,
  IoDocumentTextOutline,
  IoLocationOutline,
  IoPersonOutline,
  IoPricetagOutline,
} from "react-icons/io5";
import Slider2 from "../../sliders/Slider2";
import { FiPhoneCall } from "react-icons/fi";
import Image from "next/image";
import { Bs2Circle, BsXLg } from "react-icons/bs";
import { SiMediatemple, SiSpeedtest } from "react-icons/si";
import { TbManualGearbox } from "react-icons/tb";
import {
  GiCarDoor,
  GiCarSeat,
  GiCarWheel,
  GiExplosiveMaterials,
  GiFloorHatch,
} from "react-icons/gi";
import { BiCamera, BiColorFill } from "react-icons/bi";
import Slider1 from "../../sliders/Slider1";
import { CarsAxiosContext } from "../../../../../useContexts/CarsAxios";
import { CurrencyAxiosContext } from "../../../../../useContexts/CurrencyAxios";
import { useRouter } from "next/navigation";
import LoaderCust from "../../loader/LoaderCust";
import { ProductserviceAxiosContext } from "../../../../../useContexts/ProductServicesAxios";
import { MdPanoramaPhotosphere } from "react-icons/md";
import { getServerSideOneCar } from "../../../../../useContexts/getServerSide/getData";

export default function OneCar({ data }) {
  const router = useRouter();
  const { actCurrency, setActCurrency, currency, CurrencyData } =
    useContext(CurrencyAxiosContext);
  const { Productservice } = useContext(ProductserviceAxiosContext);
  const { CarsData, CarsLoader } = useContext(CarsAxiosContext);

  const [specs, setSpecs] = useState<any>([]);

  useEffect(() => {
    setSpecs([
      {
        id: 1,
        icon: <IoCarSportOutline />,
        name: "ტიპი",
        value: data?.vehicleType ? data?.vehicleType : "",
      },
      {
        id: 2,
        icon: <SiSpeedtest />,
        name: "გარბენი",
        value: data?.metersRun ? data?.metersRun + data?.name : "",
      },
      {
        id: 3,
        icon: <PiGasPump />,
        name: "საწვავის ტიპი",
        value: data?.petrol ? data?.petrol : "",
      },
      {
        id: 4,
        icon: <IoCalendarOutline />,
        name: "წელი",
        value: data?.year ? data?.year : "",
      },
      {
        id: 5,
        icon: <TbManualGearbox />,
        name: "გადაცემათა კოლოფი",
        value: data?.transmission ? data?.transmission : "",
      },
      {
        id: 6,
        icon: <GiCarWheel />,
        name: "წამყვანი თვლები",
        value: data?.pullingWheels ? data?.pullingWheels : "",
      },
      {
        id: 7,
        icon: <PiEngine />,
        name: "ძრავი",
        value: data?.engine ? data?.engine : "",
      },
      {
        id: 8,
        icon: <PiCylinder />,
        name: "ცილინდრები",
        value: data?.cylinders ? data?.cylinders : "",
      },
      {
        id: 9,
        icon: <BiColorFill />,
        name: "ფერი",
        value: data?.color ? data?.color : "",
      },
      {
        id: 10,
        icon: <GiExplosiveMaterials />,
        name: "სალონის მასალა",
        value: data?.leather ? data?.leather : "",
      },
      {
        id: 11,
        icon: <GiCarSeat />,
        name: "სალონის ფერი",
        value: data?.salonColor ? data?.salonColor : "",
      },
      {
        id: 12,
        icon: <GiFloorHatch />,
        name: "ლუქი",
        value: data?.Hatch === "true" ? "კი" : "არა",
      },
      {
        id: 13,
        icon: <MdPanoramaPhotosphere />,
        name: "პანორამა",
        value: data?.Panorama === "true" ? "კი" : "არა",
      },
      {
        id: 14,
        icon: <SiMediatemple />,
        name: "მულტიმედია",
        value: data?.multimedia === "true" ? "კი" : "არა",
      },
      {
        id: 15,
        icon: <BiCamera />,
        name: "კამერა",
        value: data?.camera === "true" ? "კი" : "არა",
      },
      {
        id: 16,
        icon: <PiSteeringWheel />,
        name: "საჭე",
        value: data?.weel ? data?.weel : "",
      },
      {
        id: 17,
        icon: <IoDocumentTextOutline />,
        name: "ვინ კოდი",
        value: data?.vin ? data?.vin : "",
      },
    ]);
  }, [data]);

  return (
    <div className="bg-[#040A1C] flex flex-col text-white gap-[30px] max-sm:gap-[10px] min-h-[100vh] px-[100px] max-md:px-[50px] max-sm:px-[16px] w-full py-[150px] max-sm:py-[110px]">
      <div className="w-full text-white flex flex-col gap-y-[20px] max-sm:gap-y-[0px]">
        <p className="text-[13px]">
          მთავარი / ავტომობილები / {data?.firm + " " + data?.model}
        </p>
      </div>
      <div className="">
        <h1 className="text-[40px]">{data?.firm + " " + data?.model}</h1>
        <p className="text-[15px]">რაღაცა აღწერა</p>
      </div>
      <div className="flex items-center flex-wrap gap-[20px] justify-between">
        <div className="flex flex-wrap items-center gap-[10px]">
          <div className="flex items-center gap-[5px] border-[1px] border-white rounded-full h-[40px] px-[15px]">
            <PiSteeringWheel />
            <p>ჩანიშნე ტესტ დრაივი</p>
          </div>
          <div
            onClick={() => {
              if (data?.vin) {
                router.push(`/checkvin?Vin=${data?.vin}`);
              }
            }}
            className={`flex items-center gap-[5px] border-[1px] rounded-full h-[40px] px-[15px] ${
              data?.vin
                ? "border-white text-white cursor-pointer"
                : "border-gray-500 text-gray-500 pointer-events-none"
            }`}
          >
            <IoDocumentTextOutline />
            <p>ვინ კოდის შემოწმება</p>
          </div>
        </div>
      </div>
      <div className="flex gap-[40px] mb-[100px] max-sm:mb-[50px]">
        <div className="w-[calc(100%-440px)]  max-xl:w-[calc(100%-340px)] max-lg:w-full flex flex-col gap-y-[20px] ">
          <div className="relative w-full">
            <Slider2
              data={data?.cars_imgs}
              dataVideo={data?.cars_videos}
              service={false}
            />
            {data.service_id && Productservice.length > 0 && (
              <h1 className="absolute z-[1] top-[30px] left-[30px] max-sm:top-[20px] max-sm:left-[20px] text-[13px] text-white bg-[#171c30] pointer-events-none w-[40px] h-[40px] rounded-full flex items-center justify-center">
                {
                  Productservice.find((item1) => item1.id === data?.service_id)
                    .name
                }
              </h1>
            )}
            {data?.checked === 1 && (
              <div className="absolute top-[30px] right-[30px] max-sm:top-[20px] max-sm:right-[20px] z-[2] w-[80px] h-[80px] max-sm:w-[40px] max-sm:h-[40px]   bg-white rounded-full overflow-hidden">
                <Image
                  src="/images/tllogo.webp"
                  alt={""}
                  sizes="500px"
                  fill
                  style={{
                    objectFit: "contain",
                  }}
                />
              </div>
            )}
          </div>
          <div className="w-full max-lg:grid hidden grid-cols-2 max-sm:grid-cols-1 gap-[20px]">
            <div className="border-[1px] border-white rounded-[15px] p-[20px] flex flex-col self-start gap-y-[10px]">
              <p>ავტომობილის ფასი</p>
              <div className="flex items-center gap-[5px]">
                <h1 className="text-[30px]">
                  {data?.currency === "ლარი"
                    ? actCurrency === "GEL"
                      ? data?.price
                      : Math.round(data?.price / CurrencyData.rate)
                    : actCurrency === "USD"
                    ? data?.price
                    : Math.round(data?.price * CurrencyData.rate)}
                </h1>
                <div className="rounded-[10px] border-[1px] border-white flex items-center overflow-hidden p-[3px]">
                  {currency.map((item1) => (
                    <h1
                      key={item1.id}
                      onClick={() => {
                        setActCurrency(item1.currency);
                      }}
                      className={`px-[7px] py-[0px] text-[12px] cursor-pointer duration-100
                      
                      ${
                        actCurrency === item1.currency
                          ? "bg-[white] text-[black]"
                          : ""
                      } 
                      
                    
                    ${item1.id === 1 ? "rounded-l-[6px]" : " rounded-r-[6px]"}`}
                    >
                      {item1.icon}
                    </h1>
                  ))}
                </div>
              </div>
              <p>ფასდაკლებით ზოგავ : $7,000</p>
              <div className="flex items-center justify-center gap-[5px] mt-[10px] text-white bg-[#0047B1] cursor-pointer rounded-[12px] h-[55px] w-full">
                <IoPricetagOutline />
                <p className="text-[15px]">მსურს შეძენა</p>
              </div>
            </div>
            <div className="border-[1px] border-white rounded-[15px] p-[20px] flex flex-col gap-y-[10px]">
              <div
                className={`w-[70px] h-[70px] relative bg-white text-[black] flex items-center justify-center text-[25px] rounded-full overflow-hidden`}
              >
                {data?.user?.image?.url ? (
                  <Image
                    src={
                      data?.user &&
                      `${process.env.NEXT_PUBLIC_API_URL}/${data?.user?.image?.url}`
                    }
                    alt={""}
                    sizes="500px"
                    fill
                    style={{
                      objectFit: "contain",
                    }}
                  />
                ) : (
                  <IoPersonOutline />
                )}
              </div>
              <h1 className="text-[20px]">{data?.o_name}</h1>
              <p className="text-[15px]">
                {data?.country} {data?.o_city}
              </p>
              <div className="flex items-center gap-[5px] ">
                <div className="border-[1px] bg-white rounded-full text-[#0047B1] text-[18px] h-[40px] w-[40px] flex items-center justify-center">
                  <FiPhoneCall />
                </div>
                <p>
                  {data?.o_phone &&
                    data?.o_phone
                      .replace(/[^0-9]/g, "")
                      .replace(/\s/g, "")
                      .replace(/(.{3})/g, "$1 ")
                      .trim()
                      .slice(0, 11)}
                </p>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-y-[10px]">
            <h1 className="text-[25px]">აღწერა</h1>
            <p className="text-[15px]">{data?.description}</p>
          </div>
          <div className="mt-[50px] max-sm:mt-[0px]">
            {specs.map((item: any, index: any) => (
              <div key={item.id}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-[10px]">
                    {item.icon}
                    <p>{item.name}</p>
                  </div>
                  <p>{item.value}</p>
                </div>
                {specs.length - 1 !== index && (
                  <hr className="h-[1px] bg-white w-full my-[10px]" />
                )}
              </div>
            ))}
          </div>
        </div>
        <div className="w-[400px] max-xl:w-[300px] max-lg:hidden flex flex-col gap-y-[20px]">
          <div className="border-[1px] border-white rounded-[15px] p-[20px] flex flex-col gap-y-[10px]">
            <p>ავტომობილის ფასი</p>
            <div className="flex items-center gap-[5px]">
              <h1 className="text-[30px]">
                {data?.currency === "ლარი"
                  ? actCurrency === "GEL"
                    ? data?.price
                    : Math.round(data?.price / CurrencyData.rate)
                  : actCurrency === "USD"
                  ? data?.price
                  : Math.round(data?.price * CurrencyData.rate)}
              </h1>
              <div className="rounded-[10px] border-[1px] border-white flex items-center overflow-hidden p-[3px]">
                {currency.map((item1) => (
                  <h1
                    key={item1.id}
                    onClick={() => {
                      setActCurrency(item1.currency);
                    }}
                    className={`px-[7px] py-[0px] text-[12px] cursor-pointer duration-100
                      
                      ${
                        actCurrency === item1.currency
                          ? "bg-[white] text-[black]"
                          : ""
                      } 
                      
                    
                    ${item1.id === 1 ? "rounded-l-[6px]" : " rounded-r-[6px]"}`}
                  >
                    {item1.icon}
                  </h1>
                ))}
              </div>
            </div>
            <p>ფასდაკლებით ზოგავ : $7,000</p>
            <div className="flex items-center justify-center gap-[5px] mt-[10px] text-white bg-[#0047B1] cursor-pointer rounded-[12px] h-[55px] w-full">
              <IoPricetagOutline />
              <p className="text-[15px]">მსურს შეძენა</p>
            </div>
          </div>
          <div className="border-[1px] border-white rounded-[15px] p-[20px] flex flex-col gap-y-[10px]">
            <div
              className={`w-[70px] h-[70px] relative bg-white text-[black] flex items-center justify-center text-[25px] rounded-full overflow-hidden`}
            >
              {data?.user?.image?.url ? (
                <Image
                  src={
                    data?.user &&
                    `${process.env.NEXT_PUBLIC_API_URL}/${data?.user?.image?.url}`
                  }
                  alt={""}
                  sizes="500px"
                  fill
                  style={{
                    objectFit: "contain",
                  }}
                />
              ) : (
                <IoPersonOutline />
              )}
            </div>
            <h1 className="text-[20px]">{data?.o_name}</h1>
            <p className="text-[15px]">
              {data?.country} {data?.o_city}
            </p>
            <div className="flex items-center gap-[5px] ">
              <div className="border-[1px] bg-white rounded-full text-[#0047B1] text-[18px] h-[40px] w-[40px] flex items-center justify-center">
                <FiPhoneCall />
              </div>
              <p>
                {data?.o_phone &&
                  data?.o_phone
                    .replace(/[^0-9]/g, "")
                    .replace(/\s/g, "")
                    .replace(/(.{3})/g, "$1 ")
                    .trim()
                    .slice(0, 11)}
              </p>
            </div>
          </div>
        </div>
      </div>
      <Slider1
        title="შემოთავაზებული ავტომობილები"
        data={CarsData}
        loader={CarsLoader}
      />
    </div>
  );
}
