import React, { useEffect } from 'react';

import { calculateAverage, calculateCategory } from '@/lib/GradeUtils';
import { CourseAssignments } from '@/lib/types/CourseAssignments';

type ITAssignmentsProps = {
  course: CourseAssignments;
  selectedGradingPeriod: number;
  update(arg0: CourseAssignments): void;
};

export default function TAssignments({
  course,
  selectedGradingPeriod,
  update,
}: ITAssignmentsProps) {
  const updateAverage = (): void => {
    const n = calculateAverage(
      (course.gradebook[selectedGradingPeriod] ?? []).map((c) => {
        return { ...calculateCategory(c), weight: c.category.weight };
      })
    ).toString();

    const grades = course.grades.slice(0);
    grades[selectedGradingPeriod] = n;

    update({
      ...course,
      grades,
    });
  };

  useEffect(() => {
    updateAverage();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="_TAssignments flex justify-between items-center"></div>
  );
}
