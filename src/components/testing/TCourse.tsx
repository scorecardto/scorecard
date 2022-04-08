import React, { useEffect, useState } from 'react';

import { motion } from 'framer-motion';

import Grade from '../grade/Grade';
import FoldableChevron from '../interactive/FoldableChevron';
import TAssignments from './TAssignments';
import TAverage from './TAverage';
import { CourseAssignments } from '@/lib/types/CourseAssignments';

type ITCourseProps = {
  course: CourseAssignments;
  update(arg0: CourseAssignments): void;
  selectedGradingPeriod: number;
  index: number;
};

export default function TCourse({
  course,
  update,
  selectedGradingPeriod,
  index,
}: ITCourseProps) {
  const [expanded, setExpanded] = useState(true);

  const [editingContext, setEditingContext] = useState<
    'COURSE' | 'ASSIGNMENTS'
  >('COURSE');

  const [tabHover, setTabHover] = useState(false);

  const tab = (
    <motion.div
      layoutId={`TCourse-${index}-tab`}
      className="bg-theme-200 w-full h-1 rounded-t-md mt-1 relative z-10"
      transition={{
        type: 'spring',
        duration: tabHover ? 0.5 : 0,
        bounce: 0.4,
      }}
    />
  );

  const generateTab = (tabName: string, selected: boolean) => {
    return (
      <div className="_TCourse-tab cursor-pointer text-sm">
        <p
          className={`transition-colors h-8 my-2 flex items-center ${
            selected ? 'text-theme-200' : 'text-day-400 dark:text-night-400'
          }`}
        >
          {tabName}
        </p>
        {selected ? tab : <></>}
      </div>
    );
  };

  const [myCourse, setMyCourse] = useState(course);

  useEffect(() => {
    update(myCourse);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [myCourse]);

  const handleSet = (nc: CourseAssignments) => {
    setMyCourse(nc);
  };

  useEffect(() => {
    setMyCourse(course);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editingContext]);

  return (
    <motion.div
      className="_T-course"
      layoutId={`_T-course-${index}`}
      transition={{
        type: 'spring',
        duration: tabHover ? 0 : 0.5,
      }}
      onMouseEnter={() => {
        setTabHover(true);
      }}
      onMouseLeave={() => {
        setTabHover(false);
      }}
    >
      <div
        className={`_T-course-header bg-day-200 dark:bg-night-200 flex justify-between ${
          expanded ? 'rounded-t-md' : 'rounded-md'
        }`}
      >
        <div
          className="_T-course-left flex items-center group p-2 cursor-pointer"
          onClick={() => {
            setExpanded(!expanded);
          }}
        >
          <span className="_T-course-chevron group-hover:bg-day-250 group-hover:dark:bg-night-250 rounded-full mr-2">
            <FoldableChevron expanded={expanded} />
          </span>
          <span className="_T-course-name text-day-700 dark:text-night-700">
            {myCourse.name}
          </span>
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
            <Grade grade={myCourse.grades[selectedGradingPeriod]} />
          </div>
        </div>
      </div>
      {expanded ? (
        <div
          className={`_T-course-tester border border-day-300 dark:border-night-300 rounded-b-md`}
        >
          {editingContext === 'COURSE' ? (
            <TAverage
              course={myCourse}
              selectedGradingPeriod={selectedGradingPeriod}
              update={handleSet}
            />
          ) : (
            <TAssignments
              setEditingContext={(n) => {
                setTabHover(true);
                setEditingContext(n);
              }}
              course={myCourse}
              selectedGradingPeriod={selectedGradingPeriod}
              update={handleSet}
            />
          )}
        </div>
      ) : (
        <></>
      )}
    </motion.div>
  );
}
