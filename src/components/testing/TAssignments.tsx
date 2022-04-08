import React, { useEffect, useState } from 'react';

import { motion } from 'framer-motion';

import TAssignmentRow from './TAssignmentRow';
import {
  calculateAverage,
  calculateCategory,
  parseNumberRevert,
} from '@/lib/GradeUtils';
import { Assignment } from '@/lib/types/Assignment';
import { CourseAssignments } from '@/lib/types/CourseAssignments';

type ITAssignmentsProps = {
  course: CourseAssignments;
  selectedGradingPeriod: number;
  update(arg0: CourseAssignments): void;
  setEditingContext(arg0: 'COURSE' | 'ASSIGNMENTS'): void;
};

export default function TAssignments({
  course,
  selectedGradingPeriod,
  update,
  setEditingContext,
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

  const calcAveragesMatch = (): boolean => {
    let calcAvg = parseNumberRevert(getUpdatedAverage()[selectedGradingPeriod]);
    if (typeof calcAvg === 'number') calcAvg = Math.round(calcAvg);

    let real = parseNumberRevert(course.grades[selectedGradingPeriod]);
    if (typeof real === 'number') real = Math.round(real);

    return calcAvg === real;
  };

  const [averagesMatch, setAveragesMatch] = useState<boolean>(
    calcAveragesMatch()
  );

  useEffect(() => {
    setAveragesMatch(calcAveragesMatch());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedGradingPeriod]);

  return (
    <div className="_TAssignments">
      {averagesMatch !== undefined ? (
        <>
          {averagesMatch ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              {(course.gradebook[selectedGradingPeriod] ?? []).map(
                (category, categoryIdx) => {
                  return (
                    <div className="_TCategory" key={categoryIdx}>
                      <div className="_TCategory-name h-12 flex items-center text-day-400 dark:text-night-400 px-12">
                        {category.category.name}
                      </div>
                      <div className="_TCategory-items">
                        {category.assignments.map(
                          (assignment, assignmentIdx) => {
                            return (
                              <TAssignmentRow
                                setAssignment={
                                  createUpdateAssignment(
                                    categoryIdx,
                                    assignmentIdx
                                  ).function
                                }
                                assignment={assignment}
                                key={assignmentIdx}
                              />
                            );
                          }
                        )}
                      </div>
                    </div>
                  );
                }
              )}
            </motion.div>
          ) : (
            <div className="bg-day-150 dark:bg-night-150 text-day-400 dark:text-night-400 text-center py-4 px-8 flex-col flex gap-4">
              <h3 className="text-theme-200 dark:text-night-700">
                Accuracy Warning
              </h3>
              <p className="text-sm">
                Scorecard&apos;s average calculation differs from your actual
                average.
              </p>
              <p className="text-sm flex justify-center gap-4">
                <p>
                  <span className="font-medium">Scorecard Average: </span>
                  {(() => {
                    const calc = parseNumberRevert(
                      getUpdatedAverage()[selectedGradingPeriod]
                    );
                    if (typeof calc === 'number') return Math.round(calc);
                    return calc;
                  })()}
                </p>
                <p>
                  <span className="font-medium">Your Real Average: </span>
                  {(() => {
                    const real = parseNumberRevert(
                      course.grades[selectedGradingPeriod]
                    );
                    if (typeof real === 'number') return Math.round(real);
                    return real;
                  })()}
                </p>
              </p>
              <div className="flex gap-2 justify-center mt-4">
                <div
                  className="rounded-lg px-4 py-2 bg-theme-200 text-white cursor-pointer"
                  onClick={() => {
                    setAveragesMatch(true);
                    updateAverage();
                  }}
                >
                  Continue
                </div>
                <div
                  className="rounded-lg cursor-pointer px-4 py-2 bg-theme-100 dark:bg-night-600 text-theme-200 dark:text-night-500"
                  onClick={() => {
                    setEditingContext('COURSE');
                  }}
                >
                  Cancel
                </div>
              </div>
            </div>
          )}
        </>
      ) : (
        <></>
      )}
    </div>
  );
}
