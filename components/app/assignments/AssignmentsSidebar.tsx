import React from "react";
import { Course } from "scorecard-types";
import GradeChip from "../GradeChip";

export default function AssignmentsSidebar(props: {
  courses: Course[];
  setCourse: React.Dispatch<React.SetStateAction<number>>;
  currentCourse: number;
  gradingPeriod: number;
}) {
  const { courses, setCourse, currentCourse, gradingPeriod } = props;
  return (
    <div className="h-full bg-accent-100 pt-16 w-80">
      {courses.map((c, idx) => {
        return (
          <div
            key={idx}
            className={`flex justify-between items-center py-2 leading-none border-b-2 border-accent-200 pl-8 pr-4 ${
              currentCourse === idx ? "bg-accent-200" : "cursor-pointer"
            }`}
            onClick={() => {
              setCourse(idx);
            }}
          >
            <p className={`${currentCourse === idx ? "text-accent-300" : ""}`}>
              {c.name}
            </p>

            <div className="flex-none w-fit">
              <GradeChip>{c.grades[gradingPeriod]?.value ?? "NG"}</GradeChip>
            </div>
          </div>
        );
      })}
    </div>
  );
}
