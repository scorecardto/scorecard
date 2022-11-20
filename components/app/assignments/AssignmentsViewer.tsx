import React, { useContext, useEffect, useRef } from "react";
import {FiRotateCw, FiX} from "react-icons/fi";
import { motion } from "framer-motion";
import { DataContext } from "scorecard-types";
import GradeChip from "../GradeChip";
import GradingCategorySelector from "../../core/input/GradingCategorySelector";
import AssignmentCategory from "./AssignmentCategory";
import CourseGradebook from "./CourseGradebook";
import AssignmentsSidebar from "./AssignmentsSidebar";
export default function AssignmentsViewer(props: {
  course: number;
  setCourse: React.Dispatch<React.SetStateAction<number>>;
}) {
  const { course, setCourse } = props;
  const show = course !== -1;

  const data = useContext(DataContext);

  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (show) {
      const handleClick = (e: any) => {
        if (e.target == null || !ref.current?.contains(e.target)) {
          setCourse(-1);
        }
      };

      const handleKey = (e: KeyboardEvent) => {
        if (e.target == e.view?.document.body) {
          if (e.key === "Escape") {
            setCourse(-1);
          } else if (e.altKey && (e.key === "ArrowDown" || e.key === "ArrowUp")) {
            const courses = data.data?.courses?.length;

            if (courses) {
              if (e.key === "ArrowDown") {
                setCourse(Math.min((course + 1), courses-1));
              } else {
                setCourse(Math.max(0, course-1));
              }

              e.preventDefault();
            }
          }
        }
      }

      document.addEventListener("click", handleClick, { capture: true });
      document.addEventListener("keydown", handleKey, { capture: true });

      return () => {
        document.removeEventListener("click", handleClick, { capture: true });
        document.removeEventListener("keydown", handleKey, { capture: true });
      };
    }
  }, [show, setCourse, course]);

  const modalVariants = {
    show: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.2,
        bounce: false,
      },
    },
    hide: {
      opacity: show ? 0.7 : 0,
      scale: 0.9,
    },
  };

  return (
    <motion.div
      animate={{
        visibility: show ? "visible" : "hidden",
      }}
      transition={{
        delay: show ? 0 : 0.0,
      }}
    >
      <motion.div
        className={`z-40 fixed top-0 left-0 w-full h-full flex py-10 px-20`}
        animate={{
          backgroundColor: show ? "rgba(0,0,0,0.5)" : "rgba(0,0,0,0)",
        }}
        transition={{ duration: 0.2, delay: 0 }}
      >
        <motion.div
          animate={show ? "show" : "hide"}
          variants={modalVariants}
          className="w-full h-full bg-mono-l-100 dark:bg-mono-d-100 rounded-md overflow-hidden"
        >
          <div ref={ref} className="relative flex w-full h-full">
            <AssignmentsSidebar
              courses={data.data?.courses ?? []}
              currentCourse={course}
              setCourse={setCourse}
              gradingPeriod={data.gradeCategory}
            />
            <div className="flex-1 w-[44rem] overflow-scroll h-full">
              {data.data?.courses[course] ? (
                <CourseGradebook course={data.data?.courses[course]} />
              ) : (
                <p></p>
              )}
            </div>
            <button tabIndex={0} onClick={() => {setCourse(-1)}} className="absolute top-1 right-1 text-mono-l-500 hover:bg-slate-100 rounded-md p-1"><FiX/></button>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
