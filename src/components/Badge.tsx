import Image from "next/image";
import Link from "next/link";
import React from "react";

const Badge = () => {
  return (
    <div>
      <div className="badge-1 absolute flex gap-1 left-12 top-7">
        <Link href={"/home"}>
          <Image
            className="not-absolute bg-[var(--gray)] rounded-full p-1"
            src="/icon/home-2.png"
            width={25}
            height={25}
            alt="home icon"
          />
        </Link>
        <Link href={"/whitepaper"}>
          <Image
            className="not-absolute bg-[var(--gray)] rounded-full p-1"
            src="/icon/story.png"
            width={25}
            height={25}
            alt="story icon"
          />
        </Link>
      </div>
      <div className="badge-1 absolute right-12 top-7 flex gap-1  ">
        <Link target="_blank" href={"https://paypal.com"}>
          <Image
            className="not-absolute bg-[var(--gray)] rounded-full p-1"
            src="/icon/paypal.png"
            width={25}
            height={25}
            alt="paypal icon"
          />
        </Link>
        <Link href={"https://apple.com"} target="_blank">
          <Image
            className="not-absolute bg-[var(--gray)] rounded-full p-1"
            src="/icon/apple.png"
            width={25}
            height={25}
            alt="apple icon"
          />
        </Link>
      </div>
    </div>
  );
};

export default Badge;
