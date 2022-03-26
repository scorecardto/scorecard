import React, { ReactElement, useEffect, useState } from 'react';

import TextCard from '../card/TextCard';
import Checkbox from '../interactive/Checkbox';
import TableColumn from '../table/TableColumn';
import { transpose } from '@/lib/Util';

type IGpaAnalysisTableProps = {
  courses: string[];
  weighted: boolean[];
  grades: (string | number)[];
  gpa: (string | number)[];
  delta: (string | number)[];
};

export default function GpaAnalysisTable({
  courses,
  weighted,
  grades,
  delta,
  gpa,
}: IGpaAnalysisTableProps) {
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
    data: any[][],
    // eslint-disable-next-line @typescript-eslint/no-shadow
    sortBy: number
  ): any[][] => {
    const sortByIdx = Math.abs(sortBy) - 1;
    const sortAsc = sortBy > 0 ? 1 : -1;

    const sortedCells: any[][] = transpose(
      transpose(data).sort((a: any[], b: any[]) => {
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
      })
    );

    return data.map((_, idx) => {
      const returnable = sortedCells[idx] ?? [];
      return returnable;
    });
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

  return (
    <div>
      <div className="_gpa-analysis-col-container flex w-fit group-2" ref={ref}>
        {sort([courses, weighted, grades, gpa, delta], sortBy).map(
          (data, idx, arr) => {
            return (
              <TableColumn
                cells={data.map((cell, idx2) => {
                  return {
                    type: 'VALUE',
                    /* add a course link at some point */
                    element:
                      typeof cell === 'boolean' ? (
                        <span
                          className="h-8 whitespace-nowrap flex items-center my-1"
                          key={idx2}
                        >
                          <Checkbox checked={cell} />
                        </span>
                      ) : (
                        <span
                          className="h-9 whitespace-nowrap block mt-1"
                          key={idx2}
                        >
                          {cell.toString()}
                        </span>
                      ),
                  };
                })}
                setComponentShowing={() => {}}
                getSetComponentShowing={() => {
                  return () => {};
                }}
                header={createHeader(
                  ['Course', 'Weighted', 'Grade', 'Points', 'Deviation'][idx] ??
                    '',
                  idx
                )}
                key={idx}
                hoveredRow={hoveredRow}
                onResize={onResize}
                type={idx === 0 ? 'COURSE_NAME' : 'OTHER_FIELD'}
                amFirstColumn={idx === 0}
                amLastColumn={idx === arr.length - 1}
                onCellMouseOver={(idx2) => {
                  setHoveredRow(idx2);
                }}
                clickable
                deltaSnapPoint={700 - width}
                forceShow={true}
              />
            );
          }
        )}
      </div>
    </div>
  );
}
