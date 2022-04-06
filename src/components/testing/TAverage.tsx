import React from 'react';

import GradeSlider from '../interactive/GradeSlider';

type ITAverageProps = {
  average: string | number;
  setAverage(arg0: string | number): void;
};

export default function TAverage({ average, setAverage }: ITAverageProps) {
  return (
    <div className="_TAverage flex justify-between items-center">
      <GradeSlider
        max={100}
        min={0}
        set={setAverage}
        val={average.toString()}
      />
      <span className="text-sm text-day-400 dark:text-night-400">
        More Options
      </span>
    </div>
  );
}
