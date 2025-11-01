import React from "react";
import Circle from "./Circle";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);
const Circles = () => {
  const totalCircle = ["circle-r-1", "circle-r-2", "circle-l-1", "circle-l-2"];
  const { contextSafe } = useGSAP();

  const handleMove: React.MouseEventHandler<HTMLImageElement> = contextSafe(
    (e) => {
      const { clientX, clientY } = e;
      const target = e.target as HTMLElement;
      const rect = target.getBoundingClientRect(); // Dapatkan posisi awal elemen
      const offsetX = clientX - rect.left;
      const offsetY = clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const moveY = offsetY > centerY ? 400 - offsetY : 340 + offsetY; // initial = 317
      const moveX = offsetX > centerX ? 560 - offsetX : 506 + offsetX; // initial = 506

      // console.log(
      //   `
      // offsetX: ${offsetX}
      // offsetY: ${offsetY}
      // height: ${rect.height}
      // movex: ${moveX}
      // ${window.innerHeight}

      // `
      // );
    }
  );

  const handleLeave: React.MouseEventHandler<HTMLImageElement> = contextSafe(
    (e) => {
      const target = e.target as HTMLElement;
    }
  );

  const handleEnter: React.MouseEventHandler<HTMLImageElement> = contextSafe(
    (e) => {
      const target = e.target as HTMLElement;
      const rect = target.getBoundingClientRect();

      const { innerWidth, innerHeight } = window;
      const { clientX, clientY } = e;
      const offsetX = clientX - rect.left;
      const offsetY = clientY - rect.top;
      // console.log(
      //   `
      // clientX: ${clientX}
      // clientY: ${clientY}
      // offsetX: ${offsetX}
      // offsetY: ${offsetY}
      // `
      // );

      gsap.to(target, {
        top: 300,
        left: 500,
      });
    }
  );

  useGSAP(() => {
    gsap.to("circle-r-1", {});
  });

  return (
    <div className="lg:block hidden  ">
      {totalCircle.map((i, index) => (
        <Circle
          key={index}
          onMouseMove={handleMove}
          // onMouseEnter={handleEnter}
          onMouseLeave={handleLeave}
          className={`absolute ${i} circle z-[99]`}
        />
      ))}
    </div>
  );
};

export default Circles;
