import React from 'react';

import { IoCheckmarkSharp } from 'react-icons/io5';

type ICheckboxProps = {
  checked: boolean;
  editingEnabled: boolean;
};

export default function Checkbox({ checked, editingEnabled }: ICheckboxProps) {
  return (
    <div
      className={`text-day-100 w-5 h-5 flex items-center justify-center rounded-sm text-sm transition-colors duration-200 ${(() => {
        if (!checked) {
          return 'border border-day-400 dark:border-night-400';
        }
        if (editingEnabled) {
          return 'bg-theme-200';
        }
        return 'bg-day-500 dark:bg-night-500';
      })()}`}
    >
      <div>
        <IoCheckmarkSharp
          className={
            checked
              ? 'opacity-100 transition-colors'
              : 'opacity-0 transition-colors'
          }
        />
      </div>
    </div>
  );
}
