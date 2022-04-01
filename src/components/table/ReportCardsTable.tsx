import React, { ReactElement, useEffect, useMemo, useState } from 'react';

import TextCard from '../card/TextCard';
import Checkbox from '../interactive/Checkbox';
import NumberScale from '../interactive/NumberScale';
import Renameable from '../interactive/Renameable';
import TableColumn, { SetColumnShowingCallback } from './TableColumn';
import { AppData, AppDataProvider } from '@/lib/context/AppDataContext';
import SortableElement from '@/lib/SortableElement';
import { Course } from '@/lib/types/Course';

type IReportCardsTableProps = {
  appData: AppData;
  setAppData: AppDataProvider['setAppData'];
  editingEnabled: boolean;
};

export default function ReportCardsTable({
  appData,
  setAppData,
  editingEnabled,
}: IReportCardsTableProps) {
  const [shownColumns, setShownColumns] = useState<boolean[]>(
    new Array(appData.courses.length).fill(true)
  );

  const [columnSetters, setShownColumnSetters] = useState<
    (SetColumnShowingCallback | undefined)[]
  >(new Array(appData.courses.length));

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
        <div className="-ml-3 flex flex-row flex-nowrap justify-between">
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
    courses: Course[],
    // eslint-disable-next-line @typescript-eslint/no-shadow
    selected: number,
    // eslint-disable-next-line @typescript-eslint/no-shadow
    sortBy: number
  ): {
    data: (string | number | boolean | JSX.Element)[][];
    grades: (string | number | boolean | JSX.Element)[];
  } => {
    const sortByIdx = Math.abs(sortBy) - 1;
    const sortAsc = sortBy > 0 ? 1 : -1;

    const rows: (string | number | boolean | SortableElement)[][] = courses.map(
      (course, idx) => {
        const coursesWithout = Array.from(appData.courses);
        coursesWithout.splice(idx, 1);

        let returnable: (string | number | SortableElement)[] = [
          new SortableElement(
            course.name,
            (
              <Renameable
                editingEnabled={editingEnabled}
                setName={(name) => {
                  setAppData({
                    ...appData,
                    courses: [
                      ...coursesWithout.slice(0, idx),
                      {
                        ...course,
                        name,
                      },
                      ...coursesWithout.slice(idx),
                    ],
                  });
                }}
                key={idx}
              >
                {course.name}
              </Renameable>
            )
          ),
          new SortableElement(
            course.weighted,
            (
              <div className="h-8 flex items-center">
                <Checkbox
                  onClick={(checked) => {
                    setAppData({
                      ...appData,
                      courses: [
                        ...coursesWithout.slice(0, idx),
                        {
                          ...course,
                          weighted: checked,
                        },
                        ...coursesWithout.slice(idx),
                      ],
                    });
                  }}
                  editingEnabled={editingEnabled}
                  checked={course.weighted}
                  key={idx}
                />
              </div>
            )
          ),
          new SortableElement(
            course.credit,
            (
              <NumberScale
                editingEnabled={editingEnabled}
                setNumber={(num) => {
                  setAppData({
                    ...appData,
                    courses: [
                      ...coursesWithout.slice(0, idx),
                      {
                        ...course,
                        credit: num,
                      },
                      ...coursesWithout.slice(idx),
                    ],
                  });
                }}
                max={10}
                min={0}
                key={idx}
              >
                {course.credit}
              </NumberScale>
            )
          ),
        ];

        returnable = returnable.concat(
          course.otherFields.map((field) => field.value)
        );

        return returnable.concat([course.grades[selected] ?? '--']);
      }
    );

    const sorted = rows.sort((a, b) => {
      let aCell = a[sortByIdx];
      let bCell = b[sortByIdx];

      if (aCell == null || bCell == null) {
        if (aCell == null && bCell == null) return 0;
        if (aCell == null) return -1 * sortAsc;
        return 1 * sortAsc;
      }

      if (aCell instanceof SortableElement) {
        aCell = aCell.sortInput;
      }

      if (bCell instanceof SortableElement) {
        bCell = bCell.sortInput;
      }

      if (typeof aCell !== typeof bCell) {
        aCell = aCell.toString();
        bCell = bCell.toString();
      }

      if (aCell > bCell) {
        return 1 * sortAsc;
      }

      if (aCell < bCell) {
        return -1 * sortAsc;
      }

      return 0;
    });

    const dataReturnable: (string | number | boolean | JSX.Element)[][] = [];
    const gradesReturnable: (string | number | boolean | JSX.Element)[] = [];

    sorted.forEach((row, idx) => {
      row.forEach((cell, idx2) => {
        if (idx2 === row.length - 1) {
          if (cell instanceof SortableElement) {
            gradesReturnable[idx] = cell.sortOutput;
          } else {
            gradesReturnable[idx] = cell;
          }
        } else {
          if (dataReturnable[idx2] == null) dataReturnable[idx2] = [];

          if (cell instanceof SortableElement) {
            // @ts-ignore
            dataReturnable[idx2][idx] = cell.sortOutput;
          } else {
            // @ts-ignore
            dataReturnable[idx2][idx] = cell;
          }
        }
      });
    });

    return {
      data: dataReturnable,
      grades: gradesReturnable,
    };
  };

  const [hoveredRow, setHoveredRow] = useState<number>(-1);

  const [width, setWidth] = useState(-1);

  const ref = React.createRef<HTMLDivElement>();

  const onResize = () => {
    setWidth(ref.current?.clientWidth ?? -1);
  };

  useEffect(() => {
    setWidth(ref.current?.clientWidth ?? -1);
  }, [ref]);

  const sorted = useMemo(
    () => sort(appData.courses, appData.selectedGradingPeriod, sortBy),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [appData, sortBy]
  );

  useEffect(() => {
    if (editingEnabled) {
      const wasEnabled = [shownColumns[1], shownColumns[2]];
      columnSetters[1]?.(true);
      columnSetters[2]?.(true);

      return () => {
        columnSetters[1]?.(!!wasEnabled[0]);
        columnSetters[2]?.(!!wasEnabled[1]);
      };
    }
    return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editingEnabled]);

  return (
    <div className="_report-cards-table flex">
      <div className="_report-cards-col-container flex w-fit group-2" ref={ref}>
        {sorted ? (
          sorted.data.map((column, idx) => {
            return (
              <TableColumn
                cells={column.map((str, idx2) => {
                  return {
                    type: 'VALUE',
                    link: !editingEnabled ? '/assignments' : undefined,
                    element: (
                      <span
                        className="h-8 whitespace-nowrap block my-1"
                        key={idx2}
                      >
                        {str}
                      </span>
                    ),
                  };
                })}
                onResize={onResize}
                header={createHeader(
                  idx <= 2
                    ? ['Course Name', 'Weighted', 'Credit'][idx] ?? 'Unknown'
                    : appData.courses[0]?.otherFields[idx - 3]?.key ??
                        'Unknown',
                  idx
                )}
                type={idx === 0 ? 'COURSE_NAME' : 'OTHER_FIELD'}
                key={idx}
                setComponentShowing={createIsColumnShowing(idx)}
                getSetComponentShowing={createGetSetIsColumnShowing(idx)}
                amFirstColumn={idx === 0}
                amLastColumn={false}
                hoveredRow={hoveredRow}
                onCellMouseOver={(idx2) => {
                  setHoveredRow(idx2);
                }}
                clickable={!editingEnabled}
                deltaSnapPoint={850 - width}
              />
            );
          })
        ) : (
          <></>
        )}

        <TableColumn
          cells={sorted.grades.map((g) => {
            return {
              type: 'VALUE',
              link: !editingEnabled ? '/assignments' : undefined,
              element: g.toString() ?? '',
            };
          })}
          header={createHeader('Grade', sorted.data.length)}
          type={'GRADE'}
          key={sorted.data.length}
          setComponentShowing={createIsColumnShowing(sorted.data.length)}
          getSetComponentShowing={createGetSetIsColumnShowing(
            sorted.data.length
          )}
          amFirstColumn={sorted.data.length === 0}
          amLastColumn={true}
          hoveredRow={hoveredRow}
          onCellMouseOver={(idx2) => {
            setHoveredRow(idx2);
          }}
          clickable={!editingEnabled}
          onResize={onResize}
          deltaSnapPoint={700 - width}
        />
      </div>
    </div>
  );
}
