import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  return (
    <div className="w-full py-4 bg-black text-white flex items-center justify-start gap-3">
      <Link
        href={"/dashboard"}
        className=" logo-navbar flex items-center h-10 mr-10"
      >
        <Image
          width={500}
          height={500}
          src="/character.png"
          className="size-10 object-contain flex"
          alt="logo"
        />
        <span>A-chan Market</span>
      </Link>
      <div className="flex gap-3">
        <Link href={`/trade`}>Trade</Link>
        <Link href={`/mint`}>Mint</Link>
        <Link href={`/create`}>Create</Link>
      </div>
    </div>
  );
}
