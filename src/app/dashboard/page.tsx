"use client";

import TrendingNFTCarousel from "@/features/dashboard/components/TrendingNFT";
import TrendingYappers from "@/features/dashboard/components/TrendingYappers";
import TopSection from "@/features/top-sections";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useRef, useState } from "react";
gsap.registerEffect(useGSAP);
export default function Page() {
  const topSectionRef = useRef<HTMLDivElement>(null);
  const isCollapsedRef = useRef<HTMLDivElement>(null);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const didMount = useRef(false);

  useGSAP(() => {
    if (!didMount.current) {
      didMount.current = true;
      return; // ⛔ Skip animasi di render pertama
    }
    const tl = gsap.timeline();

    if (isCollapsed) {
      tl.to(topSectionRef.current, {
        width: 0,
        display: "none",
        transformOrigin: "left",
        ease: "power2.out",
        duration: 2,
      });

      gsap.from(isCollapsedRef.current, {
        x: 100,
        opacity: 0,
        duration: 2,
      });
    } else {
      gsap.to(topSectionRef.current, {
        width: "25%",
        duration: 2,
        display: "block",
      });
    }
  }, [isCollapsed]);

  return (
    <div className="min-h-screen pb-10 bg-purple-200 transition-all">
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
        {isCollapsed && (
          <div
            onClick={() => setIsCollapsed(false)}
            ref={isCollapsedRef}
            className="size-10 absolute right-3 text-white bg-black border border-white flex justify-center items-center"
          >
            {"<<"}
          </div>
        )}
        <div
          ref={topSectionRef}
          className={`sticky top-16 bg-red-300 border  overflow-y-auto border-black rounded-2xl w-1/4 h-132 overflow-hidden shadow-[10px_10px_0px_0_rgba(0,0,0,1)] custom-scroll-top-sections  `}
        >
          <TopSection
            isCollapsed={isCollapsed}
            setIsCollapsed={setIsCollapsed}
          />
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
