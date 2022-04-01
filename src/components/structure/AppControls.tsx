import React, { useEffect, useState } from 'react';

import Link from 'next/link';
import { IoBookmarks, IoBookmark } from 'react-icons/io5';

import SelectorCard from '../card/SelectorCard';
import { STATIC_CARD_ICON_STYLES } from '../card/StaticCard';
import IconCard from '../card/SwitchCard';
import InsightsControls from './InsightsControls';
import { AppData } from '@/lib/context/AppDataContext';

type IAppControlsProps = {
  currentRoute: string;
  pageTitle: string;
  appData: AppData;
  setAppData: React.Dispatch<React.SetStateAction<AppData | null>>;
};

export default function AppControls({
  currentRoute,
  pageTitle,
  appData,
  setAppData,
}: IAppControlsProps) {
  const [currentTab, setCurrentTab] = useState('');

  useEffect(() => {
    if (currentRoute.startsWith('/insights')) setCurrentTab('insights');
    else if (currentRoute.startsWith('/export')) setCurrentTab('export');
    else setCurrentTab('courses');
  }, [currentRoute]);

  const [gradingPeriod, setGradingPeriod] = useState<number>(
    appData.selectedGradingPeriod ?? -1
  );

  useEffect(() => {
    if (appData != null) {
      setAppData({ ...appData, selectedGradingPeriod: gradingPeriod });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gradingPeriod]);

  return (
    <div className="_app-controls relative">
      <div className="use-responsive-width">
        <h1 className="_app-controls-header text-day-700 dark:text-night-700 text-4xl font-bold mt-10">
          {pageTitle}
        </h1>
        <div className="_app_controls-tabs-left flex content-between">
          <div className="flex gap-3">
            <Link href="/dashboard">
              <a className="border-none">
                <IconCard colored={currentTab === 'courses'}>Courses</IconCard>
              </a>
            </Link>
            <Link href="/insights/notifications">
              <a className="border-none">
                <IconCard colored={currentTab === 'insights'}>
                  Insights
                </IconCard>
              </a>
            </Link>
            <Link href="/export">
              <a className="border-none">
                <IconCard colored={currentTab === 'export'}>Export</IconCard>
              </a>
            </Link>
          </div>

          <div className="flex gap-3">
            {appData != null ? (
              <SelectorCard
                selected={gradingPeriod}
                setSelected={setGradingPeriod}
                options={appData.gradingPeriods.map((g) => g.name)}
                cardIcon={<IoBookmarks className={STATIC_CARD_ICON_STYLES} />}
                icon={<IoBookmark className={STATIC_CARD_ICON_STYLES} />}
                selectedIcon={
                  <IoBookmark className={STATIC_CARD_ICON_STYLES} />
                }
              />
            ) : (
              <></>
            )}
          </div>
        </div>
        {currentRoute.startsWith('/insights') ? (
          <InsightsControls currentRoute={currentRoute} />
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}
