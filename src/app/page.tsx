import FirstSection from "./components/mainpage/FirstSection";
import React, { useContext } from "react";
import Slider1 from "./components/sliders/Slider1";
import {
  getServerSideCars,
  getServerSideParts,
  getServerSideServices,
} from "../../useContexts/getServerSide/getData";

export default async function Page() {
  const cars = await getServerSideCars();
  const parts = await getServerSideParts();
  const services = await getServerSideServices();

  return (
    <div className="bg-[#040A1C] py-[150px] max-sm:py-[110px] px-[190px] max-xl:px-[100px] max-md:px-[50px] max-sm:px-[16px] flex flex-col gap-y-[50px]">
      <FirstSection />
      <Slider1 title="ავტომობილები" data={cars.data} loader={false} />
      <Slider1 title="ავტონაწილები" data={parts.data} loader={false} />
      <Slider1 title="სერვისები" data={services.data} loader={false} />
    </div>
  );
}
