import React from 'react';

import { motion } from 'framer-motion';
import Link from 'next/link';

type IInsightsControlsProps = {
  currentRoute: string;
};

export default function InsightsControls({
  currentRoute,
}: IInsightsControlsProps) {
  const tabs = [
    { name: 'Notifications', link: '/insights/notifications' },
    { name: 'Grade Point', link: '/insights/gpa' },
  ];

  const convertCurrentRoute = (route: string): number => {
    if (route === '/insights/notifications') return 0;
    if (route === '/insights/gpa') return 1;
    return 0;
  };

  const selected = convertCurrentRoute(currentRoute);

  return (
    <div className="_insights-selector flex relative w-fit mt-5">
      {tabs.map((tab, idx) => {
        return (
          <div
            className={`rounded-t-lg transition-colors ${
              selected === idx
                ? ''
                : 'hover:bg-day-150 hover:dark:bg-night-150 cursor-pointer'
            }`}
            key={idx}
          >
            <Link href={tab.link}>
              <a
                className={`border-none ${
                  selected === idx
                    ? 'text-theme-200'
                    : 'text-day-400 dark:text-night-400'
                }`}
              >
                <p className="px-4 py-2">{tab.name}</p>
                {selected === idx ? (
                  <motion.div
                    layoutId="insightsControlsTab"
                    className="bg-theme-200 w-full h-1 rounded-t-md mt-1 relative z-10"
                    transition={{
                      type: 'spring',
                      duration: 0.5,
                      bounce: 0.4,
                    }}
                  ></motion.div>
                ) : (
                  <></>
                )}
              </a>
            </Link>
          </div>
        );
      })}
      <div className="bg-day-250 dark:bg-night-250 w-full absolute h-1 bottom-0 rounded-t-md"></div>
    </div>
  );
}
