import { useGSAP } from "@gsap/react";
import ScrollTrigger from "gsap/ScrollTrigger";
import { Zap, Layers, Image as ImageIcon } from "lucide-react";
import Image from "next/image"; // Added back for Feature Images
import gsap from "gsap";
import React, { useRef } from "react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const FeaturesSections = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  // Feature Data
  const features = [
    {
      icon: <Layers size={32} className="text-black" />,
      title: "Multi-Chain Support",
      description:
        "Trade across Ethereum, Polygon, and Base without switching networks. One wallet, infinite possibilities.",
      image: "/overview/3.png", // Using asset from project
    },
    {
      icon: <ImageIcon size={32} className="text-black" />,
      title: "Instant NFT Creation",
      description:
        "No-code minting at your fingertips. Upload your art, set the price, and launch your collection in seconds.",
      image: "/overview/0.png", // Using asset from project
    },
    {
      icon: <Zap size={32} className="text-black" />,
      title: "Low Fees & High Speed",
      description:
        "Experience lightning-fast transactions with gas fees optimized for Layer 2 solutions. More trading, less waiting.",
      image: "/overview/2.png", // Using asset from project
    },
  ];

  useGSAP(
    () => {
      // 1. Header Pinning Logic (Existing)
      gsap.to(headerRef.current, {
        scrollTrigger: {
          trigger: headerRef.current,
          pin: true,
          scrub: 1,
          start: "top top",
          end: "+=500px top", // Adjust as needed
          // markers: true,
        },
      });

      // 2. Feature Animations (Sequential: Image -> Text)
      const featureRows = gsap.utils.toArray(".feature-row");
      featureRows.forEach((row: any, i) => {
        const image = row.querySelector(".feature-image");
        const text = row.querySelector(".feature-text");
        const content = row.querySelector(".feature-content");

        const isReverse = i % 2 !== 0;
        const xOffset = isReverse ? -50 : 50; // Text slides in from side

        // Image Animation
        gsap.fromTo(
          image,
          { opacity: 0, scale: 0.8, y: 50 },
          {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 0.6,
            ease: "power2.out",
            scrollTrigger: {
              trigger: row,
              start: "top 70%",
              end: "bottom 70%",
              toggleActions: "play none none reverse",
            },
          },
        );

        // Text Animation: Triggered after scrolling further
        gsap.fromTo(
          text,
          { opacity: 0, x: xOffset },
          {
            opacity: 1,
            x: 0,
            duration: 0.6,
            ease: "power2.out",
            scrollTrigger: {
              trigger: row,
              start: "top+=10px 20%", // Triggers when user scrolls ~50px more
              end: "bottom 70%",
              toggleActions: "play none none reverse",
              // markers: true,
            },
          },
        );
      });
    },
    { scope: containerRef },
  );

  return (
    <Section
      id="features"
      className="w-full relative z-90 bg-white min-h-screen flex flex-col items-center pb-32 overflow-hidden"
    >
      <div ref={containerRef} className="w-full max-w-7xl mx-auto px-5">
        {/* Pinned Header */}
        <header ref={headerRef} className="w-1/2 text-center py-20  z-10">
          <h1 className="font-press text-[3vw] text-black">
            Features that be exist soon
          </h1>
        </header>

        {/* Feature List */}
        <div className="flex flex-col gap-32 w-full mt-20">
          {features.map((feature, index) => {
            const isReverse = index % 2 !== 1; // Zig-Zag Check
            return (
              <div
                key={index}
                className={`feature-row flex flex-col md:flex-row items-center justify-between w-full gap-10 ${
                  isReverse ? "md:flex-row-reverse" : ""
                }`}
              >
                {/* Image Side */}
                <div className="feature-image w-full md:w-1/2 flex justify-center relative">
                  <div className="relative w-[300px] h-[300px] md:w-[400px] md:h-[400px] bg-gray-100 rounded-3xl overflow-hidden shadow-2xl transform rotate-3 hover:rotate-0 transition-all duration-500">
                    {/* Fallback image if asset fails, or actual image */}
                    <Image
                      src={feature.image}
                      alt={feature.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>

                {/* Text Side */}
                <div className="feature-text w-full md:w-1/2 flex flex-col justify-center items-start md:px-10">
                  <div className="feature-content">
                    <div className="mb-6 p-3 bg-lime-400 rounded-2xl w-fit shadow-neo-brutalist">
                      {feature.icon}
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold font-tinos mb-6 leading-tight text-black">
                      {feature.title}
                    </h2>
                    <p className="text-lg md:text-xl text-gray-600 leading-relaxed font-inter">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
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
