import React from 'react';

interface AlpacaStreamTableProps {
  rows: string[];
  columns: string[];
  data: Record<string, Record<string, string | number | undefined>>;
}

export function AlpacaStreamTable({ rows, columns, data }: AlpacaStreamTableProps) {
  return (
    <div className="overflow-x-auto rounded-lg border border-gray-700 bg-gray-900">
      <table className="min-w-full divide-y divide-gray-700 text-sm">
        <thead>
          <tr>
            <th className="px-2 py-2 text-gray-300 font-semibold text-left bg-gray-800">&nbsp;</th>
            {columns.map((col) => (
              <th key={col} className="px-2 py-2 text-gray-300 font-semibold bg-gray-800">
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row} className="border-b border-gray-800 hover:bg-gray-800">
              <td className="px-2 py-2 font-medium text-blue-300 whitespace-nowrap">{row}</td>
              {columns.map((col) => (
                <td key={col} className="px-2 py-2 text-gray-100 text-center whitespace-nowrap min-w-[40px]">
                  {data?.[row]?.[col] ?? ''}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// Example usage (replace with streaming logic):
// <AlpacaStreamTable
//   rows={["SPY", "QQQ", ...]}
//   columns={["T", "S", "i", "x", "p", "s", "c", "t", "z"]}
//   data={{ SPY: { T: "trade", p: 430.12 } }}
// />
