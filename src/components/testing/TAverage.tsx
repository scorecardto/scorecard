import React from 'react';

import GradeSlider from '../interactive/GradeSlider';
import { CourseAssignments } from '@/lib/types/CourseAssignments';

type ITAverageProps = {
  course: CourseAssignments;
  selectedGradingPeriod: number;
  update(arg0: CourseAssignments): void;
};

export default function TAverage({
  course,
  selectedGradingPeriod,
  update,
}: ITAverageProps) {
  const setAverage = (n: string | number): void => {
    const grades = course.grades.slice(0);
    grades[selectedGradingPeriod] = n;

    update({
      ...course,
      grades,
    });
  };

  return (
    <div className="_TAverage flex justify-between items-center">
      <GradeSlider
        max={100}
        min={0}
        set={setAverage}
        val={(course.grades[selectedGradingPeriod] ?? 0).toString()}
      />
      <span className="text-sm text-day-400 dark:text-night-400">
        More Options
      </span>
    </div>
  );
}
