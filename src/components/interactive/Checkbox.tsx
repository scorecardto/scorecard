import React from 'react';

import { IoCheckmarkSharp } from 'react-icons/io5';

type ICheckboxProps = {
  checked: boolean;
};

export default function Checkbox({ checked }: ICheckboxProps) {
  return (
    <div
      className={`text-day-100 w-5 h-5 flex items-center justify-center rounded-sm text-sm ${
        checked ? 'bg-theme-200' : 'border border-day-400 dark:border-night-400'
      }`}
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
