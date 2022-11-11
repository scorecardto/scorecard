import React from "react";
import { GradeCategory } from "scorecard-types";
import CategoryMeta from "./CategoryMeta";
import TableRow from "./TableRow";

export default function AssignmentCategory(props: { category: GradeCategory }) {
  return (
    <div className="pl-12">
      <CategoryMeta
        name={props.category.name}
        weight={props.category.weight}
        average={props.category.average}
      />
      {props.category.assignments?.map((assignment, idx) => {
        return <TableRow key={idx} assignment={assignment} />;
      })}
    </div>
  );
}
