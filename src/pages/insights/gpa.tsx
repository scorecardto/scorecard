import React, { useContext } from 'react';

import { NextSeo } from 'next-seo';

import GpaDisplay from '@/components/gpa/GpaDisplay';
import GpaQuickStats from '@/components/gpa/GpaQuickStats';
import { AppDataContext } from '@/lib/context/AppDataContext';
import { getGPA } from '@/lib/GPAUtils';

export default function GPA() {
  const { appData } = useContext(AppDataContext);

  const gpa = appData
    ? getGPA(appData.courses, appData.selectedGradingPeriod, appData.formula)
    : null;

  return (
    <div>
      <NextSeo title="Grade Point" />
      {appData && gpa ? (
        <div>
          <div className="use-responsive-width flex flex-row gap-20 items-center mt-5">
            <GpaDisplay gpa={gpa} weighted={appData.formula.weighted} />

            <GpaQuickStats
              courses={appData.courses}
              formula={appData.formula}
              gradingPeriod={appData.selectedGradingPeriod}
            />
          </div>

          <div className="responsive-scrollable">
            {/* <GpaAnalysisTable
              courses={courses}
              delta={delta}
              grades={grades}
              weighted={weighted}
              gpa={gpa}
            /> */}
          </div>
        </div>
      ) : (
        <></>
      )}
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
