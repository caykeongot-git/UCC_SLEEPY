import React from 'react';
import { cn } from '../../utils/cn';

const Table = ({ columns = [], data = [], className }) => {
  return (
    <div className={cn("w-full overflow-x-auto rounded-lg border border-dark-700 bg-dark-800 shadow-xl", className)}>
      <table className="w-full text-left border-collapse">
        <thead className="bg-dark-900/50">
          <tr>
            {columns.map((col, idx) => (
              <th 
                key={idx} 
                className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-light-500 border-b border-dark-700"
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-dark-700">
          {data.length > 0 ? (
            data.map((row, rowIdx) => (
              <tr key={rowIdx} className="hover:bg-dark-700/30 transition-colors">
                {columns.map((col, colIdx) => (
                  <td key={colIdx} className="px-6 py-4 text-sm text-light-300">
                    {col.render ? col.render(row) : row[col.accessor]}
                  </td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={columns.length} className="px-6 py-10 text-center text-light-500 italic">
                Không có dữ liệu hiển thị.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
