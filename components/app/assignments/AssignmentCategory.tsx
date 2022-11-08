import React from "react";
import { GradeCategory } from "scorecard-types";
import CategoryMeta from "./CategoryMeta";
import TableRow from "./TableRow";

export default function AssignmentCategory(props: { category: GradeCategory }) {
  return (
    <div className="mx-4 border border-mono-l-300 rounded-md overflow-hidden">
      <div>
        <CategoryMeta
          name={props.category.name}
          weight={props.category.weight}
          average={props.category.average}
        />
        <div className="flex children:text-mono-l-600 font-medium text-sm px-2 py-2">
          <p className="w-full">Name</p>
          <p className="w-32">Grade</p>
          <p className="w-10" />
        </div>
      </div>
      <div>
        {props.category.assignments?.map((assignment, idx) => (
          <TableRow assignment={assignment} key={idx} />
        ))}
      </div>
    </div>
  );
}
