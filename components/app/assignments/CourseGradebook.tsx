import React, {
  useContext,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { FiEdit2, FiRotateCw } from "react-icons/fi";
import { MdClose, MdEdit } from "react-icons/md";
import { Course, DataContext, GradeCategory } from "scorecard-types";
import ActionChip from "../ActionChip";
import GradeChip from "../GradeChip";
import AssignmentCategory from "./AssignmentCategory";
import { motion, useAnimationControls } from "framer-motion";
import { PortContext } from "../../core/ExtensionConnector";
import Loading from "../../core/util/Loading";
import { IoReloadOutline } from "react-icons/io5";

export default function CourseGradebook(props: { course: Course }) {
  const { course } = props;

  const data = useContext(DataContext);

  const controls = useAnimationControls();

  const firstUpdate = useRef(true);

  const port = useContext(PortContext).port;

  const [displayCategories, setDisplayCategories] = useState<GradeCategory[]>(
    []
  );

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

  const [editing, setEditing] = useState(false);

  const input = useRef<HTMLInputElement>(null);
  const container = useRef<HTMLDivElement>(null);

  const [customDisplayName, setCustomDisplayName] = useState(
    data.courseDisplayNames[course.key]
  );

  const [currentCourse, setCurrentCourse] = useState(course);

  useEffect(() => {
    if (course !== currentCourse) {
      setCurrentCourse(course);
      return;
    }

    if (editing) {
      const onEdit = (evt: KeyboardEvent) => {
        if (evt.key === "Escape") {
          setEditing(false);
        }
      };

      input.current?.focus();
    } else {
      if (
        course.name === customDisplayName ||
        customDisplayName !== input.current?.value
      ) {
        return;
      }

      port?.postMessage({
        type: "updateCourseDisplayName",
        courseKey: course.key,
        displayName: customDisplayName.trim(),
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editing, course]);

  function reset() {
    setCustomDisplayName(course.name);
    port?.postMessage({
      type: "updateCourseDisplayName",
      courseKey: course.key,
      displayName: course.name,
    });
    setEditing(false);
  }

  useEffect(() => {
    if (course) {
      setCustomDisplayName(data.courseDisplayNames[course.key] || course.name);
    }
  }, [course]);

  const selectedGradeCategory = data.gradeCategory;
  const defaultGradeCategory = data.data?.gradeCategory;

  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (selectedGradeCategory === defaultGradeCategory) {
      setLoaded(true);
      setDisplayCategories(props.course.gradeCategories ?? []);
    } else {
      setLoaded(false);
      port?.postMessage({
        type: "requestAlternateGradingPeriod",
        courseKey: course.key,
        gradeCategory: selectedGradeCategory,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedGradeCategory, defaultGradeCategory, course]);

  useEffect(() => {
    const listener = (msg: any) => {
      if (msg.type === "setAlternateGradingPeriod") {
        if (
          msg.courseKey === course.key &&
          msg.gradeCategory === selectedGradeCategory
        ) {
          setLoaded(true);
          setDisplayCategories(msg.gradeCategories);
        }
      }
    };

    port?.onMessage.addListener(listener);

    return () => {
      port?.onMessage.removeListener(listener);
    };
  }, [port, selectedGradeCategory, course.key]);

  return (
    <motion.div className="flex flex-col gap-4">
      <div className="flex justify-between pl-8 pt-4 pr-4">
        <div
          ref={container}
          className={`flex flex-col rounded-xl relative group mr-20 ${
            editing ? "" : "hover:bg-mono-l-200 cursor-pointer"
          }`}
          tabIndex={0}
          onFocus={() => {
            setEditing(true);
          }}
          onBlur={(evt) => {
            setEditing(false);
          }}
        >
          {!editing && (
            <div className="hidden group-hover:flex absolute bg-accent-100 text-accent-300 z-10 py-2 px-4 rounded-full top-0 left-full whitespace-nowrap translate-x-4 text-sm gap-2 items-center">
              <MdEdit />
              <p>Click to Rename</p>
            </div>
          )}
          <div
            className={`flex gap-2 items-center relative pt-4 px-4 ${
              editing ? "bg-accent-100" : ""
            } rounded-xl`}
          >
            <input
              onBlur={(e) => {
                if (container.current?.contains(e.relatedTarget as Node)) {
                  return;
                }

                setEditing(false);
              }}
              tabIndex={0}
              // on press enter, save
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  setEditing(false);
                }
              }}
              className={`h1 text-3xl outline-none bg-transparent ${
                editing ? "pb-4" : "pb-2 cursor-pointer"
              }`}
              ref={input}
              type="text"
              onChange={(evt) => {
                setCustomDisplayName(evt.target.value);
              }}
              value={customDisplayName}
              disabled={!editing}
            />
          </div>
          {editing && (
            // add a reset button
            <button
              className="bg-red-50 text-red-400 rounded-md py-1 px-2 text-sm mt-2 w-fit"
              onMouseDown={(e) => {
                e.preventDefault();
                reset();
              }}
            >
              Reset
            </button>
          )}
          {!editing && <p className="px-4 p pb-5">Gradebook</p>}
        </div>
        <div className="flex pt-4">
          <div className="children:w-fit flex h-fit gap-2">
            {/* <ActionChip>Details</ActionChip>
            <ActionChip>Test Grades</ActionChip> */}
            <GradeChip spoiler={false}>
              {course.grades[data.gradeCategory]?.value}
            </GradeChip>
          </div>
        </div>
      </div>
      <div className="">
        <motion.div
          transition={{ duration: 0.3, type: "keyframes", ease: "easeOut" }}
          animate={controls}
        >
          {loaded ? (
            <div className="flex flex-col gap-6 pb-6">
              {displayCategories?.map((category, idx) => {
                return <AssignmentCategory key={idx} category={category} />;
              })}
            </div>
          ) : (
            <div className="w-full h-full flex justify-center items-center">
              <Loading size={20} />
            </div>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
}
