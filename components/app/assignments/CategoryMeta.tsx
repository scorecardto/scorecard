import React, { useMemo } from "react";
import GradeChip from "../GradeChip";
import { AssignmentData } from "./AssignmentCategory";

export function CategoryMicroMeta(props: { name: string; value: string }) {
  const { name, value } = props;

  return (
    <div className="flex items-center gap-2">
      <p className="text-xs font-os text-mono-l-500 dark:text-mono-d-500">
        {name}
      </p>
      <p className="text-xs font-os text-mono-l-500 dark:text-mono-d-500 bg-mono-l-200 dark:bg-mono-d-200 py-0.5 px-1.5 rounded-md">
        {value}
      </p>
    </div>
  );
}
export default function CategoryMeta(props: {
  name: string;
  weight: number;
  average: string;
  isTesting?: boolean;
  assignments: AssignmentData[];
}) {
  const { name, weight, average, isTesting, assignments } = props;

  const assignmentCount = assignments?.length ?? 0;

  const totalPoints = useMemo(() => {
    return assignments.reduce((x, a) => {
      if (a.moddedDropped) return x;
      return x + (a.moddedCount ?? a.assignment.count ?? 0);
    }, 0);
  }, [assignments]);

  const pointsEarned = useMemo(() => {
    return assignments.reduce((x, a) => {
      if (a.moddedDropped) return x;
      // try converting to number
      const grade: number =
        a.moddedGrade ?? (parseFloat(a.assignment.grade ?? "") || 0);

      return x + grade * (a.moddedCount ?? a.assignment.count ?? 0);
    }, 0);
  }, [assignments]);

  const usablePoints = useMemo(() => {
    return assignments.reduce((x, a) => {
      // if can be converted to number OR "MSG", add to x
      const ct = a.moddedCount ?? a.assignment.count ?? 0;

      if (a.moddedDropped) return x;
      if (a.moddedGrade != undefined) return x + ct;
      const grade: number = parseFloat(a.assignment.grade ?? "");
      if (!isNaN(grade)) return x + ct;
      if (a.assignment.grade === "MSG") return x + ct;
      return x;
    }, 0);
  }, [assignments]);

  const percentKnown = useMemo(() => {
    return (usablePoints / totalPoints) * 100;
  }, [totalPoints, usablePoints]);

  const exactAverage = useMemo(() => {
    return pointsEarned / usablePoints;
  }, [pointsEarned, usablePoints]);

  return (
    <div className="border-b border-b-mono-l-300 dark:border-b-mono-d-300 py-2 pl-12 flex flex-col gap-2">
      <div className="flex justify-between items-center text-base pr-4">
        <p className="p">{name}</p>
        <div className="flex items-center">
          <p className="p py-1 pr-3">{`Weight: ${weight}, Average: ${average}`}</p>
          {isTesting && (
            <div className="flex items-center gap-2 bg-red-50 text-red-400 dark:bg-red-600 dark:text-white py-1 px-2 rounded-full">
              <div className="w-2 h-2 rounded-full bg-red-400 dark:bg-red-300 grade-change-glow" />
              <p className="text-sm">Testing</p>
            </div>
          )}
        </div>
      </div>
      <div className="flex gap-4">
        <CategoryMicroMeta name="Assignments" value={`${assignmentCount}`} />
        <CategoryMicroMeta name="Total Points" value={`${totalPoints}`} />
        <CategoryMicroMeta name="Percent Known" value={`${percentKnown}%`} />
        {!isNaN(exactAverage) && (
          <CategoryMicroMeta
            name="Exact Average"
            value={`${exactAverage.toFixed(2)}`}
          />
        )}
      </div>
    </div>
  );
}
