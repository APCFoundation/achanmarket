import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);
const Backed = () => {
  const backedRef = useRef<HTMLDivElement>(null);
  const backedByList = [
    "Backed By Solana Foundation",
    "Backed By Redacted",
    "Backed By Binance Labs",
    "Backed By Polygon",
    "Backed By Slow Ventures",
    "Backed By Blackrock",
    "Backed By Opensea",
    "Backed By Magic Eden",
  ];

  useGSAP(() => {
    gsap.to(backedRef.current, {
      xPercent: -50,
      duration: 50,
      delay: 1,
      repeat: -1,
      ease: "none",
    });
  });
  return (
    <div className="flex overflow-hidden">
      <div
        ref={backedRef}
        className="flex items-center  w-fit gap-0  text-[12vw] sm:text-[8vw]  md:text-[5vw] text-nowrap  "
      >
        {backedByList.map((text, i) => (
          <p key={i} className=" border border-t-0 border-white px-2 backed ">
            {text}
          </p>
        ))}
        {backedByList.map((text, i) => (
          <p key={i} className=" border border-t-0 border-white px-2 backed ">
            {text}
          </p>
        ))}
      </div>
    </div>
  );
};

export default Backed;
