import React from 'react';

import { ClickEventCallback } from '@/lib/CommonCallbacks';

type IStaticCardProps = {
  children: string;
  colored: boolean;
  onClick?: ClickEventCallback;
  icon?: JSX.Element;
};

export default function StaticCard({
  children,
  colored,
  onClick,
  icon,
}: IStaticCardProps) {
  return (
    <div
      className={`_static-card ${
        colored
          ? 'bg-theme-100 text-theme-200 dark:bg-theme-200 dark:text-theme-100'
          : 'bg-day-600 text-day-500 dark:bg-night-600 dark:text-night-500'
      }  w-fit px-3 py-1 rounded-md transition-colors cursor-pointer font-normal whitespace-nowrap overflow-hidden flex items-center`}
      onClick={onClick}
    >
      <span className="mr-1">{icon ?? <></>}</span>
      <p className="overflow-hidden text-ellipsis">{children}</p>
    </div>
  );
}

export const STATIC_CARD_ICON_STYLES = 'h-full text-md mr-2 self-center';
