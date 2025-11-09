"use client";
import { Circle, Verified } from "lucide-react";
import Image from "next/image";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  CarouselApi,
} from "@/components/ui/carousel";

import { collections } from "./api";
import { useEffect, useState } from "react";

const TrendingNFTCarousel = () => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!api) {
      return;
    }
    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);
    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);
  return (
    <Carousel
      setApi={setApi}
      plugins={[Autoplay({ delay: 3000 })]}
      className="relative bg-purple-200 w-full h-100 border-2 border-black rounded-2xl shadow-[10px_10px_0px_0_rgba(0,0,0,1)] overflow-hidden group"
    >
      <CarouselContent>
        {collections.map((item, i) => (
          <CarouselItem key={i} className="relative h-100 bg-red-500">
            <Image
              src={item.imageCollection}
              width={2000}
              height={2000}
              className="absolute inset-0 size-full object-cover  "
              alt={item.name}
            ></Image>
            <div className="absolute inset-0 bg-linear-to-t from-black via-black/60 to-white/0 z-0" />
            <div className=" absolute w-[20rem] h-52 bottom-10 left-10 text-white">
              {/* Name */}
              <NameAndUsername
                isOwnerVerified={item.owner.verified}
                name={item.name}
                isVerified={item.verified}
                owner={item.owner.name}
              />
              {/* mint details */}
              <MintDetails
                chain={item.chain}
                floorPrice={item.floorPrice!}
                supply={item.totalItems!}
              />
            </div>

            <div>{/* 3 card nft */}</div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="absolute top-48  left-10   translate-y-20 group-hover:-translate-y-9  group-hover:flex  hidden transition-all" />
      <CarouselNext className="absolute top-48  right-10 translate-y-20 group-hover:-translate-y-9  group-hover:flex hidden transition-all" />

      <div className="absolute bottom-3 flex justify-center items-center  w-full">
        <div className={`flex gap-3`}>
          {Array.from({ length: count }).map((_, i) => (
            <Circle
              key={i + 1}
              fill={current == i + 1 ? "white" : "none"}
              stroke={current == i + 1 ? "note" : "white"}
              className={""}
              size={20}
            />
          ))}
        </div>
      </div>
    </Carousel>
  );
};
2;
type NameAndUsernameProps = {
  name?: string;
  owner?: string;
  isVerified?: boolean;
  isOwnerVerified?: boolean;
};
const NameAndUsername = (props: NameAndUsernameProps) => {
  const {
    name = "Azuki Finance",
    owner = "azuki-dev",
    isVerified = true,
    isOwnerVerified = true,
  } = props;
  return (
    <div>
      <div>
        <h1 className="flex items-center text-3xl gap-2">
          {name}
          {isVerified && <Verified width={20} fill="blue" />}
        </h1>
        <p className="flex items-center text-1xl gap-2">
          By {owner}{" "}
          <span>{isOwnerVerified && <Verified fill="blue" width={15} />}</span>
        </p>
      </div>
    </div>
  );
};

type MintDetailsProps = {
  chain: string;
  floorPrice: string;
  supply: number;
};
const MintDetails = (props: MintDetailsProps) => {
  const { chain = "base", floorPrice = "0.005 ETH", supply = 9999 } = props;
  return (
    <div className="w-60 bg-gray-800 mt-3 border border-gray-600 rounded-2xl p-3 text-gray-100">
      <header className="flex items-stretch justify-between gap-4">
        <div className="flex flex-col justify-center">
          <h1 className="text-sm font-semibold">MINT PRICE</h1>
          <p className="text-xs text-gray-400">{floorPrice}</p>
        </div>

        {/* separator line */}
        <div className="w-px bg-gray-500 self-stretch rounded-full opacity-60" />

        <div className="flex flex-col justify-center">
          <h1 className="text-sm font-semibold">TOTAL ITEMS</h1>
          <p className="text-xs text-gray-400">{supply}</p>
        </div>
      </header>

      <footer className="mt-3">
        <div className="flex justify-between text-sm font-medium">
          <span>ITEM MINTED</span>
          <span>13 / {supply}</span>
        </div>

        {/* progress bar */}
        <div className="mt-2 w-full h-2 bg-gray-700 rounded-full overflow-hidden">
          <div className="h-full bg-lime-500" style={{ width: "24.5%" }} />
        </div>
      </footer>
    </div>
  );
};
export default TrendingNFTCarousel;
