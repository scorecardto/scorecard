import React, { ReactElement, useEffect, useState } from 'react';

import IconCard from '../card/SwitchCard';

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
        <IconCard colored={currentTab === 'courses'}>Courses</IconCard>
        <IconCard colored={currentTab === 'insights'}>Insights</IconCard>
        <IconCard colored={currentTab === 'export'}>Export</IconCard>
      </div>
    </div>
  );
}
