import Image from "next/image";
import { TopCollectionItem } from "../types";
import { Verified } from "lucide-react";
import { truncateString } from "@/utils/truncateString";

export default function TopCollectionTable({
  formatTable,
  data,
}: {
  formatTable: "table" | "compact";
  data: TopCollectionItem[] | undefined;
}) {
  return (
    <>
      {data?.map((item) => (
        <TableCore format={formatTable} item={item} key={item.id} />
      ))}
    </>
  );
}

const TableCore = ({
  format,
  item,
}: {
  format: "table" | "compact";
  item: TopCollectionItem;
}) => {
  return (
    <div className="">
      {format === "table" && (
        <TableFormat>
          <div className="flex justify-between">
            <div className="flex gap-2 items-center">
              <div className={"relative size-9 "}>
                <Image
                  className="size-full object-cover"
                  src={item.imageUrl}
                  alt=""
                  width={20}
                  height={20}
                />
                <div className="absolute -bottom-2 -right-2 size-6 flex justify-center items-center bg-black rounded-full">
                  <Image
                    className="size-full object-contain"
                    src={item.chain.iconUrl}
                    alt=""
                    width={20}
                    height={20}
                  />
                </div>
              </div>
              <div className="flex gap-2">
                <h1>{truncateString(item.name, 10)}</h1>
                <div>{item.verified && <Verified />}</div>
              </div>
            </div>
            <div className="text-center">
              <div className="flex gap-2">
                <span>{item.price.value}</span>
                <span>{item.price.currency}</span>
              </div>
              <div>
                <span
                  className={
                    item.change24h > 0 ? "text-green-600" : "text-red-500"
                  }
                >
                  {item.change24h > 0 ? "+" + item.change24h : item.change24h}%
                </span>
              </div>
            </div>
          </div>
        </TableFormat>
      )}
      {format === "compact" && (
        <CompactFormat>
          <div className="flex justify-between">
            <div className="flex gap-2 items-center">
              <div className={"relative size-6 "}>
                <Image
                  className="size-full object-cover"
                  src={item.imageUrl}
                  alt=""
                  width={20}
                  height={20}
                />
              </div>
              <div className="flex gap-2 items-center">
                <h1>{truncateString(item.name, 10)}</h1>
                <div>{item.verified && <Verified size={16} />}</div>
              </div>
            </div>
            <div className="text-center text-sm flex items-center gap-2">
              <span>{item.price.value}</span>
              <span>{item.price.currency}</span>
              <span
                className={
                  item.change24h > 0 ? "text-green-600" : "text-red-500"
                }
              >
                {item.change24h > 0 ? "+" + item.change24h : item.change24h}%
              </span>
            </div>
          </div>
        </CompactFormat>
      )}
    </div>
  );
};

const TableFormat = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-full h-14 bg-black border border-white text-white px-3 ">
      {children}
    </div>
  );
};
const CompactFormat = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-full h-10 bg-black border border-white text-white px-3 flex flex-col  justify-center">
      {children}
    </div>
  );
};
