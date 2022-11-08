import React from "react";
import GradeChip from "../GradeChip";

export default function CategoryMeta(props: {
  name: string;
  weight: number;
  average: string;
}) {
  const { name, weight, average } = props;

  return (
    <div className="bg-mono-l-200 p-2 flex justify-between items-center">
      <div>
        <p className="text-sm">{name}</p>
        <p className="text-mono-l-450 text-sm">{`Weight: ${weight}`}</p>
      </div>
      <div className="w-fit flex-none leading-none">
        <GradeChip>{average || "NG"}</GradeChip>
      </div>
    </div>
  );
}
