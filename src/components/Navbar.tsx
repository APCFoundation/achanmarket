"use client";
import Image from "next/image";
import Link from "next/link";
import { useAccount, useSignMessage } from "wagmi";
import useHydrate from "@/hook/useHydrate";
import { shortenAddress } from "@/libs/shortenAddress";
import { useAppKit } from "@reown/appkit/react";
export default function Navbar() {
  const { address, isConnected } = useAccount({});
  const { signMessage } = useSignMessage();

  const handleConnect = async () => {
    await open({ view: "Connect" });
    signMessage({ message: "hello" });
  };
  const isClient = useHydrate();
  const { open } = useAppKit();
  return (
    <div className="w-full py-4 bg-black text-white flex items-center justify-between gap-3 font-press">
      <div className={"flex gap-3"}>
        <Link
          href={"/dashboard"}
          className=" logo-navbar flex items-center mr-10 gap-2"
        >
          <Image
            width={500}
            height={500}
            src="/achan-logo-2.png"
            className="size-12 object-contain flex"
            alt="logo"
          />
          <span>A-chan Market</span>
        </Link>
        <div className="flex items-center gap-3">
          <Link href={`/trade`}>Trade</Link>
          <Link href={`/mint`}>Mint</Link>
          <Link href={`/create`}>Create</Link>
        </div>
      </div>
      {isClient && (isConnected || address) ? (
        <div
          className={`cursor-pointer select-none text-sm`}
          onClick={() => open({ view: "Account" })}
        >
          {shortenAddress(address)}
        </div>
      ) : (
        <div className="text-[10px] text-center text-black font-bold flex bg-lime-400  w-fit px-3 py-2 rounded-2xl mx-auto hover:bg-lime-600 cursor-pointer">
          <button onClick={handleConnect}>Connect Your Wallet</button>
        </div>
      )}
    </div>
  );
}
