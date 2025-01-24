import React from "react";

import { getServerSideOneCar } from "../../../../useContexts/getServerSide/getData";
import OneCar from "../../components/onePages/oneCar/oneCar";

export default async function Page({ params }: { params: { carsId: string } }) {
  const oneCarData = await getServerSideOneCar(params.carsId);

  return (
    <div>
      <OneCar data={oneCarData} />
    </div>
  );
}
