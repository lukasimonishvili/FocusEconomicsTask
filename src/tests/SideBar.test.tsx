import { render, screen, fireEvent } from "@testing-library/react";
import SideBar from "../app/components/SideBar";

jest.mock("../app/components/FilterPanel", () => ({
  __esModule: true,
  default: ({ isOpen }: { isOpen: boolean }) => (
    <div data-testid="filter-panel">{isOpen ? "Open" : "Closed"}</div>
  ),
}));

describe("SideBar", () => {
  it("renders sidebar and filter panel", () => {
    render(<SideBar />);
    expect(screen.getByTestId("filter-panel")).toBeInTheDocument();
  });

  it("passes isOpen=false to FilterPanel by default", () => {
    render(<SideBar />);
    expect(screen.getByText("Closed")).toBeInTheDocument();
  });

  it("toggles isOpen when button is clicked", () => {
    render(<SideBar />);
    const button = screen.getByRole("button");
    fireEvent.click(button);
    expect(screen.getByText("Open")).toBeInTheDocument();
    fireEvent.click(button);
    expect(screen.getByText("Closed")).toBeInTheDocument();
  });

  it("applies correct class when open/closed", () => {
    const { container } = render(<SideBar />);
    const aside = container.querySelector("aside")!;
    expect(aside.className).toContain("max-[901px]:left-[-150px]");
    const button = screen.getByRole("button");
    fireEvent.click(button);
    expect(aside.className).toContain("max-[901px]:left-0");
  });
});
