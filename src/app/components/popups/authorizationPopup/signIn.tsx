"use client"

import { useState, useContext } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import LoaderCust from "../../loader/LoaderCust";
import { AxiosForSharingStatesAxiosContext } from "../../../../../useContexts/sharedStates";
import { axiosUser } from "../../../../../useContexts/AxiosClient/AxiosClient";
import Input1 from "../../Inputs/Input1";
import { UserContext } from "../../../../../useContexts/UserAxios";

export default function SignIn() {
  const { setAuthorization, setAlertShow, setAlertStatus, setAlertText } =
    useContext(AxiosForSharingStatesAxiosContext);
  const { setUser, setTokenUser } = useContext(UserContext);

  const [saveChecked, setSaveChecked] = useState(false);
  const handleSaveChecked = () => {
    setSaveChecked((pre) => !pre);
  };

  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const [Error, setError] = useState(false);
  const [isLoader, setIsLoader] = useState(false);

  const handleInputKeyPress = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handelSubmit();
    }
  };

  const handelSubmit = () => {
    setIsLoader(true);
    if (values.email && values.password) {
      return axiosUser
        .post("auth/login", {
          email: values.email,
          password: values.password,
        })
        .then(({ data }) => {
          setUser(data.user);
          setTokenUser(data.token);
          setAuthorization("");
          setAlertShow(true);
          setAlertStatus(true);
          setAlertText("ავტორიზებულია");
        })
        .catch((error) => {
          setError(true);
          setAlertShow(true);
          setAlertStatus(false);
          setAlertText("ავტორიზაცია ვერ მოხდა!");
        })
        .finally(() => {
          setIsLoader(false);
        });
    } else {
      setIsLoader(false);
    }
  };

  return (
    <div className="w-[100%] flex flex-col gap-y-[20px]">
      <div className="flex flex-col gap-y-[10px]">
        <p>ელ-ფოსტა</p>
        <Input1
          name="email"
          setAllValues={setValues}
          isNumber={false}
          handleInputKeyPress={handleInputKeyPress}
        />
      </div>
      <div className="flex flex-col gap-y-[10px]">
        <p>პაროლი</p>
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
            ელ-ფოსტა ან პაროლი არასწორია
          </p>
        </div>
      )}
      <div className="flex justify-between items-center">
        <div
          onClick={() => {
            handleSaveChecked();
          }}
          className="flex gap-[5px] items-center cursor-pointer"
        >
          <input
            type="checkbox"
            checked={saveChecked}
            className="w-[15px] h-[15px]"
          />
          <p>დამახსოვრება</p>
        </div>
        <p
          className="hover:underline cursor-pointer"
          onClick={() => {
            setAuthorization("forgetpassword");
          }}
        >
          დაგავიწყდა პაროლი?
        </p>
      </div>
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
          <h1>შესვლა</h1>
        </div>
      )}
    </div>
  );
}
