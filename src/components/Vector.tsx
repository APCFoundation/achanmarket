import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Image from "next/image";
import React from "react";

const Vector = () => {
  useGSAP(() => {
    gsap.from([".vector-1", ".vector-2"], {
      duration: 1,
      delay: 1,
      scale: 0,
    });
  });
  return (
    <>
      <Image
        alt="vector 1"
        src={`/vector-white-1.png`}
        width={99}
        height={280}
        className="absolute vector-1  bg-opacity-45 origin-bottom-left sm:bottom-0 bottom-10 translate-x-[9.5rem] translate-y-[-5rem]"
      />
      <Image
        alt="vector 2"
        src={`/vector-white-2.png`}
        width={280}
        height={280}
        className="absolute vector-2 origin-bottom-left sm:bottom-0 bottom-10 translate-x-[7.5rem] translate-y-[-6rem]   "
      />
    </>
  );
};

export default Vector;
