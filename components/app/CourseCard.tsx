import Link from "next/link";
import GradeChip from "./GradeChip";
import { Course, DataContext, NotificationContext } from "scorecard-types";
import { useContext } from "react";

export default function CourseCard(props: {
  courseName: string;
  description1: string;
  description2: string;
  grade: string;
  id: string;
  courseIdx: number;
  onClick(id: string): void;
  lastUpdated: string;
}) {
  const notifications = useContext(NotificationContext);

  // notifications.notifications[0].

  return (
    <div
      className=""
      onClick={(e) => {
        props.onClick(props.id);
      }}
    >
      <div
        tabIndex={props.courseIdx == -1 ? 0 : -1}
        className="max-w-md md:max-w-none mx-auto rounded-lg p-4 leading-none bg-mono-l-100 dark:bg-mono-d-100 hover:bg-mono-l-150 hover:dark:bg-mono-d-150 cursor-pointer"
      >
        <div className="flex flex-row justify-between gap-5">
          <div className="whitespace-nowrap flex-shrink min-w-0 overflow-hidden">
            <div className="flex flex-col gap-5 p-1 whitespace-nowrap">
              <b className="text-ellipsis overflow-hidden leading-normal b">
                {props.courseName}
              </b>
              <div className="flex flex-col gap-3 children:text-ellipsis children:overflow-hidden p">
                <p>{props.lastUpdated}</p>
              </div>
            </div>
          </div>
          <div className="flex-none">
            <GradeChip>{props.grade}</GradeChip>
          </div>
        </div>
      </div>
    </div>
  );
}
