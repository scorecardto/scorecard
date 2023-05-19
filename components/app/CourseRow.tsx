import Link from "next/link";
import GradeChip from "./GradeChip";
import { Course, DataContext, NotificationContext } from "scorecard-types";
import { useContext } from "react";

export default function CourseRow(props: {
  course: Course;
  courseName: string;
  onClick(id: string): void;
}) {
  const notifications = useContext(NotificationContext);

  // notifications.notifications[0].

  return (
    <div
      className=""
      onClick={(e) => {
        props.onClick(props.course.key);
      }}
    >
      <div
        tabIndex={props.course == null ? 0 : -1}
        className="w-full rounded-lg leading-none bg-mono-l-100 dark:bg-mono-d-100 hover:bg-mono-l-150 hover:dark:bg-mono-d-150 cursor-pointer"
      >
        <div className="flex flex-row justify-between gap-5">
          <div className="whitespace-nowrap flex-shrink min-w-0 overflow-hidden p-4">
            <div className="flex flex-col gap-5 p-1 whitespace-nowrap">
              <b className="text-ellipsis overflow-hidden leading-normal b">
                {props.courseName}
              </b>
            </div>
          </div>
          <div className="flex">
            {props.course.grades.map((grade, idx) => {
              return (
                <div key={idx} className="flex flex-row gap-2 w-20 py-4">
                  <GradeChip active={grade?.active}>{grade?.value}</GradeChip>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
