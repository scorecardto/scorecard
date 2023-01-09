import React from "react";
import { Assignment } from "scorecard-types";

export default function TableRow(props: { assignment: Assignment }) {
  const gradeRef = React.useRef<HTMLDivElement>(null);

  return (
    <div className="text-sm pr-4 pt-1">
      <div className="flex items-center whitespace-nowrap justify-start">
        <div className="w-full pr-2 py-1">
          <p className="text-mono-l-600 dark:text-mono-d-600">
            {props.assignment.name}
          </p>
        </div>
        <div className="flex shrink-0 gap-4">
          <div className="w-20 hidden lg:block">
            <p className="p">
              {props.assignment.due
                ? `Due ${new Date(props.assignment.due).toLocaleString(
                    "en-US",
                    {
                      month: "short",
                      day: "numeric",
                    }
                  )}`
                : ""}
            </p>
          </div>
          <div className="w-24 hidden lg:block">
            <p className="p">
              {props.assignment.assign
                ? `Assign ${new Date(props.assignment.assign).toLocaleString(
                    "en-US",
                    {
                      month: "short",
                      day: "numeric",
                    }
                  )}`
                : ""}
            </p>
          </div>
          <div className="w-14 hidden md:block">
            <p className="p">{props.assignment.dropped ? "Dropped" : ""}</p>
          </div>
          <div className="w-14">
            <div className="group relative">
              {props.assignment.grade?.match(/[0-9.]{1,3}%/) && (
                <div className="hidden group-hover:block absolute right-full mr-1.5 top-1/2 -translate-y-1/2 bg-black/75 rounded-md">
                  <p className="text-white py-1 px-2">
                    {props.assignment.points?.toString().replace(".0", "")}/{props.assignment.scale?.toString().replace(".0", "")}
                  </p>
                </div>
              )}
              <div
                className="bg-mono-l-200 dark:bg-mono-d-200 py-1 px-2 rounded-sm"
                ref={gradeRef}
              >
                <p className="text-mono-l-600 dark:text-mono-d-600 text-center cursor-default">
                  {props.assignment.grade}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
