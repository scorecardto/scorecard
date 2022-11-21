import React from "react";

export default function ChangeButton(props: {
  onClick(): void;
  children: string;
  value?: string;
}) {
  return (
    <div>
      {props.value && (
        <p className="text-mono-l-600 dark:text-mono-d-600 font-os">
          {props.children}
        </p>
      )}
      <div className="font-os flex flex-row justify-between">
        {props.value ? (
          <p className="p">{props.value}</p>
        ) : (
          <p className=" text-mono-l-600 dark:text-mono-d-600">
            {props.children}
          </p>
        )}
        <button
          onClick={props.onClick}
          className="border border-none hover:bg-accent-150 hover:dark:bg-accent-750 py-1 px-3 rounded-md text-accent-400"
        >
          Change
        </button>
      </div>
    </div>
  );
}
