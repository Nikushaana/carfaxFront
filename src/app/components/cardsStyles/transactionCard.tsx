import { useContext } from "react";

export default function TransactionCard({ item }) {
  return (
    <div className="flex items-center rounded-[8px] justify-around shadow shadow-[#3d7294] bg-[#1f2738] h-[40px] min-w-[560px]">
      <p className="w-[10%] flex justify-center">{item.id}</p>
      <p className="w-[20%] flex justify-center">ჩარიცხვა</p>
      <p className="w-[25%] flex justify-center">4018869</p>
      <div className="w-[20%] flex justify-center">
        {/* {userChooseCurrency === "USD"
          ? item.currency === "USD"
            ? `${item.amount} $`
            : `${Math.round(item.amount / currency.rate)} $`
          : item.currency === "USD"
          ? `${Math.round(item.amount * currency.rate)} ₾`
          : `${item.amount} ₾`} */}{item.amount}₾
      </div>
      <p className="w-[25%] flex justify-center">{item.date}</p>
    </div>
  );
}
