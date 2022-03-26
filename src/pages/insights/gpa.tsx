import React from 'react';

import { NextSeo } from 'next-seo';

import GpaAnalysisTable from '@/components/gpa/GpaAnalysisTable';
import GpaDisplay from '@/components/gpa/GpaDisplay';
import GpaQuickStats from '@/components/gpa/GpaQuickStats';

export default function GPA() {
  const myGpa = 4.27;

  const courses = [
    'Biology',
    'Computer Science',
    'English',
    'Geometry',
    'SciTech',
    'Spanish',
    'World Geography',
  ];

  const weighted = [true, false, true, false, true, false, true];

  const grades = [100, 95, 90, 85, 70, 60, 'P'];

  const gpa = [5.0, 3.5, 4.0, 2.5, 2.0, '--', '--'];
  // TODO: ability to change how a grade counts in the gradebook

  // 3.4
  const delta = [0.4, 0.025, 0.15, 0.225, 0.35, '--', '--'];

  return (
    <div>
      <NextSeo title="Grade Point" />
      <div className="use-responsive-width">
        <div className="flex flex-row gap-20 items-center mt-5">
          <GpaDisplay gpa={myGpa} />
          <GpaQuickStats />
        </div>
      </div>

      <div className="responsive-scrollable">
        <GpaAnalysisTable
          courses={courses}
          delta={delta}
          grades={grades}
          weighted={weighted}
          gpa={gpa}
        />
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
