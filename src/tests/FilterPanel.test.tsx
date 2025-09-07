import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import FilterPanel from "../app/components/FilterPanel";
import { useRouter, useSearchParams } from "next/navigation";

jest.mock("next/navigation");

describe("FilterPanel", () => {
  const pushMock = jest.fn();

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({ push: pushMock });
    (useSearchParams as jest.Mock).mockReturnValue({
      get: (key: string) => {
        const params: Record<string, string> = {
          search: "",
          sortFecha: "",
          sortValor: "",
          minValor: "",
          maxValor: "",
        };
        return params[key] || null;
      },
      toString: () => "",
    });
    pushMock.mockClear();
  });

  it("renders search input", () => {
    render(<FilterPanel isOpen={true} />);
    expect(
      screen.getByPlaceholderText(/Search by keyword/i)
    ).toBeInTheDocument();
  });

  it("updates URL when search changes", async () => {
    render(<FilterPanel isOpen={true} />);

    const input = screen.getByPlaceholderText(/Search by keyword/i);
    fireEvent.change(input, { target: { value: "test" } });

    await waitFor(() => {
      expect(pushMock).toHaveBeenCalledWith("/?search=test&page=1");
    });
  });

  it("updates URL when sortFecha is selected", async () => {
    render(<FilterPanel isOpen={true} />);

    const select = screen.getByLabelText(/Sort by Fecha/i);
    fireEvent.change(select, { target: { value: "asc" } });

    await waitFor(() => {
      expect(pushMock).toHaveBeenCalledWith("/?sortFecha=asc&page=1");
    });
  });

  it("updates URL when valorRange changes", async () => {
    render(<FilterPanel isOpen={true} />);

    const minInput = screen.getByPlaceholderText("Min");
    fireEvent.change(minInput, { target: { value: "10" } });

    await waitFor(() => {
      expect(pushMock).toHaveBeenCalledWith("/?minValor=10&page=1");
    });
  });
});
