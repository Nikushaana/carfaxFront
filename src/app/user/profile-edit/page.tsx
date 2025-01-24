"use client";

import { useEffect, useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { axiosUser } from "../../../../useContexts/AxiosClient/AxiosClient";
import Input2 from "../../components/Inputs/Input2";
import LoaderCust from "../../components/loader/LoaderCust";

export default function ProfileEditing() {
  const [allValues, setAllValues] = useState({
    email: "",
    name: "",
    password: "",
    phone: "",
  });

  const [data, setData] = useState<any>();
  const [loader, setLoader] = useState(true);
  const [render, setRender] = useState<any>();

  useEffect(() => {
    axiosUser.get(`user`).then((res) => {
      setLoader(false);
      setData(res.data);
      setAllValues(res.data);
    });
  }, [render]);

  const UpdateProfile = () => {
    setLoader(true);
    axiosUser
      .put(`user`, {
        email: allValues.email,
        name: allValues.name,
        password: allValues.password,
        phone: allValues.phone,
      })
      .then((res) => {
        goToTopFast();
        setRender(res);
      })
      .catch((error) => {
        setLoader(false);
      });
  };

  const goToTopFast = () => {
    window.scrollTo({ top: 0, left: 0 });
  };

  return (
    <div className="w-full flex flex-col gap-7 text-white">
      <h1 className="text-[22px] hidden max-lg:flex  text-white">
        პროფილის რედაქტირება
      </h1>
      <div className="w-full flex flex-col  gap-y-[10px] px-[50px] py-[50px] text-white shadow-md shadow-[#3d7294] bg-[#0e1420] rounded-[10px] ">
        <div className="flex flex-col gap-y-[10px] max-md:gap-y-[20px] max-md:items-center">
          <div className="flex items-center w-full gap-[20px] max-sm:flex-col  justify-between max-sm:gap-y-[10px]">
            <p className="flex justify-end max-sm:justify-start">ელ-ფოსტა</p>
            <div className="max-smaller:w-full w-[260px] max-md:w-[200px] h-[40px] max-xl:w-[180px] max-sm:w-full">
              <Input2
                allValues={allValues}
                setAllValues={setAllValues}
                firstValue={data && data.email}
                name="email"
              />
            </div>
          </div>
          <div className="flex items-center w-full gap-[20px] max-sm:flex-col  justify-between  max-sm:gap-y-[10px]">
            <p className="flex justify-end max-sm:justify-start">სახელი</p>
            <div className="max-smaller:w-full w-[260px] max-md:w-[200px] h-[40px] max-xl:w-[180px] max-sm:w-full">
              <Input2
                allValues={allValues}
                setAllValues={setAllValues}
                firstValue={data && data.name}
                name="name"
              />
            </div>
          </div>
          <div className="flex items-center w-full gap-[20px] max-sm:flex-col  justify-between max-sm:gap-y-[10px]">
            <p className="flex justify-end max-sm:justify-start">
              მობილურის ნომერი
            </p>
            <div className="max-smaller:w-full w-[260px] max-md:w-[200px] h-[40px] max-xl:w-[180px] max-sm:w-full">
              <Input2
                allValues={allValues}
                setAllValues={setAllValues}
                firstValue={data && data.phone}
                name="phone"
                itsTellNum={true}
              />
            </div>
          </div>
          <div className="flex items-center w-full gap-[20px] max-sm:flex-col  justify-between max-sm:gap-y-[10px]">
            <p className="flex justify-end max-sm:justify-start">
              შეიყვანე ახალი პაროლი
            </p>
            <div className="max-smaller:w-full w-[260px] max-md:w-[200px] h-[40px] max-xl:w-[180px] max-sm:w-full">
              <Input2
                allValues={allValues}
                setAllValues={setAllValues}
                name="password"
                placeholder="****************"
                isPassword={true}
              />
            </div>
          </div>

          <div className="flex items-center justify-end gap-[20px] w-full max-sm:flex-col max-sm:items-center ">
            {loader ? (
              <div
                className="w-[150px] cursor-pointer h-[40px] flex items-center rounded-[8px] justify-center 
            bg-[black] shadow shadow-[#3d7294]
      hover:bg-[#3d7294] duration-200"
              >
                <div className="w-[40px] h-[40px] flex items-center justify-center">
                  <LoaderCust />
                </div>
              </div>
            ) : (
              <button
                onClick={() => {
                  UpdateProfile();
                }}
                className="px-[10px] cursor-pointer h-[40px] flex items-center rounded-[8px] justify-center 
            bg-[black] shadow shadow-[#3d7294]
      hover:bg-[#3d7294] duration-200"
                type="submit"
              >
                რედაქტირება
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
