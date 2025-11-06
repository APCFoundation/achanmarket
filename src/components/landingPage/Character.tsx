"use client";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

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

const Character2 = () => {
  const [imgIndex, setImgIndex] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useGSAP(() => {
    const chars = gsap.utils.toArray<HTMLImageElement>(".character");

    // Set kondisi awal: semua hidden kecuali yang pertama
    gsap.set(chars, { opacity: 0, x: -200 });
    gsap.set(chars[0], { opacity: 1, x: 0 });
    if (intervalRef.current) clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      const nextIndex = (imgIndex + 1) % chars.length;

      // animasi keluar ke kanan
      gsap.to(chars[imgIndex], {
        x: 200,
        opacity: 0,
        duration: 0.5,
        onComplete: () => {
          // langsung balikin ke kiri biar siap animasi masuk lagi nanti
          gsap.set(chars[imgIndex], { x: -200, opacity: 0 });
        },
      });

      // animasi masuk dari kiri
      gsap.to(chars[nextIndex], {
        x: 0,
        opacity: 1,
        duration: 0.5,
      });

      setImgIndex(nextIndex);
    }, 5000);

    return () => intervalRef.current && clearInterval(intervalRef.current);
  }, [imgIndex]);

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  return (
    <div className="size-[40rem] absolute">
      {images.map((image, index) => (
        <Image
          key={index}
          alt=""
          src={image}
          width={400}
          height={400}
          className={`${position[index]} absolute ${sizeImage[index]} select-none pointer-events-none character`}
        />
      ))}
    </div>
  );
};

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
