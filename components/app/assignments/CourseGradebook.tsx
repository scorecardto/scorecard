import React, {BaseSyntheticEvent, SyntheticEvent, useContext, useEffect, useLayoutEffect, useRef} from "react";
import { FiEdit2 } from "react-icons/fi";
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

  function updateName(evt: KeyboardEvent<HTMLHeadingElement>) {
    if ((evt.key === "Enter" || evt.key === "Escape") && evt.target) {
      if (evt.key === "Escape") {
        (evt.target as HTMLHeadingElement).innerText = (data.courseDisplayNames[course.key] || course.name);
      } else {
        port?.postMessage({
          type: "updateCourseDisplayName",
          courseKey: course.key,
          displayName: (evt.target as HTMLHeadingElement).innerText,
        });

        evt.cancelBubble = true;
      }

      (evt.target as HTMLHeadingElement).blur();
    }
  }

  function escapeName(evt: FocusEvent<HTMLHeadingElement>) {
    if (evt.target) {
      if (evt.nativeEvent.sourceCapabilities) {
        (evt.target as HTMLHeadingElement).innerText = (data.courseDisplayNames[course.key] || course.name);
      }

      (evt.target as HTMLHeadingElement).contentEditable = "false";
    }
  }

  function makeEditable(evt: MouseEvent<HTMLHeadingElement>) {
    if (evt.target) {
      (evt.target as HTMLHeadingElement).contentEditable = "true";
      (evt.target as HTMLHeadingElement).focus();
    }
  }

  return (
    <motion.div className="flex flex-col gap-4">
      <div className="flex justify-between pl-12 pr-4 pt-8 pb-4">
        <div className="flex flex-col gap-2">
          <div className="flex gap-2 items-center">
            <h1 className="text-3xl outline-0 decoration-3 underline transition-colors duration-300 decoration-transparent focus:decoration-blue-300" onClick={makeEditable} onKeyDown={updateName} onBlur={escapeName}>{data.courseDisplayNames[course.key] ?? course.name}</h1>
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
