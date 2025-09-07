import { render, screen } from "@testing-library/react";

jest.mock("next-auth", () => ({
  getServerSession: jest.fn(),
}));

jest.mock("next/navigation", () => ({
  redirect: jest.fn(),
}));

jest.mock("../app/components/LoginForm", () => ({
  __esModule: true,
  default: () => <div data-testid="login-form">Login Form</div>,
}));

jest.mock("../app/api/auth/[...nextauth]/route", () => ({
  authOptions: {},
}));

import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import LoginPage from "../app/login/page";

describe("LoginPage", () => {
  afterEach(() => jest.resetAllMocks());

  it("renders LoginForm when there is no session", async () => {
    (getServerSession as jest.Mock).mockResolvedValue(null);

    render(await LoginPage());

    expect(screen.getByTestId("login-form")).toBeInTheDocument();
  });

  it("redirects to / when there is a session", async () => {
    (getServerSession as jest.Mock).mockResolvedValue({
      user: { name: "Luka" },
    });

    await LoginPage();

    expect(redirect).toHaveBeenCalledWith("/");
  });
});
