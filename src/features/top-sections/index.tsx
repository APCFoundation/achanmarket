"use client";
import { useState } from "react";
import SectionNavbar from "./components/SectionNavbar";
import { useTopCollection } from "./hooks/useTopCollection";
import { useTopYappers } from "./hooks/useTopYappers";
import { useTopLaunch } from "./hooks/useTopLaunch";
import CompactTable from "./components/CompactTable";
import TopCollectionTable from "./components/TopCollectionTable";
import TopCreatorsTable from "./components/TopCreatorsTable";
import TopLaunchTable from "./components/TopLaunchTable";
import { TypeSection, FormatTable } from "./types";
import { TableCompactIcon, TableIcon } from "@/components/Icon";

export default function TopSections() {
  const [collapsed, setCollapsed] = useState({
    collection: false,
    creators: false,
    launch: false,
  });
  const [type, setType] = useState<TypeSection>("collection");
  const [formatTable, setFormatTable] = useState<FormatTable>("table");

  const { data: collections } = useTopCollection();
  const { data: yappers } = useTopYappers();
  const { data: launches } = useTopLaunch();

  return (
    <div className="space-y-8 p-2 ">
      {/* Navigation */}
      <div className="w-full border border-white  py-1 flex justify-between items-center text-white bg-blue-200 text-xs sticky top-0">
        <div className="flex gap-3">
          <div className="w-10 h-8 bg-black">collect</div>
          <div className="w-10 h-8 bg-black">yapper</div>
        </div>
        <div className="flex gap-3 ">
          <div className="size-10 bg-black border border-white flex justify-center items-center">
            {"1d >"}
          </div>

          <div
            onClick={() =>
              setFormatTable((x) => (x == "table" ? "compact" : "table"))
            }
            className="size-10 bg-black border border-white flex justify-center items-center"
          >
            {formatTable === "table" ? <TableIcon /> : <TableCompactIcon />}
          </div>
          <div className="size-10 bg-black border border-white flex justify-center items-center">
            {">>"}
          </div>
        </div>
      </div>
      {/* Top Yappers | Top Collection */}
      <div className="w-full flex flex-col gap-4 ">
        {Array.from({ length: 20 }, (_, i) => (
          <div
            key={i}
            className="w-full h-12 bg-black border border-white"
          ></div>
        ))}
      </div>
      {/* Top Collection */}
      {/* <div className="bg-black/40 border border-gray-700 rounded-2xl p-4">
        <SectionNavbar
          title="Top Collection NFT"
          isCollapsed={collapsed.collection}
          onToggle={() =>
            setCollapsed((prev) => ({ ...prev, collection: !prev.collection }))
          }
        />
        {collapsed.collection ? (
          <CompactTable data={collections} type="collection" />
        ) : (
          <TopCollectionTable data={collections} />
        )}
      </div> */}

      {/* Top Creators */}
      {/* <div className="bg-black/40 border border-gray-700 rounded-2xl p-4">
        <SectionNavbar
          title="Top Creators"
          isCollapsed={collapsed.creators}
          onToggle={() =>
            setCollapsed((prev) => ({ ...prev, creators: !prev.creators }))
          }
        />
        {collapsed.creators ? (
          <CompactTable data={creators} type="creator" />
        ) : (
          <TopCreatorsTable data={creators} />
        )}
      </div> */}

      {/* Top Launch NFTs */}
      {/* <div className="bg-black/40 border border-gray-700 rounded-2xl p-4">
        <SectionNavbar
          title="New Launch NFTs"
          isCollapsed={collapsed.launch}
          onToggle={() =>
            setCollapsed((prev) => ({ ...prev, launch: !prev.launch }))
          }
        />
        {collapsed.launch ? (
          <CompactTable data={launches} type="launch" />
        ) : (
          <TopLaunchTable data={launches} />
        )}
      </div> */}
    </div>
  );
}
