import React from "react";

export default function PrivacyCardLine(props: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex gap-4 items-center text-mono-l-600 dark:text-mono-d-600 ">
      <div className="text-mono-l-500 dark:text-mono-d-500">
        {props.children}
      </div>
      <p>{props.title}</p>
    </div>
  );
}
