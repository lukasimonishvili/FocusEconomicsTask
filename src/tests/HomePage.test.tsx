import { render, screen } from "@testing-library/react";

jest.mock("../app/api/auth/[...nextauth]/route", () => ({
  __esModule: true,
  authOptions: {},
}));

jest.mock("next-auth", () => ({
  getServerSession: jest.fn(),
}));

jest.mock("next/navigation", () => ({
  redirect: jest.fn(),
}));

jest.mock("../app/lib/prisma", () => ({
  prisma: {
    metric: {
      findMany: jest.fn(),
      count: jest.fn(),
    },
  },
}));

jest.mock("../app/components/Header", () => ({
  __esModule: true,
  default: () => <div data-testid="header">Header</div>,
}));

jest.mock("../app/components/SideBar", () => ({
  __esModule: true,
  default: () => <div data-testid="sidebar">SideBar</div>,
}));

jest.mock("../app/components/MetricsCharts", () => ({
  __esModule: true,
  default: ({ metrics }: { metrics: any[] }) => (
    <div data-testid="charts">{metrics.length} metrics</div>
  ),
}));

jest.mock("../app/components/MetricList", () => ({
  __esModule: true,
  default: ({ metrics, page, totalPages }: any) => (
    <div data-testid="metrics-list">
      Page {page} of {totalPages}, {metrics.length} metrics
    </div>
  ),
}));

import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { prisma } from "../app/lib/prisma";
import HomePage from "../app/page";

describe("HomePage", () => {
  afterEach(() => jest.resetAllMocks());

  it("redirects to /login when there is no session", async () => {
    (getServerSession as jest.Mock).mockResolvedValue(null);

    await HomePage({});

    expect(redirect).toHaveBeenCalledWith("/login");
  });

  it("renders components when session exists", async () => {
    (getServerSession as jest.Mock).mockResolvedValue({
      user: { name: "Luka" },
    });
    (prisma.metric.findMany as jest.Mock).mockResolvedValue([
      {
        id: 1,
        nombreDato: "Dato1",
        categoria: "Cat1",
        valor: 10,
        fecha: new Date(),
      },
      {
        id: 2,
        nombreDato: "Dato2",
        categoria: "Cat2",
        valor: 20,
        fecha: new Date(),
      },
    ]);
    (prisma.metric.count as jest.Mock).mockResolvedValue(2);

    render(await HomePage({}));

    expect(screen.getByTestId("header")).toBeInTheDocument();
    expect(screen.getByTestId("sidebar")).toBeInTheDocument();
    expect(screen.getByTestId("charts")).toHaveTextContent("2 metrics");
    expect(screen.getByTestId("metrics-list")).toHaveTextContent(
      "Page 1 of 1, 2 metrics"
    );
  });
});
