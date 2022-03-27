import React, { useContext, useState } from 'react';

import { NextSeo } from 'next-seo';
import { IoOptions } from 'react-icons/io5';

import StaticCard from '@/components/card/StaticCard';
import GpaAnalysisTable from '@/components/gpa/GpaAnalysisTable';
import GpaDisplay from '@/components/gpa/GpaDisplay';
import GpaQuickStats from '@/components/gpa/GpaQuickStats';
import AnimateMyWidth from '@/components/util/AnimateMyWidth';
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
              <div
                className={`${editing ? 'mt-4' : 'mt-2'} transition-all h-fit`}
              >
                <AnimateMyWidth>
                  {editing ? (
                    <StaticCard
                      colored={true}
                      onClick={() => {
                        setEditing(!editing);
                      }}
                      icon={<IoOptions />}
                    >
                      Done
                    </StaticCard>
                  ) : (
                    <StaticCard
                      colored={true}
                      icon={<IoOptions />}
                      onClick={() => {
                        setEditing(!editing);
                      }}
                    >
                      Edit Courses
                    </StaticCard>
                  )}
                </AnimateMyWidth>
              </div>
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
