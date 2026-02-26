import Image from "next/image";
import React, { useRef, useState } from "react";
import {
  Background,
  Badge,
  Circles,
  DiscoverButton,
  HeaderText,
  InventoryCore,
  Line,
  Navigation,
  Vector,
} from "../components";
import gsap from "gsap";
import dynamic from "next/dynamic";
import { useGSAP } from "@gsap/react";
const Character = dynamic(
  () => import("@/features/landingPage/components/Character"),
  {
    ssr: false,
  }
);

gsap.registerPlugin(ScrollTrigger, useGSAP);

const HeroSection = () => {
  const menuRef = useRef<HTMLDivElement>(null);
  const { contextSafe } = useGSAP({ scope: menuRef });
  const [isMenuClicked, setIsMenuClicked] = useState(false);

  const handleZoom = () => {
    let tl = gsap.timeline();
    let menus = gsap.utils.toArray(".menu");
    tl.to(menus, {
      duration: 0.7,
      scale: 1.3,
      rotate: 10,
      boxShadow: "0px 8px 32px 0px rgba(0,0,0,0.25)",
      filter: "blur(0px)",
      ease: "elastic.out(1, 0.5)",
      stagger: { each: 0.15, from: "center" },
    });
    tl.to(
      ".logo",
      {
        duration: 0.5,
        background: "linear-gradient(90deg, #000 0%, #333 100%)",
        rotate: 5,
        boxShadow: "0px 4px 24px 0px rgba(0,0,0,0.15)",
        ease: "power2.out",
      },
      "<"
    );
    tl.to(
      menus,
      {
        color: "#fff",
        textShadow: "0 2px 8px #000",
        ease: "power1.inOut",
      },
      "<"
    );
  };

  const handleZoomOut = () => {
    let tl = gsap.timeline();
    let menus = gsap.utils.toArray(".menu");
    tl.to(menus, {
      duration: 0.5,
      color: "#000",
      scale: 1,
      rotate: 0,
      boxShadow: "none",
      filter: "blur(0px)",
      textShadow: "none",
      ease: "power2.inOut",
      stagger: { each: 0.1, from: "center" },
    });
    tl.to(
      ".logo",
      {
        duration: 0.5,
        background: "transparent",
        rotate: 0,
        boxShadow: "none",
        ease: "power2.inOut",
      },
      "<"
    );
  };

  // is menu click
  useGSAP(() => {
    const tl = gsap.timeline();
    tl.to(menuRef.current, {
      scale: 0.8,
      duration: 0.3,
    });
    tl.to(menuRef.current, {
      scale: 1,
      duration: 0.3,
    });
  }, [isMenuClicked]);

  return (
    <main
      id="section-1"
      className=" relative bg-white w-full h-screen flex flex-col items-center justify-center m-auto    max-w-screen-2xl   overflow-hidden z-[90] "
    >
      <Line className="absolute xl:right-7 xl:bottom-7 right-3 bottom-0 line-animation sm:block hidden " />
      <Badge />
      <HeaderText className="absolute font-press text-[3vw] xl:top-3 top-4 sm:translate-x-[-3rem]   xl:scale-100 lg:scale-90 scale-50  ravo " />
      <Background className="animation-behind animation absolute" />
      {/* <Character /> */}
      {/* <div className={"size-[40rem] absolute"}>
              <Image
                alt="testing"
              fill={true}
                className="object-contain"
                src={images[0]}
              />
            </div> */}
      <Circles />

      <div
        ref={menuRef}
        onMouseEnter={handleZoom}
        onMouseLeave={handleZoomOut}
        onClick={() => setIsMenuClicked((x) => !x)}
        className="logo sm:flex hidden absolute left-0 px-2 origin-center flex-col gap-2  text-center cursor-pointer select-none "
      >
        {Array.from({ length: 5 }, (_, i) => {
          const text = ["M", "E", "N", "U"];
          return (
            <span className=" font-inter font-bold menu" key={i}>
              {text[i]}
            </span>
          );
        })}
      </div>
      <InventoryCore />

      <Image
        alt=""
        src={`/strip.png`}
        style={{ width: "auto", height: "auto" }}
        width={100}
        height={100}
        className="absolute strip left-20 bottom-10"
      />

      <Image
        alt=""
        src={`/bottom-character.png`}
        width={450}
        height={450}
        className="absolute bottom-animation origin-bottom-left sm:bottom-0 bottom-10 -translate-x-5 "
      />
      <Vector />
      <DiscoverButton />
      <Navigation />
    </main>
  );
};

export default HeroSection;
