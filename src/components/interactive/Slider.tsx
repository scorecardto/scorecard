import React from 'react';

type ISliderProps = {
  val: number;
  min: number;
  max: number;
  set: React.Dispatch<React.SetStateAction<number>>;
};

export default function Slider({ val }: ISliderProps) {
  return <div>{val}</div>;
}
