import React from 'react';

import GradeSlider from '../interactive/GradeSlider';
import TAverageOptions from './TAverageOptions';
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

  const setCourse = (n: CourseAssignments): void => {
    update(n);
  };

  return (
    <div className="_TAverage flex justify-between items-center py-4 px-4">
      <GradeSlider
        max={100}
        min={0}
        set={setAverage}
        val={(course.grades[selectedGradingPeriod] ?? 0).toString()}
      />
      <TAverageOptions
        course={course}
        setCourse={setCourse}
        selectedGradingPeriod={selectedGradingPeriod}
      />
    </div>
  );
}
