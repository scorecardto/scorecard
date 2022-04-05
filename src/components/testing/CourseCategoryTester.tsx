import React, { useEffect, useState } from 'react';

import FoldableChevron from '../interactive/FoldableChevron';
import GradeSlider from '../interactive/GradeSlider';
import CourseAssignmentTester from './CourseAssignmentTester';
import { calculateCategory } from '@/lib/GradeUtils';
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
  parentPrimary,
  setParentPrimary,
}: ICourseCategoryTestProps) {
  const [grades, setGrades] = useState<(string | number)[]>([]);

  const [newAverage, setNewAverage] = useState(originalAverage);
  const [categoryIsPrimary, setCategoryIsPrimary] = useState(true);

  useEffect(() => {
    setAverage(newAverage);
    if (parentPrimary) {
      setParentPrimary(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newAverage]);

  useEffect(() => {
    if (parentPrimary) {
      setCategoryIsPrimary(false);
      setNewAverage(originalAverage);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [parentPrimary]);

  useEffect(() => {
    if (!categoryIsPrimary) {
      setNewAverage(
        calculateCategory({
          category: assignments.category,
          assignments: assignments.assignments.map((a, idx) => {
            return {
              ...a,
              grade: grades[idx] ?? 0,
              dropped: grades[idx] == null ? true : a.dropped,
            };
          }),
        }).average
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [grades]);

  const [expanded, setExpanded] = useState(false);

  return (
    <div className="_course-category-tester">
      <div
        className="_course-category-tester-category pr-4 pl-6 flex justify-between items-center hover:bg-day-150 dark:hover:bg-night-150"
        onClick={() => {
          setExpanded(!expanded);
        }}
      >
        <div className="_category-name text-day-400 dark:text-night-400 flex items-center">
          <FoldableChevron expanded={expanded} />
          <span>{assignments.category.name}</span>
        </div>
        <span
          className={`transition-opacity ${
            parentPrimary || !categoryIsPrimary ? 'opacity-30' : 'opacity-100'
          }`}
        >
          <GradeSlider
            min={0}
            max={100}
            set={(n) => {
              setNewAverage(n);
              setCategoryIsPrimary(true);
            }}
            val={newAverage.toString()}
          />
        </span>
      </div>
      {expanded ? (
        <div className="_course-category-tester-assignments">
          {assignments.assignments.map((a, idx) => {
            return (
              <CourseAssignmentTester
                key={idx}
                assignment={a}
                parentPrimary={categoryIsPrimary || parentPrimary}
                setParentPrimary={setCategoryIsPrimary}
                setGrade={(n) => {
                  setGrades((g) => {
                    const newArr = g.slice(0);
                    newArr[idx] = n;
                    return newArr;
                  });
                }}
              />
            );
          })}
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}
