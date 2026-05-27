import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LabelList,
} from "recharts";
import chartData from "../../data/chartData.json";

const LeadsChart = () => {
  return (
    <div className="card chart-card">
      <div className="card-title">
        <h3>Leads Overview</h3>
        <span>—</span>
      </div>

      <ResponsiveContainer width="100%" height={330}>
        <BarChart data={chartData} margin={{ top: 30, right: 20, left: 0, bottom: 10 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="status" />
          <YAxis scale="log" domain={[1, 8000]} ticks={[1, 4, 20, 90, 400, 2000, 8000]} />
          <Tooltip />
          <Bar dataKey="count" fill="#5DADE2" radius={[2, 2, 0, 0]}>
            <LabelList dataKey="count" position="top" />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default LeadsChart;