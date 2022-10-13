import React from "react";

export default function ChangeButton(props: {
  onClick(): void;
  children: string;
}) {
  return (
    <div className="font-os flex flex-row justify-between">
      <p className=" text-mono-l-600 dark:text-mono-d-600">{props.children}</p>
      <button
        onClick={props.onClick}
        className="border border-none hover:bg-accent-150 hover:border-accent-150 py-1 px-3 rounded-md text-accent-400"
      >
        Change
      </button>
    </div>
  );
}
