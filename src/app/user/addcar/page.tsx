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
    FirmsData,
    ModelsData,
  } = useContext(AxiosForSharingStatesAxiosContext);

  const [loader, setLoader] = useState(false);

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

  const UploadCar = (e) => {
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
      .post("user/car", formData)
      .then((res) => {
        setAlertShow(true);
        setAlertStatus(true);
        setAlertText("მანქანა დაემატა");
        router.push("/user/mystatements/cars");
      })
      .catch((error) => {
        setAlertShow(true);
        setAlertStatus(false);
        if (allValues.vin === "") {
          setAlertText("VIN-ის შევსება აუცილებელია");
        }
        if (allValues.price === "") {
          setAlertText("ფასის შევსება აუცილებელია");
        }
        if (allValues.vin && allValues.price) {
          setAlertText("მანქანა ვერ დაემატა");
        }
      })
      .finally(() => {
        setLoader(false);
      });
  };

  return (
    <form
      onSubmit={UploadCar}
      encType="multipart/form-data"
      className={`flex flex-col gap-7 ${loader && "pointer-events-none"}`}
    >
      <h1 className="text-[22px] hidden max-lg:flex text-white">
        ავტომობილის დამატება
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
              />
            </div>
            <Toggle2value
              name="name"
              setAllValues={setAllValues}
              firstValue="კმ"
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
            />
          </div>
        </div>
        <div className="flex items-center justify-between max-sm:flex-col max-sm:items-start max-sm:gap-y-[10px]">
          <p>VIN *</p>
          <div className="w-[300px] h-[40px] max-sm:w-full">
            <Input2 name="vin" setAllValues={setAllValues} />
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
            firstValue="არა"
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
        />
      </div>

      <div className="w-full shadow-md shadow-[#3d7294] bg-[#0e1420] text-white rounded-[10px] flex flex-col gap-y-[20px] px-[20px] py-[30px] max-sm:px-[10px]">
        <p className="text-[17px]">აღწერილობა</p>

        <div className="flex flex-col gap-[10px]">
          <p>ქართულად</p>
          <TextArea1 name="description" setAllValues={setAllValues} />
        </div>
      </div>
      <div className="w-full shadow-md shadow-[#3d7294] bg-[#0e1420] text-white rounded-[10px] flex flex-col gap-y-[20px] px-[20px] py-[30px] max-sm:px-[10px]">
        <p className="text-[17px]">ატვირთე ვიდეო</p>
        <MultiVidUploader inputName={"cars_videos"} />
        <p className="text-[17px]">ატვირთე ფოტო</p>
        <MultiImgUploader inputName={"cars_imgs"} />
      </div>
      <div className="w-full shadow-md shadow-[#3d7294] bg-[#0e1420] text-white rounded-[10px] flex flex-col gap-y-[20px] px-[20px] py-[30px] max-sm:px-[10px]">
        <div className="flex items-center justify-between max-sm:flex-col max-sm:items-start max-sm:gap-y-[10px]">
          <p>სრული ფასი *</p>
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
