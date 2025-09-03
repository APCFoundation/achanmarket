"use client";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useMediaQuery } from "react-responsive";

const images = ["/char7.png", "/char6.png", "/char5.png", "/char4.png"];
const position = [
  "sm:-bottom-[40rem] -bottom-[30rem]",
  "sm:-bottom-[10rem] -bottom-[5rem]",
  "sm:-bottom-[45rem]  -bottom-[35rem]",
  "sm:-bottom-[10rem] -left-20 -bottom-[5rem]",
];

const sizeImage = [
  "w-[41rem]",
  "sm:w-[40rem] w-[60rem]",
  "w-[40rem]",
  "w-[40rem]",
];
const Character = () => {
  const [imgIndex, setImgIndex] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const charRef = useRef<HTMLImageElement>(null);

  useGSAP(() => {
    gsap.from(charRef.current, {
      width: "30rem",
      duration: 1,
      delay: 1,
      onComplete: () => {
        // mulai interval
        if (intervalRef.current) clearInterval(intervalRef.current);
        // animasi bergeser ke kanan dan hilang
        intervalRef.current = setInterval(() => {
          gsap.to(charRef.current, {
            x: 200,
            duration: 0.5,
            opacity: 0,
            onComplete: () => {
              setImgIndex((prev) => (prev + 1) % images.length);
              gsap.set(charRef.current, {
                x: -200,
              });
              gsap.to(charRef.current, {
                x: 0,
                opacity: 1,
                duration: 0.5,
              });
            },
          });
        }, 5000);
      },
    });
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  useEffect(() => {
    // Bersihkan interval saat unmount
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  return (
    <div className={"size-[40rem]  absolute"}>
      <Image
        alt=""
        ref={charRef}
        src={images[imgIndex]}
        width={400}
        height={400}
        className={`${position[imgIndex]} absolute ${sizeImage[imgIndex]} select-none pointer-events-none`}
      />
    </div>
  );
};
export default Character;
