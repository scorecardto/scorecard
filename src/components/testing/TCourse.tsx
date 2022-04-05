import React, { useState } from 'react';

import { motion } from 'framer-motion';

import Grade from '../grade/Grade';
import FoldableChevron from '../interactive/FoldableChevron';
import { Course } from '@/lib/types/Course';
import { CourseAssignments } from '@/lib/types/CourseAssignments';

type ITCourseProps = {
  course: CourseAssignments;
  setCourse(arg0: Course): void;
  selectedGradingPeriod: number;
  index: number;
};

export default function TCourse({
  course,
  selectedGradingPeriod,
  index,
}: ITCourseProps) {
  const [expanded, setExpanded] = useState(true);

  const [editingContext, setEditingContext] = useState<
    'COURSE' | 'ASSIGNMENTS'
  >('COURSE');

  const tab = (
    <motion.div
      layoutId={`TCourse-${index}-tab`}
      className="bg-theme-200 w-full h-1 rounded-t-md mt-1 relative z-10"
      transition={{
        type: 'spring',
        duration: 0.5,
        bounce: 0.4,
      }}
    />
  );

  const generateTab = (tabName: string, selected: boolean) => {
    return (
      <div className="TCourse-tab cursor-pointer text-sm">
        <p
          className={`transition-colors h-8 mt-1 flex items-center ${
            selected ? 'text-theme-200' : 'text-day-400 dark:text-night-400'
          }`}
        >
          {tabName}
        </p>
        {selected ? tab : <></>}
      </div>
    );
  };

  return (
    <div className="_T-course bg-day-200 dark:bg-night-200 flex justify-between">
      <div
        className="_T-course-left flex items-center group p-2 cursor-pointer"
        onClick={() => {
          setExpanded(!expanded);
        }}
      >
        <span className="_T-course-chevron group-hover:bg-day-250 group-hover:dark:bg-night-250 rounded-full mr-2">
          <FoldableChevron expanded={expanded} />
        </span>
        <span className="_T-course-name">{course.name}</span>
      </div>

      <div className="_T-course-right flex items-center">
        <div className="_T-course-context flex gap-4">
          <span
            onClick={() => {
              setEditingContext('COURSE');
            }}
          >
            {generateTab('Course', editingContext === 'COURSE')}
          </span>

          <span
            onClick={() => {
              setEditingContext('ASSIGNMENTS');
            }}
          >
            {generateTab('Assignments', editingContext === 'ASSIGNMENTS')}
          </span>
        </div>
        <div className="block w-16 ml-8 mr-4">
          <Grade grade={course.grades[selectedGradingPeriod]} />
        </div>
      </div>
    </div>
  );
}
