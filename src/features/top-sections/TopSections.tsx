"use client";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useTopCollection } from "./hooks/useTopCollection";
import useTrendingYappers from "@/hook/useTrendingYappers";
import { useTopLaunch } from "./hooks/useTopLaunch";
import TopCollectionTable from "./components/TopCollectionTable";
import { FormatTable } from "./types";
import { TableCompactIcon, TableIcon } from "@/components/Icon";
import { Button } from "@/components/ui/button";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import TopYappers from "./components/TopYappers";
type TopSectionsProps = {
  setIsCollapsed: Dispatch<SetStateAction<boolean>>;
  isCollapsed: boolean;
};
export default function TopSections(props: TopSectionsProps) {
  const { isCollapsed, setIsCollapsed } = props;
  const [isCollection, setIsCollection] = useState(true);
  const [formatTable, setFormatTable] = useState<FormatTable>("table");

  const { data: collections } = useTopCollection();
  const { data: yappers } = useTrendingYappers();
  const { data: launches } = useTopLaunch();

  useEffect(() => {
    console.log(isCollection);
  }, [isCollection]);
  return (
    <div className="space-y-8 p-2 ">
      {/* Navigation */}
      <div className="w-full py-1 flex justify-between items-center text-white bg-white-custom text-[0.4rem] sticky top-0 font-press z-50">
        <div className="flex gap-3 ">
          <Button
            onClick={() => setIsCollection(true)}
            className="w-12 h-8 bg-black  px-2 text-[0.4rem]"
          >
            collect
          </Button>
          <Button
            onClick={() => setIsCollection(false)}
            className="w-12  h-8 bg-black px-2 text-[0.4rem]"
          >
            yapper
          </Button>
        </div>
        <div className="flex gap-3 ">
          <SelectDay />
          <div
            onClick={() =>
              setFormatTable((x) => (x == "table" ? "compact" : "table"))
            }
            className="size-10 bg-black border border-white flex justify-center items-center"
          >
            {formatTable === "table" ? <TableIcon /> : <TableCompactIcon />}
          </div>
          <div
            onClick={() => setIsCollapsed(true)}
            className="size-10 bg-black border border-white flex justify-center items-center"
          >
            {">>"}
          </div>
        </div>
      </div>
      {/* Top Yappers | Top Collection */}
      <div className="w-full flex flex-col gap-2 ">
        {isCollection ? (
          <TopCollectionTable data={collections} formatTable={formatTable} />
        ) : (
          <TopYappers data={yappers} formatTable={formatTable} />
        )}
      </div>
    </div>
  );
}

export function SelectDay() {
  return (
    <Select>
      <SelectTrigger className="size-10 px-0 bg-black border  border-white flex justify-center items-center placeholder:text-[0.4rem] text-[0.4rem] placeholder:text-white">
        <SelectValue placeholder="1d" className="placeholder:text-white" />
      </SelectTrigger>
      <SelectContent className="bg-black text-white placeholder:text-white">
        <SelectGroup>
          <SelectLabel>day</SelectLabel>
          <SelectItem value="1d">1d</SelectItem>
          <SelectItem value="3d">3d</SelectItem>
          <SelectItem value="5d">5d</SelectItem>
          <SelectItem value="30d">30d</SelectItem>
          <SelectItem value="all">All</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
