import React from "react";

export default function GradebookMeta(props: { name: string; value: string }) {
  return (
    <div className="flex items-center gap-2">
      <p className="text-sm font-os text-mono-l-500 dark:text-mono-d-500">
        {props.name}
      </p>
      <p className="text-sm font-os text-mono-l-500 dark:text-mono-d-500 bg-mono-l-200 dark:bg-mono-d-200 py-0.5 px-1.5 rounded-md">
        {props.value}
      </p>
    </div>
  );
}
