import React from 'react';

type IGradeSliderProps = {
  val: string;
  min: number;
  max: number;
  set(arg0: string | number): void;
};

export default function GradeSlider({ val, min, max, set }: IGradeSliderProps) {
  return (
    <div
      className="_grade-slider"
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
    </div>
  );
}
