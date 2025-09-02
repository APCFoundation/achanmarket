import Image from "next/image";

const BackGround = ({ className }: { className: string }) => (
  <Image
    alt="black vector"
    src={`/behind-character.png`}
    width={650}
    height={650}
    className={className}
  />
);
export default BackGround;
