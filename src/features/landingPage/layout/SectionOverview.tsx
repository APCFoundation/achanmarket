import React from "react";
import Backed from "../components/backed";
import { featureSection } from "@/app/a";
import Image from "next/image";

const SectionOverview = () => {
  return (
    <div
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
    </div>
  );
};

export default SectionOverview;
