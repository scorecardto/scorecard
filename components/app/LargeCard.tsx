import React from "react";

export default function LargeCard(props: { children: React.ReactNode }) {
  return (
    <div className="max-w-md flex flex-col gap-4 mx-auto">
      <div className="bg-mono-l-100 dark:bg-mono-d-100 rounded-md shadow-sm children:py-4 children:px-6 children:border-b last:children:border-b-0 children:border-b-mono-l-300 dark:children:border-b-mono-d-300">
        {props.children}
      </div>
    </div>
  );
}
