"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { yappers } from "./api";
import { TrendingUp } from "lucide-react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import Image from "next/image";

export const description = "A linear area chart";

const chartData = [
  { time: "3m", yaps: yappers[0].yaps.yaps_l3m },
  { time: "6m", yaps: yappers[0].yaps.yaps_l6m },
  { time: "12m", yaps: yappers[0].yaps.yaps_l12m },
];

// Tipe asli yapper (kalau kamu sudah punya, pakai yang itu)
type Yapper = {
  user_id: string;
  twitter: {
    username: string;
    name: string;
    url: string;
    imageUrl: string;
  };
  yaps: {
    yaps_all: number;
    yaps_l24h: number;
    yaps_l48h: number;
    yaps_l7d: number;
    yaps_l30d: number;
    yaps_l3m: number;
    yaps_l6m: number;
    yaps_l12m: number;
  };
};

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

function ChartAreaLinear() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Area Chart - Linear</CardTitle>
        <CardDescription>
          Showing total visitors for the last 6 months
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <AreaChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dot" hideLabel />}
            />
            <Area
              dataKey="desktop"
              type="linear"
              fill="var(--color-desktop)"
              fillOpacity={0.4}
              stroke="var(--color-desktop)"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
      <CardFooter>
        <div className="flex w-full items-start gap-2 text-sm">
          <div className="grid gap-2">
            <div className="flex items-center gap-2 leading-none font-medium">
              Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
            </div>
            <div className="text-muted-foreground flex items-center gap-2 leading-none">
              January - June 2024
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}

const TrendingYappers = () => {
  const [data, setData] = useState<YapperWithChart[]>([]);

  useEffect(() => {
    const processed: YapperWithChart[] = yappers.map((yapper) => ({
      ...yapper,
      chartData: [
        { time: "3m", yaps: yapper.yaps.yaps_l3m },
        { time: "6m", yaps: yapper.yaps.yaps_l6m },
        { time: "12m", yaps: yapper.yaps.yaps_l12m },
      ],
    }));

    setData(processed);
  }, []);
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

const YapperCard = ({ yapper }: { yapper: YapperWithChart }) => {
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
