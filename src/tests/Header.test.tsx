import { render, screen, fireEvent } from "@testing-library/react";
import Header from "../app/components/Header";

jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

describe("Header", () => {
  it("renders the logo", () => {
    render(<Header />);
    const logo = screen.getByAltText("logo");
    expect(logo).toBeInTheDocument();
  });

  it("renders the logout button", () => {
    render(<Header />);
    const button = screen.getByRole("button", { name: /logout/i });
    expect(button).toBeInTheDocument();
  });
});
