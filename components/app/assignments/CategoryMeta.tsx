import React from "react";
import GradeChip from "../GradeChip";

export default function CategoryMeta(props: {
  name: string;
  weight: number;
  average: string;
}) {
  const { name, weight, average } = props;

  return (
    <div className="border-b border-b-mono-l-300 dark:border-b-mono-d-300 py-2">
      <div className="flex justify-between items-center text-base pr-7">
        <p className="">{name}</p>
        <p className="">{`Weight: ${weight}, Average: ${average}`}</p>
      </div>
    </div>
  );
}
