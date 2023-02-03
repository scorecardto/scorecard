import React, {
  useContext,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { FiEdit2, FiRotateCw } from "react-icons/fi";
import { Course, DataContext, GradeCategory } from "scorecard-types";
import GradeChip from "../GradeChip";
import AssignmentCategory, { AssignmentData } from "./AssignmentCategory";
import { motion, useAnimationControls } from "framer-motion";
import { PortContext } from "../../core/ExtensionConnector";
import Loading from "../../core/util/Loading";
import GradeTestingButton from "./GradeTestingButton";
import { IoArrowForward, IoArrowForwardOutline } from "react-icons/io5";
import CategoryWeightPrompt from "./CategoryWeightPrompt";

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
  const [isTesting, setIsTesting] = useState<boolean[]>();
  const [moddedAvgs, setModdedAvgs] = useState<
    (number | undefined)[] | undefined
  >();
  const [average, setAverage] = useState<string>("");
  const [resetMods, setResetMods] = useState<boolean>(false);

  useEffect(() => {
    if (resetMods) setResetMods(false);
  }, [resetMods]);

  useEffect(() => {
    setIsTesting(displayCategories?.map(() => false));
    setModdedAvgs(displayCategories?.map(() => undefined));
    setAverage(course.grades[data.gradeCategory]?.value ?? "NG");
  }, [displayCategories, course.grades, data.gradeCategory]);

  // TODO: use assignment weights
  // get the average (mean) of all the assignments in a category, taking into account test grades
  const sumCategory = (
    category: GradeCategory,
    assignments: AssignmentData[]
  ) => {
    if (
      assignments.every(
        (a, i) =>
          a.moddedCount === undefined &&
          a.moddedGrade === undefined &&
          a.moddedDropped === undefined &&
          a.assignment === category.assignments?.[i]
      )
    )
      return parseFloat(category.average);

    let sum = 0;
    let count = 0;

    assignments.forEach((data) => {
      let def = data.assignment.grade?.replace("%", "").toLowerCase();
      let weight = data.moddedCount ?? data.assignment.count ?? 1;

      if (data.moddedDropped ?? data.assignment.dropped) return;

      if (data.moddedGrade !== undefined) {
        sum += data.moddedGrade * weight;
        count += weight;
      } else if (def) {
        const exact =
          data.assignment.points && data.assignment.scale
            ? (data.assignment.points / data.assignment.scale) * 100
            : undefined;

        if (def === "msg") def = "0";
        if (def.match(/[a-z]/g)) return;

        sum += (exact ?? parseFloat(def)) * weight;
        count += weight;
      }
    });

    return Math.round(sum / count);
  };

  // get the average (weighted) of all the categories
  const sumTotal = () => {
    if (!displayCategories) return;

    let sum = 0;
    let count = 0;

    displayCategories.forEach((category, i) => {
      let weight = category.weight;
      const avg = moddedAvgs?.[i]?.toString() ?? category.average;

      if (weight === undefined) return;

      if (avg === "" || isNaN(parseInt(avg))) return;

      sum += parseInt(avg) * weight;
      count += weight;
    });

    return Math.round(sum / count);
  };

  const [testCategoryIndex, setTestCategoryIndex] = useState(1);
  const [showCategoryWeightPrompt, setShowCategoryWeightPrompt] =
    useState(false);

  const addTestCategory = (weight: number | undefined) => {
    setShowCategoryWeightPrompt(false);
    if (!weight) return;

    const i = testCategoryIndex;
    setTestCategoryIndex(i + 1);

    if (!course.gradeCategories) return;

    const newCategories = [...displayCategories];
    newCategories.push({
      name: "Test Category " + i,
      weight: weight,
      average: "",
      assignments: [],
      id: `scorecard-test-category-${i}`,
      error: false,
    });

    setDisplayCategories(newCategories);
  };

  const removeTestCategory = (id: string) => {
    if (!displayCategories) return;

    const newCategories = displayCategories.filter((c) => c.id !== id);
    setDisplayCategories(newCategories);
  };

  return (
    <motion.div className="flex flex-col gap-4">
      <CategoryWeightPrompt
        addTestCategory={addTestCategory}
        otherCategories={displayCategories}
        show={showCategoryWeightPrompt}
      />
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

        <div className="flex relative h-fit">
          <div className="children:w-fit flex h-fit gap-2">
            {isTesting?.every((x) => x === false) ? (
              <GradeChip spoiler={false}>
                {course.grades[data.gradeCategory]?.value}
              </GradeChip>
            ) : (
              <div className="flex gap-4 items-center">
                <GradeChip spoiler={false} faded={true}>
                  {course.grades[data.gradeCategory]?.value ?? "NG"}
                </GradeChip>
                <IoArrowForward className="text-lg text-mono-l-500 dark:text-mono-d-500" />
                <GradeChip spoiler={false} faded={false}>
                  {average}
                </GradeChip>
              </div>
            )}
          </div>
          {isTesting?.every((x) => x === false) || (
            <div>
              <div className="bg-mono-l-100 dark:bg-mono-d-100 text-center text-xs rounded-lg py-2 absolute z-10 group-hover:opacity-100 top-full right-0 pointer-events-none mt-0.5 border border-mono-l-300 dark:border-mono-d-300">
                <div className="flex gap-4 whitespace-nowrap items-center pl-4 pr-2">
                  <p className="text-sm text-mono-l-500">
                    You&apos;re in grade testing mode.
                  </p>
                  <button
                    className="cursor-pointer bg-red-50 dark:bg-red-600 text-red-400 dark:text-white rounded-md py-1 px-2 text-sm w-fit pointer-events-auto "
                    onClick={(e) => {
                      setIsTesting(isTesting?.fill(false));
                      setResetMods(true);
                    }}
                  >
                    Reset
                  </button>
                </div>
                <svg
                  className="absolute text-mono-l-100 dark:text-mono-d-100 h-4 w-8 right-0 bottom-full z-0 translate-y-0 stroke-[20] stroke-mono-l-300 dark:stroke-mono-d-300"
                  x="0px"
                  y="0px"
                  viewBox="0 0 255 255"
                  xmlSpace="preserve"
                >
                  <polygon
                    className="fill-current "
                    points="0,255 127.5,100 255,255"
                  />
                </svg>
                <svg
                  className="absolute text-mono-l-100 dark:text-mono-d-100 h-4 w-8 right-0 bottom-full z-20 translate-y-0.5"
                  x="0px"
                  y="0px"
                  viewBox="0 0 255 255"
                  xmlSpace="preserve"
                >
                  <polygon
                    className="fill-current "
                    points="0,235 127.5,100 255,235"
                  />
                </svg>
              </div>
            </div>
          )}
        </div>
      </div>
      <motion.div
        transition={{ duration: 0.3, type: "keyframes", ease: "easeOut" }}
        animate={controls}
      >
        {loaded ? (
          <div className="flex flex-col gap-6 pb-6">
            {displayCategories?.map((category, idx) => {
              return (
                <AssignmentCategory
                  testing={isTesting?.[idx] ?? false}
                  key={idx}
                  category={category}
                  setCategoryAverage={(avg: number | undefined) => {
                    if (moddedAvgs) {
                      moddedAvgs[idx] = avg;
                      const total = sumTotal();
                      setAverage(
                        total == null || isNaN(total) ? "NG" : total.toString()
                      );
                    }
                  }}
                  sum={sumCategory}
                  setChanged={(changed: boolean) => {
                    setIsTesting((isTesting) => {
                      return isTesting?.map((x, i) =>
                        i === idx ? changed : x
                      );
                    });
                  }}
                  reset={resetMods}
                  addTestCategory={
                    idx === displayCategories.length - 1
                      ? () => {
                          setIsTesting(isTesting?.fill(false));
                          setResetMods(true);

                          setShowCategoryWeightPrompt(true);
                        }
                      : undefined
                  }
                  removeTestCategory={
                    displayCategories[idx].id.startsWith(
                      "scorecard-test-category"
                    )
                      ? () => {
                          removeTestCategory(displayCategories[idx].id);
                        }
                      : undefined
                  }
                />
              );
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
