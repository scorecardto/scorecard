import React, { useEffect, useState } from 'react';

type IScalingInputProps = {
  checkValidity(n: string): boolean;
  update(n: string): void;
  onFocusChange?(n: boolean): void;
  value: string;
};

export default function ScalingInput({
  value,
  onFocusChange,
  checkValidity,
  update,
}: IScalingInputProps) {
  const widthRef = React.createRef<HTMLDivElement>();

  const [width, setWidth] = useState<number | undefined>(undefined);

  useEffect(() => {
    setWidth(widthRef.current?.clientWidth);
  }, [value, widthRef]);

  return (
    <div className="_scaling-input relative">
      <input
        style={{ width: width != null ? width + 18 : undefined }}
        className={`whitespace-nowrap outline-none w-fit py-1 px-2 border border-day-300 dark:border-night-300 rounded-lg transition-colors ${
          checkValidity(value)
            ? 'focus:border-theme-200'
            : 'focus:border-red-400'
        } text-day-700 dark:text-night-700`}
        value={value}
        onFocus={() => {
          onFocusChange?.(true);
        }}
        onBlur={() => {
          onFocusChange?.(false);
        }}
        onInput={(e) => {
          update(e.currentTarget.value);
        }}
      />

      <div
        ref={widthRef}
        className="w-fit whitespace-pre invisible absolute top-0 left-0"
      >
        {value}
      </div>
    </div>
  );
}
