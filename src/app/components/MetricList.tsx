"use client";

import Link from "next/link";
import IMetricListProps from "../types/IMetricListProps";

const MetricsList = ({ metrics, page, totalPages }: IMetricListProps) => {
  return (
    <div className="mt-[70px] ml-[218px] p-6 max-[901px]:ml-[50px]">
      <h2 className="text-xl font-bold mb-4">Metrics</h2>

      <table className="w-full border border-gray-200 text-left text-sm max-[671px]:text-xs">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2 border-b">Nombre</th>
            <th className="p-2 border-b">Categoría</th>
            <th className="p-2 border-b">Valor</th>
            <th className="p-2 border-b">Unidad</th>
            <th className="p-2 border-b">Fecha</th>
          </tr>
        </thead>
        <tbody>
          {metrics.map((m) => (
            <tr key={m.id} className="hover:bg-gray-50">
              <td className="p-2 border-b">{m.nombreDato}</td>
              <td className="p-2 border-b">{m.categoria}</td>
              <td className="p-2 border-b">{m.valor}</td>
              <td className="p-2 border-b">{m.unidad}</td>
              <td className="p-2 border-b">
                {new Date(m.fecha).toLocaleDateString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex justify-center items-center gap-4 mt-6 max-[501px]:w-max">
        {page > 1 && (
          <Link
            href={`/?page=${page - 1}`}
            className="px-3 py-1 border rounded hover:bg-gray-100"
          >
            Prev
          </Link>
        )}
        <span>
          Page {page} of {totalPages}
        </span>
        {page < totalPages && (
          <Link
            href={`/?page=${page + 1}`}
            className="px-3 py-1 border rounded hover:bg-gray-100"
          >
            Next
          </Link>
        )}
      </div>
    </div>
  );
};

export default MetricsList;
