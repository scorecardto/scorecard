import React from "react";
import { Course } from "scorecard-types";
import AssignmentCategory from "./AssignmentCategory";

export default function CourseGradebook(props: { course: Course }) {
  return (
    <div className="flex flex-col gap-4">
      {props.course.gradeCategories?.map((category, idx) => {
        return <AssignmentCategory key={idx} category={category} />;
      })}
    </div>
  );
}
