import React, { useEffect, useState } from 'react';

import GradeSlider from '../interactive/GradeSlider';
import { Assignment } from '@/lib/types/Assignment';

type ICourseAssignmentTesterProps = {
  assignment: Assignment;
  parentPrimary: boolean;
  setParentPrimary(arg0: boolean): void;
  setGrade(arg0: number | string): void;
};

export default function CourseAssignmentTester({
  assignment,
  parentPrimary,
  setGrade,
  setParentPrimary,
}: // setParentPrimary,
ICourseAssignmentTesterProps) {
  // const [newAverage, setNewAverage] = useState(originalAverage);

  // useEffect(() => {
  //   if (newAverage === originalAverage && parentPrimary) return;

  //   setAverage(newAverage);
  //   if (parentPrimary) {
  //     setParentPrimary(false);
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [newAverage]);

  // useEffect(() => {
  //   if (parentPrimary) {
  //     setNewAverage(originalAverage);
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [parentPrimary]);

  // const [expanded, setExpanded] = useState(false);

  const [newGrade, setNewGrade] = useState(assignment.grade);

  useEffect(() => {
    setParentPrimary(false);
    setGrade(newGrade);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newGrade]);

  useEffect(() => {
    if (parentPrimary) {
      setNewGrade(assignment.grade);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [parentPrimary]);

  return (
    <div className="_course-assignment-tester pr-4 pl-6 flex justify-between items-center">
      <div className="_category-name text-day-700 dark:text-night-700 flex items-center">
        {assignment.name}
      </div>
      <span
        className={`transition-opacity ${
          parentPrimary ? 'opacity-30' : 'opacity-100'
        }`}
      >
        <GradeSlider
          min={0}
          max={100}
          set={setNewGrade}
          val={newGrade.toString()}
        />
      </span>
    </div>
  );
}
