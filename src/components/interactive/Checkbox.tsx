import React from 'react';

import { IoCheckmarkSharp } from 'react-icons/io5';

type ICheckboxProps = {
  checked: boolean;
  editingEnabled: boolean;
  onClick(arg0: boolean): void;
  cancelEvent?: boolean;
};

export default function Checkbox({
  checked,
  editingEnabled,
  onClick,
  cancelEvent,
}: ICheckboxProps) {
  return (
    <div
      onClick={(e) => {
        if (editingEnabled) onClick(!checked);
        if (cancelEvent) {
          e.preventDefault();
          e.stopPropagation();
        }
      }}
    >
      <div
        className={`text-day-100 w-5 h-5 flex items-center justify-center rounded-sm text-sm my-4 ${(() => {
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
          <IoCheckmarkSharp className={checked ? 'opacity-100' : 'opacity-0'} />
        </div>
      </div>
    </div>
  );
}
