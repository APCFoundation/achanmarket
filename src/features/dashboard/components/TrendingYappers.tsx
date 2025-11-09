import Link from "next/link";
import React from "react";

const TrendingYappers = () => {
  return (
    <div
      className={`mt-10 relative bg-yellow-200 w-full h-[25rem] border-2 border-black rounded-2xl shadow-[10px_10px_0px_0_rgba(0,0,0,1)] overflow-hidden`}
    >
      TrendingYappers
      <div className="w-full flex text-white ">
        <div className="bg-black w-[20rem] h-[5rem] flex items-center gap-3 px-2">
          <div className="rounded-full border border-white size-16"></div>
          <div className="flex flex-col text-sm">
            <div>Guar Emperor</div>
            <Link
              href={"https://x.com/guaremperor"}
              className={`text-xs hover:underline`}
            >
              @guaremperor
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrendingYappers;
