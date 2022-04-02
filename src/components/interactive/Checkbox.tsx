import React, { useState } from 'react';

import { IoCheckmarkSharp } from 'react-icons/io5';

type ICheckboxProps = {
  checked: boolean;
  editingEnabled: boolean;
  onClick(arg0: boolean): void;
};

export default function Checkbox({
  checked,
  editingEnabled,
  onClick,
}: ICheckboxProps) {
  const [mouseDown, setMouseDown] = useState(false);
  return (
    <div
      onMouseDown={() => {
        if (!editingEnabled) return;

        setMouseDown(true);

        const upCallback = () => {
          setMouseDown(false);
          document.removeEventListener('mouseup', upCallback);
        };

        document.addEventListener('mouseup', upCallback);
      }}
      onClick={() => {
        if (editingEnabled) onClick(!checked);
      }}
      className={`text-day-100 w-5 h-5 flex items-center justify-center rounded-sm text-sm transition-background-transform duration-200 ${(() => {
        if (!checked) {
          return 'border border-day-400 dark:border-night-400';
        }
        if (editingEnabled) {
          return 'bg-theme-200';
        }
        return 'bg-day-500 dark:bg-night-500';
      })()} ${mouseDown ? 'scale-75' : ''}`}
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
