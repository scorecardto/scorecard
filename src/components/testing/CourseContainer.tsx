import React, { useState } from 'react';

import { motion, Variants } from 'framer-motion';
import { IoChevronForward } from 'react-icons/io5';

import Grade from '../grade/Grade';
import { CourseAssignments } from '@/lib/types/CourseAssignments';

type ICourseContainerProps = {
  course: CourseAssignments;
  selectedGradingPeriod: number;
};

export default function CourseContainer({
  course,
  selectedGradingPeriod,
}: ICourseContainerProps) {
  const variants: Variants = {
    closed: { rotate: 0 },
    open: { rotate: 90 },
  };

  // const recalcAverage = calculateAverage(course, selectedGradingPeriod);

  const [expanded, setExpanded] = useState(false);
  // const [weighted, setWeighted] = useState(course.weighted);
  // const [credit, setCredit] = useState(course.credit);

  return (
    <div className="_course-container border-b border-day-300 dark:border-night-300">
      <div
        className="flex justify-between py-2 px-2 hover:bg-day-150 dark:hover:bg-night-150"
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
        <div className="flex items-center">
          <Grade grade={course.grades[selectedGradingPeriod]} />
        </div>
      </div>
    </div>
  );
}
