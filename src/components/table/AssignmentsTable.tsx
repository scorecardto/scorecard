import React, { ReactElement, useEffect, useState } from 'react';

import TextCard from '../card/TextCard';
import GradeWithWeight from '../grade/GradeWithWeight';
import CourseSelector from './CourseSelector';
import TableColumn, {
  ColumnStringContents,
  SetColumnShowingCallback,
} from './TableColumn';
import { AppData } from '@/lib/context/AppDataContext';
import GradebookCategory from '@/lib/types/GradebookCategory';
import { transpose } from '@/lib/Util';

type IAssignmentsTableProps = {
  appData: AppData;
  setAppData: React.Dispatch<React.SetStateAction<AppData | null>>;
  data: (IAssignmentCategory | ColumnStringContents[])[];
};

type IAssignmentCategory = {
  name: string;
  weight: number;
};

export default function AssignmentCardsTable({
  data,
  appData,
}: IAssignmentsTableProps) {
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
        <div className="-ml-3 mb-2">
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
            };
          });
        }

        categoryBacklog.forEach(() => {
          final.forEach((finalCol, idx) => {
            if (idx === 0)
              finalCol.cells.push(new GradebookCategory('Projects', 40));
            finalCol.cells.push(undefined);
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

  const [hoveredRow, setHoveredRow] = useState(-1);

  const [width, setWidth] = useState(0);

  const ref = React.createRef<HTMLDivElement>();

  const onResize = () => {
    setWidth(ref.current?.clientWidth ?? -1);
  };

  useEffect(() => {
    setWidth(ref.current?.clientWidth ?? -1);
  }, [ref]);

  return (
    <div className="_assignments-table flex">
      <CourseSelector courses={appData.courses} selected={''} />

      <div className="flex flex-col">
        <div
          className="_assignments-col-container flex w-fit relative group-1"
          ref={ref}
        >
          {assemble(data, sortBy).map((column, idx, array) => {
            return (
              <TableColumn
                outerBorders={true}
                clickable={true}
                cells={column.cells.map((str, idx2) => {
                  return {
                    type:
                      str instanceof GradebookCategory ? 'CATEGORY' : 'VALUE',
                    element:
                      column.type === 'GRADE' ? (
                        str
                      ) : (
                        <span
                          className={`h-8 whitespace-nowrap ${
                            str instanceof GradebookCategory
                              ? 'my-1 flex items-center w-full'
                              : 'mt-2 block'
                          }`}
                          key={idx2}
                        >
                          {str instanceof GradebookCategory ? (
                            <span className="flex items-center justify-end w-full">
                              <span className="flex-inital absolute left-1/2 -translate-x-1/2">
                                {str.name}
                              </span>
                              <span className="block">
                                <GradeWithWeight
                                  grade={str.weight.toString()}
                                  weight={str.weight}
                                />
                              </span>
                            </span>
                          ) : (
                            str
                          )}
                        </span>
                      ),
                  };
                })}
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
                deltaSnapPoint={594 - width}
                onResize={onResize}
              />
            );
          })}
        </div>
        <div className="h-full bg-day-200 dark:bg-night-200 border-r border-b border-day-300 dark:border-night-300"></div>
      </div>
    </div>
  );
}
