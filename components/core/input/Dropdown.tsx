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
    <div ref={ref} className="flex flex-col justify-end items-end relative">
      <div
        onClick={(e) => {
          setActive(!active);
        }}
        className={`float-right w-fit bg-accent-100 border border-accent-200 rounded-md py-2 px-4 gap-4 flex items-center hover:bg-accent-200 cursor-pointer`}
      >
        <p className="text-accent-300">{options[selected]}</p>
        <div className="w-4 h-4">
          {active ? (
            <IoChevronUp className="text-accent-300 absolute" />
          ) : (
            <IoChevronDown className="text-accent-300 absolute" />
          )}
        </div>
      </div>
      {active && (
        <div className="flex justify-end">
          <div className="absolute mt-2 z-20 bg-mono-l-100 border border-mono-l-300 rounded-md overflow-hidden">
            {options.map((option, idx) => {
              return (
                <div
                  onClick={(e) => {
                    props.setSelected(idx);
                    setActive(false);
                  }}
                  className="flex justify-between gap-8 px-4 py-2 hover:bg-mono-l-150 cursor-pointer"
                  key={idx}
                >
                  <p>{option}</p>
                  {idx === selected && (
                    <IoCheckmark className="text-mono-l-600" />
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
