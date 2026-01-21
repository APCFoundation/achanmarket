import { useGSAP } from "@gsap/react";
import ScrollTrigger from "gsap/ScrollTrigger";
import Image from "next/image";
import gsap from "gsap";
import React, { useRef } from "react";

gsap.registerPlugin(ScrollTrigger, useGSAP);
const FeaturesSections = () => {
  const headerRef = useRef<HTMLDivElement>(null);
  const featuresTextRef = useRef<HTMLDivElement>(null);
  // feature animation
  useGSAP(() => {
    gsap.to(headerRef.current, {
      scrollTrigger: {
        trigger: headerRef.current,

        pin: true,
        scrub: 1,
        start: "top top",
        end: "+=500px top",
        markers: true,
      },
    });
  });
  return (
    <Section id="features" className="w-full h-400  relative z-99">
      <header
        ref={headerRef}
        className="w-full   select-none cursor-pointer px-5 pt-10 pb-32  "
      >
        <h1 ref={featuresTextRef} className="font-press text-[3vw]  w-2/4">
          Features that be exist soon
        </h1>
      </header>
      <div className="">
        <Image
          alt="shoes"
          src={"/overview/0.png"}
          width={200}
          height={200}
          className="right-[20vw] absolute"
        />
      </div>
    </Section>
  );
};

export default FeaturesSections;

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
