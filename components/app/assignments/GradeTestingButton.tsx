import React, { useEffect, useRef, useState } from "react";
import { IoChevronDown, IoChevronUp, IoFlaskOutline } from "react-icons/io5";
import Dropdown from "../../core/input/Dropdown";

export default function GradeTestingButton(props: {
  tabIndex?: number;
  addTestCategory: () => void;
}) {
  const disabled = false;

  const [active, setActive] = useState(false);

  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (disabled) {
      setActive(false);
    }
  }, [disabled, setActive]);

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
        tabIndex={props.tabIndex}
        onClick={(e) => {
          if (!disabled) {
            setActive(!active);
          }
        }}
        className={`float-right w-fit bg-accent-100 border border-accent-200 dark:bg-accent-600 dark:border-accent-700 rounded-md py-2 px-4 gap-4 flex items-center ${
          disabled
            ? ""
            : "hover:bg-accent-200 dark:hover:bg-accent-700 cursor-pointer"
        }`}
      >
        <span className="flex items-center gap-2 text-accent-300 dark:text-accent-250">
          <IoFlaskOutline />
          <p className="">Grade Testing</p>
        </span>
        <div className="w-4 h-4">
          {active ? (
            <IoChevronUp className="text-accent-300 dark:text-accent-250 absolute" />
          ) : (
            <IoChevronDown className="text-accent-300 dark:text-accent-250 absolute" />
          )}
        </div>
      </div>
      {active && (
        <div className={`absolute right-0 z-20 bottom-full`}>
          <div
            className={`bg-mono-l-100 dark:bg-mono-d-100 border border-mono-l-300 dark:border-mono-d-300 rounded-md overflow-hidden whitespace-nowrap mb-2`}
          >
            <div
              tabIndex={0}
              onClick={(e) => {
                props.addTestCategory();
                setActive(false);
              }}
              className="flex relative justify-between gap-8 px-4 py-2 hover:bg-mono-l-150 dark:hover:bg-mono-d-150 cursor-pointer"
              key={0}
            >
              <p className="p">Add Test Category</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
