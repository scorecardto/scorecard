import React from "react";
import { Assignment } from "scorecard-types";

export default function TableRow(props: { assignment: Assignment }) {
  return (
    <div className="border-t border-t-mono-l-300 text-sm px-2">
      <div className="flex">
        <div className="w-full pr-2 py-2">
          <p>{props.assignment.name}</p>
        </div>
        <div className="w-32 pr-2 py-2">
          <p>{props.assignment.grade}</p>
        </div>
        <p className="w-10 flex items-center"></p>
      </div>
    </div>
  );
}
