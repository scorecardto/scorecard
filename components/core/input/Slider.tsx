import React from "react";

export default function Slider(props: {
  min: number;
  max: number;
  value: number;
  setValue: React.Dispatch<React.SetStateAction<number>>;
}) {
  const { min, max, value, setValue } = props;

  return (
    <input
      type={"range"}
      min={min}
      max={max}
      value={value}
      step={1}
      className="w-full h-2 bg-accent-250 rounded-lg appearance-none cursor-pointer accent-accent-300"
      onChange={(e) => {
        setValue(parseInt(e.target.value));
      }}
    />
  );
}
