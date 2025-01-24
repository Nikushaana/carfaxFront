"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useContext, useEffect, useRef, useState } from "react";
import { BsSearch } from "react-icons/bs";
import {
  axiosKorea,
  axiosUsa,
  axiosUser,
} from "../../../../useContexts/AxiosClient/AxiosClient";
import { useRouter } from "next/navigation";
import { AxiosForSharingStatesAxiosContext } from "../../../../useContexts/sharedStates";
import { UserContext } from "../../../../useContexts/UserAxios";

export default function FirstSection() {
  const targetRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const { countries } = useContext(AxiosForSharingStatesAxiosContext);
  const { setAuthorization, isAuthorizedUser } = useContext(
    AxiosForSharingStatesAxiosContext
  );

  const [vinValues, setVinValues] = useState({
    Countryen: "",
    Vin: "",
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

  const [loader, setLoader] = useState(false);
  const [foundCar, setFoundCar] = useState<any>({});

  const handleInputChange = (event) => {
    let newText = event.target.value;

    setVinValues((prev) => ({ ...prev, Vin: newText }));
  };

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
    <div className="flex flex-col gap-y-[50px]">
      <div className="w-full flex max-[800px]:flex-col-reverse max-[800px]:items-center gap-10 max-sm:gap-[20px]">
        <div className="w-[40%] max-[800px]:w-[330px] max-tiny:w-full flex flex-col max-tiny:items-center gap-y-[20px] my-[50px] max-lg:my-[20px]">
          <h1 className="text-[41px] max-lg:text-[30px] text-white">
            შეამოწმე ვინ კოდი
          </h1>

          <div className="w-full p-[50px]  max-lg:p-[20px] bg-white rounded-[20px] flex flex-col gap-y-[20px]">
            <div className="grid grid-cols-2 rounded-[16px] border-[1px] border-[#050B20] overflow-hidden">
              {countries.map((item) => (
                <h1
                  key={item.id}
                  onClick={() => {
                    setVinValues((prev) => ({
                      ...prev,
                      Countryen: item.Countryen,
                    }));
                  }}
                  className={`flex items-center justify-center h-[50px]  cursor-pointer duration-100 ${
                    vinValues.Countryen === item.Countryen
                      ? "bg-[#050B20] text-white"
                      : "text-[#050B20] bg-white"
                  }`}
                >
                  {item.Country}
                </h1>
              ))}
            </div>
            <div
              ref={targetRef}
              className="flex w-full items-center justify-between border-[1px] rounded-[16px] h-[55px] pl-[15px]"
            >
              <input
                onChange={handleInputChange}
                value={vinValues.Vin}
                ref={inputRef}
                className="outline-none w-[80%] bg-[#00000000]"
                placeholder="შეიყვანეთ ვინ კოდი"
              />
              <div className="w-[45px] h-[45px] max-tiny:w-[40px] max-tiny:h-[40px] rounded-full bg-white flex justify-center items-center">
                <BsSearch />
              </div>
            </div>
            <div
              onClick={() => {
                HandleCheckVin();
              }}
              className={`flex w-full items-center justify-center gap-[15px] border-[1px] text-[14px]  rounded-[20px]  text-white h-[55px] pl-[15px] cursor-pointer ${
                loader || VinserviceLoader
                  ? "pointer-events-none bg-[#0047b186]"
                  : "bg-[#0047B1]"
              }`}
            >
              <div className="cursor-pointer rounded-full flex justify-center items-center ml-[-10px]">
                <BsSearch />
              </div>
              <p>ისტორიის შემოწმება</p>
            </div>
            {vinValues.Countryen && (
              <p
                className={`text-[12px] ${
                  VinserviceLoader ? "text-gray-400" : ""
                }`}
              >
                VIN ის შემოწმების ფასია{" "}
                {VinserviceLoader ? ".." : Vinservice[0]?.price}₾
              </p>
            )}
          </div>
        </div>
        <div className="relative w-[60%] max-[800px]:w-full max-[800px]:h-[300px] ">
          <Image
            src={"/images/electriccarmain.png"}
            alt={""}
            sizes="500px"
            fill
            style={{
              objectFit: "cover",
            }}
          />
        </div>
      </div>
      <div className="w-full grid grid-cols-2 max-tiny:grid-cols-1 gap-[20px]">
        <Link
          href="/cars"
          className="w-full h-[230px] max-lg:h-[200px] max-sm:h-[150px] flex items-center justify-center rounded-[16px] bg-[#05132A]"
        >
          <h1 className="text-[20px] text-white">ავტომობილები</h1>
        </Link>
        <Link
          href="/parts"
          className="w-full h-[230px] max-lg:h-[200px]  max-sm:h-[150px] flex items-center justify-center rounded-[16px] bg-[#151722D9]"
        >
          <h1 className="text-[20px] text-white">ავტონაწილები</h1>
        </Link>
      </div>
    </div>
  );
}
