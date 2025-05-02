// src/common/components/Table.tsx
import React from 'react';

interface TableProps {
  columns: string[];
  data: Record<string, any>[];
}

export const Table: React.FC<TableProps> = ({ columns, data }) => (
  <table className="min-w-full bg-white">
    <thead>
      <tr>
        {columns.map(col => (
          <th key={col} className="px-4 py-2 border-b text-left">{col}</th>
        ))}
      </tr>
    </thead>
    <tbody>
      {data.map((row, idx) => (
        <tr key={idx} className="hover:bg-gray-100">
          {columns.map(col => (
            <td key={col} className="px-4 py-2 border-b">{row[col]}</td>
          ))}
        </tr>
      ))}
    </tbody>
  </table>
);