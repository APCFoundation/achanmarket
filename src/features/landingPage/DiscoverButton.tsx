import gsap from "gsap";
import Link from "next/link";
import { useEffect } from "react";
const DiscoverButton = () => {
  return (
    <Link
      href={"#section-2"}
      className="button btn-discover group absolute sm:bottom-40 bottom-48 -translate-x-7 py-3 px-5 font-bold flex items-center gap-5 bg-lime-400 rounded-full text-lg transition-all duration-300"
    >
      Discover
      <div className="absolute right-4 overflow-hidden transition-all duration-300 scale-[0.7] ">
        →
      </div>
    </Link>
  );
};

export default DiscoverButton;
