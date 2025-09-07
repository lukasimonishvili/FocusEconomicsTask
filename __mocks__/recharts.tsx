import React from "react";

export const ResponsiveContainer = ({
  children,
}: {
  children: React.ReactNode;
}) => <div>{children}</div>;

export const LineChart = ({ children }: any) => (
  <div data-testid="line-chart">{children}</div>
);
export const BarChart = ({ children }: any) => (
  <div data-testid="bar-chart">{children}</div>
);
export const PieChart = ({ children }: any) => (
  <div data-testid="pie-chart">{children}</div>
);

export const CartesianGrid = () => <div data-testid="cartesian-grid" />;
export const XAxis = () => <div data-testid="x-axis" />;
export const YAxis = () => <div data-testid="y-axis" />;

export const Line = () => <div data-testid="line" />;
export const Bar = () => <div data-testid="bar" />;
export const Pie = ({ children }: any) => (
  <div data-testid="pie">{children}</div>
);
export const Cell = () => <div data-testid="cell" />;

export const Tooltip = () => <div data-testid="tooltip" />;
export const Legend = () => <div data-testid="legend" />;
