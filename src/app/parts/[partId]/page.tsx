import React from "react";

import OnePart from "../../components/onePages/onePart/onePart";
import { getServerSideOnePart } from "../../../../useContexts/getServerSide/getData";

export default async function Page({ params }: { params: { partId: string } }) {
  const onePartData = await getServerSideOnePart(params.partId);

  return (
    <div>
      <OnePart data={onePartData} />
    </div>
  );
}

