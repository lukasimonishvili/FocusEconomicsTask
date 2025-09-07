// src/tests/LoginForm.test.tsx
import { render, screen, fireEvent } from "@testing-library/react";
import { signIn } from "next-auth/react";
import LoginForm from "../app/components/LoginForm";

jest.mock("next-auth/react", () => ({
  signIn: jest.fn(),
}));

describe("LoginForm", () => {
  it("renders the heading", () => {
    render(<LoginForm />);
    expect(screen.getByText("Sign In")).toBeInTheDocument();
  });

  it("renders the Google sign-in button", () => {
    render(<LoginForm />);
    expect(
      screen.getByRole("button", { name: /sign in with google/i })
    ).toBeInTheDocument();
  });

  it("calls signIn with google provider on click", () => {
    render(<LoginForm />);
    const button = screen.getByRole("button", { name: /sign in with google/i });
    fireEvent.click(button);

    expect(signIn).toHaveBeenCalledWith("google", { callbackUrl: "/" });
  });
});
