import React, { useEffect, useState } from "react";
import { IoCheckmark, IoChevronDown, IoChevronUp } from "react-icons/io5";

export default function Dropdown(props: {
  selected: number;
  setSelected: React.Dispatch<React.SetStateAction<number>>;
  options: string[];
}) {
  const { selected, options } = props;

  const [active, setActive] = useState(false);

  useEffect(() => {
    if (active) {
      const handleClick = (e: MouseEvent) => {
        setActive(false);
      };

      document.addEventListener("click", handleClick);

      return () => {
        document.removeEventListener("click", handleClick);
      };
    }
  }, [active]);

  return (
    <div
      className="relative w-full"
      onClick={(e) => {
        // if (active) {
        //   e.stopPropagation();
        // }
      }}
    >
      <div
        onClick={(e) => {
          e.stopPropagation();
          setActive(true);
        }}
        className={`float-right w-fit bg-accent-100 border border-accent-200 rounded-md py-2 px-4 gap-4 flex items-center hover:bg-accent-200 cursor-pointer`}
      >
        <p className="text-accent-300">{options[selected]}</p>
        {active ? (
          <IoChevronUp className="text-accent-300" />
        ) : (
          <IoChevronDown className="text-accent-300" />
        )}
      </div>
      {active && (
        <div className="absolute top-12 right-0 z-10 bg-mono-l-100 border border-mono-l-300 rounded-md overflow-hidden">
          {options.map((option, idx) => {
            return (
              <div
                onClick={(e) => {
                  e.stopPropagation();
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
      )}
    </div>
  );
}
