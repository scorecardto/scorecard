import React from 'react';

import { ClickEventCallback } from '../../lib/CommonCallbacks';

type Props = {
  icon?: JSX.Element;
  children: string | Element;
  onClick?: ClickEventCallback;
  number: number;
  showIfZero?: boolean;
};

export default function NumberTextCard({
  icon,
  children,
  onClick,
  number,
  showIfZero,
}: Props) {
  return (
    <div
      className="_text-card hover:bg-day-600 hover:dark:bg-night-600 text-day-500 dark:text-night-500 w-fit px-3 py-1 rounded-md transition-colors cursor-pointer flex items-center"
      onClick={onClick}
    >
      {icon != null ? <span className="mr-2">{icon}</span> : <></>}
      <p>{children}</p>
      {number >= 1 || showIfZero ? (
        <div className="bg-theme-200 text-white text-xs h-5 flex items-center rounded-md px-2 ml-2">
          {number}
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}
