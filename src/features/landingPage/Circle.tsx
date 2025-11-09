import Image from "next/image";
import { MouseEventHandler } from "react";

const Circle = ({
  className,
  onMouseMove,
  onMouseLeave,
  onMouseEnter,
}: {
  className: string;
  onMouseMove?: (e: React.MouseEvent<HTMLImageElement>) => void;
  onMouseLeave?: (e: React.MouseEvent<HTMLImageElement>) => void;
  onMouseEnter?: (e: React.MouseEvent<HTMLImageElement>) => void;
}) => (
  <Image
    alt="circle"
    src={`/circle.png`}
    width={90}
    height={90}
    className={className}
    onMouseEnter={onMouseEnter}
    onMouseMove={onMouseMove}
    onMouseLeave={onMouseLeave}
  />
);

export default Circle;
