import React, {useContext, useEffect, useLayoutEffect, useMemo, useRef, useState,} from "react";
import {FiEdit2, FiRotateCw} from "react-icons/fi";
import {Course, DataContext, GradeCategory} from "scorecard-types";
import GradeChip from "../GradeChip";
import AssignmentCategory, {AssignmentData} from "./AssignmentCategory";
import {motion, useAnimationControls} from "framer-motion";
import {PortContext} from "../../core/ExtensionConnector";
import Loading from "../../core/util/Loading";

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
  }, [controls, course]);

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
      if (
        saveName &&
        evt.currentTarget.innerText !== data.courseDisplayNames[course.key]
      ) {
        // const newName = evt.currentTarget.innerText.trim();

        port?.postMessage({
          type: "updateCourseDisplayName",
          courseKey: course.key,
          displayName: evt.currentTarget.innerText.trim(),
        });
      } else {
        evt.currentTarget.innerText =
          data.courseDisplayNames[course.key] || course.name;
      }

      evt.currentTarget.contentEditable = "false";

      evt.currentTarget.previousElementSibling?.classList.add("opacity-0");
      (evt.currentTarget.previousElementSibling as HTMLElement).tabIndex = -1;
    }
  }

  function makeEditable(evt: React.MouseEvent<HTMLHeadingElement>) {
    if (evt.currentTarget) {
      evt.currentTarget.contentEditable = "true";

      evt.currentTarget.previousElementSibling?.classList.remove("opacity-0");
      (evt.currentTarget.previousElementSibling as HTMLElement).tabIndex = 0;

      saveName = true;
      evt.currentTarget.focus();

      if (
        getSelection()?.getRangeAt(0).startContainer.parentElement !=
        evt.currentTarget
      ) {
        const range = document.createRange();
        range.selectNodeContents(evt.currentTarget);
        getSelection()?.removeAllRanges();
        getSelection()?.addRange(range);
      }
    }
  }

  function reset() {
    port?.postMessage({
      type: "updateCourseDisplayName",
      courseKey: course.key,
      displayName: course.name,
    });
  }

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

  // grade testing stuff
  const [ isTesting, setIsTesting ] = useState<boolean[]>();
  const [ moddedAvgs, setModdedAvgs ]  = useState<((number|undefined)[]|undefined)>();
  const [ average, setAverage ] = useState<string>("");
  const [ resetMods, setResetMods ] = useState<boolean>(false);

  useEffect(() => {
    if (resetMods) setResetMods(false);
  }, [resetMods]);

  useMemo(() => {
    setIsTesting(course.gradeCategories?.map(()=>false));
    setModdedAvgs(course.gradeCategories?.map(()=>undefined));
    setAverage(course.grades[data.gradeCategory]?.value ?? "NG");
  }, [course.gradeCategories, course.grades, data.gradeCategory]);

  // TODO: use assignment weights
  // get the average (mean) of all the assignments in a category, taking into account test grades
  const sumCategory = (category: GradeCategory, assignments: AssignmentData[]) => {
    if (assignments.every((a, i) => a.moddedGrade === undefined && a.assignment === category.assignments?.[i])) return parseFloat(category.average);

    let sum = 0;
    let count = 0;

    assignments.forEach((data) => {
      let def = data.assignment.grade?.replace("%", "").toLowerCase();

      if (data.assignment.dropped) return;

      if (data.moddedGrade != undefined) {
        sum += data.moddedGrade;
        count++;
      } else if (def) {
        if (def === "msg") def = "0";
        if (def.match(/[a-z]/g)) return;

        sum += Math.round(parseFloat(def));
        count++;
      }
    });

    return sum/count;
  }

  // get the average (weighted) of all the categories
  const sumTotal = () => {
    if (!moddedAvgs) return 0;
    if (!course.gradeCategories) return 0;

    if (moddedAvgs.every((grades) => grades === undefined)) return parseFloat(course.grades[data.gradeCategory]?.value ?? "0");

    let totalWeight = 0;
    let sum = 0;

    course.gradeCategories.forEach((cat) => {totalWeight += cat.weight});

    moddedAvgs.forEach((grade, i) => {
      if (!course.gradeCategories) return;

      let category = course.gradeCategories[i];

      // we have to re-sum it because it needs to calculate the average based on individual assignments, not the stored, rounded average
      let def = sumCategory(category, category.assignments?.reduce((x, data)=>{ x.push({assignment: data, moddedGrade: undefined, test: false}); return x; }, [] as AssignmentData[]) ?? []);

      if (grade != undefined) {
        sum += grade*category.weight/totalWeight;
      } else {
        sum += def*category.weight/totalWeight;
      }
    });

    return Math.round(sum);
  }

  return (
    <motion.div className="flex flex-col gap-4">
      <div className="flex justify-between pl-12 pr-4 pt-8 pb-4 relative">
        <div className="flex flex-col gap-2">
          <div className="flex gap-2 items-center relative">
            <button
              tabIndex={-1}
              onClick={reset}
              className="transition-opacity duration-200 opacity-0 text-mono-l-500 absolute right-full mr-1 hover:bg-slate-100 rounded-md p-1"
            >
              <FiRotateCw />
            </button>
            <h1
              tabIndex={0}
              className="h1 text-3xl outline-0 decoration-3 transition-colors duration-300 decoration-transparent focus:decoration-blue-300 focus:underline"
              onClick={makeEditable}
              onKeyDown={updateName}
              onBlur={escapeName}
            >
              {data.courseDisplayNames[course.key] ?? course.name}
            </h1>
            <FiEdit2 className="text-mono-l-500" />
          </div>
          <p className="p">Gradebook</p>
        </div>
        {isTesting?.every(x=>x===false) || (
            <div className="absolute right-5 top-3/4">
              <p className="text-red-600 dark:text-red-500 inline">Grade testing in progress! </p>
              <button className="text-blue-500 hover:bg-slate-100 rounded-md p-1" onClick={()=>{setIsTesting(isTesting?.fill(false)); setResetMods(true)}}>Reset</button>
            </div>
        )}
        <div className="flex">
          <div className="children:w-fit flex h-fit gap-2">
            {/* <ActionChip>Details</ActionChip>
            <ActionChip>Test Grades</ActionChip> */}
            <GradeChip red={average !== (course.grades[data.gradeCategory]?.value ?? "NG")} spoiler={false}>
              {average}
            </GradeChip>
          </div>
        </div>
      </div>
      <motion.div
        transition={{ duration: 0.3, type: "keyframes", ease: "easeOut" }}
        animate={controls}
      >
        {loaded ? (
          <div className="flex flex-col gap-6 pb-6">
            {displayCategories?.map((category, idx) => {
              return <AssignmentCategory
                  key={idx}
                  category={category}
                  setCategoryAverage={(avg: number|undefined) => {
                    if (moddedAvgs) {
                      moddedAvgs[idx] = avg
                      setAverage(sumTotal().toString());
                    }
                  }}
                  sum={sumCategory}
                  setChanged={(changed: boolean) => {
                    setIsTesting(isTesting?.map((x, i) => i === idx ? changed : x));
                  }}
                  reset={resetMods}
              />;
            })}
          </div>
        ) : (
          <div className="w-full h-full flex justify-center items-center">
            <Loading size={20} />
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}
