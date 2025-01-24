"use client";

import React, { useContext, useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { AiOutlineClose } from "react-icons/ai";
import { BsXLg } from "react-icons/bs";
import { FaRegTrashCan } from "react-icons/fa6";
import { AxiosForSharingStatesAxiosContext } from "../../../../../../../useContexts/sharedStates";
import { axiosUser } from "../../../../../../../useContexts/AxiosClient/AxiosClient";
import DropDown1ValSearch from "../../../../../components/DropDowns/DropDown1ValSearch";
import DropDownFromTo from "../../../../../components/DropDowns/DropDownFromTo";
import Toggle2value from "../../../../../components/toggle2value/toggle2value";
import TextArea1 from "../../../../../components/Inputs/TextArea1";
import MultiImgUploader from "../../../../../components/imgVidUpload/MultiImgUploader";
import Input2 from "../../../../../components/Inputs/Input2";
import AddContact from "../../../../../components/user/AddContact";
import AddValuableServs from "../../../../../components/user/AddValuableServs";
import LoaderCust from "../../../../../components/loader/LoaderCust";

export default function Page({ params }: { params: { partId: string } }) {
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
  const [onePart, setOnePart] = useState<any>();
  const [onePartRender, setOnePartRender] = useState<any>();

  useEffect(() => {
    setLoader(true);
    axiosUser
      .get(`user/part/${params.partId}`)
      .then((res) => {
        setOnePart(res.data);
        setAllValues((pre) => ({ ...pre, part_models: res.data.Parts_models }));
      })
      .catch((err) => {})
      .finally(() => {
        setLoader(false);
      });
  }, [params.partId, onePartRender]);

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

  const UpdatePart = (e) => {
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
    if (allValues.service_id && allValues.service_term) {
      formData.append("service_id", allValues.service_id);
    }
    formData.append("service_term", allValues.service_term || 0);
    formData.delete("o_phone");
    formData.append("o_phone", allValues.o_phone);

    axiosUser
      .post(`user/part/${params.partId}`, formData)
      .then((res) => {
        setAlertShow(true);
        setAlertStatus(true);
        setAlertText("ნაწილი რედაქტირდა");
        router.push("/user/mystatements");
      })
      .catch((error) => {
        setAlertShow(true);
        setAlertStatus(false);
        setAlertText("ნაწილი ვერ რედაქტირდა!");
      })
      .finally(() => {
        setLoader(false);
      });
  };

  const DeleteImgBack = (id) => {
    setLoader(true);
    axiosUser
      .delete(`user/partImage/${id}`)
      .then((res) => {
        DeleteImgFront(id);
        setOnePartRender(res);
      })
      .catch((err) => {
        setLoader(false);
      })
      .finally(() => {});
  };
  const DeleteImgFront = (id) => {
    const newData = { ...onePart };

    newData.parts_imgs = newData.parts_imgs.filter((item) => item.id !== id);
    setOnePart(newData);
  };

  return (
    <form
      onSubmit={UpdatePart}
      encType="multipart/form-data"
      className={`flex flex-col gap-7 ${loader && "pointer-events-none"}`}
    >
      <h1 className="text-[22px] hidden max-lg:flex">ნაწილის დამატება</h1>
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
              firstValue={onePart?.partName}
            />
          </div>
        </div>

        <div className="flex flex-col gap-y-[20px]">
          <div className="grid grid-cols-3 gap-[20px] max-sm:hidden  w-[calc(100%-200px)]">
            <p>მწარმოებელი</p>
            <p>მოდელი</p>
            <p>წელი</p>
          </div>
          <hr className="w-full h-[1px] bg-white" />
          <div className="flex flex-col gap-y-[10px]">
            <div className="flex items-center max-tiny:flex-col gap-[20px] w-full">
              <div className="grid grid-cols-3 max-sm:grid-cols-2 max-tiny:grid-cols-1  gap-[10px] w-[calc(100%-200px)] max-tiny:w-full">
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
                      allValues?.firm?.includes(firm.name)
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
              hover:bg-[#177a17] duration-200 w-[180px] max-tiny:w-full  h-[40px] rounded-[10px] 
              cursor-pointer flex items-center justify-center"
              >
                მოდელის დამატება
              </p>
            </div>

            {allValues.part_models.map((item) => (
              <div
                key={item.id}
                className="grid grid-cols-3 max-sm:grid-cols-2  gap-[20px]"
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
            firstValue={onePart?.condition ? onePart?.condition : "ახალი"}
            title1="ახალი"
            title2="მეორადი"
          />
        </div>
        <div className="flex items-center justify-between max-tiny:flex-col max-tiny:items-start max-tiny:gap-y-[10px]">
          <p className="flex items-center gap-[10px]">ორიგინალი</p>
          <Toggle2value
            name="original"
            setAllValues={setAllValues}
            firstValue={onePart?.original ? onePart?.original : "კი"}
            title1="კი"
            title2="არა"
          />
        </div>
      </div>

      <div className="w-full shadow-md shadow-[#3d7294] bg-[#0e1420] text-white rounded-[10px] flex flex-col gap-y-[20px] px-[20px] py-[30px] max-sm:px-[10px]">
        <p className="text-[17px]">აღწერილობა</p>

        <div className="flex flex-col gap-[10px]">
          <p>ქართულად</p>
          <TextArea1
            name="description"
            setAllValues={setAllValues}
            firstValue={onePart?.description}
          />
        </div>
      </div>
      <div className="w-full shadow-md shadow-[#3d7294] bg-[#0e1420] text-white rounded-[10px] flex flex-col gap-y-[20px] px-[20px] py-[30px] max-sm:px-[10px]">
        {onePart && onePart.parts_imgs.length > 0 && (
          <p className="hmli text-[17px]">ატვირთული ფოტოები</p>
        )}

        <div
          className={`grid grid-cols-4 max-xl:grid-cols-3 max-sm:grid-cols-2 gap-4 items-center ${
            loader ? "pointer-events-none" : ""
          }`}
        >
          {onePart &&
            onePart.parts_imgs.map((item) => (
              <div
                key={item.id}
                className={`group shadow-md shadow-[#3d7294] rounded-[8px] overflow-hidden bg-[#182540] relative flex items-center h-32 w-full`}
              >
                <div className="relative flex items-center w-full h-full gap-2 max-sm:flex-col">
                  <Image
                    src={`${process.env.NEXT_PUBLIC_API_URL}/${item.url}`}
                    alt={""}
                    sizes="500px"
                    fill
                    style={{
                      objectFit: "cover",
                    }}
                  />
                </div>
                <div
                  className="rounded-full absolute group-hover:flex max-lg:flex top-[7px] right-[10px] w-8 h-8 bg-[#21335a] cursor-pointer hidden items-center justify-center"
                  onClick={() => {
                    DeleteImgBack(item.id);
                  }}
                >
                  <AiOutlineClose className="text-gray-100 text-2xl" />
                </div>
              </div>
            ))}
        </div>
        <p className="text-[17px]">ატვირთე ფოტო</p>
        <MultiImgUploader inputName={"parts_imgs"} />
      </div>
      <div className="w-full shadow-md shadow-[#3d7294] bg-[#0e1420] text-white rounded-[10px] flex flex-col gap-y-[20px] px-[20px] py-[30px] max-sm:px-[10px]">
        <div className="flex items-center justify-between max-sm:flex-col max-sm:items-start max-sm:gap-y-[10px]">
          <p>სრული ფასი</p>
          <div className="w-[400px] gap-[10px] flex items-center max-sm:w-full">
            <div className="w-[calc(100%-115px)] h-[40px]">
              <Input2
                name="price"
                setAllValues={setAllValues}
                digit={true}
                firstValue={onePart?.price}
              />
            </div>
            <Toggle2value
              name="currency"
              setAllValues={setAllValues}
              firstValue={onePart?.currency ? onePart?.currency : "ლარი"}
              title1="ლარი"
              title2="დოლარი"
            />
          </div>
        </div>
      </div>
      <AddContact
        setAllValues={setAllValues}
        isService={false}
        data={onePart}
      />
      <AddValuableServs
        name="service_term"
        name1="service_id"
        values={allValues}
        setAllValues={setAllValues}
        firstValue={onePart?.service_term}
        firstValue1={onePart?.service_id}
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
            რედაქტირება
          </button>
        )}
      </div>
    </form>
  );
}
