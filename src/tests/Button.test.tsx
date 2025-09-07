import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Button from "../app/components/Button";

describe("Button component", () => {
  test("renders label text", () => {
    render(<Button label="Click me" onClick={() => {}} />);
    const btn = screen.getByRole("button", { name: /click me/i });
    expect(btn).toBeInTheDocument();
  });

  test("calls onClick when clicked", async () => {
    const handle = jest.fn();
    render(<Button label="Press" onClick={handle} />);
    await userEvent.click(screen.getByRole("button", { name: /press/i }));
    expect(handle).toHaveBeenCalledTimes(1);
  });

  test("accepts extra className and keeps default classes", () => {
    render(<Button label="WithClass" className="my-custom" />);
    const btn = screen.getByRole("button", { name: /withclass/i });

    expect(btn.className).toContain("my-custom");

    expect(btn.className).toContain("rounded-lg");
    expect(btn.className).toContain("py-2");
    expect(btn.className).toContain("bg-[#0F437F]");
  });

  test("passes through native props like disabled", () => {
    render(<Button label="Disabled" disabled />);
    const btn = screen.getByRole("button", { name: /disabled/i });
    expect(btn).toBeDisabled();
  });
});
