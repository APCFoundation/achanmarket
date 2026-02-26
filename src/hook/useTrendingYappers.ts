import { mockYappers } from "@/lib/mockYappers";
import { YapperWithChart } from "@/lib/type";
import { useEffect, useState } from "react";

const useTrendingYappers = () => {
  const [data, setData] = useState<YapperWithChart[]>([]);

  useEffect(() => {
    const processed: YapperWithChart[] = mockYappers.map((yapper) => ({
      ...yapper,
      chartData: [
        { time: "3m", yaps: yapper.yaps.yaps_l3m },
        { time: "6m", yaps: yapper.yaps.yaps_l6m },
        { time: "12m", yaps: yapper.yaps.yaps_l12m },
      ],
    }));

    setData(processed);
  }, []);

  return {
    data,
  };
};

export default useTrendingYappers;
