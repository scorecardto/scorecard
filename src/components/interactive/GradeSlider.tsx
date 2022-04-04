import React from 'react';

type IGradeSliderProps = {
  val: string;
  min: number;
  max: number;
  set: React.Dispatch<React.SetStateAction<number | string>>;
};

export default function GradeSlider({ val, min, max, set }: IGradeSliderProps) {
  return (
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
  );
}
