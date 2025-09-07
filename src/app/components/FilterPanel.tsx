"use client";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import IFilterPanelProps from "../types/IFilterPanelProps";

const FilterPanel = ({ isOpen }: IFilterPanelProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [search, setSearch] = useState(searchParams.get("search") || "");
  const [sortFecha, setSortFecha] = useState<"asc" | "desc" | "">(
    (searchParams.get("sortFecha") as "asc" | "desc" | "") || ""
  );
  const [sortValor, setSortValor] = useState<"asc" | "desc" | "">(
    (searchParams.get("sortValor") as "asc" | "desc" | "") || ""
  );
  const [valorRange, setValorRange] = useState({
    min: searchParams.get("minValor") || "",
    max: searchParams.get("maxValor") || "",
  });

  useEffect(() => {
    const delay = setTimeout(() => {
      updateURL();
    }, 500);
    return () => clearTimeout(delay);
  }, [search, sortFecha, sortValor, valorRange]);

  const updateURL = () => {
    const params = new URLSearchParams(searchParams.toString());

    if (search) params.set("search", search);
    else params.delete("search");

    if (sortFecha) {
      params.set("sortFecha", sortFecha);
      params.delete("sortValor");
    } else if (sortValor) {
      params.set("sortValor", sortValor);
      params.delete("sortFecha");
    } else {
      params.delete("sortFecha");
      params.delete("sortValor");
    }

    if (valorRange.min) params.set("minValor", valorRange.min);
    else params.delete("minValor");

    if (valorRange.max) params.set("maxValor", valorRange.max);
    else params.delete("maxValor");

    params.set("page", "1");

    router.push(`/?${params.toString()}`);
  };

  return (
    <div
      className={`flex flex-col gap-6 mt-6 transition-opacity duration-300 ${
        isOpen ? "max-[901px]:opacity-100" : "max-[901px]:opacity-0"
      }`}
    >
      <div>
        <label
          htmlFor="search-input"
          className="block text-sm font-medium mb-2"
        >
          Search
        </label>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by keyword..."
          className="w-full border rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          id="search-input"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2" htmlFor="dateSort">
          Sort by Fecha
        </label>
        <select
          id="dateSort"
          value={sortFecha}
          onChange={(e) => setSortFecha(e.target.value as "asc" | "desc" | "")}
          className="w-full border rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">None</option>
          <option value="asc">Oldest → Newest</option>
          <option value="desc">Newest → Oldest</option>
        </select>
      </div>

      <div>
        <label htmlFor="valueSort" className="block text-sm font-medium mb-2">
          Sort by Valor
        </label>
        <select
          id="valueSort"
          value={sortValor}
          onChange={(e) => setSortValor(e.target.value as "asc" | "desc" | "")}
          className="w-full border rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">None</option>
          <option value="asc">Lowest → Highest</option>
          <option value="desc">Highest → Lowest</option>
        </select>

        <div className="flex gap-2 mt-3">
          <input
            type="number"
            placeholder="Min"
            value={valorRange.min}
            onChange={(e) =>
              setValorRange({ ...valorRange, min: e.target.value })
            }
            className="w-1/2 border rounded px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="number"
            placeholder="Max"
            value={valorRange.max}
            onChange={(e) =>
              setValorRange({ ...valorRange, max: e.target.value })
            }
            className="w-1/2 border rounded px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>
    </div>
  );
};

export default FilterPanel;
