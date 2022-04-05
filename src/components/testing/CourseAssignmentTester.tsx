import React from 'react';

import GradeSlider from '../interactive/GradeSlider';
import { Assignment } from '@/lib/types/Assignment';

type ICourseAssignmentTesterProps = {
  assignment: Assignment;
  parentPrimary: boolean;
  setParentPrimary(arg0: boolean): void;
};

export default function CourseAssignmentTester({
  assignment,
  parentPrimary,
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
          set={() => {}}
          val={assignment.grade.toString()}
        />
      </span>
    </div>
  );
}
