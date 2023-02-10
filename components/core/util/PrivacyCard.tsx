import React from "react";

export default function PrivacyCard(props: {
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-mono-l-100 dark:bg-mono-d-100 rounded-lg p-4 privacy-card-glow flex flex-col gap-2">
      <div className="flex flex-col gap-2">
        <h2 className="h2">{props.title}</h2>
        <p className="p font-os">{props.description}</p>
      </div>
      <hr className="my-2 border-mono-l-300 dark:border-mono-d-300" />
      <div className="flex flex-col gap-2 font-os">{props.children}</div>
    </div>
  );
}
