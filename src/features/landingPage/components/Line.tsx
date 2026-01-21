import Image from "next/image";

const Line = ({ className }: { className: string }) => {
  return (
    <Image
      width={2}
      height={10}
      alt="line"
      src={"/line.png"}
      className={className}
    />
  );
};

export default Line;
