"use client";
import React, { useEffect, useState } from "react";
import { ConnectButton } from "../../ConnectButton";
import Inventory from "./Inventory";
import { useGSAP } from "@gsap/react";
import useHydrate from "@/hook/useHydrate";
import gsap from "gsap";
import { useAccount } from "wagmi";
import { shortenAddress } from "@/lib/shortenAddress";
import { useAppKit } from "@reown/appkit/react";
import { useQuery } from "@tanstack/react-query";
import { NftData } from "@/lib/type";
import Image from "next/image";
gsap.registerPlugin(useGSAP);

const MainInventory = () => {
  const [isInventoryOpen, setIsInventoryOpen] = useState(false);
  const [savePositionCard, setSavePositionCard] = useState({
    offsetX: 0,
    offsetY: 0,
  });
  const isClient = useHydrate();
  const [num, setNum] = useState(0);
  const { address, isConnected } = useAccount();
  const { data = [] } = useQuery<NftData[]>({
    queryKey: ["nfts", address],
    queryFn: () => getNFt(address),
    enabled: !!address,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
  const { contextSafe } = useGSAP();
  const cards = new Array(21).fill(0).map((_, index) => index + 1);
  const itemsPerPage = 9;
  const totalPages = Math.ceil(data.length / itemsPerPage);
  const currentCards = data.slice(num, num + itemsPerPage);

  // Cleaned and improved handleClick logic
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const handleClick = contextSafe((i: number) => {
    const cards = gsap.utils.toArray<HTMLDivElement>(".card");
    const card = cards[i];
    if (!card) return;

    // Hitung posisi tengah
    const rect = card.getBoundingClientRect();
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    const centerX = windowWidth / 2 - rect.width / 2;
    const centerY = windowHeight / 2 - rect.height / 2;
    const offsetX = centerX - rect.left;
    const offsetY = centerY - rect.top;

    // Jika klik card yang sama, kembalikan ke posisi awal
    if (activeIndex === i) {
      gsap.to(card, {
        x: 0,
        y: 0,
        scale: 1,
        zIndex: 1,
        duration: 0.5,
        onComplete: () => setActiveIndex(null),
      });
      return;
    }

    // Jika ada card aktif lain, kembalikan card aktif ke posisi awal
    if (activeIndex !== null && activeIndex !== i) {
      const prevCard = cards[activeIndex];
      gsap.to(prevCard, {
        x: 0,
        y: 0,
        scale: 1,
        zIndex: 1,
        duration: 0.5,
      });
    }

    // Animasi card baru ke tengah lalu ke atas
    const tl = gsap.timeline({
      onComplete: () => setActiveIndex(i),
    });
    tl.to(card, {
      x: offsetX,
      y: offsetY,
      scale: 4,
      zIndex: 100,
      duration: 0.5,
      ease: "power2.out",
    }).to(card, {
      y: offsetY - 100, // naik ke atas 100px dari tengah
      duration: 0.5,
      ease: "power2.out",
    });
  });

  const handleNext = () => {
    if (num + itemsPerPage < cards.length) {
      setNum(num + itemsPerPage);
    }
  };
  const handlePrev = () => {
    if (num > 0) {
      setNum(num - itemsPerPage);
    }
  };
  async function getNFt(address: string | undefined) {
    const res = await fetch(
      `https://eth-sepolia.g.alchemy.com/nft/v3/${process.env.NEXT_PUBLIC_ALCHEMY_KEY}/getNFTsForOwner?owner=${address}`,
      {
        method: "GET",
      }
    );
    const data = await res.json();
    return data.ownedNfts;
  }

  const closeInventory = () => {
    setIsInventoryOpen(false);
    setActiveIndex(null);
  };

  useEffect(() => {
    if (typeof window !== "undefined" && isInventoryOpen) {
      const handleCloseInventory = (e: MouseEvent) => {
        const inventoryRef = document.getElementById("inventory");
        if (inventoryRef && !inventoryRef.contains(e.target as Node)) {
          closeInventory();
        }
      };
      // Tambahkan delay agar event pembuka tidak langsung menutup
      const timeout = setTimeout(() => {
        window.addEventListener("click", handleCloseInventory);
      }, 0);
      return () => {
        clearTimeout(timeout);
        window.removeEventListener("click", handleCloseInventory);
      };
    }
  }, [isInventoryOpen]);

  const handleOpenInventory = () => {
    setIsInventoryOpen((x) => !x);
    if (isInventoryOpen) {
      setActiveIndex(null);
    }
  };
  return (
    <div className=" absolute hidden  sm:flex left-10 top-20 ">
      <Inventory onClick={() => setIsInventoryOpen((x) => !x)} />
      {isInventoryOpen && (
        <div
          id="inventory"
          className={`absolute w-[300px] h-[400px] text-white bg-black border-white border-1 top-12 rounded-3xl left-0 transition-all z-[99]`}
        >
          <HeaderInventory
            address={address}
            isConnected={isConnected}
            isClient={isClient}
          />
          <section>
            <ConnectButton
              address={address}
              isConnected={isConnected}
              isClient={isClient}
            />
            <div>
              <div className="flex mt-3 gap-2 flex-wrap mx-4  h-80 ">
                {data.length > 0 ? (
                  currentCards.map((item, index) => (
                    <div
                      onClick={() => handleClick(index)}
                      key={index}
                      className="card  w-20 h-24 relative group font-press text-[8px] cursor-pointer z-[99] select-none"
                      style={{
                        transformStyle: "preserve-3d",
                      }}
                    >
                      <Image
                        src={item.image.cachedUrl || "/char4.png"}
                        width={100}
                        height={100}
                        alt={item.description || ""}
                        className="border-white  border-2 front absolute size-full inset-0 bg-cover bg-lime-400 flex justify-center items-center  "
                      />

                      <div className="back  border-white  border-2 text-nowrap absolute inset-0 bg-black  flex justify-center items-center group/section transition-all">
                        <span className="group-active/section:scale-90">
                          Click me
                        </span>
                      </div>
                    </div>
                  ))
                ) : isConnected ? (
                  <div className="mt-32 text-center">
                    You dont have any NFT!
                  </div>
                ) : null}
              </div>

              <div className="mx-4 mr-7  justify-center  flex gap-3">
                <button
                  onClick={handlePrev}
                  disabled={num == 0}
                  className="size-5 "
                >
                  {"<-"}
                </button>
                <div className="size-5  font-press">
                  {" "}
                  {Math.ceil(num / itemsPerPage) + 1} / {totalPages}
                </div>
                <button
                  onClick={handleNext}
                  disabled={num + itemsPerPage >= cards.length}
                  className="size-5 "
                >
                  {"->"}
                </button>
              </div>
            </div>
          </section>
        </div>
      )}
    </div>
  );
};

const HeaderInventory = ({
  address,
  isConnected,
  isClient,
}: {
  address: `0x${string}` | undefined;
  isConnected?: boolean;
  isClient?: boolean;
}) => {
  const { open } = useAppKit();

  return (
    <div className="flex justify-between items-center mt-4 mx-4">
      <h1 className="text-sm text-white font-bold font-press select-none">
        INVENTORY
      </h1>
      {isClient && (isConnected || address) ? (
        <div
          className={`cursor-pointer select-none`}
          onClick={() => open({ view: "Account" })}
        >
          {shortenAddress(address)}
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default MainInventory;
