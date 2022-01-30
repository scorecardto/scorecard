import React from 'react';

type TableColumnProps = {
  cells: Element[];
};

export default function TableColumn({ cells }: TableColumnProps) {
  return (
    <div className="border-r border-r-gray-400 last:border-none">
      {cells.map((cell, idx) => {
        return (
          <p
            className="block pl-6 py-2 pr-2 border-b border-b-gray-400 last:border-none text-base"
            key={idx}
          >
            {cell}
          </p>
        );
      })}
    </div>
  );
}
