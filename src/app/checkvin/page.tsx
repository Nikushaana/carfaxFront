"use client";

import Image from "next/image";
import React, { useContext, useEffect, useRef, useState } from "react";
import { BiMinus, BiPlus } from "react-icons/bi";
import { BsSearch } from "react-icons/bs";
import { IoMdCamera } from "react-icons/io";
import {
  axiosKorea,
  axiosUsa,
  axiosUser,
} from "../../../useContexts/AxiosClient/AxiosClient";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { AxiosForSharingStatesAxiosContext } from "../../../useContexts/sharedStates";
import LoaderCust from "../components/loader/LoaderCust";

export default function Page() {
  const targetRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [activeInp, setActiveInp] = useState(false);

  const { setAuthorization, isAuthorizedUser, countries } = useContext(
    AxiosForSharingStatesAxiosContext
  );
  const router = useRouter();
  const params = useSearchParams();

  const countryen = params.get("Countryen");
  const vin = params.get("Vin");

  const [vinValues, setVinValues] = useState({
    Countryen: countryen || "",
    Vin: vin || "",
  });

  const [Vinservice, setVinService] = useState<any>([]);
  const [VinserviceLoader, setVinserviceLoader] = useState<boolean>(true);

  useEffect(() => {
    setVinserviceLoader(true);
    axiosUser
      .get(
        `front/service?type=${
          vinValues.Countryen === "USA" ? "VIN ამერიკა" : "VIN კორეა"
        }`
      )
      .then((res) => {
        setVinService(res.data.data);
        setVinserviceLoader(false);
      })
      .finally(() => {});
  }, [vinValues.Countryen]);

  const handleInputChange = (event) => {
    let newText = event.target.value;

    setVinValues((prev) => ({ ...prev, Vin: newText }));
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      targetRef.current &&
      !(targetRef.current as HTMLDivElement).contains(event.target as Node)
    ) {
      setActiveInp(false);
      inputRef.current?.blur();
    }
  };

  useEffect(() => {
    if (vinValues.Vin) {
      setActiveInp(true);
      inputRef.current?.focus();
    }
  }, [vinValues.Vin]);

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const handleInputClick = () => {
    setActiveInp(true);
    inputRef.current?.focus();
  };

  const [loader, setLoader] = useState(false);
  const [foundCar, setFoundCar] = useState<any>({});

  const HandleCheckVin = () => {
    if (isAuthorizedUser) {
      setLoader(true);
      if (vinValues.Vin && vinValues.Countryen) {
        if (vinValues.Countryen === "USA") {
          axiosUsa
            .get(`${vinValues.Vin}`)
            .then((res) => {
              setFoundCar(JSON.parse(res.data.json));
              router.push(
                `/checkvin/1?Countryen=${vinValues.Countryen}&Vin=${vinValues.Vin}`
              );
            })
            .catch((error) => {})
            .finally(() => {
              setLoader(false);
            });
        } else if (vinValues.Countryen === "KOREA") {
          axiosKorea
            .get(`${vinValues.Vin}`)
            .then((res) => {
              setFoundCar(res.data);
              router.push(
                `/checkvin/1?Countryen=${vinValues.Countryen}&Vin=${vinValues.Vin}`
              );
            })
            .catch((error) => {})
            .finally(() => {
              setLoader(false);
            });
        }
      } else {
        setLoader(false);
      }
    } else {
      setAuthorization("signin");
    }
  };

  return (
    <div className="h-[100vh] pt-[110px] pb-[100px] px-[190px] bg-[#161d33] max-xl:px-[100px] max-md:px-[50px] max-sm:px-[16px] flex items-center">
      <div className="w-full  flex flex-col items-center gap-y-[30px]">
        <h1 className="text-white text-[45px] text-center max-md:text-[40px]">
          ვინ კოდის შემოწმება
        </h1>
        <div className="flex flex-col items-center gap-y-[20px]">
          <p className="text-gray-300 text-[15px]">აირჩიეთ ქვეყანა</p>
          <div className="grid grid-cols-2 w-[300px] gap-[15px]">
            {countries.map((item) => (
              <div
                key={item.id}
                onClick={() => {
                  setVinValues((prev) => ({
                    ...prev,
                    Countryen: item.Countryen,
                  }));
                }}
                className={`flex items-center border-[1px] rounded-[10px] justify-center h-[50px] gap-[10px] cursor-pointer duration-100 ${
                  vinValues.Countryen === item.Countryen
                    ? "bg-white text-[#050B20]"
                    : "text-white border-gray-100"
                }`}
              >
                <div className="relative w-[30px] h-[30px] rounded-full overflow-hidden">
                  <Image
                    src={item.flag}
                    alt={""}
                    sizes="500px"
                    fill
                    style={{
                      objectFit: "cover",
                    }}
                  />
                </div>
                <p>{item.Country}</p>
              </div>
            ))}
          </div>
        </div>
        <div
          ref={targetRef}
          onClick={handleInputClick}
          className="rounded-full bg-white w-[80%] max-md:w-full flex items-center gap-[20px] cursor-text justify-between p-[10px] pl-[50px] max-sm:pl-[30px] h-[76px]"
        >
          <div className="flex flex-col w-full">
            <p
              className={`duration-100 ${
                activeInp
                  ? "text-[15px] text-gray-400 max-sm:text-[11px]"
                  : "text-[18px] max-sm:text-[13px]"
              }`}
            >
              შეიყვანეთ ავტომობილის ვინ კოდი
            </p>
            <input
              type="text"
              onChange={handleInputChange}
              value={vinValues.Vin}
              ref={inputRef}
              className={`outline-none duration-100 ${
                activeInp ? "h-[30px]" : " h-0"
              }`}
            />
          </div>
          <div
            onClick={() => {
              HandleCheckVin();
            }}
            className={`max-tiny:hidden flex px-[30px] items-center justify-center gap-[15px] text-[14px] rounded-full bg-[#0047B1] text-white h-full cursor-pointer ${
              loader || VinserviceLoader
                ? "pointer-events-none bg-[#0047b186]"
                : "bg-[#0047B1]"
            }`}
          >
            <div className="cursor-pointer rounded-full flex justify-center items-center">
              <BsSearch />
            </div>
            <p>ძებნა</p>
          </div>
        </div>
        <div
          onClick={() => {
            HandleCheckVin();
          }}
          className={`max-tiny:flex hidden h-[50px] px-[30px] items-center justify-center gap-[15px] text-[14px] rounded-full text-white cursor-pointer ${
            loader || VinserviceLoader
              ? "pointer-events-none bg-[#0047b186]"
              : "bg-[#0047B1]"
          }`}
        >
          <div className="cursor-pointer rounded-full flex justify-center items-center">
            <BsSearch />
          </div>
          <p>ძებნა</p>
        </div>

        {vinValues.Countryen && (
          <p
            className={`text-[12px] ${
              VinserviceLoader ? "text-gray-400" : "text-white"
            }`}
          >
            VIN ის შემოწმების ფასია{" "}
            {VinserviceLoader ? ".." : Vinservice[0]?.price}₾
          </p>
        )}

        {loader ? (
          <div
            className="
            pointer-event-none flex items-center justify-center"
          >
            <div className="w-[40px] h-[40px] flex items-center justify-center text-white">
              <LoaderCust />
            </div>
          </div>
        ) : (
          <p
            className={`${
              foundCar ? "text-white underline cursor-pointer" : "text-red-400"
            } text-[20px] `}
          >
            {foundCar ? "" : "ვერ მოიძებნა!"}
          </p>
        )}
      </div>
    </div>
  );
}
