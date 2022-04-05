import React from 'react';

import Grade from '../grade/Grade';

type IGradeSliderProps = {
  val: string;
  min: number;
  max: number;
  set: React.Dispatch<React.SetStateAction<number | string>>;
};

export default function GradeSlider({ val, min, max, set }: IGradeSliderProps) {
  return (
    <div
      className="flex items-center pl-4 py-1"
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      <input
        type={'range'}
        min={min}
        max={max}
        value={val}
        step={1}
        className="slider"
        onChange={(e) => {
          set(e.target.value);
        }}
      />
      <div className="w-16">
        <Grade grade={val} alwaysOpaque />
      </div>
    </div>
  );
}
