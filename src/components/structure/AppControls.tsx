import React, { ReactElement, useEffect, useState } from 'react';

import Link from 'next/link';

import IconCard from '../card/SwitchCard';
import InsightsControls from './InsightsControls';

type IAppControlsProps = {
  currentRoute: string;
  pageTitle: string;
  rightSideButtons?: ReactElement;
};

export default function AppControls({
  currentRoute,
  pageTitle,
}: IAppControlsProps) {
  const [currentTab, setCurrentTab] = useState('');

  useEffect(() => {
    if (currentRoute.startsWith('/insights')) setCurrentTab('insights');
    else if (currentRoute.startsWith('/export')) setCurrentTab('export');
    else setCurrentTab('courses');
  }, [currentRoute]);

  return (
    <div className="_app-controls use-responsive-width">
      <h1 className="_app-controls-header text-day-700 dark:text-night-700 text-4xl font-bold mt-10">
        {pageTitle}
      </h1>
      <div className="_app_controls-tabs-left flex gap-3">
        <Link href="/dashboard">
          <a className="border-none">
            <IconCard colored={currentTab === 'courses'}>Courses</IconCard>
          </a>
        </Link>
        <Link href="/insights/notifications">
          <a className="border-none">
            <IconCard colored={currentTab === 'insights'}>Insights</IconCard>
          </a>
        </Link>
        <Link href="/export">
          <a className="border-none">
            <IconCard colored={currentTab === 'export'}>Export</IconCard>
          </a>
        </Link>
      </div>
      {currentRoute.startsWith('/insights') ? (
        <InsightsControls currentRoute={currentRoute} />
      ) : (
        <></>
      )}
    </div>
  );
}
