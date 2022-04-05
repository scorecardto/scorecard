import React, { useEffect, useState } from 'react';

import CourseCategoryTester from './CourseCategoryTester';
import { calculateAverage, calculateCategory } from '@/lib/GradeUtils';
import { CategoryAssignments } from '@/lib/types/CategoryAssignments';

type ICourseGradesTesterProps = {
  assignments: CategoryAssignments[];
  primary: boolean;
  setPrimary(arg0: boolean): void;
  shown: boolean;
  update(arg0: number): void;
};

export default function CourseGradesTester({
  assignments,
  primary,
  setPrimary,
  shown,
  update,
}: ICourseGradesTesterProps) {
  const [categoryAverages, setCategoryAverages] = useState<(string | number)[]>(
    []
  );

  useEffect(() => {
    if (!primary) {
      const categories = categoryAverages
        .map((average, idx) => {
          const asInt = parseInt(average.toString(), 10);
          const use = Number.isNaN(asInt) ? average : asInt;

          return typeof use === 'number'
            ? {
                average: use,
                weight: assignments[idx]?.category.weight ?? 0,
              }
            : { average: 0, weight: 0 };
        })
        .filter((c) => c != null);

      update(calculateAverage(categories));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categoryAverages]);

  return shown ? (
    <div className="_course-grades-tester">
      {assignments.map((a, idx) => {
        return (
          <CourseCategoryTester
            originalAverage={calculateCategory(a).average}
            setAverage={(n) => {
              setCategoryAverages((averages) => {
                const newArr = averages.slice(0);
                newArr[idx] = n;
                return newArr;
              });
            }}
            assignments={a}
            parentPrimary={primary}
            setParentPrimary={setPrimary}
            key={idx}
          />
        );
      })}
    </div>
  ) : (
    <></>
  );
}
