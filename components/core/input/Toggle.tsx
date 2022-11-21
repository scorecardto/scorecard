import React from "react";

export default function Toggle(props: {
  value: boolean;
  setValue: React.Dispatch<React.SetStateAction<boolean>>;
  disabled?: boolean;
}) {
  return (
    <div className="relative">
      <div
        tabIndex={0}
        className={`w-10 h-6 rounded-full flex items-center justify-between transition-colors ${
          props.value ? "bg-accent-300" : "bg-mono-l-400 dark:bg-mono-d-400"
        } ${props.disabled ? "" : "cursor-pointer"}`}
        onClick={() => {
          if (!props.disabled) {
            props.setValue(!props.value);
          }
        }}
      >
        <div
          className={`absolute w-4 h-4 rounded-full bg-white transform transition-all duration-300 ${
            !props.value ? "left-1" : "left-5"
          }`}
        ></div>
      </div>
    </div>
  );
}
