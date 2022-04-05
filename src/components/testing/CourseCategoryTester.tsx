import React, { useEffect, useState } from 'react';

import FoldableChevron from '../interactive/FoldableChevron';
import GradeSlider from '../interactive/GradeSlider';
import CourseAssignmentTester from './CourseAssignmentTester';
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
  // const [grades, setGrades] = useState<(string | number)[]>([]);

  const [newAverage, setNewAverage] = useState(originalAverage);
  const [categoryIsParent, setCategoryIsParent] = useState(!parentPrimary);

  useEffect(() => {
    if (newAverage === originalAverage && parentPrimary) return;

    setAverage(newAverage);
    if (parentPrimary) {
      setParentPrimary(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newAverage]);

  useEffect(() => {
    if (parentPrimary) {
      setCategoryIsParent(false);
      setNewAverage(originalAverage);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [parentPrimary]);

  const [expanded, setExpanded] = useState(false);

  return (
    <div
      className="_course-category-tester"
      onClick={() => {
        setExpanded(!expanded);
      }}
    >
      <div className="_course-category-tester-category pr-4 pl-6 flex justify-between items-center hover:bg-day-150 dark:hover:bg-night-150">
        <div className="_category-name text-day-400 dark:text-night-400 flex items-center">
          <FoldableChevron expanded={expanded} />
          <span>{assignments.category.name}</span>
        </div>
        <span
          className={`transition-opacity ${
            parentPrimary && categoryIsParent ? 'opacity-30' : 'opacity-100'
          }`}
        >
          <GradeSlider
            min={0}
            max={100}
            set={(n) => {
              setNewAverage(n);
              setCategoryIsParent(true);
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
                parentPrimary={parentPrimary}
                setParentPrimary={setParentPrimary}
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
