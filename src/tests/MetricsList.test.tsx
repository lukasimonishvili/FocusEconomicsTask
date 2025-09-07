import { render, screen } from "@testing-library/react";
import MetricsList from "../app/components/MetricList";

const mockMetrics = [
  {
    id: 1,
    nombreDato: "GDP",
    categoria: "Economy",
    valor: 1000,
    unidad: "USD",
    fecha: "2024-09-01T00:00:00Z",
  },
  {
    id: 2,
    nombreDato: "Inflation",
    categoria: "Economy",
    valor: 5,
    unidad: "%",
    fecha: "2024-09-02T00:00:00Z",
  },
];

describe("MetricsList", () => {
  it("renders metrics in table rows", () => {
    render(<MetricsList metrics={mockMetrics} page={1} totalPages={3} />);

    expect(screen.getByText("GDP")).toBeInTheDocument();
    expect(screen.getByText("Inflation")).toBeInTheDocument();

    const categories = screen.getAllByText("Economy");
    expect(categories).toHaveLength(2);

    expect(screen.getByText("1000")).toBeInTheDocument();
    expect(screen.getByText("5")).toBeInTheDocument();
  });

  it("formats and displays dates correctly", () => {
    render(<MetricsList metrics={mockMetrics} page={1} totalPages={3} />);

    const formattedDate = new Date(mockMetrics[0].fecha).toLocaleDateString();
    expect(screen.getByText(formattedDate)).toBeInTheDocument();
  });

  it("shows correct pagination text", () => {
    render(<MetricsList metrics={mockMetrics} page={2} totalPages={5} />);
    expect(screen.getByText("Page 2 of 5")).toBeInTheDocument();
  });

  it("renders Prev button only if page > 1", () => {
    const { rerender } = render(
      <MetricsList metrics={mockMetrics} page={1} totalPages={3} />
    );
    expect(screen.queryByText("Prev")).not.toBeInTheDocument();

    rerender(<MetricsList metrics={mockMetrics} page={2} totalPages={3} />);
    expect(screen.getByText("Prev")).toBeInTheDocument();
  });

  it("renders Next button only if page < totalPages", () => {
    const { rerender } = render(
      <MetricsList metrics={mockMetrics} page={3} totalPages={3} />
    );
    expect(screen.queryByText("Next")).not.toBeInTheDocument();

    rerender(<MetricsList metrics={mockMetrics} page={2} totalPages={3} />);
    expect(screen.getByText("Next")).toBeInTheDocument();
  });
});
