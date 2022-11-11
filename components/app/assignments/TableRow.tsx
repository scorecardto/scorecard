import React from "react";
import { Assignment } from "scorecard-types";

export default function TableRow(props: { assignment: Assignment }) {
  return (
    <div className="text-sm pr-4 pt-1">
      <div className="flex">
        <div className="w-full pr-2 py-1">
          <p className="text-mono-l-600">{props.assignment.name}</p>
        </div>
        <div className="w-24">
          <div className="bg-mono-l-200 py-1 px-2 rounded-sm">
            <p className="text-mono-l-600 text-right">
              {props.assignment.grade}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
