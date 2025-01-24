import React from "react";

import { getServerSideOneService } from "../../../../useContexts/getServerSide/getData";
import OneService from "../../components/onePages/oneService/oneService";

export default async function Page({ params }: { params: { servId: string } }) {
  const oneServiceData = await getServerSideOneService(params.servId);

  return (
    <div>
      <OneService data={oneServiceData} />
    </div>
  );
}
