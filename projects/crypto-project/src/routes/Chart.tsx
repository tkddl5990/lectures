import { useOutletContext } from "react-router-dom";
import { useQuery } from "react-query";
import ApexChart from "react-apexcharts";
import { fetchCoinHistory } from "../api";

interface HistoricalInterface {
  time_open: string;
  time_close: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  market_cap: number;
}

function Chart() {
  const { coinId } = useOutletContext<{ coinId: string }>();
  const { isLoading, data } = useQuery<HistoricalInterface[]>(
    ["ohlcv", coinId],
    () => fetchCoinHistory(coinId)
  );

  return (
    <div>
      {isLoading ? (
        "Loading chart..."
      ) : (
        <ApexChart
          type="line"
          series={[
            { data: data?.map((price) => price.close) ?? [], name: "sales" },
          ]}
          options={{
            chart: { height: 500, width: 500, toolbar: { show: false } },
            stroke: { curve: "smooth", width: 4 },
            yaxis: { show: false },
            xaxis: { labels: { show: false } },
          }}
        />
      )}
    </div>
  );
}

export default Chart;
