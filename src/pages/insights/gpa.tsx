import React, { useContext, useState } from 'react';

import { NextSeo } from 'next-seo';

import GpaAnalysisTable from '@/components/gpa/GpaAnalysisTable';
import GpaDisplay from '@/components/gpa/GpaDisplay';
import GpaQuickStats from '@/components/gpa/GpaQuickStats';
import EditingToggle from '@/components/interactive/EditingToggle';
import { AppDataContext } from '@/lib/context/AppDataContext';
import { getGPA } from '@/lib/GPAUtils';

export default function GPA() {
  const { appData, setAppData } = useContext(AppDataContext);

  const gpa = appData
    ? getGPA(appData.courses, appData.selectedGradingPeriod, appData.formula)
    : null;

  const [editing, setEditing] = useState(false);

  return (
    <div>
      <NextSeo title="Grade Point" />
      {appData && gpa ? (
        <div>
          <div className="use-responsive-width flex flex-row gap-20 items-center mt-5">
            <GpaDisplay gpa={gpa} weighted={appData.formula.weighted} />

            <div className="w-full">
              <GpaQuickStats
                courses={appData.courses}
                formula={appData.formula}
                gradingPeriod={appData.selectedGradingPeriod}
              />
            </div>
          </div>

          <div className="responsive-scrollable">
            <div
              className={`transition-padding duration-300 ease-in-out ${
                editing ? 'z-50 absolute focus px-7 py-5 rounded-lg' : ''
              }`}
            >
              <GpaAnalysisTable
                appData={appData}
                setAppData={setAppData}
                editingEnabled={editing}
              />

              <EditingToggle
                editing={editing}
                setEditing={setEditing}
                textStart="Edit Courses"
              />
            </div>
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
