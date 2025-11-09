"use client";

import TrendingNFTCarousel from "@/features/dashboard/components/TrendingNFT";
import TrendingNFT from "@/features/dashboard/components/TrendingNFT";
import TrendingYappers from "@/features/dashboard/components/TrendingYappers";

export default function Page() {
  return (
    <div className="min-h-screen pb-10 bg-purple-200">
      <NavigationMenu />
      <div className={`flex gap-5 justify-center pl-4 pr-4 pt-2`}>
        <div className={` w-3/4 space-y-8`}>
          {/* Trending NFT components */}
          <TrendingNFTCarousel />
          <div className={"flex flex-col"}>
            <h1 className={` font-press text-2xl`}>Trending Yappers</h1>
            <TrendingYappers />
          </div>
        </div>
        <div
          className={`sticky top-16 bg-red-400 border border-black rounded-2xl w-1/4 h-[33  rem] shadow-[10px_10px_0px_0_rgba(0,0,0,1)]`}
        >
          {/* collection */}
        </div>
      </div>
    </div>
  );
}

const NavigationMenu = () => {
  return (
    <div
      className={
        "fixed top-20 left-10 size-20 flex justify-center items-center border border-black bg-white z-[99] clip-path-menu transition-all transition-duration-500"
      }
    >
      <div
        className={`size-10 rounded-full border border-black   active:scale-75 hover:scale-110 transition-all duration-300`}
      ></div>
    </div>
  );
};
