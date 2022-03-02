import React, { ReactElement, useState } from 'react';

import TextCard from '../card/TextCard';
import TableColumn, {
  ColumnStringContents,
  SetColumnShowingCallback,
} from './TableColumn';
import { transpose } from '@/lib/Util';

type Props = {
  data: ColumnStringContents[];
};

export default function ReportCardsTable({ data }: Props) {
  const [, setShownColumns] = useState<boolean[]>(
    new Array(data.length).fill(true)
  );

  const [, setShownColumnSetters] = useState<
    (SetColumnShowingCallback | undefined)[]
  >(new Array(data.length));

  const createIsColumnShowing = (idx: number) => {
    return (isShowing: boolean) => {
      setShownColumns((cols) => {
        const newCols = Array.from(cols);
        newCols[idx] = isShowing;
        return newCols;
      });
    };
  };

  const createGetSetIsColumnShowing = (idx: number) => {
    return (setIsShowing: SetColumnShowingCallback) => {
      setShownColumnSetters((colSetters) => {
        const newColSetters = Array.from(colSetters);
        newColSetters[idx] = setIsShowing;
        return newColSetters;
      });
    };
  };

  const [sortBy, setSortBy] = useState(1);

  const createHeader = (header: string, idx: number): ReactElement => {
    return (
      <>
        <div className="-ml-3">
          <TextCard
            onClick={() => {
              setSortBy((sort) => {
                if (Math.abs(sort) === idx + 1) {
                  return sort * -1;
                }
                return idx + 1;
              });
            }}
          >
            {header}
          </TextCard>
        </div>
      </>
    );
  };

  const sort = (
    // eslint-disable-next-line @typescript-eslint/no-shadow
    data: ColumnStringContents[],
    // eslint-disable-next-line @typescript-eslint/no-shadow
    sortBy: number
  ): ColumnStringContents[] => {
    const sortByIdx = Math.abs(sortBy) - 1;
    const sortAsc = sortBy > 0 ? 1 : -1;

    const sortedCells: (ReactElement | HTMLElement | string)[][] = transpose(
      transpose(
        data.map((cols) => {
          return cols.cells;
        })
      ).sort(
        (
          a: (ReactElement | HTMLElement | string)[],
          b: (ReactElement | HTMLElement | string)[]
        ) => {
          const aCell = a[sortByIdx];
          const bCell = b[sortByIdx];

          if (aCell == null || bCell == null) {
            if (aCell == null && bCell == null) return 0;
            if (aCell == null) return -1 * sortAsc;
            return 1 * sortAsc;
          }

          if (aCell > bCell) {
            return 1 * sortAsc;
          }

          if (aCell < bCell) {
            return -1 * sortAsc;
          }

          return 0;
        }
      )
    );

    return data.map((col: ColumnStringContents, idx) => {
      const returnable = col;
      // @ts-ignore
      returnable.cells = sortedCells[idx];
      return returnable;
    });
  };
  const [hoveredRow, setHoveredRow] = useState<number>(-1);

  return (
    <div className="_report-cards-table flex">
      <div className="_report-cards-col-container flex w-fit group-2">
        {sort(data, sortBy).map((column, idx, array) => {
          return (
            <TableColumn
              cells={column.cells}
              header={createHeader(column.header, idx)}
              type={column.type}
              key={idx}
              setComponentShowing={createIsColumnShowing(idx)}
              getSetComponentShowing={createGetSetIsColumnShowing(idx)}
              amFirstColumn={idx === 0}
              amLastColumn={idx === array.length - 1}
              hoveredRow={hoveredRow}
              onCellMouseOver={(idx2) => {
                setHoveredRow(idx2);
              }}
              clickable
            />
          );
        })}
      </div>
    </div>
  );
}
