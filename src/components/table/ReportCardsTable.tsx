import React, { ReactElement, useEffect, useState } from 'react';

import { IoBookmarks, IoBookmark } from 'react-icons/io5';

import SelectorCard from '../card/SelectorCard';
import { STATIC_CARD_ICON_STYLES } from '../card/StaticCard';
import TextCard from '../card/TextCard';
import Checkbox from '../interactive/Checkbox';
import TableColumn, { SetColumnShowingCallback } from './TableColumn';
import { Course } from '@/lib/types/Course';
import { GradingPeriod } from '@/lib/types/GradingPeriod';

type IReportCardsTableProps = {
  data: Course[];
  gradingPeriods: GradingPeriod[];
  selected: number;
  updateGradingPeriod?(arg0: number): void;
  editingEnabled: boolean;
};

export default function ReportCardsTable({
  data,
  gradingPeriods,
  selected,
  updateGradingPeriod,
  editingEnabled,
}: IReportCardsTableProps) {
  const [shownColumns, setShownColumns] = useState<boolean[]>(
    new Array(data.length).fill(true)
  );

  const [columnSetters, setShownColumnSetters] = useState<
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

  const [gradingPeriod, setGradingPeriod] = useState(selected);

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

  const createHeader = (
    header: string,
    idx: number,
    totalLength: number
  ): ReactElement => {
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
          {idx === totalLength ? (
            <div className="_col-changer w-48 flex flex-row justify-end">
              <SelectorCard
                selected={gradingPeriod}
                setSelected={setGradingPeriod}
                options={gradingPeriods.map((g) => g.name)}
                cardIcon={<IoBookmarks className={STATIC_CARD_ICON_STYLES} />}
                icon={<IoBookmark className={STATIC_CARD_ICON_STYLES} />}
                selectedIcon={
                  <IoBookmark className={STATIC_CARD_ICON_STYLES} />
                }
                onSelected={updateGradingPeriod}
              />
            </div>
          ) : (
            <></>
          )}
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
    data: (string | number | JSX.Element)[][];
    grades: (string | number | JSX.Element)[];
  } => {
    const sortByIdx = Math.abs(sortBy) - 1;
    const sortAsc = sortBy > 0 ? 1 : -1;

    const rows: (string | number | JSX.Element)[][] = courses.map(
      (course, idx) => {
        const returnable: (string | number | JSX.Element)[] = [
          course.name,
          <Checkbox
            onClick={() => {}}
            editingEnabled={false}
            checked={course.weighted}
            key={idx}
          />,
          course.credit,
        ].concat(course.otherFields.map((field) => field.value));

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

    const dataReturnable: (string | number | JSX.Element)[][] = [];
    const gradesReturnable: (string | number | JSX.Element)[] = [];

    sorted.forEach((row, idx) => {
      row.forEach((cell, idx2) => {
        if (idx2 === row.length - 1) {
          gradesReturnable[idx] = cell;
        } else {
          if (dataReturnable[idx2] == null) dataReturnable[idx2] = [];
          // @ts-ignore
          dataReturnable[idx2][idx] = cell;
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

  const sorted = sort(data, gradingPeriod, sortBy);

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
          sorted.data.map((column, idx, array) => {
            return (
              <TableColumn
                cells={column.map((str, idx2) => {
                  return {
                    type: 'VALUE',
                    link: !editingEnabled ? '/assignments' : undefined,
                    element: (
                      <span
                        className="h-8 whitespace-nowrap block mt-2"
                        key={idx2}
                      >
                        {str}
                      </span>
                    ),
                  };
                })}
                animated
                onResize={onResize}
                header={createHeader(
                  idx <= 2
                    ? ['Course Name', 'Weighted', 'Credit'][idx] ?? 'Unknown'
                    : data[0]?.otherFields[idx - 3]?.key ?? 'Unknown',
                  idx,
                  array.length
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
                deltaSnapPoint={700 - width}
              />
            );
          })
        ) : (
          <></>
        )}

        <TableColumn
          animated
          cells={sorted.grades.map((g) => {
            return {
              type: 'VALUE',
              link: !editingEnabled ? '/assignments' : undefined,
              element: g.toString() ?? '',
            };
          })}
          header={createHeader('Grade', sorted.data.length, sorted.data.length)}
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
