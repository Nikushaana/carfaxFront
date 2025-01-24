"use client";

import Image from "next/image";
import React, { useContext, useEffect, useRef, useState } from "react";
import { IoDocumentTextOutline, IoPricetagOutline } from "react-icons/io5";
import { AxiosForSharingStatesAxiosContext } from "../../../../useContexts/sharedStates";
import { usePathname, useSearchParams } from "next/navigation";
import {
  axiosKorea,
  axiosUsa,
} from "../../../../useContexts/AxiosClient/AxiosClient";
import LoaderCust from "../../components/loader/LoaderCust";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import Slider2 from "../../components/sliders/Slider2";
import SliderVin from "../../components/sliders/SliderVin";
import { useReactToPrint } from "react-to-print";

export default function Page({ params }: { params: { checkvinId: string } }) {
  const [loader, setLoader] = useState(true);
  const [foundInCar, setFoundInCar] = useState<any>({});
  const contentRef = useRef<HTMLDivElement>(null);
  const reactToPrintFn = useReactToPrint({ contentRef });

  const { setAlertShow, setAlertStatus, setAlertText } = useContext(
    AxiosForSharingStatesAxiosContext
  );

  const paramsi = useSearchParams();

  const countryen = paramsi.get("Countryen");
  const vin = paramsi.get("Vin");

  const [vinValues, setVinValues] = useState({
    Countryen: countryen || "",
    Vin: vin || "",
  });

  useEffect(() => {
    if (vinValues.Vin && vinValues.Countryen) {
      setLoader(true);
      if (vinValues.Countryen === "USA") {
        axiosUsa
          .get(`${vinValues.Vin}`)
          .then((res) => {
            setFoundInCar(JSON.parse(res.data.json));
          })
          .catch((error) => {})
          .finally(() => {
            setLoader(false);
          });
      } else if (vinValues.Countryen === "KOREA") {
        axiosKorea
          .get(`${vinValues.Vin}`)
          .then((res) => {
            setFoundInCar(res.data);
          })
          .catch((error) => {})
          .finally(() => {
            setLoader(false);
          });
      }
    }
  }, [vinValues.Countryen, vinValues.Vin]);

  const [specifications, setSpecifications] = useState([
    {
      id: 1,
      name: "Firm",
      icon: "/images/flaticons/bee.gif",
      value: "",
    },
    {
      id: 2,
      name: "Model",
      icon: "/images/flaticons/car.gif",
      value: "",
    },
    {
      id: 3,
      name: "Fuel Type",
      icon: "/images/flaticons/refuel.gif",
      value: "",
    },
    {
      id: 4,
      name: "Transmission",
      icon: "/images/flaticons/settings.gif",
      value: "",
    },
    {
      id: 5,
      name: "Year",
      icon: "/images/flaticons/2023.gif",
      value: "",
    },
    {
      id: 6,
      name: "Country",
      icon: "/images/flaticons/earth.gif",
      value: "",
    },
    {
      id: 7,
      name: "Engine",
      icon: "/images/flaticons/motor.gif",
      value: "",
    },
    {
      id: 8,
      name: "Drive",
      icon: "/images/flaticons/chassis.gif",
      value: "",
    },
  ]);

  useEffect(() => {
    setSpecifications([
      {
        id: 1,
        name: "Firm",
        icon: "/images/flaticons/bee.gif",
        value:
          vinValues.Countryen === "KOREA"
            ? foundInCar?.specs && foundInCar?.specs.제조사
            : foundInCar?.vehicleSpecs && foundInCar.vehicleSpecs?.Make,
      },
      {
        id: 2,
        name: "Model",
        icon: "/images/flaticons/car.gif",
        value:
          vinValues.Countryen === "KOREA"
            ? foundInCar?.specs && foundInCar?.specs.자동차명
            : foundInCar?.vehicleSpecs && foundInCar.vehicleSpecs?.Model,
      },
      {
        id: 3,
        name: "Fuel Type",
        icon: "/images/flaticons/refuel.gif",
        value:
          vinValues.Countryen === "KOREA"
            ? foundInCar?.specs && foundInCar?.specs.사용연료
            : foundInCar?.vehicleSpecs && foundInCar.vehicleSpecs["Fuel Type"],
      },
      {
        id: 4,
        name: "Transmission",
        icon: "/images/flaticons/settings.gif",
        value:
          vinValues.Countryen === "KOREA"
            ? ""
            : foundInCar?.saleInfo?.infoData.find(
                (item) => item.key == "Transmission:"
              ).value,
      },
      {
        id: 5,
        name: "Year",
        icon: "/images/flaticons/2023.gif",
        value:
          vinValues.Countryen === "KOREA"
            ? foundInCar?.specs && foundInCar?.specs["연식(Model year)"]
            : foundInCar?.vehicleSpecs && foundInCar.vehicleSpecs?.Year,
      },
      {
        id: 6,
        name: "Country",
        icon: "/images/flaticons/earth.gif",
        value:
          vinValues.Countryen === "KOREA"
            ? "Korea"
            : foundInCar?.vehicleSpecs && foundInCar.vehicleSpecs["Made in"],
      },
      {
        id: 7,
        name: "Engine",
        icon: "/images/flaticons/motor.gif",
        value:
          vinValues.Countryen === "KOREA"
            ? foundInCar?.specs && foundInCar?.specs.배기량
            : foundInCar?.vehicleSpecs &&
              foundInCar.vehicleSpecs?.Engine !== "No data" &&
              foundInCar.vehicleSpecs?.Engine,
      },
      {
        id: 8,
        name: "Drive",
        icon: "/images/flaticons/chassis.gif",
        value:
          vinValues.Countryen === "KOREA"
            ? ""
            : foundInCar?.saleInfo?.infoData.find(
                (item) => item.key == "Drive train:"
              ).value,
      },
    ]);
  }, [
    foundInCar?.saleInfo?.infoData,
    foundInCar?.specs,
    foundInCar.vehicleSpecs,
    vinValues.Countryen,
  ]);

  const [carHistory, setCarHistory] = useState([
    {
      id: 1,
      icon: "/images/flaticons/car-accident.gif",
      title: "Total",
      found: "0",
    },
    {
      id: 2,
      icon: "/images/flaticons/flood.gif",
      title: "submerged",
      found: "0",
    },
    {
      id: 3,
      icon: "/images/flaticons/taxi.gif",
      title: "Was Taxi?",
      found: "0",
    },
    {
      id: 4,
      icon: "/images/flaticons/inheritance.gif",
      title: "number of owners",
      found: "0",
    },
    {
      id: 5,
      icon: "/images/flaticons/car-crash.gif",
      title: "Number of accidents",
      found: "0",
    },
  ]);

  useEffect(() => {
    setCarHistory([
      {
        id: 1,
        icon: "/images/flaticons/car-accident.gif",
        title: "Total",
        found: `Found ${
          vinValues.Countryen === "KOREA"
            ? foundInCar &&
              foundInCar?.specialUseHistory?.find(
                (item) => item.useType === "전손 보험사고"
              ).status === "없음"
              ? "0"
              : foundInCar?.specialUseHistory
                  ?.find((item) => item.useType === "전손 보험사고")
                  .status.split(" ")[0]
            : ""
        } record`,
      },
      {
        id: 2,
        icon: "/images/flaticons/flood.gif",
        title: "submerged",
        found: `Found ${
          vinValues.Countryen === "KOREA"
            ? foundInCar &&
              foundInCar?.specialUseHistory?.find(
                (item) => item.useType === "침수 보험사고"
              ).status === "없음"
              ? "0"
              : foundInCar?.specialUseHistory
                  ?.find((item) => item.useType === "침수 보험사고")
                  .status.split(" ")[0]
            : ""
        } record`,
      },
      {
        id: 3,
        icon: "/images/flaticons/taxi.gif",
        title: "Was Taxi?",
        found: `${
          vinValues.Countryen === "KOREA"
            ? foundInCar &&
              foundInCar?.specialUseHistory?.find(
                (item) => item.useType === "특수 용도 이력"
              ).status === "있음"
              ? "Yes"
              : "No"
            : ""
        }`,
      },
      {
        id: 4,
        icon: "/images/flaticons/inheritance.gif",
        title: "number of owners",
        found: `Found ${
          vinValues.Countryen === "KOREA"
            ? foundInCar &&
              foundInCar?.specialUseHistory?.find(
                (item) => item.useType === "소유자 변경"
              ).status === "없음"
              ? "0"
              : foundInCar?.specialUseHistory
                  ?.find((item) => item.useType === "소유자 변경")
                  .status.split(" ")[0]
            : ""
        } record`,
      },
      {
        id: 5,
        icon: "/images/flaticons/car-crash.gif",
        title: "Damage History",
        found: `Found ${
          vinValues.Countryen === "KOREA"
            ? foundInCar &&
              (foundInCar?.specialUseHistory?.find(
                (item) => item.useType === "내차 피해"
              ).status === "없음" ||
                foundInCar?.specialUseHistory?.find(
                  (item) => item.useType === "상대차 피해"
                ).status === "없음")
              ? "0"
              : parseInt(foundInCar?.specialUseHistory
                  ?.find((item) => item.useType === "내차 피해")
                  .status.split(" ")[0]) +
                parseInt(foundInCar?.specialUseHistory
                  ?.find((item) => item.useType === "상대차 피해")
                  .status.split(" ")[0])
            : ""
        } record`,
      },
    ]);
  }, [foundInCar, vinValues.Countryen]);

  const [mileageData, setMileageData] = useState([]);
  const [maxMileage, setMaxMileage] = useState(0);

  useEffect(() => {
    if (foundInCar?.mileageHistory) {
      const extractedData = foundInCar.mileageHistory.map((record) => {
        const mileage = record.mileage.split(" ")[0].split(",").join("");
        return {
          mileage: Number(mileage),
          date: record.date,
        };
      });
      setMileageData(extractedData);

      const max = Math.max(...extractedData.map((data) => data.mileage));
      setMaxMileage(max);
    }
  }, [foundInCar]);

  const handleShareClick = () => {
    const linkToCopy = window.location.href;
    navigator.clipboard
      .writeText(linkToCopy)
      .then(() => {
        setAlertShow(true);
        setAlertStatus(true);
        setAlertText("ლინკი დაკოპირდა!");
      })
      .catch((error) => {
      });
  };

  return (
    <div className="min-h-[100vh]  flex flex-col items-center gap-y-[60px]">
      {loader ? (
        <div
          className="h-[50px] 
          pointer-event-none flex items-center justify-center pt-[150px] max-sm:pt-[110px] pb-[100px] px-[190px] max-xl:px-[100px] max-md:px-[50px] max-sm:px-[16px]"
        >
          <div className="w-[40px] h-[40px] flex items-center justify-center text-white">
            <LoaderCust />
          </div>
        </div>
      ) : (
        <div
          ref={contentRef}
          className="printable-content flex flex-col items-center gap-y-[60px] max-sm:gap-y-[30px] w-full bg-[#040A1C] 
          pt-[150px] max-sm:pt-[110px] pb-[100px] px-[190px] max-xl:px-[100px] max-md:px-[50px] max-sm:px-[16px]"
        >
          <div className="flex max-lg:flex-col-reverse max-lg:gap-y-[20px] max-lg:items-center items-start justify-between w-full">
            <div className="flex items-start max-lg:items-center max-md:flex-col gap-[40px]">
              {vinValues.Countryen === "USA" && (
                <div className="w-[320px] h-[260px] rounded-[20px] relative overflow-hidden">
                  <Image
                    src={foundInCar?.saleInfo?.photos[0]}
                    alt={""}
                    sizes="500px"
                    fill
                    style={{
                      objectFit: "cover",
                    }}
                  />
                </div>
              )}
              <div className="flex flex-col gap-y-[10px]">
                <p className="text-[18px] max-lg:text-center max-md:text-[15px] text-gray-400">
                  Official information about the vehicle
                </p>
                <h1 className="text-[38px] text-white  max-lg:text-center">
                  {vinValues.Countryen === "KOREA"
                    ? foundInCar?.specs && foundInCar?.specs.자동차명
                    : foundInCar?.carName}
                </h1>
                <p className="text-[18px] text-gray-400  max-lg:text-center">
                  Vin code
                </p>
                <h1 className="text-[20px] text-white  max-lg:text-center">
                  {vinValues.Vin}
                </h1>
              </div>
            </div>
            <div className="flex flex-col gap-y-[15px]">
              <div
                onClick={(event) => reactToPrintFn()}
                className="flex items-center gap-[10px] w-[260px] h-[54px] justify-center bg-[#0047B1] rounded-[12px] cursor-pointer text-white"
              >
                <IoPricetagOutline />
                <p>Download the report</p>
              </div>
              <div
                onClick={handleShareClick}
                className="flex items-center gap-[10px] w-[260px] h-[54px] justify-center border-[1px] border-white rounded-[12px] cursor-pointer text-white"
              >
                <IoPricetagOutline />
                <p>Share the report</p>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-y-[40px] w-full">
            <h1 className="text-[30px] text-white">Car history</h1>
            <div className="grid grid-cols-5 max-lg:grid-cols-4 max-md:grid-cols-3  max-sm:grid-cols-2  max-tiny:grid-cols-1 gap-[20px]">
              {carHistory.map((item) => (
                <div
                  key={item.id}
                  className={`w-full flex flex-col items-center gap-y-[10px] p-[20px] rounded-[20px] border-[1px] border-white`}
                >
                  <div className="relative w-[45px] h-[45px] overflow-hidden rounded-[5px]">
                    <Image
                      src={item.icon}
                      alt={""}
                      sizes="500px"
                      fill
                      style={{
                        objectFit: "contain",
                      }}
                    />
                  </div>
                  <h1 className="text-[15px] text-white text-center">
                    {item.title}
                  </h1>
                  <p className="text-[15px] text-white text-center">
                    {item.found}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-y-[40px] max-sm:gap-y-[20px] w-full">
            <h1 className="text-[30px] max-md:text-[20px] text-white">
              Vehicle specifications
            </h1>
            <div className="w-full max-md:overflow-x-scroll showScrollVert pt-[10px]">
              <div className="grid grid-cols-8 max-xl:grid-cols-4 max-md:w-[800px] gap-[20px]">
                {specifications.map((item) => (
                  <div
                    key={item.id}
                    className={`w-full flex flex-col items-center gap-y-[10px] p-[20px] rounded-[20px] border-[1px] border-white`}
                  >
                    <div className="relative w-[45px] h-[45px] rounded-[5px] overflow-hidden">
                      <Image
                        src={item.icon}
                        alt={""}
                        sizes="500px"
                        fill
                        style={{
                          objectFit: "contain",
                        }}
                      />
                    </div>
                    <p className="text-white  text-center">{item.name}</p>
                    <h1 className="text-white  text-center">
                      {item.value ? item.value : "No Info"}
                    </h1>
                  </div>
                ))}
              </div>
            </div>
          </div>
          {foundInCar?.mileageHistory?.length > 0 && (
            <div className="flex flex-col gap-y-[40px] max-sm:gap-y-[20px] w-full">
              <h1 className="text-[30px] max-md:text-[20px] text-white">
                Vehicle mileage analytics
              </h1>
              <div className="flex max-lg:flex-col-reverse items-start gap-[20px]">
                <div className="flex flex-col gap-y-[10px] p-[20px] rounded-[20px] border-[1px] border-white w-[calc(100%-400px)] max-lg:w-full h-[350px]">
                  <ResponsiveContainer>
                    <LineChart data={mileageData}>
                      <CartesianGrid stroke="#ccc" />
                      <XAxis dataKey="date" />
                      <YAxis
                        dataKey="mileage"
                        domain={[0, maxMileage + 1000]}
                      />
                      <Tooltip />
                      <Line
                        type="monotone"
                        dataKey="mileage"
                        stroke="#0047B1"
                        strokeWidth={2}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
                <div className="w-[400px] max-lg:w-full flex flex-col gap-y-[20px]">
                  {mileageData.map((item) => (
                    <div
                      key={item.id}
                      className={`w-full flex flex-col gap-y-[10px] p-[20px] rounded-[20px] border-[1px] border-white`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="relative w-[45px] h-[45px] rounded-full overflow-hidden">
                          <Image
                            src="/images/flaticons/speedometer.gif"
                            alt={""}
                            sizes="500px"
                            fill
                            style={{
                              objectFit: "contain",
                            }}
                          />
                        </div>
                        <h1 className="text-[18px] text-white">
                          {item.mileage}{" "}
                          {vinValues.Countryen === "KOREA" && "KM"}
                        </h1>
                      </div>
                      <p className="text-[18px] text-white">
                        Checked on {item.date}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          <div className="flex flex-col gap-y-[40px] max-sm:gap-y-[20px] w-full">
            <h1 className="text-[30px] flex items-center max-md:text-[20px] text-white">
              Vehicle mileage history in
              {" " + vinValues.Countryen}
            </h1>
            <div className="w-full overflow-x-auto showScrollVert pb-[10px]">
              <div className="flex flex-col items-center gap-y-[20px] w-full min-w-[1000px]">
                <div
                  className={`grid grid-cols-8 gap-[10px] w-full h-[70px] items-center bg-[#0047B1] rounded-[12px] text-white`}
                >
                  <div className="col-span-1"></div>
                  <div
                    className={`${
                      vinValues.Countryen === "USA"
                        ? "col-span-1"
                        : "col-span-2"
                    }`}
                  >
                    Date
                  </div>
                  <div
                    className={`${
                      vinValues.Countryen === "USA"
                        ? "col-span-1"
                        : "col-span-2"
                    }`}
                  >
                    mileage
                  </div>
                  <div
                    className={`${
                      vinValues.Countryen === "USA"
                        ? "col-span-2"
                        : "col-span-3"
                    }`}
                  >
                    provider
                  </div>
                  {vinValues.Countryen === "USA" && (
                    <div className="col-span-3">A record of history</div>
                  )}
                </div>
                {foundInCar?.mileageHistory?.length > 0 ? (
                  foundInCar?.mileageHistory.map((item) => (
                    <div
                      key={item}
                      className="grid grid-cols-8 text-[14px] gap-[10px] w-full h-[70px] items-center border-[1px] border-gray-400 rounded-[12px] text-white"
                    >
                      <div className="col-span-1 w-full flex items-center justify-center text-[20px]">
                        <div className="relative w-[45px] h-[25px]">
                          <Image
                            src="/images/flaticons/file.gif"
                            alt={""}
                            sizes="500px"
                            fill
                            style={{
                              objectFit: "contain",
                            }}
                          />
                        </div>
                      </div>
                      <div
                        className={`${
                          vinValues.Countryen === "USA"
                            ? "col-span-1"
                            : "col-span-2"
                        }`}
                      >
                        <h1>{item.date}</h1>
                      </div>
                      <div
                        className={`${
                          vinValues.Countryen === "USA"
                            ? "col-span-1"
                            : "col-span-2"
                        }`}
                      >
                        <p>
                          {item.mileage}{" "}
                          {vinValues.Countryen === "KOREA" && "km"}
                        </p>
                      </div>
                      <div
                        className={`${
                          vinValues.Countryen === "USA"
                            ? "col-span-1"
                            : "col-span-2"
                        }`}
                      >
                        <h1>{item.provider}</h1>
                      </div>
                      {vinValues.Countryen === "USA" && (
                        <div className="col-span-3 text-center">
                          <p>{item.historyRecord}</p>
                        </div>
                      )}
                    </div>
                  ))
                ) : (
                  <p className="text-white px-[50px] w-full">
                    No history found!
                  </p>
                )}
                {foundInCar?.mileageHistory?.length > 5 && (
                  <div className="flex items-center gap-[10px] w-[260px] h-[46px] justify-center bg-[#0047B1] rounded-[12px] cursor-pointer text-white text-[15px]">
                    <p>see more</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {vinValues.Countryen === "USA" && (
            <div className="flex flex-col gap-y-[40px] w-full ">
              <div>
                <h1 className="text-[30px] text-white">Vehicle damage</h1>
                <p className="text-gray-300">
                  This section lists the damage to this vehicle. you You can use
                  this information as leverage for the car When negotiating a
                  price. If the damage is excessive, consider another car
                </p>
              </div>
              {foundInCar?.vehicleDamages?.length > 0 ? (
                <div className="grid grid-cols-2 max-md:grid-cols-1 gap-[20px]">
                  {foundInCar?.vehicleDamages.map((item) => (
                    <div
                      key={item}
                      className={`w-full flex flex-col gap-[20px] p-[20px] rounded-[20px] border-[1px] border-white`}
                    >
                      <div className="flex items-start gap-[20px]">
                        <div className="relative w-[45px] h-[45px] rounded-full overflow-hidden">
                          <Image
                            src="/images/usaflag.png"
                            alt={""}
                            sizes="500px"
                            fill
                            style={{
                              objectFit: "cover",
                            }}
                          />
                        </div>
                        <div>
                          <h1 className="text-[18px] text-white">
                            Injury history
                          </h1>
                          <p className="text-[18px] text-white">
                            Country: {item.country}
                          </p>
                          <p className="text-[18px] text-white">
                            Date: {item.date}
                          </p>
                        </div>
                      </div>
                      <div>
                        {item.specs &&
                          item.specs.map((item1) => (
                            <div
                              key={item}
                              className="grid grid-cols-2 items-center gap-[10px]"
                            >
                              <h1 className="text-[18px] text-white">
                                {item1.key}:
                              </h1>
                              <p className="text-[16px] text-white">
                                {item1.value}
                              </p>
                            </div>
                          ))}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-white">No damage to the car was found!</p>
              )}
            </div>
          )}

          {vinValues.Countryen === "KOREA" && (
            <div className="flex flex-col gap-y-[40px] w-full ">
              <div>
                <h1 className="text-[30px] text-white">Vehicle damage</h1>
                <p className="text-gray-300">
                  This section lists the damage to this vehicle. you You can use
                  this information as leverage for the car When negotiating a
                  price. If the damage is excessive, consider another car
                </p>
              </div>
              {foundInCar?.insuranceAccidentHistory?.length > 0 ? (
                <div className="grid grid-cols-2 max-md:grid-cols-1 gap-[20px]">
                  {foundInCar?.insuranceAccidentHistory.map((item) => (
                    <div
                      key={item}
                      className={`w-full flex flex-col gap-[20px] p-[20px] rounded-[20px] border-[1px] border-white`}
                    >
                      <div className="flex items-start gap-[20px]">
                        <div className="relative w-[45px] h-[45px] rounded-full overflow-hidden">
                          <Image
                            src="/images/koreaflag.svg.png"
                            alt={""}
                            sizes="500px"
                            fill
                            style={{
                              objectFit: "cover",
                            }}
                          />
                        </div>
                        <div className="w-full">
                          <h1 className="text-[18px] text-white">
                            Insurance Accident History
                          </h1>
                          <div className="grid grid-cols-2">
                            <p className="text-[18px] text-white">Date:</p>
                            <p className="text-[18px] text-white">
                              {item.date}
                            </p>
                          </div>
                          <div className="grid grid-cols-2">
                            <p className="text-[18px] text-white">LaborCost:</p>
                            <p className="text-[18px] text-white">
                              {item.laborCost}
                            </p>
                          </div>
                          <div className="grid grid-cols-2">
                            <p className="text-[18px] text-white">
                              PaintingCost:
                            </p>
                            <p className="text-[18px] text-white">
                              {item.paintingCost}
                            </p>
                          </div>
                          <div className="grid grid-cols-2">
                            <p className="text-[18px] text-white">PartsCost:</p>
                            <p className="text-[18px] text-white">
                              {item.partsCost}
                            </p>
                          </div>
                          <div className="grid grid-cols-2">
                            <p className="text-[18px] text-white">
                              RepairEstimate:
                            </p>
                            <p className="text-[18px] text-white">
                              {item.repairEstimate}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div>
                        {item.specs &&
                          item.specs.map((item1) => (
                            <div
                              key={item}
                              className="grid grid-cols-2 items-center gap-[10px]"
                            >
                              <h1 className="text-[18px] text-white">
                                {item1.key}:
                              </h1>
                              <p className="text-[16px] text-white">
                                {item1.value}
                              </p>
                            </div>
                          ))}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-white">No damage to the car was found!</p>
              )}
            </div>
          )}

          {vinValues.Countryen === "USA" && (
            <div className="flex flex-col gap-y-[40px] w-full ">
              <div>
                <h1 className="text-[30px] text-white">Sales history</h1>
                <p className="text-gray-300">
                  Found {foundInCar?.saleInfo && 1} records
                </p>
              </div>

              {foundInCar?.saleInfo ? (
                <div className="flex flex-col gap-y-[20px]">
                  <div className="flex flex-col gap-y-[30px] p-[20px] rounded-[20px] border-[1px] text-white border-white w-full">
                    <div className="flex max-lg:flex-col gap-y-[10px] items-center justify-between">
                      <div className="flex flex-col gap-y-[10px]">
                        <h1>{foundInCar?.saleInfo?.date}</h1>
                        <p>Location: {foundInCar?.saleInfo?.country}</p>
                      </div>
                      <div className="flex max-md:flex-col items-center gap-[40px] max-lg:w-full max-lg:justify-between rounded-[16px] p-[20px] bg-[#FFFFFF12]">
                        <div className="flex items-center gap-[20px]">
                          <IoPricetagOutline className="text-[25px]" />
                          <div className="flex flex-col gap-y-[5px]">
                            <h1 className="text-[20px]  max-md:text-[14px]">
                              Price
                            </h1>
                            <p className="text-[20px] max-md:text-[14px]">
                              {foundInCar?.saleInfo?.cost || "not found"}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-[20px]">
                          <IoPricetagOutline className="text-[25px] " />
                          <div className="flex flex-col gap-y-[5px] ">
                            <h1 className="text-[20px] max-md:text-[14px]">
                              Mileage
                            </h1>
                            <p className="text-[20px] max-md:text-[14px]">
                              {foundInCar?.saleInfo?.odometer || "not found"}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-[20px]">
                          <IoPricetagOutline className="text-[25px]" />
                          <div className="flex flex-col gap-y-[5px]">
                            <h1 className="text-[20px] max-md:text-[14px]">
                              Location
                            </h1>
                            <p className="text-[20px] max-md:text-[14px]">
                              {foundInCar?.saleInfo?.location || "not found"}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="h-[500px] max-xl:h-[400px] max-tiny:h-[250px] rounded-[20px] overflow-hidden">
                      <SliderVin
                        data={foundInCar?.saleInfo?.photos}
                        service={true}
                      />
                    </div>
                  </div>
                </div>
              ) : (
                <p className="text-white">No sale history found!</p>
              )}
            </div>
          )}
          <div className="flex max-sm:flex-col gap-[15px]">
            <div
              onClick={(event) => reactToPrintFn()}
              className="flex items-center gap-[10px] w-[260px] h-[54px] justify-center bg-[#0047B1] rounded-[12px] cursor-pointer text-white"
            >
              <IoPricetagOutline />
              <p>Download the report</p>
            </div>
            <div
              onClick={handleShareClick}
              className="flex items-center gap-[10px] w-[260px] h-[54px] justify-center border-[1px] border-white rounded-[12px] cursor-pointer text-white"
            >
              <IoPricetagOutline />
              <p>Share the report</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
