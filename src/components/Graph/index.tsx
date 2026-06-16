import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import type { BarChartType } from "../../types";

const Graph = ({ data }: { data: BarChartType[] }) => {
  return (
    <div style={{ width: 300, height: 300 }}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{ top: 20, right: 20, left: -20, bottom: 5 }}
        >
          <XAxis dataKey="name" tickLine={false} />

          <YAxis tickLine={false} />

          <Tooltip cursor={{ fill: "rgba(255, 255, 255, 0.1)" }} />

          <Bar
            dataKey="value"
            fill="#8884d8"
            radius={[4, 4, 0, 0]}
            barSize={40}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Graph;
