"use client";
import Link from "next/link";
import { Area, AreaChart } from "recharts";
import { ChartConfig, ChartContainer } from "@/components/ui/chart";
import Image from "next/image";
import { Yapper } from "@/lib/type";
import useTrendingYappers from "@/hook/useTrendingYappers";

export const description = "A linear area chart";

// Tipe untuk tiap titik data chart
type ChartPoint = {
  time: string;
  yaps: number;
};

// Tipe baru hasil processed (Yapper + chartData)
type YapperWithChart = Yapper & {
  chartData: ChartPoint[];
};

const chartConfig = {} satisfies ChartConfig;

const TrendingYappers = () => {
  const { data } = useTrendingYappers();
  return (
    <div
      className={`py-3  relative bg-yellow-200 w-full h-[25rem] border-2 border-black rounded-2xl shadow-[10px_10px_0px_0_rgba(0,0,0,1)] overflow-y-auto`}
    >
      <div className="w-full flex flex-wrap justify-center  gap-3 text-white  ">
        {data.map((yapper, i) => (
          <YapperCard key={i} yapper={yapper} />
        ))}
      </div>
    </div>
  );
};

export const YapperCard = ({ yapper }: { yapper: YapperWithChart }) => {
  return (
    <div className="bg-black w-[19rem] h-[5rem]  flex items-center  gap-3 px-2 relative ">
      <div className="rounded-full border border-white size-12 overflow-hidden relative">
        <Image
          src={yapper.twitter.imageUrl}
          width={1000}
          height={1000}
          alt={yapper.twitter.name}
          className={`absolute inset-0 size-full object-contain`}
        />
      </div>
      <div className="flex flex-col text-sm">
        <div>{yapper.twitter.name}</div>
        <Link href={yapper.twitter.url} className={`text-xs hover:underline`}>
          @{yapper.twitter.username}
        </Link>
      </div>
      <div className={`w-[8rem]  `}>
        <ChartContainer config={chartConfig} className={"  "}>
          <AreaChart
            accessibilityLayer
            data={yapper.chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <Area dataKey="yaps" type="linear" fill="none" stroke="white" />
          </AreaChart>
        </ChartContainer>
      </div>
    </div>
  );
};
export default TrendingYappers;
