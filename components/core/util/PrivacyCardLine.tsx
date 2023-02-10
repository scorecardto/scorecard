import React from "react";

export default function PrivacyCardLine(props: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex gap-2 items-center text-mono-l-600 dark:text-mono-d-600">
      <div>{props.children}</div>
      <p>{props.title}</p>
    </div>
  );
}
