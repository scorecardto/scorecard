import React from 'react';

import { getGPA } from '@/lib/GPAUtils';
import { Course } from '@/lib/types/Course';
import { GPAFormula } from '@/lib/types/GPAFormula';

type IGpaQuickStatsProps = {
  courses: Course[];
  gradingPeriod: number;
  formula: GPAFormula;
};

export default function GpaQuickStats({
  courses,
  gradingPeriod,
  formula,
}: IGpaQuickStatsProps) {
  return (
    <div className="_gpa-quick-stats bg-day-200 dark:bg-night-200 w-full leading-loose px-4 py-2 border-day-300 dark:border-night-300 border">
      <p className="text-day-700 dark:text-night-700">Quick Info</p>
      <div className="text-day-400 dark:text-night-400">
        <p>{`${formula.weighted ? 'Unweighted' : 'Weighted'} GPA: ${getGPA(
          courses,
          gradingPeriod,
          {
            ...formula,
            weighted: !formula.weighted,
          }
        )}`}</p>

        <p>
          Weighted Classes:{' '}
          {`${
            courses.filter((course) => {
              return course.weighted;
            }).length
          }/${courses.length}`}
        </p>
      </div>
    </div>
  );
}
