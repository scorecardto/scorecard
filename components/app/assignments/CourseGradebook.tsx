import React, { useContext } from "react";
import { FiEdit2 } from "react-icons/fi";
import { Course, DataContext } from "scorecard-types";
import ActionChip from "../ActionChip";
import GradeChip from "../GradeChip";
import AssignmentCategory from "./AssignmentCategory";

export default function CourseGradebook(props: { course: Course }) {
  const { course } = props;

  const { gradeCategory } = useContext(DataContext);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between pl-12 pr-4 pt-8 pb-4">
        <div className="flex flex-col gap-2">
          <div className="flex gap-2 items-center">
            <h1 className="text-3xl">{course.name}</h1>
            <FiEdit2 className="text-mono-l-500" />
          </div>
          <p>Gradebook</p>
        </div>
        <div className="flex">
          <div className="children:w-fit flex h-fit gap-2">
            <ActionChip>Details</ActionChip>
            <ActionChip>Test Grades</ActionChip>
            <GradeChip spoiler={false}>
              {course.grades[gradeCategory]?.value}
            </GradeChip>
          </div>
        </div>
      </div>
      {props.course.gradeCategories?.map((category, idx) => {
        return <AssignmentCategory key={idx} category={category} />;
      })}
    </div>
  );
}
