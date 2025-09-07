import { render, screen, fireEvent } from "@testing-library/react";
import { signOut } from "next-auth/react";
import LogoutButton from "../app/components/LogoutButton";

jest.mock("next-auth/react", () => ({
  signOut: jest.fn(),
}));

describe("LogoutButton", () => {
  it("renders the logout button", () => {
    render(<LogoutButton />);
    expect(screen.getByRole("button", { name: /logout/i })).toBeInTheDocument();
  });

  it("calls signOut with callbackUrl on click", () => {
    render(<LogoutButton />);
    const button = screen.getByRole("button", { name: /logout/i });
    fireEvent.click(button);

    expect(signOut).toHaveBeenCalledWith({ callbackUrl: "/login" });
  });
});
