"use client";

import { useContext, useState } from "react";
import LoaderCust from "../../loader/LoaderCust";
import Input1 from "../../Inputs/Input1";
import { AxiosForSharingStatesAxiosContext } from "../../../../../useContexts/sharedStates";
import { axiosUser } from "../../../../../useContexts/AxiosClient/AxiosClient";

export default function NewAccount() {
  const { setAuthorization, setAlertShow, setAlertStatus, setAlertText } =
    useContext(AxiosForSharingStatesAxiosContext);
  const [isLoader, setIsLoader] = useState(false);
  const [Error, setError] = useState(false);
  const [emptyError, setEmptyError] = useState(false);

  const [values, setValues] = useState({
    name: "",
    email: "",
    mobNumber: "",
    password: "",
  });

  const handleInputKeyPress = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handelSubmit();
    }
  };

  const handelSubmit = () => {
    setIsLoader(true);

    if (values.email && values.password) {
      axiosUser
        .post("auth/singUp", {
          name: values.name,
          phone: values.mobNumber.replace(/\s/g, ""),
          email: values.email,
          password: values.password,
        })
        .then((response) => {
          setValues({ name: "", email: "", mobNumber: "", password: "" });
          setAlertShow(true);
          setAlertStatus(true);
          setAlertText("რეგისტრირებულია");
          setAuthorization("signin");
          setEmptyError(false);
          setError(false);
        })
        .catch((error) => {
          setError(true);
          setIsLoader(false);
          setEmptyError(false);
          setAlertShow(true);
          setAlertStatus(false);
          setAlertText("რეგისტრაცია ვერ მოხდა!");
        })
        .finally(() => {
          setIsLoader(false);
        });
    } else {
      setError(false);
      setEmptyError(true);
      setIsLoader(false);
    }
  };

  return (
    <div className="flex flex-col gap-y-[20px]">
      <div className="flex flex-col gap-y-[10px]">
        <p className=" ">სახელი</p>

        <Input1
          name="name"
          setAllValues={setValues}
          isNumber={false}
          handleInputKeyPress={handleInputKeyPress}
        />
      </div>

      <div className="flex flex-col gap-y-[10px]">
        <p className=" ">ელ-ფოსტა</p>

        <Input1
          name="email"
          setAllValues={setValues}
          isNumber={false}
          handleInputKeyPress={handleInputKeyPress}
        />
      </div>
      <div className="flex flex-col gap-y-[10px]">
        <p className=" ">ტელეფონის ნომერი</p>

        <Input1
          name="mobNumber"
          setAllValues={setValues}
          isNumber={true}
          handleInputKeyPress={handleInputKeyPress}
        />
      </div>
      <div className="flex flex-col gap-y-[10px]">
        <p className=" ">პაროლი</p>

        <Input1
          name="password"
          placeholder="***********"
          setAllValues={setValues}
          isPassword={true}
          handleInputKeyPress={handleInputKeyPress}
        />
      </div>

      {Error && (
        <div className="flex items-center justify-center">
          <p className="text-[#ff0000] font-bold">
            ელ-ფოსტის ან ტელ ნომრის ფორმატი არასწორია
          </p>
        </div>
      )}
      {emptyError && (
        <div className="flex items-center justify-center">
          <p className="text-[#ff0000] font-bold">შეავსეთ ყველა ველი</p>
        </div>
      )}
      {isLoader ? (
        <div className="flex items-center w-[100%] h-[50px] rounded-[10px] text-white justify-center pointer-events-none border-[1px] duration-200 bg-black">
          <div className="w-[40px] h-[40px] flex items-center justify-center">
            <LoaderCust />
          </div>
        </div>
      ) : (
        <div
          onClick={() => {
            handelSubmit();
          }}
          className="flex gap-[5px] items-center pt-[2px] w-[100%] h-[50px] rounded-[10px]  text-white justify-center  text-[18px] cursor-pointer hover:bg-[#000000c1]  border-[1px]  duration-200 bg-black"
        >
          <h1>რეგისტრაცია</h1>
        </div>
      )}
    </div>
  );
}
