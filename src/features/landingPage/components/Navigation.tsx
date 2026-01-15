import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import Link from "next/link";
import React from "react";

const Navigation = () => {
  const [open, setOpen] = React.useState(false);

  // Ini yang akan jadi area scroll-nya drawer
  const scrollRef = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    if (!open) return;

    // tunggu drawer mount/animasi, lalu reset scroll ke atas
    requestAnimationFrame(() => {
      scrollRef.current?.scrollTo({ top: 0, left: 0, behavior: "auto" });
    });
  }, [open]);
  return (
    <div className="navigation-animate  absolute flex font-bold  justify-center  w-[30rem] bg-white text-black">
      <Link
        href={"/dashboard"}
        className="py-5 px-5 transition-all duration-500 origin-bottom hover:bg-gray-300 cursor-pointer"
      >
        App
      </Link>
      <Link
        href={"/guide"}
        className="py-5 px-5 transition-all duration-500 origin-bottom hover:bg-gray-300 cursor-pointer"
      >
        Guide Book
      </Link>
      <Drawer open={open} onOpenChange={setOpen}>
        <DrawerTrigger className="py-5 px-5 transition-all duration-500 origin-bottom hover:bg-gray-300 cursor-pointer">
          Roadmap
        </DrawerTrigger>
        <DrawerContent className="z-99">
          <div
            ref={scrollRef}
            className="max-h-[85vh] overflow-y-auto overscroll-contain"
          >
            <div className="w-full flex justify-center">
              <DrawerHeader>
                <DrawerTitle>Whitepaper - Achan Market</DrawerTitle>
                <DrawerDescription>
                  Note that. this is based on My imagination
                </DrawerDescription>
              </DrawerHeader>
            </div>
            <div id="executive-summary" className="pt-4 pb-0 w-1/2 mx-auto  ">
              <h1 className="text-3xl font-bold">Executive Summary</h1>
              <p className="text-left">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Placeat cumque eaque, quam, aperiam esse quibusdam asperiores
                aut facilis expedita quo iure? Ullam neque earum ex iure enim.
                Provident, sed tenetur aliquid ratione aut vitae! Molestias sunt
                ea expedita qui optio ullam, veritatis culpa illo ad, suscipit
                excepturi. Harum, similique ea?
              </p>
            </div>
            <div id="Background" className="pt-4 pb-0 w-1/2 mx-auto  ">
              <h1 className="text-3xl font-bold">Background</h1>
              <p className="text-left">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Placeat cumque eaque, quam, aperiam esse quibusdam asperiores
                aut facilis expedita quo iure? Ullam neque earum ex iure enim.
                Provident, sed tenetur aliquid ratione aut vitae! Molestias sunt
                ea expedita qui optio ullam, veritatis culpa illo ad, suscipit
                excepturi. Harum, similique ea?
              </p>
            </div>
            <div id="Solution" className="pt-4 pb-0 w-1/2 mx-auto  ">
              <h1 className="text-3xl font-bold">Solution</h1>
              <p className="text-left">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Placeat cumque eaque, quam, aperiam esse quibusdam asperiores
                aut facilis expedita quo iure? Ullam neque earum ex iure enim.
                Provident, sed tenetur aliquid ratione aut vitae! Molestias sunt
                ea expedita qui optio ullam, veritatis culpa illo ad, suscipit
                excepturi. Harum, similique ea?
              </p>
            </div>
            <div
              id="Tech Stack and Architecture"
              className="pt-4 pb-0 w-1/2 mx-auto  "
            >
              <h1 className="text-3xl font-bold">TechStack And Architecture</h1>
              <p className="text-left">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Placeat cumque eaque, quam, aperiam esse quibusdam asperiores
                aut facilis expedita quo iure? Ullam neque earum ex iure enim.
                Provident, sed tenetur aliquid ratione aut vitae! Molestias sunt
                ea expedita qui optio ullam, veritatis culpa illo ad, suscipit
                excepturi. Harum, similique ea?
              </p>
            </div>
            <div id="Tokenomics" className="pt-4 pb-0 w-1/2 mx-auto  ">
              <h1 className="text-3xl font-bold">Tokenomics</h1>
              <p className="text-left">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Placeat cumque eaque, quam, aperiam esse quibusdam asperiores
                aut facilis expedita quo iure? Ullam neque earum ex iure enim.
                Provident, sed tenetur aliquid ratione aut vitae! Molestias sunt
                ea expedita qui optio ullam, veritatis culpa illo ad, suscipit
                excepturi. Harum, similique ea?
              </p>
            </div>
            <div id="Roadmap" className="pt-4 pb-0 w-1/2 mx-auto  ">
              <h1 className="text-3xl font-bold">Roadmap</h1>
              <p className="text-left">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Placeat cumque eaque, quam, aperiam esse quibusdam asperiores
                aut facilis expedita quo iure? Ullam neque earum ex iure enim.
                Provident, sed tenetur aliquid ratione aut vitae! Molestias sunt
                ea expedita qui optio ullam, veritatis culpa illo ad, suscipit
                excepturi. Harum, similique ea?
              </p>
            </div>
            <DrawerFooter>
              <p className="text-center font-bold">
                Thanks if you read this {"💕"}
              </p>
              <DrawerClose>
                <p className="font-semibold">Close</p>
              </DrawerClose>
            </DrawerFooter>
          </div>
        </DrawerContent>
      </Drawer>
    </div>
  );
};

export default Navigation;
