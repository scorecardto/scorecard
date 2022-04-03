import React, { useContext } from 'react';

import { NextSeo } from 'next-seo';

import CourseContainer from '@/components/testing/CourseContainer';
import { AppDataContext } from '@/lib/context/AppDataContext';
import { CourseAssignments } from '@/lib/types/CourseAssignments';
import GradebookCategory from '@/lib/types/GradebookCategory';

export default function Testing() {
  const gradebook = [
    {
      category: new GradebookCategory('Major', 50),
      assignments: [
        { name: 'Test', grade: '107', weight: 1, otherFields: [] },
        { name: 'Project', grade: '95', weight: 1, otherFields: [] },
      ],
    },
    {
      category: new GradebookCategory('Quiz', 30),
      assignments: [
        { name: 'Quiz no. 1', grade: '90', weight: 20, otherFields: [] },
        { name: 'Quiz no. 2', grade: '89', weight: 25, otherFields: [] },
        { name: 'Quiz no. 3', grade: '80', weight: 15, otherFields: [] },
      ],
    },
    {
      category: new GradebookCategory('Daily', 20),
      assignments: [
        { name: 'Activity 1', grade: '90', weight: 10, otherFields: [] },
        { name: 'Activity 2', grade: '100', weight: 10, otherFields: [] },
        { name: 'Activity 3', grade: '80', weight: 10, otherFields: [] },
        { name: 'Activity 4', grade: '100', weight: 10, otherFields: [] },
        { name: 'Activity 5', grade: '70', weight: 10, otherFields: [] },
        { name: 'Activity 6', grade: '100', weight: 10, otherFields: [] },
        { name: 'Activity 7', grade: '100', weight: 10, otherFields: [] },
        { name: 'Activity 8', grade: '100', weight: 10, otherFields: [] },
        { name: 'Activity 9', grade: '90', weight: 10, otherFields: [] },
        {
          name: 'Activity 10',
          grade: '70',
          weight: 10,
          dropped: true,
          otherFields: [],
        },
        {
          name: 'Activity 11',
          grade: '50',
          weight: 10,
          dropped: true,
          otherFields: [],
        },
        { name: 'Activity 12', grade: '100', weight: 10, otherFields: [] },
      ],
    },
  ];

  const assignments: CourseAssignments[] = [
    {
      name: 'Course',
      cellKey: '###',
      hash: '###',
      credit: 1,
      grades: ['100', '90', '95', '95', '80', '75'],
      weighted: true,
      gradebook: new Array(6).fill(gradebook),
      otherFields: [],
    },
    {
      name: 'Course Everyday',
      cellKey: '@@@',
      hash: '@@@',
      credit: 2,
      grades: ['100', '90', '95', '95', '80', '75'],
      weighted: true,
      gradebook: new Array(6).fill(gradebook),
      otherFields: [],
    },
  ];

  const { appData } = useContext(AppDataContext);

  return (
    <div>
      <NextSeo title="Grade Testing" />
      <div className="use-responsive-width">
        <div className="leading-loose w-3/4 my-5">
          <h3 className="text-day-700 dark:text-night-700">Test your Grades</h3>
          <p className="text-day-400 dark:text-night-400">
            Scorecard&apos;s grade testing feature can be used to experiment
            with new or changed grades with any of your classes. This won&apos;t
            actually change any grades, but you&apos;ll be able to see how a
            change would reflect your average or GPA.
          </p>
        </div>
        <div className="_testing-course-container">
          {appData ? (
            assignments.map((course, idx) => (
              <CourseContainer
                key={idx}
                course={course}
                selectedGradingPeriod={appData.selectedGradingPeriod}
              />
            ))
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
}

export async function getStaticProps() {
  return {
    props: {
      pageTitle: 'Insights',
    },
  };
}
