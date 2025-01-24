"use client";

import React, { useContext, useState } from "react";
import { axiosUser } from "../../../../useContexts/AxiosClient/AxiosClient";
import DropDown1ValSearch from "../../components/DropDowns/DropDown1ValSearch";
import { AxiosForSharingStatesAxiosContext } from "../../../../useContexts/sharedStates";
import Input1 from "../../components/Inputs/Input1";
import MappedButtons from "../../components/mappedbuttons/mappedbuttons";
import Input2 from "../../components/Inputs/Input2";
import Toggle2value from "../../components/toggle2value/toggle2value";
import Image from "next/image";
import TextArea1 from "../../components/Inputs/TextArea1";
import MultiImgUploader from "../../components/imgVidUpload/MultiImgUploader";
import MultiVidUploader from "../../components/imgVidUpload/MultiVidUploader";
import AddContact from "../../components/user/AddContact";
import AddValuableServs from "../../components/user/AddValuableServs";
import LoaderCust from "../../components/loader/LoaderCust";
import { useRouter } from "next/navigation";
import DropDownFromTo from "../../components/DropDowns/DropDownFromTo";
import { FaRegTrashCan } from "react-icons/fa6";

export default function Page() {
  const router = useRouter();
  const {
    vehicleType,
    years,
    engine,
    transmission,
    petrol,
    weel,
    colors,
    cylinders,
    pullingWheels,
    adress,
    leather,
    moreInfoBtn,

    setAlertShow,
    setAlertStatus,
    setAlertText,
    parts,
    FirmsData,
    ModelsData,
  } = useContext(AxiosForSharingStatesAxiosContext);

  const [loader, setLoader] = useState(false);

  const [allValues, setAllValues] = useState<any>({
    part_models: [],
    currency: "",
    condition: "",
    description: "",
    partName: "",
    o_city: "",
    o_name: "",
    o_phone: "",
    price: "",
    original: "",

    service_term: "",
    service_id: "",
  });

  const [addPartsModels, setAddPartsModels] = useState({
    id: 1,
    firm: "",
    model: "",
    fyear: "",
    tyear: "",
  });

  const HandleAddPartModel = () => {
    if (
      addPartsModels.firm &&
      addPartsModels.model &&
      addPartsModels.fyear &&
      addPartsModels.tyear
    ) {
      setAllValues((prev) => ({
        ...prev,
        part_models: [...prev.part_models, { ...addPartsModels }],
      }));
      setAddPartsModels((prev) => ({
        ...prev,
        id: prev.id + 1,
        firm: "",
        model: "",
        fyear: "",
        tyear: "",
      }));
    }
  };

  const HandleDeletePartModel = (id) => {
    setAllValues((prev) => ({
      ...prev,
      part_models: prev.part_models.filter((info) => info.id !== id),
    }));
  };

  const UploadPart = (e) => {
    setLoader(true);

    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);

    formData.append("partName", allValues.partName);
    formData.append("part_models", JSON.stringify(allValues.part_models));
    formData.append("condition", allValues.condition);
    formData.append("original", allValues.original);
    formData.append("currency", allValues.currency);
    formData.append("o_city", allValues.o_city);
    if (!allValues.vip) {
      formData.append("vip", "0");
    }
    if (allValues.service_id && allValues.service_term) {
      formData.append("service_id", allValues.service_id);
    }
    formData.append("service_term", allValues.service_term || 0);
    formData.delete("o_phone");
    formData.append("o_phone", allValues.o_phone);

    axiosUser
      .post("user/part", formData)
      .then((res) => {
        setAlertShow(true);
        setAlertStatus(true);
        setAlertText("ნაწილი დაემატა");
        router.push("/user/mystatements/parts");
      })
      .catch((error) => {
        setAlertShow(true);
        setAlertStatus(false);
        setAlertText("ნაწილი ვერ დაემატა!");
      })
      .finally(() => {
        setLoader(false);
      });
  };

  return (
    <form
      onSubmit={UploadPart}
      encType="multipart/form-data"
      className={`flex flex-col gap-7 ${loader && "pointer-events-none"}`}
    >
      <h1 className="text-[22px] hidden max-lg:flex  text-white">
        ნაწილის დამატება
      </h1>
      <div className="w-full shadow-md shadow-[#3d7294] bg-[#0e1420] text-white rounded-[10px] flex flex-col gap-y-[20px] px-[20px] py-[30px] max-sm:px-[10px]">
        <p className="text-[17px]">დეტალური ინფორმაცია</p>
        <div className="flex items-center justify-between max-sm:flex-col max-sm:items-start max-sm:gap-y-[10px]">
          <p>ნაწილი</p>
          <div className="w-[300px] h-[40px] max-sm:w-full">
            <DropDown1ValSearch
              name="partName"
              setAllValues={setAllValues}
              data={parts}
              placeholder="ნაწილი"
              searchable={true}
            />
          </div>
        </div>

        <div className="flex flex-col gap-y-[20px]">
          <div className="grid grid-cols-3 max-sm:hidden gap-[20px] w-[calc(100%-200px)] ">
            <p>მწარმოებელი</p>
            <p>მოდელი</p>
            <p>წელი</p>
          </div>
          <hr className="w-full h-[1px] bg-white" />
          <div className="flex flex-col gap-y-[10px]">
            <div className="flex items-center max-tiny:flex-col gap-[20px] w-full">
              <div className="grid grid-cols-3  max-sm:grid-cols-2 max-tiny:grid-cols-1  gap-[10px] w-[calc(100%-200px)] max-tiny:w-full">
                <DropDown1ValSearch
                  name="firm"
                  setAllValues={setAddPartsModels}
                  data={FirmsData}
                  placeholder="მწარმოებელი"
                  searchable={true}
                  render={allValues.part_models}
                />
                <DropDown1ValSearch
                  name="model"
                  setAllValues={setAddPartsModels}
                  data={ModelsData.filter((model) =>
                    FirmsData.filter((firm) =>
                      addPartsModels?.firm?.includes(firm.name)
                    )
                      .map((firm) => firm.id)
                      .includes(model.firm_id)
                  )}
                  placeholder="მოდელი"
                  searchable={true}
                  render={allValues.part_models}
                />
                <DropDownFromTo
                  name1="fyear"
                  name2="tyear"
                  setAllValues={setAddPartsModels}
                  data1={years}
                  data2={years}
                  placeholder="წელი"
                  render={allValues.part_models}
                />
              </div>
              <p
                onClick={() => HandleAddPartModel()}
                className="bg-[#216321] text-white
              hover:bg-[#177a17] duration-200 w-[180px] max-tiny:w-full h-[40px] rounded-[10px] 
              cursor-pointer flex items-center justify-center"
              >
                მოდელის დამატება
              </p>
            </div>

            {allValues.part_models?.map((item) => (
              <div
                key={item.id}
                className="grid grid-cols-3 max-sm:grid-cols-2 gap-[20px]"
              >
                <div className="flex gap-[10px] w-full items-center">
                  <p className="w-[40px] h-[40px] shadow shadow-[#3d7294] rounded-[10px] flex items-center justify-center">
                    {item.id}#
                  </p>
                  <p
                    className="w-[calc(100%-50px)] rounded-[8px] h-[40px] 
                shadow-[#3d7294] bg-[#0e1420] text-white outline-none px-[5px] flex items-center shadow"
                  >
                    {item.firm}
                  </p>
                </div>
                <p
                  className="w-full rounded-[8px] h-[40px] 
              shadow-[#3d7294] bg-[#0e1420] text-white outline-none px-[5px] flex items-center shadow"
                >
                  {item.model}
                </p>
                <div className="flex gap-[10px] w-full items-center">
                  <div
                    className="w-[calc(100%-30px)] rounded-[8px] h-[40px] 
                shadow-[#3d7294] bg-[#0e1420] text-white outline-none px-[5px] flex items-center shadow"
                  >
                    {item.fyear} - {item.tyear}
                  </div>
                  <div
                    onClick={() => HandleDeletePartModel(item.id)}
                    className="w-[20px] h-[40px] flex items-center justify-center duration-100 rounded-[10px] shrink-0 cursor-pointer text-red-500 hover:text-[18px]"
                  >
                    <FaRegTrashCan />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between max-tiny:flex-col max-tiny:items-start max-tiny:gap-y-[10px]">
          <p className="flex items-center gap-[10px]">მდგომარეობა</p>
          <Toggle2value
            name="condition"
            setAllValues={setAllValues}
            firstValue="ახალი"
            title1="ახალი"
            title2="მეორადი"
          />
        </div>
        <div className="flex items-center justify-between max-tiny:flex-col max-tiny:items-start max-tiny:gap-y-[10px]">
          <p className="flex items-center gap-[10px]">ორიგინალი</p>
          <Toggle2value
            name="original"
            setAllValues={setAllValues}
            firstValue="კი"
            title1="კი"
            title2="არა"
          />
        </div>
      </div>

      <div className="w-full shadow-md shadow-[#3d7294] bg-[#0e1420] text-white rounded-[10px] flex flex-col gap-y-[20px] px-[20px] py-[30px] max-sm:px-[10px]">
        <p className="text-[17px]">აღწერილობა</p>

        <div className="flex flex-col gap-[10px]">
          <p>ქართულად</p>
          <TextArea1 name="description" setAllValues={setAllValues} />
        </div>
      </div>
      <div className="w-full shadow-md shadow-[#3d7294] bg-[#0e1420] text-white rounded-[10px] flex flex-col gap-y-[20px] px-[20px] py-[30px] max-sm:px-[10px]">
        <p className="text-[17px]">ატვირთე ფოტო</p>
        <MultiImgUploader inputName={"parts_imgs"} />
      </div>
      <div className="w-full shadow-md shadow-[#3d7294] bg-[#0e1420] text-white rounded-[10px] flex flex-col gap-y-[20px] px-[20px] py-[30px] max-sm:px-[10px]">
        <div className="flex items-center justify-between max-sm:flex-col max-sm:items-start max-sm:gap-y-[10px]">
          <p>სრული ფასი</p>
          <div className="w-[400px] gap-[10px] flex items-center max-sm:w-full">
            <div className="w-[calc(100%-115px)] h-[40px]">
              <Input2 name="price" setAllValues={setAllValues} digit={true} />
            </div>
            <Toggle2value
              name="currency"
              setAllValues={setAllValues}
              firstValue="ლარი"
              title1="ლარი"
              title2="დოლარი"
            />
          </div>
        </div>
      </div>
      <AddContact setAllValues={setAllValues} isService={false} />
      <AddValuableServs
        name={"service_term"}
        name1={"service_id"}
        values={allValues}
        setAllValues={setAllValues}
      />
      <div className="w-full rounded-[10px] flex justify-end gap-y-[20px]">
        {loader ? (
          <div
            className="shadow-md shadow-[#3d7294] text-white
              bg-[#335f7a] duration-200 w-[180px] h-[50px] rounded-[10px] 
              pointer-event-none flex items-center justify-center"
          >
            <div className="w-[40px] h-[40px] flex items-center justify-center">
              <LoaderCust />
            </div>
          </div>
        ) : (
          <button
            type="submit"
            className="bg-[#0e1420] shadow-md shadow-[#3d7294] text-white
              hover:bg-[#335f7a] duration-200 w-[180px] h-[50px] rounded-[10px] 
              cursor-pointer flex items-center justify-center"
          >
            გამოქვეყნება
          </button>
        )}
      </div>
    </form>
  );
}
