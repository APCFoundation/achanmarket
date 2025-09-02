import Link from "next/link";
import React from "react";

const Navigation = () => {
  return (
    <div className="navigation-animate  absolute flex font-bold  justify-center  w-[30rem] bg-white text-black">
      <Link
        href={"/"}
        className="py-5 px-5 transition-all duration-500 origin-bottom hover:bg-gray-300 cursor-pointer"
      >
        Home
      </Link>
      <Link
        href={"/whitepaper"}
        className="py-5 px-5 transition-all duration-500 origin-bottom hover:bg-gray-300 cursor-pointer"
      >
        Guide Book
      </Link>
      <Link
        href={"/setting"}
        className="py-5 px-5 transition-all duration-500 origin-bottom hover:bg-gray-300 cursor-pointer"
      >
        Setting
      </Link>
    </div>
  );
};

export default Navigation;
