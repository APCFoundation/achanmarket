"use client";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Link from "next/link";
const Menu = ({ isMenuClicked }: { isMenuClicked: boolean }) => {
  useGSAP(() => {
    gsap.to(".navigation", {
      x: isMenuClicked ? 0 : "100%",
      ease: "power2.inOut",
      duration: 0.5,
    });

    gsap.to(".green-line", {
      ease: "power2.inOut",
      duration: 0.5,
      x: isMenuClicked ? "-1000%" : "100%",
    });
  }, [isMenuClicked]);
  return (
    <div>
      {/* <GreenLine isMenuClicked={isMenuClicked} /> */}
      <div
        id="navigation"
        className="navigation fixed top-0 bottom-0 right-0 translate-x-[100%] w-1/3 h-full z-[99] pointer-events-auto flex  justify-center"
        style={{
          background: "black",
          // Sisi kiri miring: kiri atas turun sedikit, kiri bawah naik sedikit
          clipPath: "polygon(5% 0, 100% 0%, 100% 100%, 0 100%)",
          boxShadow: "0 0 32px 0 rgba(0,0,0,0.3)",
        }}
      >
        <div className="flex w-full justify-center items-center flex-col gap-3 mt-32 h-fit">
          {Array(4)
            .fill(0)
            .map((_, index) => {
              let menuText = ["Launch App", "Docs", "Contact", "Roadmap"];
              let url = ["/dashboard", "/docs", "/contact", "/roadmap"];
              return (
                <Link
                  href={`${url[index].toLowerCase()}`}
                  className={
                    "text-[1.8rem] font-bold text-gray-500 hover:text-gray-400 cursor-pointer"
                  }
                  key={index}
                >
                  {menuText[index]}
                </Link>
              );
            })}
        </div>
      </div>
    </div>
  );
};

const GreenLine = ({ isMenuClicked }: { isMenuClicked: boolean }) => {
  return (
    <div
      style={{
        // Sisi kiri miring: kiri atas turun sedikit, kiri bawah naik sedikit
        clipPath: "polygon(50% 0, 100% 0%, 100% 100%, 0 100%)",
        boxShadow: "0 0 32px 0 rgba(0,0,0,0.3)",
      }}
      className={`green-line bg-lime-400 w-[3rem] h-full fixed translate-x-[100%] top-0 bottom-0 ${
        isMenuClicked ? "right-0" : "right-0"
      } z-[99]`}
    ></div>
  );
};
export default Menu;
