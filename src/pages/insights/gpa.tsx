import React from 'react';

import { NextSeo } from 'next-seo';

import GpaRing from '@/components/gpa/GpaRing';

export default function GPA() {
  const gpa = 4.27;

  return (
    <div>
      <NextSeo title="Grade Point" />
      <div className="use-responsive-width">
        <div className="">
          <p className="text-4xl text-theme-200 font-semibold leading-none tracking-tight">
            {gpa}
          </p>
          <div className="flex items-center mt-3">
            <GpaRing gpa={gpa} />
            <h3 className="text-day-400 my-0 ml-3">Weighted GPA</h3>
          </div>
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
