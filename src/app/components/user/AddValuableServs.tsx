import { useEffect, useState } from "react";
import { useContext } from "react";
import { AxiosForSharingStatesAxiosContext } from "../../../../useContexts/sharedStates";
import DropDownNotAbs1ValSearch from "../DropDowns/DropDownNotAbs1ValSearch";
import { BsCheck } from "react-icons/bs";
import { axiosUser } from "../../../../useContexts/AxiosClient/AxiosClient";
import { ProductserviceAxiosContext } from "../../../../useContexts/ProductServicesAxios";

export default function AddValuableServs({
  name,
  name1,
  values,
  setAllValues,
  firstValue,
  firstValue1,
}: any) {
  const { days } = useContext(AxiosForSharingStatesAxiosContext);
  const { Productservice, ProductserviceLoader } = useContext(
    ProductserviceAxiosContext
  );

  const [valuableServInfo, setValuableServInfo] = useState({
    activeServ: "",
    DaysNum: "",
  });

  useEffect(() => {
    setAllValues({
      ...values,
      [name1]: valuableServInfo.activeServ,
      [name]: valuableServInfo.DaysNum,
    });
  }, [valuableServInfo.DaysNum, valuableServInfo.activeServ]);

  const [sum, setSum] = useState(0);

  useEffect(() => {
    setSum(
      parseInt(valuableServInfo.DaysNum) *
        Productservice.find((item2) => item2.id == valuableServInfo.activeServ)
          ?.price
    );
  }, [valuableServInfo.DaysNum, valuableServInfo.activeServ]);

  return (
    <div className="w-full shadow-md shadow-[#3d7294] bg-[#0e1420] rounded-[10px] flex flex-col gap-y-[20px] py-[30px] ">
      <p className="px-[20px] text-[17px] text-white">ფასიანი სერვისები</p>
      <div className="max-sm:overflow-x-scroll notShowScroll px-[20px]">
        {ProductserviceLoader ? (
          <p className="text-gray-400">იტვრთება..</p>
        ) : (
          Productservice.map((item) => (
            <div
              key={item.id}
              className={`flex justify-between items-center py-[20px] min-w-[530px] duration-150 `}
            >
              <div className="flex items-center gap-[30px]">
                <div
                  onClick={() => {
                    setValuableServInfo((pre) => ({
                      ...pre,
                      activeServ:
                        valuableServInfo.activeServ === item.id ? "" : item.id,
                    }));
                  }}
                  className={`w-[30px] h-[30px] rounded-full cursor-pointer duration-200 flex items-center justify-center ${
                    valuableServInfo.activeServ === item.id
                      ? "bg-white text-[30px] text-[green] "
                      : "bg-gray-500 text-[15px] text-gray-500"
                  }`}
                >
                  <BsCheck />
                </div>

                <p
                  onClick={() => {
                    setValuableServInfo((pre) => ({
                      ...pre,
                      activeServ:
                        valuableServInfo.activeServ === item.id ? "" : item.id,
                    }));
                  }}
                  className={`h-[35px] flex items-center w-[110px] justify-center rounded-[10px] shadow duration-100 ${
                    valuableServInfo.activeServ !== item.id
                      ? " text-gray-500 bg-[#113044]"
                      : "bg-[#3d7294] text-white"
                  }`}
                >
                  {item.name}
                </p>

                <div
                  className={`duration-100 ${
                    valuableServInfo.activeServ !== item.id
                      ? "pointer-events-none text-gray-500"
                      : "text-white"
                  }`}
                >
                  <p>1 დღე</p>
                  <p className="text-[17px]">{item.price}₾</p>
                </div>
                <div
                  className={`w-[130px] duration-100 ${
                    valuableServInfo.activeServ !== item.id &&
                    "pointer-events-none"
                  }`}
                >
                  <DropDownNotAbs1ValSearch
                    searchable={false}
                    data={days}
                    name="DaysNum"
                    placeholder="დღეები"
                    // firstValue={firstValue}
                    // firstValue={
                    //   valuableServInfo.activeServ === item.id ? firstValue : ""
                    // }
                    render={valuableServInfo.activeServ}
                    setAllValues={setValuableServInfo}
                  />
                </div>
              </div>

              <div
                className={`flex flex-col items-end duration-100 ${
                  valuableServInfo.activeServ !== item.id
                    ? "pointer-events-none text-gray-500"
                    : "text-white"
                }`}
              >
                <p>ჯამური ფასი</p>
                <p className="text-[18px]">
                  {valuableServInfo.activeServ === item.id ? sum || 0 : 0}₾
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
