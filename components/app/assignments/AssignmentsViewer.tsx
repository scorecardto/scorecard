import React, { useContext, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { DataContext } from "scorecard-types";
import GradeChip from "../GradeChip";
import Dropdown from "../../core/input/Dropdown";
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

      document.addEventListener("click", handleClick, { capture: true });

      return () => {
        document.removeEventListener("click", handleClick, { capture: true });
      };
    }
  }, [show, setCourse]);

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
      opacity: 0.7,
      scale: 0.9,
    },
  };

  return (
    <motion.div
      className={`${
        show ? "block" : "hidden"
      } z-40 fixed top-0 left-0 w-full h-full flex py-20 px-20`}
      animate={{ backgroundColor: show ? "rgba(0,0,0,0.5)" : "rgba(0,0,0,0)" }}
      transition={{ duration: 0.2 }}
    >
      <motion.div
        animate={show ? "show" : "hide"}
        variants={modalVariants}
        className="w-full h-full bg-mono-l-100 dark:bg-mono-d-100 rounded-md overflow-hidden"
      >
        <div ref={ref} className="flex w-full h-full">
          <AssignmentsSidebar
            courses={data.data?.courses ?? []}
            currentCourse={course}
            setCourse={setCourse}
            gradingPeriod={data.gradeCategory}
          />
          <div className="flex-1 w-[44rem] overflow-scroll h-full">
            <div className="h-16 flex items-center px-4">
              <Dropdown
                options={data.data?.gradeCategoryNames ?? []}
                selected={data.gradeCategory}
                setSelected={data.setGradeCategory}
              />
            </div>
            {data.data?.courses[course] ? (
              <CourseGradebook course={data.data?.courses[course]} />
            ) : (
              <p>Nothing to show</p>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
