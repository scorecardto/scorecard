import React, { useEffect, useState } from 'react';

import Checkbox from '../interactive/Checkbox';
import ScalingInput from '../interactive/ScalingInput';
import { parseNumberRevert } from '@/lib/GradeUtils';
import { CourseAssignments } from '@/lib/types/CourseAssignments';

type ITAverageOptionsProps = {
  course: CourseAssignments;
  selectedGradingPeriod: number;
  setCourse(arg0: CourseAssignments): void;
};

export default function TAverageOptions({
  course,
  selectedGradingPeriod,
  setCourse,
}: ITAverageOptionsProps) {
  const [animateState, setAnimateState] = useState(-2);

  useEffect(() => {
    if (animateState === 0) {
      setAnimateState(1);
    }
    if (animateState === 1) {
      const onClick = () => {
        setAnimateState(-1);
      };

      document.addEventListener('click', onClick);

      return () => {
        document.removeEventListener('click', onClick);
      };
    }
    if (animateState === -1) {
      setTimeout(() => {
        setAnimateState(-2);
      }, 200);
    }
    return () => {};
  }, [animateState]);

  const [credit, setCredit] = useState(course.credit.toString());

  useEffect(() => {
    const parsed = parseNumberRevert(credit, true);

    setCourse({
      ...course,
      credit: typeof parsed === 'number' ? parsed : 0,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [credit]);

  return (
    <div className="relative">
      <div
        className="hover:bg-day-250 dark:hover:bg-night-250 rounded-lg flex items-center justify-center relative px-2 py-1"
        onClick={() => {
          if (animateState === -2) {
            setAnimateState(0);
          } else if (animateState === 1) {
            setAnimateState(-1);
          }
        }}
      >
        <span className="text-sm text-day-400 dark:text-night-400 whitespace-nowrap">
          More Options
        </span>
      </div>

      <div
        className={`_TAssignmentOptions absolute pb-2 bg-day-100 dark:bg-night-100 border border-day-300 dark:border-night-300 z-10 transition-opacity-transform duration-200 origin-top-right right-0 top-6 rounded-md text-day-400 dark:text-night-400 ${
          animateState === -2 ? 'hidden' : ''
        } ${animateState !== 1 ? 'scale-75 opacity-0' : ''}`}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <p className="px-5 py-2 text-day-700 dark:text-night-700">Options</p>
        <div className="flex items-center gap-4 px-5 border-t border-t-day-300 dark:border-t-night-300 py-2">
          <p className="text-day-400 dark:text-night-400">Average</p>
          <ScalingInput
            value={course.grades[selectedGradingPeriod]?.toString() ?? ''}
            checkValidity={() => {
              return (
                typeof parseNumberRevert(
                  course.grades[selectedGradingPeriod],
                  true
                ) === 'number' ||
                ['NG', 'P', 'F'].includes(
                  course.grades[selectedGradingPeriod]
                    ?.toString()
                    .toUpperCase() ?? ''
                )
              );
            }}
            update={(n) => {
              const newGrades = course.grades.slice(0);
              newGrades[selectedGradingPeriod] = n;

              setCourse({ ...course, grades: newGrades });
            }}
          />
        </div>

        <div className="flex items-center gap-4 px-5 border-t border-t-day-300 dark:border-t-night-300 py-2">
          <p className="text-day-400 dark:text-night-400">Credit</p>
          <ScalingInput
            value={credit}
            checkValidity={() => {
              return true;
            }}
            update={(n) => {
              setCredit(n);
            }}
          />
        </div>

        <div className="flex items-center gap-4 px-5 border-t border-t-day-300 dark:border-t-night-300">
          <p className="text-day-400 dark:text-night-400">Weighted</p>
          <Checkbox
            checked={course.weighted}
            editingEnabled={true}
            onClick={(n) => {
              setCourse({ ...course, weighted: n });
            }}
          />
        </div>
      </div>
    </div>
  );
}
