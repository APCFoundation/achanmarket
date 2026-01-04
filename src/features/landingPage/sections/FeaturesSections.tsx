import React from "react";

const FeaturesSections = () => {
  return (
    <Section id="features" className="w-full h-screen   relative z-[90]">
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
