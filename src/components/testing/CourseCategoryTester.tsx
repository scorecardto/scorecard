import React, { useEffect } from 'react';

import { CategoryAssignments } from '@/lib/types/CategoryAssignments';

type ICourseCategoryTestProps = {
  assignments: CategoryAssignments;
  parentPrimary: boolean;
  setParentPrimary(arg0: boolean): void;
  originalAverage: number | string;
  setAverage(arg0: number | string): void;
};

export default function CourseCategoryTester({
  assignments,
  setAverage,
  originalAverage,
}: ICourseCategoryTestProps) {
  useEffect(() => {
    setTimeout(() => {
      setAverage(
        typeof originalAverage === 'number' ? originalAverage + 10 : 90
      );
    }, 1000);
  }, []);

  return (
    <div className="_course-category-tester py-2 pr-4 pl-10">
      <div className="_category-name text-day-400 dark:text-night-400">
        {assignments.category.name}
      </div>
    </div>
  );
}
