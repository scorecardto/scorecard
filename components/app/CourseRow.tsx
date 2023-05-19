import Link from "next/link";
import GradeChip from "./GradeChip";
import { Course, DataContext, NotificationContext } from "scorecard-types";
import { useContext } from "react";
import { motion } from "framer-motion";
export default function CourseRow(props: {
  course: Course;
  courseName: string;
  idx: number;
  onClick(id: string): void;
}) {
  const notifications = useContext(NotificationContext);

  // notifications.notifications[0].

  return (
    <motion.div
      initial={{ opacity: 0, translateY: -10 }}
      animate={{ opacity: 1, translateY: 0 }}
      transition={{ duration: 0.2, delay: props.idx * 0.05 }}
      className=""
      onClick={(e) => {
        props.onClick(props.course.key);
      }}
    >
      <div
        tabIndex={props.course == null ? 0 : -1}
        className="w-full rounded-lg leading-none bg-mono-l-100 dark:bg-mono-d-100 hover:bg-mono-l-150 hover:dark:bg-mono-d-150 cursor-pointer overflow-scroll"
      >
        <div className="flex flex-row justify-between gap-5">
          <div className="whitespace-nowrap shrink-0 min-w-0 overflow-hidden p-4">
            <div className="flex flex-col gap-5 p-1 whitespace-nowrap">
              <b className="text-ellipsis overflow-hidden leading-normal b">
                {props.courseName}
              </b>
            </div>
          </div>
          <div className="flex pr-2">
            {props.course.grades.map((grade, idx) => {
              return (
                <div
                  key={idx}
                  className="flex flex-row gap-2 w-[5.5rem] my-2 border border-mono-l-200 dark:border-mono-d-300 p-1.5 last:border-r border-r-0 first:rounded-l-md last:rounded-r-md"
                >
                  <GradeChip active={grade?.active}>{grade?.value}</GradeChip>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
