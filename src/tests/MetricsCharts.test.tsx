import { render, screen } from "@testing-library/react";
import MetricsCharts from "../app/components/MetricsCharts";

jest.mock("recharts", () => {
  const Original = jest.requireActual("recharts");
  return {
    ...Original,
    ResponsiveContainer: ({ children }: { children: React.ReactNode }) => (
      <div>{children}</div>
    ),
    LineChart: ({ children }: any) => (
      <div data-testid="line-chart">{children}</div>
    ),
    BarChart: ({ children }: any) => (
      <div data-testid="bar-chart">{children}</div>
    ),
    PieChart: ({ children }: any) => (
      <div data-testid="pie-chart">{children}</div>
    ),
  };
});

const mockMetrics = [
  {
    id: 1,
    nombreDato: "GDP",
    categoria: "Economy",
    valor: 100,
    unidad: "USD",
    fecha: "2024-09-01T00:00:00Z",
  },
  {
    id: 2,
    nombreDato: "Inflation",
    categoria: "Prices",
    valor: 50,
    unidad: "%",
    fecha: "2024-09-02T00:00:00Z",
  },
];

describe("MetricsCharts", () => {
  it("renders section headings", () => {
    render(<MetricsCharts metrics={mockMetrics} />);
    expect(screen.getByText("Trend Over Time")).toBeInTheDocument();
    expect(screen.getByText("Category Comparison")).toBeInTheDocument();
    expect(screen.getByText("Category Proportions")).toBeInTheDocument();
  });

  it("renders line chart container", () => {
    render(<MetricsCharts metrics={mockMetrics} />);
    expect(screen.getByTestId("line-chart")).toBeInTheDocument();
  });

  it("renders bar chart container", () => {
    render(<MetricsCharts metrics={mockMetrics} />);
    expect(screen.getByTestId("bar-chart")).toBeInTheDocument();
  });

  it("renders pie chart container", () => {
    render(<MetricsCharts metrics={mockMetrics} />);
    expect(screen.getByTestId("pie-chart")).toBeInTheDocument();
  });
});
