import React, { useState } from 'react';

import CourseCategoryTester from './CourseCategoryTester';
import { calculateCategory } from '@/lib/GradeUtils';
import { CategoryAssignments } from '@/lib/types/CategoryAssignments';

type ICourseGradesTesterProps = {
  assignments: CategoryAssignments[];
  primary: boolean;
  setPrimary(arg0: boolean): void;
  shown: boolean;
};

export default function CourseGradesTester({
  assignments,
  primary,
  setPrimary,
  shown,
}: ICourseGradesTesterProps) {
  const [categoryAverages, setCategoryAverages] = useState<(string | number)[]>(
    []
  );

  return shown ? (
    <div className="_course-grades-tester">
      <p>{categoryAverages.toString()}</p>
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
