import React, { useEffect } from 'react';

import TAssignmentRow from './TAssignmentRow';
import { calculateAverage, calculateCategory } from '@/lib/GradeUtils';
import { Assignment } from '@/lib/types/Assignment';
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
  const getUpdatedAverage = (): (string | number)[] => {
    const n = calculateAverage(
      (course.gradebook[selectedGradingPeriod] ?? []).map((c) => {
        return { ...calculateCategory(c), weight: c.category.weight };
      })
    ).toString();

    const grades = course.grades.slice(0);
    grades[selectedGradingPeriod] = n;

    return grades;
  };

  const updateAverage = (): void => {
    update({
      ...course,
      grades: getUpdatedAverage(),
    });
  };

  const createUpdateAssignment = (
    categoryIdx: number,
    assignmentIdx: number
  ): {
    function(arg0: Assignment): void;
  } => {
    return {
      function: (a: Assignment) => {
        const gradebook = course.gradebook.slice(0);

        const categories = gradebook[selectedGradingPeriod]?.slice(0) ?? [];

        if (categories[categoryIdx] != null) {
          // @ts-ignore
          categories[categoryIdx].assignments[assignmentIdx] = a;
        }

        gradebook[selectedGradingPeriod] = categories;

        update({ ...course, gradebook, grades: getUpdatedAverage() });
      },
    };
  };

  useEffect(() => {
    updateAverage();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="_TAssignments">
      {(course.gradebook[selectedGradingPeriod] ?? []).map(
        (category, categoryIdx) => {
          return (
            <div className="_TCategory" key={categoryIdx}>
              <div className="_TCategory-name">{category.category.name}</div>
              <div className="_TCategory-items">
                {category.assignments.map((assignment, assignmentIdx) => {
                  return (
                    <TAssignmentRow
                      setAssignment={
                        createUpdateAssignment(categoryIdx, assignmentIdx)
                          .function
                      }
                      assignment={assignment}
                      key={assignmentIdx}
                    />
                  );
                })}
              </div>
            </div>
          );
        }
      )}
    </div>
  );
}
