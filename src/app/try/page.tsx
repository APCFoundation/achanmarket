import GridSection from "@/features/landingPage/sections/GridSection";

const Page = () => {
  return (
    <div className="absolute top-0 left-1/2 -translate-x-1/2  w-full max-w-[1200px] h-full z-0 pointer-events-none flex justify-center">
      <div className="w-full h-full opacity-100">
        <GridSection />
      </div>
    </div>
  );
};

export default Page;
