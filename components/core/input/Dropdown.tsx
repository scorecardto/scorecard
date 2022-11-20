import React, { useEffect, useRef, useState } from "react";
import { IoCheckmark, IoChevronDown, IoChevronUp } from "react-icons/io5";

export default function Dropdown(props: {
  selected: number;
  setSelected: React.Dispatch<React.SetStateAction<number>>;
  options: string[];
}) {
  const { selected, options } = props;

  const [active, setActive] = useState(false);

  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (active) {
      const handleClick = (e: any) => {
        if (e.target == null || !ref.current?.contains(e.target)) {
          setActive(false);
        }
      };

      document.addEventListener("click", handleClick);

      return () => {
        document.removeEventListener("click", handleClick);
      };
    }
  }, [active]);

  return (
    <div ref={ref} className="relative">
      <div
        onClick={(e) => {
          setActive(!active);
        }}
        className={`float-right w-fit bg-accent-100 border border-accent-200 dark:bg-accent-600 dark:border-accent-700 rounded-md py-2 px-4 gap-4 flex items-center hover:bg-accent-200 dark:hover:bg-accent-700 cursor-pointer`}
      >
        <p className="text-accent-300 dark:text-accent-250">
          {options[selected]}
        </p>
        <div className="w-4 h-4">
          {active ? (
            <IoChevronUp className="text-accent-300 dark:text-accent-250 absolute" />
          ) : (
            <IoChevronDown className="text-accent-300 dark:text-accent-250 absolute" />
          )}
        </div>
      </div>
      {active && (
        <div className="absolute right-0 top-full z-20">
          <div className="mt-2 bg-mono-l-100 dark:bg-mono-d-100 border border-mono-l-300 dark:border-mono-d-300 rounded-md whitespace-nowrap">
            {options.map((option, idx) => {
              return (
                <div
                  onClick={(e) => {
                    props.setSelected(idx);
                    setActive(false);
                  }}
                  className="flex relative justify-between gap-8 px-4 py-2 hover:bg-mono-l-150 dark:hover:bg-mono-d-150 cursor-pointer"
                  key={idx}
                >
                  <p>{option}</p>
                  {idx === selected && (
                    <IoCheckmark className="text-mono-l-600 dark:text-mono-d-600" />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
