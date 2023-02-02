import React from "react";
import GradeChip from "../GradeChip";

export default function CategoryMeta(props: {
  name: string;
  weight: number;
  average: string;
  isTesting?: boolean;
}) {
  const { name, weight, average, isTesting } = props;

  return (
    <div className="border-b border-b-mono-l-300 dark:border-b-mono-d-300 py-2 pl-12">
      <div className="flex justify-between items-center text-base pr-7">
        <p className="p">{name}</p>
        <div className="p">
          <p className={`${isTesting ? "text-red-600" : ""}`}>
            {`Weight: ${weight}, Average: ${average}`}
          </p>
        </div>
      </div>
    </div>
  );
}
