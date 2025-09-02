import Image from "next/image";

type InventoryProps = {
  onClick: () => void;
};
const Inventory = (props: InventoryProps) => {
  const { onClick } = props;
  return (
    <div
      onClick={onClick}
      className="inventory hidden   sm:flex justify-center items-center gap-5 cursor-pointer group transition-all select-none"
    >
      <Image
        alt=""
        id="img-inventory"
        src={`/menu-logo.png`}
        width={14}
        height={14}
        className="group-hover:translate-x-3 transition-all"
      />
      <p className="font-semibold group-hover:-translate-x-1 transition-all">
        Inventory
      </p>
    </div>
  );
};

export default Inventory;
