"use client";

import { useContext, useState } from "react";
import { axiosUser } from "../../../../useContexts/AxiosClient/AxiosClient";
import AddValuableServs from "../../components/user/AddValuableServs";
import MultiImgUploader from "../../components/imgVidUpload/MultiImgUploader";
import MultiVidUploader from "../../components/imgVidUpload/MultiVidUploader";
import TextArea1 from "../../components/Inputs/TextArea1";
import AddContact from "../../components/user/AddContact";
import { AxiosForSharingStatesAxiosContext } from "../../../../useContexts/sharedStates";
import DropDown1ValSearch from "../../components/DropDowns/DropDown1ValSearch";
import Input2 from "../../components/Inputs/Input2";
import { FaRegTrashCan } from "react-icons/fa6";
import LoaderCust from "../../components/loader/LoaderCust";
import { useRouter } from "next/navigation";
import DropDown2valueSearch from "../../components/DropDowns/DropDown2valueSearch";
import CustMap from "../../components/customMap/CustMap";

export default function AddService() {
  const router = useRouter();
  const { servicetype, adress, setAlertShow, setAlertStatus, setAlertText } =
    useContext(AxiosForSharingStatesAxiosContext);

  const [allValues, setAllValues] = useState<any>({
    services: "",
    location: [],
    description: "",
    servcenterName: "",
    phone: "",

    service_term: "",
    service_id: "",
  });

  const [loader, setLoader] = useState(false);

  // Update the selected items

  const [addServLocation, setAddServLocation] = useState({
    id: 1,
    city: "",
    adress: "",
    latlng: {
      lat: 0,
      lng: 0,
    },
  });

  const HandleAddServAddress = () => {
    if (
      addServLocation.city &&
      addServLocation.adress &&
      addServLocation.latlng.lat &&
      addServLocation.latlng.lng
    ) {
      setAllValues((prev) => ({
        ...prev,
        location: [...prev.location, addServLocation],
      }));
      setAddServLocation((prev) => ({
        ...prev,
        id: prev.id + 1,
        city: "",
        adress: "",
        latlng: {
          lat: 0,
          lng: 0,
        },
      }));
    }
  };

  const HandleDeleteServAddress = (id) => {
    setAllValues((prev) => ({
      ...prev,
      location: prev.location.filter((info) => info.id !== id),
    }));
  };

  const UploadServ = (e) => {
    setLoader(true);
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);

    formData.append("services", JSON.stringify(allValues.services));
    formData.append("location", JSON.stringify(allValues.location));
    formData.delete("adress");
    formData.delete("phone");
    formData.append("phone", allValues.phone);

    if (allValues.service_id && allValues.service_term) {
      formData.append("service_id", allValues.service_id);
    }
    formData.append("service_term", allValues.service_term || 0);

    axiosUser
      .post("user/Servcenters", formData)
      .then((res) => {
        setAllValues({
          services: "",
          location: [],
          description: "",
          servcenterName: "",
          phone: "",
          vip: 0,
        });
        router.push("/user/mystatements/services");
        setAlertShow(true);
        setAlertStatus(true);
        setAlertText("სერვისი დაემატა");
      })
      .catch((error) => {
        setAlertShow(true);
        setAlertStatus(false);
        if (allValues.phone === "") {
          setAlertText("ტელეფონის ნომერის შევსება აუცილებელია");
        } else {
          setAlertText("სერვისი ვერ დაემატა!");
        }
      })
      .finally(() => {
        setLoader(false);
      });
  };

  return (
    <div className="w-full flex flex-col gap-7 text-white">
      <form
        onSubmit={UploadServ}
        encType="multipart/form-data"
        className={`flex flex-col gap-7 ${loader && "pointer-events-none"}`}
      >
        <h1 className="text-[22px] hidden max-lg:flex  text-white">
          სერვისის დამატება
        </h1>
        <div className="w-full shadow-md shadow-[#3d7294] bg-[#0e1420] text-white rounded-[10px] flex flex-col gap-y-[20px] px-[20px] py-[30px] max-sm:px-[10px]">
          <div className="flex items-center justify-between max-sm:flex-col max-sm:items-start max-sm:gap-y-[10px]">
            <p className="hmli text-[17px]">სერვისები</p>
            <div className="w-[300px] h-[40px] max-sm:w-full">
              <DropDown2valueSearch
                data={servicetype}
                name="services"
                placeholder="სერვისი"
                setAllValues={setAllValues}
              />
            </div>
          </div>
        </div>
        <div className="w-full shadow-md shadow-[#3d7294] bg-[#0e1420] text-white rounded-[10px] flex flex-col gap-y-[20px] px-[20px] py-[30px] max-sm:px-[10px]">
          <p className="text-[17px]">მისამართები</p>

          <div className="flex flex-col gap-y-[20px]">
            <div className="flex flex-col gap-y-[10px]">
              <div className="flex items-end max-tiny:flex-col gap-[20px] w-full">
                <div className="grid grid-cols-2 max-tiny:grid-cols-1 max-tiny:w-full gap-[10px] w-[calc(100%-200px)]">
                  <div className="w-full flex flex-col gap-[10px]">
                    <p>მისამართი</p>
                    <DropDown1ValSearch
                      name="city"
                      setAllValues={setAddServLocation}
                      data={adress}
                      placeholder="ქალაქი"
                      searchable={true}
                      render={allValues.location}
                    />
                  </div>
                  <div className="w-full flex flex-col gap-[10px]">
                    <p>მისამართი</p>
                    <div className=" h-[40px] w-full">
                      <Input2
                        name="adress"
                        placeholder="მისამართი"
                        render={allValues.location}
                        setAllValues={setAddServLocation}
                      />
                    </div>
                  </div>
                </div>
                <p
                  onClick={() => HandleAddServAddress()}
                  className="bg-[#216321] text-white
              hover:bg-[#177a17] duration-200 w-[180px] h-[45px] rounded-[10px] 
              cursor-pointer flex items-center justify-center"
                >
                  მისამართის დამატება
                </p>
              </div>

              <div className="bg-gray-200 w-full h-[300px] overflow-hidden rounded-[8px]">
                <CustMap
                  activeCenter={
                    addServLocation.city
                      ? adress.find(
                          (item) => item.name === addServLocation.city
                        ).latlng
                      : {
                          lat: 41.7151,
                          lng: 44.8271,
                        }
                  }
                  name="latlng"
                  setAllValues={setAddServLocation}
                />
              </div>
            </div>

            {allValues.location?.map((item) => (
              <div key={item.id} className="flex flex-col gap-y-[10px]">
                <div className="grid grid-cols-2 gap-[20px] w-full">
                  <div className="flex gap-[10px] w-full items-center">
                    <p className="w-[40px] h-[40px] shadow shadow-[#3d7294] rounded-[10px] flex items-center justify-center">
                      {item.id}#
                    </p>
                    <p
                      className="w-[calc(100%-50px)] rounded-[8px] h-[40px] 
                shadow-[#3d7294] bg-[#0e1420] text-white outline-none px-[5px] flex items-center shadow"
                    >
                      {item.city}
                    </p>
                  </div>
                  <div className="flex gap-[10px] w-full items-center">
                    <p
                      className="w-full rounded-[8px] h-[40px] 
              shadow-[#3d7294] bg-[#0e1420] text-white outline-none px-[5px] flex items-center shadow"
                    >
                      {item.adress}
                    </p>
                    <div
                      onClick={() => HandleDeleteServAddress(item.id)}
                      className="w-[20px] h-[40px] flex items-center justify-center duration-100 rounded-[10px] shrink-0 cursor-pointer text-red-500 hover:text-[18px]"
                    >
                      <FaRegTrashCan />
                    </div>
                  </div>
                </div>

                <div className="bg-gray-200 w-full h-[100px] overflow-hidden rounded-[8px] pointer-events-none">
                  <CustMap
                    activeCenter={
                      adress.find((data) => data?.name === item.city).latlng
                    }
                    activeMarkerPosition={item.latlng}
                  />
                </div>
              </div>
            ))}
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
          <p className="hmli text-[17px]">ატვირთე ვიდეო</p>
          <MultiVidUploader inputName={"servcenters_videos"} />
          <p className="hmli text-[17px]">ატვირთე ფოტო</p>
          <MultiImgUploader inputName={"servcenters_imgs"} />
        </div>
        <AddContact setAllValues={setAllValues} isService={true} />
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
              className="bg-[#0e1420] shadow-md shadow-[#3d7294]
              hover:bg-[#335f7a] duration-200 px-[40px] h-[50px] rounded-[10px] cursor-pointer flex items-center justify-center"
            >
              გამოქვეყნება
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
