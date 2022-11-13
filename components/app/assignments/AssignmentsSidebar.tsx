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
    <div className="h-full bg-accent-100 pt-8 w-64 text-sm">
      <p className="text-mono-l-600 font-medium pl-6 py-2">Courses</p>
      <span>
        {courses.map((c, idx) => {
          return (
            <div
              key={idx}
              className={`flex justify-between items-center py-3 leading-none border-b-2 first:border-t-2 border-accent-200 pl-6 pr-4 ${
                currentCourse === idx ? "bg-accent-200" : "cursor-pointer"
              }`}
              onClick={() => {
                setCourse(idx);
              }}
            >
              <p
                className={`${currentCourse === idx ? "text-accent-300" : ""}`}
              >
                {c.displayName || c.name}
              </p>
            </div>
          );
        })}
      </span>
    </div>
  );
}
