import React from "react";
export default function LoaderCust() {
  return (
      <div
        className="inline-block h-[80%] w-[80%] animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
        role="status"
      ></div>
  );
}
