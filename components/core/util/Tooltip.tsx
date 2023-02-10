import React from "react";

export default function Tooltip(props: {
  children: React.ReactNode;
  className: string;
  side: "left" | "right";
}) {
  return (
    <div
      className={`bg-mono-l-100 dark:bg-mono-d-100 text-center rounded-lg py-2 group-hover:opacity-100 pointer-events-none mt-0.5 border border-mono-l-300 dark:border-mono-d-400 text-sm ${props.className}`}
    >
      <div className="flex gap-4 whitespace-nowrap items-center px-2">
        {props.children}
      </div>
      <svg
        className={`absolute text-mono-l-100 dark:text-mono-d-100 h-4 w-8 bottom-full z-0 translate-y-0 stroke-[20] stroke-mono-l-300 dark:stroke-mono-d-400 ${
          props.side === "left" ? "left-0" : "right-0"
        }`}
        x="0px"
        y="0px"
        viewBox="0 0 255 255"
        xmlSpace="preserve"
      >
        <polygon className="fill-current " points="0,255 127.5,100 255,255" />
      </svg>
      <svg
        className={`absolute text-mono-l-100 dark:text-mono-d-100 h-4 w-8 bottom-full z-20 translate-y-0.5 ${
          props.side === "left" ? "left-0" : "right-0"
        }`}
        x="0px"
        y="0px"
        viewBox="0 0 255 255"
        xmlSpace="preserve"
      >
        <polygon className="fill-current " points="0,235 127.5,100 255,235" />
      </svg>
    </div>
  );
}
