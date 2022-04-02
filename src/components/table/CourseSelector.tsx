import React from 'react';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { IoResize, IoChevronForward } from 'react-icons/io5';

import { Course } from '@/lib/types/Course';

type ICourseSelectorProps = {
  courses: Course[];
  selected: string;
};

export default function CourseSelector({ courses }: ICourseSelectorProps) {
  return (
    <div className="_course-selector-wrapper pt-10 relative w-fit">
      <div className="_course-selector bg-day-200 dark:bg-night-200 h-full w-60 border-y border-l border-day-300 dark:border-night-300">
        <div className="_course-selector-header px-3 py-3">
          <p className="float-left text-day-700 dark:text-night-700 ml-2 mt-1">
            Your Courses
          </p>
          <Link href="/dashboard">
            <a>
              <div className="h-8 w-8 bg-theme-100 dark:bg-theme-200 rounded-md float-right text-theme-200 dark:text-theme-100 flex justify-center items-center overflow-hidden">
                <motion.div
                  className="h-12 w-12 flex justify-center items-center"
                  initial={{ scale: 0.8 }}
                  whileHover={{ scale: 1 }}
                >
                  <IoResize size={24} />
                </motion.div>
              </div>
            </a>
          </Link>
        </div>
        <div className="_course-selector-courses pt-10">
          {courses.concat(courses).map((course, idx) => {
            return (
              <div
                className="_course-selector-course-item py-2 pl-5 text-day-400 dark:text-night-400 bg-day-200 dark:bg-night-200 hover:bg-theme-100 dark:hover:bg-theme-200 hover:text-theme-200 dark:hover:text-theme-100 flex items-center"
                key={idx}
              >
                <span className="mr-2">{course.name}</span>
                <IoChevronForward />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
