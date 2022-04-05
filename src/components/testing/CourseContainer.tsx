import React, { useEffect, useState } from 'react';

import FoldableChevron from '../interactive/FoldableChevron';
import Slider from '../interactive/GradeSlider';
import CourseGradesTester from './CourseGradesTester';
import { Course } from '@/lib/types/Course';
import { CourseAssignments } from '@/lib/types/CourseAssignments';

type ICourseContainerProps = {
  course: CourseAssignments;
  selectedGradingPeriod: number;
  update(arg0: Course): void;
};

export default function CourseContainer({
  course,
  selectedGradingPeriod,
  update,
}: ICourseContainerProps) {
  // const recalcAverage = calculateAverage(course, selectedGradingPeriod);

  const [expanded, setExpanded] = useState(false);
  // const [weighted, setWeighted] = useState(course.weighted);
  // const [credit, setCredit] = useState(course.credit);

  const [average, setAverage] = useState(
    course.grades[selectedGradingPeriod] ?? '0'
  );

  useEffect(() => {
    update({
      ...course,
      grades: (() => {
        const newGrades = course.grades.slice(0);
        newGrades[selectedGradingPeriod] = average;
        return newGrades;
      })(),
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [average]);

  useEffect(() => {
    const newGrades = course.grades[selectedGradingPeriod];
    if (newGrades) {
      setAverage(newGrades);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedGradingPeriod]);

  const currentGrades = course.gradebook[selectedGradingPeriod];

  const [primary, setPrimary] = useState(true);

  return (
    <div className="_course-container border-b border-day-300 dark:border-night-300">
      <div
        className="flex justify-between pl-2 pr-4 hover:bg-day-150 dark:hover:bg-night-150"
        onClick={() => {
          setExpanded(!expanded);
        }}
      >
        <div className="flex items-center text-day-700 dark:text-night-700">
          <FoldableChevron expanded={expanded} />
          <p>{course.name}</p>
        </div>

        <span
          className={`transition-opacity ${
            !primary ? 'opacity-30' : 'opacity-100'
          }`}
        >
          <Slider
            val={average?.toString() ?? '0'}
            min={0}
            max={100}
            set={(n) => {
              setPrimary(true);
              setAverage(n);
            }}
          />
        </span>
      </div>

      {currentGrades != null ? (
        <CourseGradesTester
          assignments={currentGrades}
          primary={primary}
          setPrimary={setPrimary}
          shown={expanded}
          update={(u) => {
            setAverage(u);
          }}
        />
      ) : (
        <></>
      )}
    </div>
  );
}
