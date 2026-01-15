"use client";
import Image from "next/image";
import gsap from "gsap";
import { useEffect, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import ScrollTrigger from "gsap/ScrollTrigger";
import {
  Backed,
  Badge,
  Circles,
  DiscoverButton,
  HeaderText,
  InventoryCore,
  Line,
  Menu,
  Navigation,
  Background,
  Vector,
} from "@/features/landingPage/components";
import dynamic from "next/dynamic";
import Chatbot from "@/features/landingPage/components/chatbot/Chatbot";
import { featureSection } from "./a";
import FooterSection from "./sections/FooterSection";
import FeaturesSections from "./sections/FeaturesSections";

const Character = dynamic(
  () => import("@/features/landingPage/components/Character"),
  {
    ssr: false,
  }
);
gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function LandingPage() {
  const initialText = "TEXT BERJALAN"; // Simpan teks awal
  const textIsHover = "YOU RIGHT"; // Simpan teks awal
  const [textScroll, setTextScroll] = useState(initialText);
  const [isMenuClicked, setIsMenuClicked] = useState<boolean>(false);
  const [intervalId, setIntervalId] = useState<number | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const { contextSafe } = useGSAP({ scope: menuRef });
  function requestText() {
    let alphabet = Array.from({ length: 26 }, (_, i) =>
      String.fromCharCode(97 + i)
    );
    let textSplit = textScroll.split("");
    let count = 0;

    return { alphabet, textSplit, count };
  }

  const handleEnter = () => {
    let { alphabet, count, textSplit } = requestText();

    const id = setInterval(() => {
      for (let i = 0; i < textSplit.length; i++) {
        const random = Math.floor(Math.random() * 26);
        textSplit[i] = alphabet[random].toUpperCase();
      }
      setTextScroll(textSplit.join(""));

      count++;
      if (count >= 10) {
        clearInterval(id);
        setTextScroll(textIsHover);
      }
    }, 100);
  };
  const handleLeave = () => {
    if (intervalId) clearInterval(intervalId); // Stop interval sebelumnya
    let { alphabet, count, textSplit } = requestText();

    const id = setInterval(() => {
      for (let i = 0; i < textSplit.length; i++) {
        const random = Math.floor(Math.random() * 26);
        textSplit[i] = alphabet[random].toUpperCase();
      }
      setTextScroll(textSplit.join(""));

      count++;
      if (count >= 10) {
        // Setelah 5 kali random, kembalikan teks ke awal
        clearInterval(id);
        setTextScroll(initialText);
      }
    }, 100);
  };

  const handleClickMenu = contextSafe(() => {
    if (!isMenuClicked) {
      setIsMenuClicked(true);
      gsap.to(".navigation", {
        x: 0,
        duration: 0.5,
      });
    } else {
      setIsMenuClicked(false);
      gsap.to(".navigation", {
        x: 200,
        duration: 0.5,
      });
    }
  });

  useGSAP(() => {
    gsap.from(".ravo", {
      duration: 1,
      delay: 1,
      scale: 0.3,
    });

    gsap.to("#section-1", {
      scale: 0.5,
      scrollTrigger: {
        trigger: "#section-1",
        start: "top top",
        scrub: 1,
        pin: true,
        // markers: true,
        pinSpacing: false,
      },
    });

    const descriptions = gsap.utils.toArray(".desc");
    const images = gsap.utils.toArray(".image");

    descriptions.forEach((text) => {
      const desc = text as HTMLDivElement;
      gsap.fromTo(
        desc,
        {
          y: 100,
        },
        {
          y: -100,
          scrollTrigger: {
            trigger: desc,
            endTrigger: desc,
            start: "top bottom",
            end: "bottom top",

            scrub: 2,
          },
        }
      );
    });

    images.forEach((image) => {
      const imgs = image as HTMLDivElement;
      const img = imgs.querySelector("img");
      if (img) {
        gsap.fromTo(
          img,
          {
            y: -100,
          },
          {
            y: 50,
            scrollTrigger: {
              trigger: imgs,
              endTrigger: imgs,
              start: "top bottom",

              scrub: 1,
            },
          }
        );
      }
    });
  });

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

  useEffect(() => {
    if (typeof window !== "undefined" && isMenuClicked) {
      const handleCloseInventory = (e: MouseEvent) => {
        const inventoryRef = document.getElementById("navigation");
        if (inventoryRef && !inventoryRef.contains(e.target as Node)) {
          setIsMenuClicked(false);
        }
      };
      // Tambahkan delay agar event pembuka tidak langsung menutup
      const timeout = setTimeout(() => {
        window.addEventListener("click", handleCloseInventory);
      }, 0);
      return () => {
        clearTimeout(timeout);
        window.removeEventListener("click", handleCloseInventory);
      };
    }
  }, [isMenuClicked]);
  const images = ["/char7.png", "/char6.png", "/char5.png", "/char4.png"];
  return (
    <div id="main" className="w-full  font-inter ">
      {/* menu */}
      <Menu isMenuClicked={isMenuClicked} />
      {/* Chatbot */}
      <Chatbot />
      {/* Page 1 */}
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
      {/* page 2 */}
      <Section
        id={"section-2"}
        className="w-full bg-black relative z-[90] text-white   overflow-hidden"
      >
        <Backed />
        <div className="w-full p-[11vw]">
          {/* page 2 bagian 1 */}
          <div className="w-full h-full flex gap-y-[15vw] sm:flex-row flex-col-reverse   sm:items-stretch sm:justify-center py-[12vw] sm:py-[8vw] md:py-[3vw]">
            <section
              id="desc"
              className="desc sm:w-1/2 w-full   flex flex-col justify-center items-start gap-3 font-tinos relative"
            >
              <div className="w-full relative flex items-stretch justify-between flex-row ">
                <div className="w-1 h-[92%]  bg-white rounded-full" />
                <h1 className="w-[89%]  h-full pr-[3vw]   flex flex-col font-bold md:text-[2.5vw] sm:text-[5vw] text-[8vw] text-balance ">
                  {featureSection[0].title}
                </h1>
              </div>
              <div className="w-full flex flex-row justify-between items-stretch text-[1vw]  font-semibold  text-balance">
                <div className="w-1 h-[92%] mt-[0.5vw]  bg-transparent rounded-full" />
                <div className="w-[89%] text-[3.5vw] sm:text-[2vw] md:text-[1vw]   sm:pr-[3vw] ">
                  {featureSection[0].description}
                </div>
              </div>
            </section>

            <section className="image sm:w-1/2 w-full  sm:px-[2vw] flex flex-row flex-none  flex-nowrap gap-[3vw] sm:gap-[4vw]  ">
              <div className="size-[80vw] sm:size-[42vw] md:size-[35vw] flex  flex-none  rounded-full bg-white overflow-hidden relative">
                <div className="size-full flex justify-center items-center absolute inset-0">
                  <Image
                    src={featureSection[0].image}
                    width={240}
                    height={240}
                    alt="shoes"
                    className=" absolute"
                  />
                </div>
              </div>
              <div className="size-[80vw] sm:size-[42vw] md:size-[35vw] flex  flex-none rounded-full bg-white overflow-hidden"></div>
            </section>
          </div>
          {/* page 2 bagian 2 */}
          <div className="w-full h-full flex gap-y-[15vw] sm:flex-row flex-col   items-stretch justify-center py-[12vw] sm:py-[8vw] md:py-[3vw]">
            <section className="image sm:w-1/2 w-full  sm:px-[2vw]  flex justify-end flex-row flex-none  flex-nowrap gap-[3vw] sm:gap-[4vw]  ">
              <div className="size-[80vw] sm:size-[42vw] md:size-[35vw] flex  flex-none rounded-full bg-white overflow-hidden"></div>
              <div className="size-[80vw] sm:size-[42vw] md:size-[35vw] flex  flex-none  rounded-full bg-white overflow-hidden relative">
                <div className="size-full flex justify-center items-center absolute inset-0">
                  <Image
                    src={featureSection[1].image}
                    width={240}
                    height={240}
                    alt={featureSection[1].title}
                    className=" absolute "
                  />
                </div>
              </div>
            </section>
            <section
              id="desc"
              className="desc sm:w-1/2 w-full   flex flex-col justify-center items-start gap-3 font-tinos relative"
            >
              <div className="w-full relative flex items-stretch justify-between  flex-row ">
                <div className="w-1 h-[92%]  bg-white rounded-full " />
                <h1 className="w-[89%]  h-full pr-[3vw]   flex flex-col font-bold md:text-[2.5vw] sm:text-[5vw] text-[8vw] text-balance ">
                  {featureSection[1].title}
                </h1>
              </div>
              <div className="w-full flex flex-row justify-between items-stretch text-[1vw]  font-semibold  text-balance">
                <div className="w-1 h-[92%] mt-[0.5vw]  bg-transparent rounded-full" />
                <div className="w-[89%] text-[3.5vw] sm:text-[2vw] md:text-[1vw]   sm:pr-[3vw] ">
                  {featureSection[1].description}
                </div>
              </div>
            </section>
          </div>
          {/* page 2 bagian 3 */}
          <div className="w-full h-full flex gap-y-[15vw] sm:flex-row flex-col-reverse   sm:items-stretch justify-center py-[12vw] sm:py-[8vw] md:py-[3vw]">
            <section
              id="desc"
              className="desc sm:w-1/2 w-full   flex flex-col justify-center items-start gap-3 font-tinos relative"
            >
              <div className="w-full relative flex items-stretch justify-between flex-row ">
                <div className="w-1 h-[92%]  bg-white rounded-full" />
                <h1 className="w-[89%]  h-full pr-[3vw]   flex flex-col font-bold md:text-[2.5vw] sm:text-[5vw] text-[8vw] text-balance ">
                  {featureSection[2].title}
                </h1>
              </div>
              <div className="w-full flex flex-row justify-between items-stretch text-[1vw]  font-semibold  text-balance">
                <div className="w-1 h-[92%] mt-[0.5vw]  bg-transparent rounded-full" />
                <div className="w-[89%] text-[3.5vw] sm:text-[2vw] md:text-[1vw]   sm:pr-[3vw] ">
                  {featureSection[2].description}
                </div>
              </div>
            </section>
            <section className="image sm:w-1/2 w-full  sm:px-[2vw] flex flex-row flex-none  flex-nowrap gap-[3vw] sm:gap-[4vw]  ">
              <div className="size-[80vw] sm:size-[42vw] md:size-[35vw] flex  flex-none  rounded-full bg-white overflow-hidden relative">
                <div className="size-full flex justify-center items-center absolute inset-0">
                  <Image
                    src={featureSection[2].image}
                    width={240}
                    height={240}
                    alt={featureSection[2].title}
                    className=" absolute "
                  />
                </div>
              </div>
              <div className="size-[80vw] sm:size-[42vw] md:size-[35vw] flex  flex-none rounded-full bg-white overflow-hidden"></div>
            </section>
          </div>
        </div>
      </Section>
      {/* features */}
      <FeaturesSections />
      <FooterSection />
    </div>
  );
}

const Section = (props: {
  id: string;
  className: string;
  children?: React.ReactNode;
}) => {
  const { id, className, children } = props;
  return (
    <div id={id} className={className}>
      {children}
    </div>
  );
};
