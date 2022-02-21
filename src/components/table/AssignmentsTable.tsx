import React, { ReactElement, useState } from 'react';

import TextCard from '../card/TextCard';
import TableColumn, {
  ColumnStringContents,
  SetColumnShowingCallback,
} from './TableColumn';
import { transpose } from '@/lib/Util';

type IAssignmentsTableProps = {
  data: (IAssignmentCategory | ColumnStringContents[])[];
};

type IAssignmentCategory = {
  name: string;
  weight: number;
};

export default function AssignmentCardsTable({ data }: IAssignmentsTableProps) {
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

  const assemble = (
    // eslint-disable-next-line @typescript-eslint/no-shadow
    data: (IAssignmentCategory | ColumnStringContents[])[],
    // eslint-disable-next-line @typescript-eslint/no-shadow
    sortBy: number
  ): ColumnStringContents[] => {
    const final: ColumnStringContents[] = [];

    const sorted = data.map((sect) => {
      if (Array.isArray(sect)) {
        const sortByIdx = Math.abs(sortBy) - 1;
        const sortAsc = sortBy > 0 ? 1 : -1;

        const sortedCells: (ReactElement | HTMLElement | string)[][] =
          transpose(
            transpose(
              sect.map((cols) => {
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

        return sect.map((col: ColumnStringContents, idx) => {
          const returnable = col;
          // @ts-ignore
          returnable.cells = sortedCells[idx];
          return returnable;
        });
      }
      return sect;
    });

    let categoryBacklog: IAssignmentCategory[] = [];

    sorted.forEach((sect) => {
      if (Array.isArray(sect)) {
        if (final.length === 0) {
          sect.forEach((col, idx) => {
            final[idx] = {
              cells: [],
              header: col.header,
              type: col.type,
              zIndex: col.zIndex,
            };
          });
        }

        categoryBacklog.forEach(() => {
          final.forEach((finalCol, idx) => {
            finalCol.cells.push(undefined);
            if (idx === 0) finalCol.cells.push('');
          });
        });
        categoryBacklog = [];

        sect.forEach((col, idx) => {
          final[idx]?.cells.push.apply(final[idx]?.cells ?? [], col.cells);
        });
      } else {
        categoryBacklog.push(sect);
      }
    });
    // @ts-ignore
    return final;
  };

  return (
    <div className="_assignments-table">
      <div className="_assignments-col-container flex w-fit relative">
        {assemble(data, sortBy).map((column, idx) => {
          return (
            <TableColumn
              cells={column.cells}
              header={createHeader(column.header, idx)}
              type={column.type}
              zIndex={data.length - idx - 1}
              key={idx}
              setComponentShowing={createIsColumnShowing(idx)}
              getSetComponentShowing={createGetSetIsColumnShowing(idx)}
              amFirstColumn={idx === 0}
            />
          );
        })}
      </div>
    </div>
  );
}
