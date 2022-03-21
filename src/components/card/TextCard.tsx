import React from 'react';

import { ClickEventCallback } from '../../lib/CommonCallbacks';

type Props = {
  icon?: JSX.Element;
  children: string | Element;
  onClick?: ClickEventCallback;
};

export default function TextCard({ icon, children, onClick }: Props) {
  return (
    <div
      className="_text-card hover:bg-day-600 hover:dark:bg-night-600 text-day-500 dark:text-night-500 w-fit px-3 py-1 rounded-md transition-colors cursor-pointer flex items-center"
      onClick={onClick}
    >
      {<span className="mr-2">{icon}</span> ?? <></>}
      <p>{children}</p>
    </div>
  );
}
