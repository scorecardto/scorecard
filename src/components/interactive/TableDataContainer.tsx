import React, { useEffect, useState } from 'react';

import TableColumn from './TableColumn';

type TableDataContainerProps = {
  selectedCol: number; // positive if asc, negative if desc
  data: Element[][];
  sortData: SortDataFunc;
};

type SortDataFunc = {
  (selectedCol: number, oldData: Element[][]): Element[][];
};

export default function TableDataContainer({
  data,
  sortData,
  selectedCol,
}: TableDataContainerProps) {
  const [cols, setCols] = useState<Element[][]>([]);

  useEffect(() => {
    const sorted = sortData(selectedCol, data);
    const newCols: Element[][] = [];

    sorted.forEach((row, rowIdx) => {
      row.forEach((cell, colIdx) => {
        if (rowIdx === 0) newCols[colIdx] = [];
        // @ts-ignore
        newCols[colIdx][rowIdx] = cell;
      });
    });

    setCols(newCols);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  return (
    <div className="flex border border-gray-400 w-fit">
      {cols.map((cells, idx) => {
        return (
          <TableColumn
            key={idx}
            cells={cells}
            columnIndex={idx}
            totalColumns={cols.length}
          />
        );
      })}
    </div>
  );
}
