import React, { ReactElement, useEffect, useState } from 'react';

import TextCard from '../card/TextCard';
import Checkbox from '../interactive/Checkbox';
import NumberScale from '../interactive/NumberScale';
import Renameable from '../interactive/Renameable';
import TableColumn from '../table/TableColumn';
import { AppData, AppDataProvider } from '@/lib/context/AppDataContext';
import { getGPA, getPointsFor } from '@/lib/GPAUtils';
import { transpose } from '@/lib/Util';

type IGpaAnalysisTableProps = {
  appData: AppData;
  setAppData: AppDataProvider['setAppData'];
  editingEnabled: boolean;
};

export default function GpaAnalysisTable({
  appData,
  setAppData,
  editingEnabled,
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

  const { courses, selectedGradingPeriod, formula } = appData;

  const courseNames: JSX.Element[] = [];
  const weighted: JSX.Element[] = [];
  const credit: JSX.Element[] = [];
  const grades: (string | number)[] = [];
  const points: number[] = [];
  const effect: number[] = [];

  const gpa = getGPA(courses, selectedGradingPeriod, formula);

  courses.forEach((course, idx) => {
    const coursesWithout = Array.from(courses);
    coursesWithout.splice(idx, 1);

    courseNames.push(
      <Renameable
        editingEnabled={editingEnabled}
        setName={(renamed) => {
          setAppData({
            ...appData,
            courses: [
              ...coursesWithout.slice(0, idx),
              {
                ...course,
                name: renamed,
              },
              ...coursesWithout.slice(idx),
            ],
          });
        }}
      >
        {course.name}
      </Renameable>
    );

    weighted.push(
      <Checkbox
        editingEnabled={editingEnabled}
        checked={course.weighted}
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
      />
    );

    credit.push(
      <div className="w-full">
        <NumberScale
          min={0}
          max={10}
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
          editingEnabled={editingEnabled}
        >
          {course.credit}
        </NumberScale>
      </div>
    );

    const grade = course.grades[selectedGradingPeriod] ?? 'NG';

    grades.push(grade);

    points.push(getPointsFor(grade, course.weighted, formula));

    effect.push(
      Math.round(
        (gpa - getGPA(coursesWithout, selectedGradingPeriod, formula)) * 100
      ) / 100
    );
  });

  return (
    <div>
      <div className="_gpa-analysis-col-container flex w-fit group-1" ref={ref}>
        {sort(
          [courseNames, weighted, credit, grades, points, effect],
          sortBy
        ).map((data, idx, arr) => {
          return (
            <TableColumn
              outerBorders={true}
              cells={data.map((cell, idx2) => {
                return {
                  type: 'VALUE',
                  /* add a course link at some point */
                  element: (
                    <span
                      className="h-10 whitespace-nowrap flex items-center"
                      key={idx2}
                    >
                      {cell}
                    </span>
                  ),
                };
              })}
              setComponentShowing={() => {}}
              getSetComponentShowing={() => {
                return () => {};
              }}
              header={createHeader(
                [
                  'Course',
                  'Weighted',
                  'Credit',
                  'Grade',
                  'Points',
                  'Effect on GPA',
                ][idx] ?? '',
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
              clickable={!editingEnabled}
              deltaSnapPoint={700 - width}
              forceShow={true}
            />
          );
        })}
      </div>
    </div>
  );
}
