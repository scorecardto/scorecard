import React from 'react';

import { ClickEventCallback } from '../../utils/CommonCallbacks';

type Props = {
  children: string | Element;
  onClick?: ClickEventCallback;
};

export default function TextCard({ children, onClick }: Props) {
  return (
    <div
      className="_text-card hover:bg-day-600 hover:dark:bg-night-600 text-day-500 dark:text-night-500 w-fit px-3 py-1 rounded-md transition-colors cursor-pointer"
      onClick={onClick}
    >
      {children}
    </div>
  );
}
