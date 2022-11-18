import React, {useContext, useEffect, useLayoutEffect, useRef} from "react";
import { FiEdit2, FiRotateCw } from "react-icons/fi";
import { Course, DataContext } from "scorecard-types";
import ActionChip from "../ActionChip";
import GradeChip from "../GradeChip";
import AssignmentCategory from "./AssignmentCategory";
import { motion, useAnimationControls } from "framer-motion";
import { PortContext } from "../../core/ExtensionConnector";

export default function CourseGradebook(props: { course: Course }) {
  const { course } = props;

  const data = useContext(DataContext);

  const controls = useAnimationControls();

  const firstUpdate = useRef(true);

  const port = useContext(PortContext).port;

  useLayoutEffect(() => {
    if (firstUpdate.current) {
      if (course) {
        firstUpdate.current = false;
      }
      return;
    }

    controls.start({
      opacity: [0.5, 1],
      translateX: [-20, 0],
      translateY: [-20, 0],
      scale: [0.95, 1],
      skew: [-1, 0],
    });
  }, [course]);

  let saveName = true;

  function updateName(evt: React.KeyboardEvent<HTMLHeadingElement>) {
    if ((evt.key === "Enter" || evt.key === "Escape") && evt.currentTarget) {
      evt.bubbles = false;

      saveName = evt.key !== "Escape";
      evt.currentTarget.blur();
    }
  }

  function escapeName(evt: React.FocusEvent<HTMLHeadingElement>) {
    if (evt.currentTarget) {
      if (saveName) {
        const newName = evt.currentTarget.innerText.trim();

        port?.postMessage({
          type: "updateCourseDisplayName",
          courseKey: course.key,
          displayName: newName ? newName : course.name,
        });
      } else {
        evt.currentTarget.innerText = (data.courseDisplayNames[course.key] || course.name);
      }

      evt.currentTarget.contentEditable = "false";
    }
  }

  function makeEditable(evt: React.MouseEvent<HTMLHeadingElement>) {
    if (evt.currentTarget) {
      evt.currentTarget.contentEditable = "true";
      evt.currentTarget.focus();
    }
  }

  function reset(evt: React.MouseEvent<HTMLButtonElement>) {
    port?.postMessage({
      type: "updateCourseDisplayName",
      courseKey: course.key,
      displayName: course.name,
    });
  }

  return (
    <motion.div className="flex flex-col gap-4">
      <div className="flex justify-between pl-12 pr-4 pt-8 pb-4">
        <div className="flex flex-col gap-2">
          <div className="flex gap-2 items-center relative">
            <button onClick={reset} className="text-mono-l-500 absolute right-full mr-1 hover:bg-slate-100 rounded-md p-1"><FiRotateCw/></button>
            <h1 className="text-3xl outline-0 decoration-3 transition-colors duration-300 decoration-transparent focus:decoration-blue-300 focus:underline" onClick={makeEditable} onKeyDown={updateName} onBlur={escapeName}>{data.courseDisplayNames[course.key] ?? course.name}</h1>
            <FiEdit2 className="text-mono-l-500" />
          </div>
          <p>Gradebook</p>
        </div>
        <div className="flex">
          <div className="children:w-fit flex h-fit gap-2">
            <ActionChip>Details</ActionChip>
            <ActionChip>Test Grades</ActionChip>
            <GradeChip spoiler={false}>
              {course.grades[data.gradeCategory]?.value}
            </GradeChip>
          </div>
        </div>
      </div>
      <motion.div
        transition={{ duration: 0.3, type: "keyframes", ease: "easeOut" }}
        animate={controls}
      >
        {props.course.gradeCategories?.map((category, idx) => {
          return <AssignmentCategory key={idx} category={category} />;
        })}
      </motion.div>
    </motion.div>
  );
}
