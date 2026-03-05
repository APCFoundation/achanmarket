"use client";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Image from "next/image";
import { useRef } from "react";

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
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const chars = gsap.utils.toArray<HTMLElement>(".character");
      if (chars.length === 0) return;

      // Set kondisi awal: semua hidden kecuali yang pertama
      gsap.set(chars, { opacity: 0, x: -200 });
      gsap.set(chars[0], { opacity: 1, x: 0 });

      // Animasi intro: scale dari kecil
      gsap.from(chars[0], {
        width: "30rem",
        duration: 1,
        delay: 1,
      });

      // Pakai variabel biasa, BUKAN React state — menghindari re-render & stale closure
      let currentIndex = 0;

      const swap = () => {
        const nextIndex = (currentIndex + 1) % chars.length;

        // Animasi keluar ke kanan
        gsap.to(chars[currentIndex], {
          x: 200,
          opacity: 0,
          duration: 0.5,
          onComplete: () => {
            // Reset posisi ke kiri, siap untuk animasi masuk nanti
            gsap.set(chars[currentIndex], { x: -200, opacity: 0 });
            currentIndex = nextIndex;
          },
        });

        // Animasi masuk dari kiri
        gsap.to(chars[nextIndex], {
          x: 0,
          opacity: 1,
          duration: 0.5,
        });
      };

      // Mulai interval setelah animasi intro selesai (1s delay + 1s duration = 2s)
      const startTimeout = setTimeout(() => {
        const interval = setInterval(swap, 5000);
        // Simpan interval ID untuk cleanup
        (containerRef.current as any)?.__intervalId &&
          clearInterval((containerRef.current as any).__intervalId);
        if (containerRef.current) {
          (containerRef.current as any).__intervalId = interval;
        }
      }, 2000);

      return () => {
        clearTimeout(startTimeout);
        if (containerRef.current) {
          clearInterval((containerRef.current as any).__intervalId);
        }
      };
    },
    { scope: containerRef },
  );

  return (
    <div ref={containerRef} className="size-[40rem] absolute">
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

export default Character;

