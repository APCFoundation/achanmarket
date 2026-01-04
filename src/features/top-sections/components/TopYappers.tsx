import { YapperWithChart } from "@/lib/type";

interface TopYappersProps {
  formatTable: "table" | "compact";
  data: YapperWithChart[];
}
const TopYappers = (props: TopYappersProps) => {
  const { formatTable } = props;
  return formatTable === "table" ? (
    <>
      {Array.from({ length: 20 }, (_, i) => (
        <div
          key={i}
          className="w-full h-12 bg-black border border-white text-white"
        >
          Yapper here
        </div>
      ))}
    </>
  ) : null;
};

export default TopYappers;
