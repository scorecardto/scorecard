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
      <div className="flex justify-between items-center text-base pr-4">
        <p className="p">{name}</p>
        <div className="flex items-center">
          <p className="p py-1 pr-3">{`Weight: ${weight}, Average: ${average}`}</p>
          {isTesting && (
            <div className="flex items-center gap-2 bg-red-50 text-red-400 dark:bg-red-600 dark:text-white py-1 px-2 rounded-full">
              <div className="w-2 h-2 rounded-full bg-red-300 grade-change-glow" />
              <p className="text-sm">Testing</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
