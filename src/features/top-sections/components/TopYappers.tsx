const TopYappers = ({
  formatTable,
  data,
}: {
  formatTable: "table" | "compact";
  data: string;
}) => {
  return formatTable === "table" ? (
    <>
      {Array.from({ length: 20 }, (_, i) => (
        <div
          key={i}
          className="w-full h-12 bg-black border border-white text-white"
        >
          Eweee
        </div>
      ))}
    </>
  ) : null;
};

export default TopYappers;
