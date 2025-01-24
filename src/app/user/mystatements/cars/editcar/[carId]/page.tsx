"use client";

import React, { useContext, useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { AiOutlineClose } from "react-icons/ai";
import { BsXLg } from "react-icons/bs";
import { AxiosForSharingStatesAxiosContext } from "../../../../../../../useContexts/sharedStates";
import { axiosUser } from "../../../../../../../useContexts/AxiosClient/AxiosClient";
import DropDown1ValSearch from "../../../../../components/DropDowns/DropDown1ValSearch";
import Input2 from "../../../../../components/Inputs/Input2";
import Toggle2value from "../../../../../components/toggle2value/toggle2value";
import MappedButtons from "../../../../../components/mappedbuttons/mappedbuttons";
import TextArea1 from "../../../../../components/Inputs/TextArea1";
import MultiVidUploader from "../../../../../components/imgVidUpload/MultiVidUploader";
import MultiImgUploader from "../../../../../components/imgVidUpload/MultiImgUploader";
import AddContact from "../../../../../components/user/AddContact";
import AddValuableServs from "../../../../../components/user/AddValuableServs";
import LoaderCust from "../../../../../components/loader/LoaderCust";

export default function Page({ params }: { params: { carId: string } }) {
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
    FirmsData,
    ModelsData,
  } = useContext(AxiosForSharingStatesAxiosContext);

  const [loader, setLoader] = useState(false);
  const [oneCar, setOneCar] = useState<any>();
  const [oneCarRender, setOneCarRender] = useState<any>();

  const [allValues, setAllValues] = useState<any>({
    moreInfoBtn: [{ id: "", name: "" }],
    // checked: "",
    // driveShaft: "",
    // view: "",
    color: "",
    country: "",
    currency: "",
    cylinders: "",
    description: "",
    engine: "",
    firm: "",
    leather: "",
    metersRun: "",
    model: "",
    name: "",
    o_city: "",
    o_name: "",
    o_phone: "",
    petrol: "",
    price: "",
    pullingWheels: "",
    salonColor: "",
    status: "",
    transmission: "",
    vehicleType: "",
    vin: "",
    weel: "",
    year: "",

    service_term: "",
    service_id: "",
  });

  useEffect(() => {
    setLoader(true);
    axiosUser
      .get(`user/car/${params.carId}`)
      .then((res) => {
        setOneCar(res.data);
      })
      .catch((err) => {})
      .finally(() => {
        setLoader(false);
      });
  }, [params.carId, oneCarRender]);

  const UpdateCar = (e) => {
    setLoader(true);

    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);

    formData.append("firm", allValues.firm);
    formData.append("model", allValues.model);
    formData.append("vehicleType", allValues.vehicleType);
    formData.append("engine", allValues.engine);
    formData.append("cylinders", allValues.cylinders);
    formData.append("transmission", allValues.transmission);
    formData.append("weel", allValues.weel);
    formData.append("name", allValues.name);
    formData.append("petrol", allValues.petrol);
    formData.append("pullingWheels", allValues.pullingWheels);
    formData.append("year", allValues.year);
    formData.append("country", allValues.country);

    formData.append("color", allValues.color);
    formData.append("salonColor", allValues.salonColor);
    formData.append("leather", allValues.leather);
    if (allValues.status == "კი") {
      formData.append("status", "1");
    }
    if (allValues.status == "არა") {
      formData.append("status", "0");
    }
    if (allValues.moreInfoBtn.find((item: any) => item == "ლუქი")) {
      formData.append("Hatch", "true");
    } else {
      formData.append("Hatch", "false");
    }
    if (allValues.moreInfoBtn.find((item: any) => item == "პანორამა")) {
      formData.append("Panorama", "true");
    } else {
      formData.append("Panorama", "false");
    }
    if (allValues.moreInfoBtn.find((item: any) => item == "მულტიმედია")) {
      formData.append("multimedia", "true");
    } else {
      formData.append("multimedia", "false");
    }
    if (allValues.moreInfoBtn.find((item: any) => item == "კამერა")) {
      formData.append("camera", "true");
    } else {
      formData.append("camera", "false");
    }
    formData.append("currency", allValues.currency);

    formData.delete("o_phone");
    formData.append("o_phone", allValues.o_phone);
    formData.append("o_city", allValues.o_city);

    if (allValues.service_id && allValues.service_term) {
      formData.append("service_id", allValues.service_id);
    }
    formData.append("service_term", allValues.service_term || 0);

    axiosUser
      .post(`user/car/${params.carId}`, formData)
      .then((res) => {
        setAlertShow(true);
        setAlertStatus(true);
        setAlertText("მანქანა რედაქტირდა");
        router.push("/user/mystatements/cars");
      })
      .catch((error) => {
        setAlertShow(true);
        setAlertStatus(false);
        setAlertText("მანქანა ვერ რედაქტირდა!");
      })
      .finally(() => {
        setLoader(false);
      });
  };

  const DeleteImgBack = (id) => {
    setLoader(true);
    axiosUser
      .delete(`user/carImage/${id}`)
      .then((res) => {
        DeleteImgFront(id);
        setOneCarRender(res);
      })
      .catch((err) => {
        setLoader(false);
      })
      .finally(() => {});
  };
  const DeleteImgFront = (id) => {
    const newData = { ...oneCar };

    newData.cars_imgs = newData.cars_imgs.filter((item) => item.id !== id);
    setOneCar(newData);
  };

  const DeleteVideoBack = (id) => {
    axiosUser
      .delete(`user/carVideo/${id}`)
      .then((res) => {
        DeleteVideoFront(id);
        setOneCarRender(res);
      })
      .catch((err) => {})
      .finally(() => {
        setLoader(false);
      });
  };
  const DeleteVideoFront = (id) => {
    const newData = { ...oneCar };

    newData.cars_videos = newData.cars_videos.filter((item) => item.id !== id);
    setOneCar(newData);
  };

  return (
    <form
      onSubmit={UpdateCar}
      encType="multipart/form-data"
      className={`flex flex-col gap-7 ${loader && "pointer-events-none"}`}
    >
      <h1 className="text-[22px] hidden max-lg:flex text-white">
        ავტომობილის რედაქტირება
      </h1>
      <div className="w-full shadow-md shadow-[#3d7294] bg-[#0e1420] text-white rounded-[10px] flex flex-col gap-y-[20px] px-[20px] py-[30px] max-sm:px-[10px]">
        <p className="text-[17px]">დეტალური ინფორმაცია</p>
        <div className="flex items-center justify-between max-sm:flex-col max-sm:items-start max-sm:gap-y-[10px]">
          <p>მწარმოებელი</p>
          <div className="w-[300px] h-[40px] max-sm:w-full">
            <DropDown1ValSearch
              name="firm"
              setAllValues={setAllValues}
              data={FirmsData}
              placeholder="მწარმოებელი"
              searchable={true}
              firstValue={oneCar?.firm}
            />
          </div>
        </div>
        <div className="flex items-center justify-between max-sm:flex-col max-sm:items-start max-sm:gap-y-[10px]">
          <p>მოდელი</p>
          <div
            className={`w-[300px] h-[40px] max-sm:w-full ${
              !allValues?.firm && "pointer-events-none"
            }`}
          >
            <DropDown1ValSearch
              name="model"
              setAllValues={setAllValues}
              data={ModelsData.filter((model) =>
                FirmsData.filter((firm) => allValues?.firm?.includes(firm.name))
                  .map((firm) => firm.id)
                  .includes(model.firm_id)
              )}
              placeholder="მოდელი"
              searchable={true}
              firstValue={oneCar?.model}
            />
          </div>
        </div>
        <div className="flex items-center justify-between max-sm:flex-col max-sm:items-start max-sm:gap-y-[10px]">
          <p>კატეგორია</p>
          <div className="w-[300px] h-[40px] max-sm:w-full">
            <DropDown1ValSearch
              name="vehicleType"
              setAllValues={setAllValues}
              data={vehicleType}
              placeholder="კატეგორია"
              searchable={true}
              firstValue={oneCar?.vehicleType}
            />
          </div>
        </div>
        <div className="flex items-center justify-between max-sm:flex-col max-sm:items-start max-sm:gap-y-[10px]">
          <p>ძრავის მოცულობა</p>
          <div className="w-[300px] h-[40px] max-sm:w-full">
            <DropDown1ValSearch
              name="engine"
              setAllValues={setAllValues}
              data={engine}
              placeholder="ძრავის მოცულობა"
              searchable={true}
              firstValue={oneCar?.engine}
            />
          </div>
        </div>
        <div className="flex items-center justify-between max-sm:flex-col max-sm:items-start max-sm:gap-y-[10px]">
          <p>ცილინდრები</p>
          <div className="w-[300px] h-[40px] max-sm:w-full">
            <DropDown1ValSearch
              name="cylinders"
              setAllValues={setAllValues}
              data={cylinders}
              placeholder="ცილინდრები"
              searchable={true}
              firstValue={oneCar?.cylinders}
            />
          </div>
        </div>
        <div className="flex items-center justify-between max-sm:flex-col max-sm:items-start max-sm:gap-y-[10px]">
          <p>გადაცემათა კოლოფი</p>
          <div className="w-[300px] h-[40px] max-sm:w-full">
            <DropDown1ValSearch
              name="transmission"
              setAllValues={setAllValues}
              data={transmission}
              placeholder="გადაცემათა კოლოფი"
              searchable={true}
              firstValue={oneCar?.transmission}
            />
          </div>
        </div>
        <div className="flex items-center justify-between max-sm:flex-col max-sm:items-start max-sm:gap-y-[10px]">
          <p>საჭე</p>
          <div className="w-[300px] h-[40px] max-sm:w-full">
            <DropDown1ValSearch
              name="weel"
              setAllValues={setAllValues}
              data={weel}
              placeholder="საჭე"
              searchable={true}
              firstValue={oneCar?.weel}
            />
          </div>
        </div>
        <div className="flex items-center justify-between max-sm:flex-col max-sm:items-start max-sm:gap-y-[10px]">
          <p>გარბენი</p>
          <div className="w-[300px] gap-[10px] flex items-center max-sm:w-full">
            <div className="w-[calc(100%-115px)] h-[40px]">
              <Input2
                name="metersRun"
                setAllValues={setAllValues}
                digit={true}
                firstValue={oneCar?.metersRun}
              />
            </div>
            <Toggle2value
              name="name"
              setAllValues={setAllValues}
              firstValue={oneCar?.name ? oneCar.name : "კმ"}
              title1="კმ"
              title2="მილი"
            />
          </div>
        </div>
        <div className="flex items-center justify-between max-sm:flex-col max-sm:items-start max-sm:gap-y-[10px]">
          <p>საწვავის ტიპი</p>
          <div className="w-[300px] h-[40px] max-sm:w-full">
            <DropDown1ValSearch
              name="petrol"
              setAllValues={setAllValues}
              data={petrol}
              placeholder="საწვავის ტიპი"
              searchable={true}
              firstValue={oneCar?.petrol}
            />
          </div>
        </div>
        <div className="flex items-center justify-between max-sm:flex-col max-sm:items-start max-sm:gap-y-[10px]">
          <p>წამყვანი თვლები</p>
          <div className="w-[300px] h-[40px] max-sm:w-full">
            <DropDown1ValSearch
              name="pullingWheels"
              setAllValues={setAllValues}
              data={pullingWheels}
              placeholder="წამყვანი თვლები"
              searchable={true}
              firstValue={oneCar?.pullingWheels}
            />
          </div>
        </div>
        <div className="flex items-center justify-between max-sm:flex-col max-sm:items-start max-sm:gap-y-[10px]">
          <p>წელი</p>
          <div className="w-[300px] h-[40px] max-sm:w-full">
            <DropDown1ValSearch
              name="year"
              setAllValues={setAllValues}
              data={years}
              placeholder="წელი"
              searchable={true}
              firstValue={oneCar?.year}
            />
          </div>
        </div>
        <div className="flex items-center justify-between max-sm:flex-col max-sm:items-start max-sm:gap-y-[10px]">
          <p>მდებარეობა</p>
          <div className="w-[300px] h-[40px] max-sm:w-full">
            <DropDown1ValSearch
              name="country"
              setAllValues={setAllValues}
              data={adress}
              placeholder="მდებარეობა"
              searchable={true}
              firstValue={oneCar?.country}
            />
          </div>
        </div>
        <div className="flex items-center justify-between max-sm:flex-col max-sm:items-start max-sm:gap-y-[10px]">
          <p>ფერი</p>
          <div className="w-[300px] h-[40px] max-sm:w-full">
            <DropDown1ValSearch
              name="color"
              setAllValues={setAllValues}
              data={colors}
              placeholder="ფერი"
              searchable={true}
              firstValue={oneCar?.color}
            />
          </div>
        </div>
        <div className="flex items-center justify-between max-sm:flex-col max-sm:items-start max-sm:gap-y-[10px]">
          <p>სალონის ფერი</p>
          <div className="w-[300px] h-[40px] max-sm:w-full">
            <DropDown1ValSearch
              name="salonColor"
              setAllValues={setAllValues}
              data={colors}
              placeholder="სალონის ფერი"
              searchable={true}
              firstValue={oneCar?.salonColor}
            />
          </div>
        </div>
        <div className="flex items-center justify-between max-sm:flex-col max-sm:items-start max-sm:gap-y-[10px]">
          <p>სალონის მასალა</p>
          <div className="w-[300px] h-[40px] max-sm:w-full">
            <DropDown1ValSearch
              name="leather"
              setAllValues={setAllValues}
              data={leather}
              placeholder="სალონის მასალა"
              searchable={true}
              firstValue={oneCar?.leather}
            />
          </div>
        </div>
        <div className="flex items-center justify-between max-sm:flex-col max-sm:items-start max-sm:gap-y-[10px]">
          <p>VIN</p>
          <div className="w-[300px] h-[40px] max-sm:w-full">
            <Input2
              name="vin"
              setAllValues={setAllValues}
              firstValue={oneCar?.vin}
            />
          </div>
        </div>
        <div className="flex items-center justify-between max-tiny:flex-col max-tiny:items-start max-tiny:gap-y-[10px]">
          <div className="flex items-center gap-[10px]">
            <p className="flex items-center gap-[10px]">ვერიფიცირდეს</p>
            <div className="w-[20px] h-[20px] rounded-full overflow-hidden relative">
              <Image
                src={"/images/tllogo.webp"}
                alt={""}
                sizes="500px"
                fill
                style={{
                  objectFit: "cover",
                }}
              />
            </div>
            -ის მიერ?
          </div>
          <Toggle2value
            name="status"
            setAllValues={setAllValues}
            firstValue={oneCar?.status ? oneCar?.status : "არა"}
            title1="კი"
            title2="არა"
          />
        </div>
      </div>
      <div className="w-full shadow-md shadow-[#3d7294] bg-[#0e1420] text-white rounded-[10px] flex flex-col gap-y-[20px] px-[20px] py-[30px] max-sm:px-[10px]">
        <p className="text-[17px]">დამატებითი ინფორმაცია</p>
        <MappedButtons
          data={moreInfoBtn}
          name="moreInfoBtn"
          setAllValues={setAllValues}
          firstValue={oneCar}
        />
      </div>

      <div className="w-full shadow-md shadow-[#3d7294] bg-[#0e1420] text-white rounded-[10px] flex flex-col gap-y-[20px] px-[20px] py-[30px] max-sm:px-[10px]">
        <p className="text-[17px]">აღწერილობა</p>

        <div className="flex flex-col gap-[10px]">
          <p>ქართულად</p>
          <TextArea1
            name="description"
            setAllValues={setAllValues}
            firstValue={oneCar?.description}
          />
        </div>
      </div>
      <div className="w-full shadow-md shadow-[#3d7294] bg-[#0e1420] text-white rounded-[10px] flex flex-col gap-y-[20px] px-[20px] py-[30px] max-sm:px-[10px]">
        {oneCar && oneCar.cars_videos.length > 0 && (
          <p className="hmli text-[17px]">ატვირთული ვიდეობი</p>
        )}
        <div
          className={`grid grid-cols-4 max-xl:grid-cols-3 max-sm:grid-cols-2 gap-4 ${
            loader ? "pointer-events-none" : ""
          }`}
        >
          {oneCar &&
            oneCar.cars_videos &&
            oneCar.cars_videos.map((item) => (
              <div
                key={item.id}
                className="relative w-full h-32 bg-[#F0F5F7] rounded-[8px] overflow-hidden group"
              >
                <video
                  src={`${process.env.NEXT_PUBLIC_API_URL}/${item.url}`}
                  className="w-full h-full object-cover rounded-[6px]"
                  controls
                />
                <button
                  className="rounded-full absolute group-hover:flex max-lg:flex top-[7px] right-[10px] w-8 h-8 bg-[#21335a] cursor-pointer hidden items-center justify-center"
                  onClick={() => DeleteVideoBack(item.id)}
                >
                  <BsXLg />
                </button>
              </div>
            ))}
        </div>
        <p className="text-[17px]">ატვირთე ვიდეო</p>
        <MultiVidUploader inputName={"cars_videos"} />
        {oneCar && oneCar.cars_imgs.length > 0 && (
          <p className="hmli text-[17px]">ატვირთული ფოტოები</p>
        )}

        <div
          className={`grid grid-cols-4 max-xl:grid-cols-3 max-sm:grid-cols-2 gap-4 items-center ${
            loader ? "pointer-events-none" : ""
          }`}
        >
          {oneCar &&
            oneCar.cars_imgs.map((item) => (
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
        <MultiImgUploader inputName={"cars_imgs"} />
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
                firstValue={oneCar?.price}
              />
            </div>
            <Toggle2value
              name="currency"
              setAllValues={setAllValues}
              firstValue={oneCar?.currency ? oneCar?.currency : "ლარი"}
              title1="ლარი"
              title2="დოლარი"
            />
          </div>
        </div>
      </div>
      <AddContact setAllValues={setAllValues} isService={false} data={oneCar} />
      <AddValuableServs
        name="service_term"
        name1="service_id"
        values={allValues}
        setAllValues={setAllValues}
        firstValue={oneCar?.service_term}
        firstValue1={oneCar?.service_id}
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
