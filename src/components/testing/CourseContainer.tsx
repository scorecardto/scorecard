import React, { useEffect, useState } from 'react';

import { motion, Variants } from 'framer-motion';
import { IoChevronForward } from 'react-icons/io5';

import Grade from '../grade/Grade';
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
  const variants: Variants = {
    closed: { rotate: 0 },
    open: { rotate: 90 },
  };

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
        className="flex justify-between py-2 pl-2 pr-4 hover:bg-day-150 dark:hover:bg-night-150"
        onClick={() => {
          setExpanded(!expanded);
        }}
      >
        <div className="flex items-center text-day-700 dark:text-night-700">
          <motion.div
            className={`text-day-400 dark:text-night-400 transition-colors duration-200 ease-out p-2 rounded-full text-sm`}
            initial="closed"
            animate={expanded ? 'open' : 'closed'}
            variants={variants}
          >
            <IoChevronForward />
          </motion.div>
          <p>{course.name}</p>
        </div>
        <div
          className="flex items-center"
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <Slider
            val={average?.toString() ?? '0'}
            min={0}
            max={100}
            set={setAverage}
          />
          <div className="w-16">
            <Grade grade={average} />
          </div>
        </div>
      </div>

      {currentGrades != null ? (
        <CourseGradesTester
          assignments={currentGrades}
          primary={!primary}
          setPrimary={(p) => {
            setPrimary(!p);
          }}
          shown={expanded}
        />
      ) : (
        <></>
      )}
    </div>
  );
}
