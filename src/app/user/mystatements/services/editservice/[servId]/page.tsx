"use client";

import React, { useContext, useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { BsXLg } from "react-icons/bs";
import { FaRegTrashCan } from "react-icons/fa6";
import { AxiosForSharingStatesAxiosContext } from "../../../../../../../useContexts/sharedStates";
import { axiosUser } from "../../../../../../../useContexts/AxiosClient/AxiosClient";
import DropDown2valueSearch from "../../../../../components/DropDowns/DropDown2valueSearch";
import DropDown1ValSearch from "../../../../../components/DropDowns/DropDown1ValSearch";
import Input2 from "../../../../../components/Inputs/Input2";
import CustMap from "../../../../../components/customMap/CustMap";
import TextArea1 from "../../../../../components/Inputs/TextArea1";
import MultiVidUploader from "../../../../../components/imgVidUpload/MultiVidUploader";
import { AiOutlineClose } from "react-icons/ai";
import MultiImgUploader from "../../../../../components/imgVidUpload/MultiImgUploader";
import AddContact from "../../../../../components/user/AddContact";
import AddValuableServs from "../../../../../components/user/AddValuableServs";
import LoaderCust from "../../../../../components/loader/LoaderCust";

export default function Page({ params }: { params: { servId: string } }) {
  const router = useRouter();
  const { servicetype, adress, setAlertShow, setAlertStatus, setAlertText } =
    useContext(AxiosForSharingStatesAxiosContext);
  const [loader, setLoader] = useState(false);
  const [oneServ, setOneServ] = useState<any>();
  const [oneServRender, setOneServRender] = useState<any>();

  const [allValues, setAllValues] = useState<any>({
    services: "",
    location: [],
    description: "",
    servcenterName: "",
    phone: "",
    vip: 0,
  });

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
  useEffect(() => {
    setLoader(true);
    axiosUser
      .get(`user/Servcenters/${params.servId}`)
      .then((res) => {
        setOneServ(res.data);
        setAllValues((pre) => ({ ...pre, location: res.data.location }));
        setAllValues((pre) => ({
          ...pre,
          services: res.data.services,
        }));
      })
      .catch((err) => {})
      .finally(() => {
        setLoader(false);
      });
  }, [params.servId, oneServRender]);

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

  const UpdateServ = (e) => {
    setLoader(true);
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);

    formData.append("services", JSON.stringify(allValues.services));
    formData.append("location", JSON.stringify(allValues.location));
    if (allValues.vip) {
      formData.append("vip", allValues.vip);
    }
    formData.delete("adress");
    formData.delete("phone");
    formData.append("phone", allValues.phone);

    axiosUser
      .post(`user/Servcenters/${params.servId}`, formData)
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
        setAlertText("სერვისი რედაქტირდა");
      })
      .catch((error) => {
        setAlertShow(true);
        setAlertStatus(true);
        setAlertText("სერვისი ვერ რედაქტირდა!");
      })
      .finally(() => {
        setLoader(false);
      });
  };

  const DeleteImgBack = (id) => {
    setLoader(true);
    axiosUser
      .delete(`user/ServcentersImage/${id}`)
      .then((res) => {
        DeleteImgFront(id);
        setOneServRender(res);
      })
      .catch((err) => {
        setLoader(false);
      })
      .finally(() => {});
  };
  const DeleteImgFront = (id) => {
    const newData = { ...oneServ };

    newData.servcenters_imgs = newData.servcenters_imgs.filter(
      (item) => item.id !== id
    );
    setOneServ(newData);
  };

  const DeleteVideoBack = (id) => {
    axiosUser
      .delete(`user/ServcentersVideo/${id}`)
      .then((res) => {
        DeleteVideoFront(id);
        setOneServRender(res);
      })
      .catch((err) => {})
      .finally(() => {
        setLoader(false);
      });
  };
  const DeleteVideoFront = (id) => {
    const newData = { ...oneServ };

    newData.servcenters_videos = newData.servcenters_videos.filter(
      (item) => item.id !== id
    );
    setOneServ(newData);
  };

  return (
    <div className="w-full flex flex-col gap-7 text-white">
      <form
        onSubmit={UpdateServ}
        encType="multipart/form-data"
        className={`flex flex-col gap-7 ${loader && "pointer-events-none"}`}
      >
        <h1 className="text-[22px] hidden max-lg:flex">სერვისის დამატება</h1>
        <div className="w-full shadow-md shadow-[#3d7294] bg-[#0e1420] text-white rounded-[10px] flex flex-col gap-y-[20px] px-[20px] py-[30px] max-sm:px-[10px]">
          <div className="flex items-center justify-between max-sm:flex-col max-sm:items-start max-sm:gap-y-[10px]">
            <p className="hmli text-[17px]">სერვისები</p>
            <div className="w-[300px] h-[40px] max-sm:w-full">
              <DropDown2valueSearch
                data={servicetype}
                name="services"
                setAllValues={setAllValues}
                placeholder="სერვისი"
                firstValue={oneServ?.services}
              />
            </div>
          </div>
        </div>
        <div className="w-full shadow-md shadow-[#3d7294] bg-[#0e1420] text-white rounded-[10px] flex flex-col gap-y-[20px] px-[20px] py-[30px] max-sm:px-[10px]">
          <p className="hmli text-[17px]">მისამართები</p>

          <div className="flex flex-col gap-y-[20px]">
            <div className="flex flex-col gap-y-[10px]">
              <div className="flex items-end gap-[20px] w-full">
                <div className="grid grid-cols-2 gap-[10px] w-[calc(100%-200px)]">
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
              <div className="bg-gray-200 w-full h-[200px] overflow-hidden rounded-[8px]">
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

            {allValues.location?.map((item, index) => (
              <div key={item.id} className="flex flex-col gap-y-[10px]">
                <div className="grid grid-cols-2 gap-[20px]">
                  <div className="flex gap-[10px] w-full items-center">
                    <p className="w-[40px] h-[40px] shadow shadow-[#3d7294] rounded-[10px] flex items-center justify-center">
                      {index + 1}#
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
            <TextArea1
              name="description"
              setAllValues={setAllValues}
              firstValue={oneServ?.description}
            />
          </div>
        </div>
        <div className="w-full shadow-md shadow-[#3d7294] bg-[#0e1420] text-white rounded-[10px] flex flex-col gap-y-[20px] px-[20px] py-[30px] max-sm:px-[10px]">
          {oneServ && oneServ.servcenters_videos.length > 0 && (
            <p className="hmli text-[17px]">ატვირთული ვიდეობი</p>
          )}
          <div
            className={`grid grid-cols-4 max-xl:grid-cols-3 max-sm:grid-cols-2 gap-4 ${
              loader ? "pointer-events-none" : ""
            }`}
          >
            {oneServ &&
              oneServ.servcenters_videos &&
              oneServ.servcenters_videos.map((item) => (
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
          <p className="hmli text-[17px]">ატვირთე ვიდეო</p>
          <MultiVidUploader inputName={"servcenters_videos"} />
          {oneServ && oneServ.servcenters_imgs.length > 0 && (
            <p className="hmli text-[17px]">ატვირთული ფოტოები</p>
          )}

          <div
            className={`grid grid-cols-4 max-xl:grid-cols-3 max-sm:grid-cols-2 gap-4 items-center ${
              loader ? "pointer-events-none" : ""
            }`}
          >
            {oneServ &&
              oneServ.servcenters_imgs.map((item) => (
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
          <p className="hmli text-[17px]">ატვირთე ფოტო</p>
          <MultiImgUploader inputName={"servcenters_imgs"} />
        </div>
        <AddContact
          setAllValues={setAllValues}
          isService={true}
          data={oneServ}
        />
        <AddValuableServs
          setAllValues={setAllValues}
          firstValue={oneServ?.vip}
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
              რედაქტირება
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
