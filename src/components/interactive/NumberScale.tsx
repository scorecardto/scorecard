import React from 'react';

import { IoAdd, IoRemove } from 'react-icons/io5';

type INumberScaleProps = {
  min: number;
  max: number;
  children: number;
  setNumber(arg0: number): void;
  editingEnabled: boolean;
};

export default function NumberScale({
  min,
  max,
  children,
  setNumber,
  editingEnabled,
}: INumberScaleProps) {
  const handleStepUp = () => {
    if (max !== children && editingEnabled) setNumber(children + 1);
  };

  const handleStepDown = () => {
    if (min !== children && editingEnabled) setNumber(children - 1);
  };

  return (
    <div className="_number-scale flex flex-row justify-between">
      <p>{children}</p>
      <div
        className={`flex gap-1 transition-opacity-transform ${
          editingEnabled ? 'opacity-100' : 'opacity-0 scale-50'
        }`}
      >
        <button
          onClick={handleStepUp}
          className={`${
            children === max
              ? 'bg-day-600 text-day-500 dark:bg-day-600 dark:text-day-500'
              : 'bg-theme-200 text-day-100'
          } w-6 h-6 flex items-center justify-center align-middle text-sm rounded-lg`}
        >
          <IoAdd />
        </button>

        <button
          onClick={handleStepDown}
          className={`${
            children === min
              ? 'bg-day-600 text-day-500 dark:bg-day-600 dark:text-day-500'
              : 'bg-theme-200 text-day-100'
          } w-6 h-6 flex items-center justify-center align-middle text-sm rounded-lg`}
        >
          <IoRemove />
        </button>
      </div>
    </div>
  );
}
