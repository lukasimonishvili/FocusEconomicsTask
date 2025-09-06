"use client";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from "recharts";
import IMetricsChartsProps from "../types/IMetricsChartsProps";

const MetricsCharts = ({ metrics }: IMetricsChartsProps) => {
  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#AA00FF"];
  const lineData = metrics.map((m) => ({
    fecha: new Date(m.fecha).toLocaleDateString(),
    valor: m.valor,
  }));

  const categoryMap: Record<string, number> = {};
  metrics.forEach((m) => {
    categoryMap[m.categoria] = (categoryMap[m.categoria] || 0) + m.valor;
  });
  const barData = Object.entries(categoryMap).map(([categoria, valor]) => ({
    categoria,
    valor,
  }));

  const pieData = barData;

  const histogramBuckets: Record<string, number> = {};
  metrics.forEach((m) => {
    const bucket = `${Math.floor(m.valor / 10) * 10}-${
      Math.floor(m.valor / 10) * 10 + 9
    }`;
    histogramBuckets[bucket] = (histogramBuckets[bucket] || 0) + 1;
  });

  return (
    <div className="mt-[70px] ml-[218px] p-6 max-[901px]:ml-[50px] flex flex-wrap gap-10 overflow-x-auto">
      <div>
        <h3 className="text-lg font-bold mb-2">Trend Over Time</h3>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={lineData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="fecha" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="valor" stroke="#8884d8" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div>
        <h3 className="text-lg font-bold mb-2">Category Comparison</h3>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={barData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="categoria" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="valor" fill="#82ca9d" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div>
        <h3 className="text-lg font-bold mb-2">Category Proportions</h3>
        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie
              data={pieData}
              dataKey="valor"
              nameKey="categoria"
              cx="50%"
              cy="50%"
              outerRadius={80}
              fill="#8884d8"
              label
            >
              {pieData.map((_, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default MetricsCharts;
