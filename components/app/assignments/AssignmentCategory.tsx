import React, { useEffect, useMemo, useState } from "react";
import { IoAdd, IoAddOutline, IoTrashBinOutline } from "react-icons/io5";
import { Assignment, GradeCategory } from "scorecard-types";
import CategoryMeta from "./CategoryMeta";
import TableRow from "./TableRow";

export interface AssignmentData {
  assignment: Assignment;
  moddedGrade?: number;
  moddedCount?: number;
  moddedDropped?: boolean;
  test: boolean;
}
export default function AssignmentCategory(props: {
  category: GradeCategory;
  setCategoryAverage: (avg: number | undefined) => void;
  sum: (category: GradeCategory, assignments: AssignmentData[]) => number;
  setChanged: (changed: boolean) => void;
  reset: boolean;
  testing: boolean;
  addTestCategory?: () => void;
  removeTestCategory?: () => void;
}) {
  const [assignments, setAssignments] = useState<AssignmentData[]>([]);
  const [average, setAverage] = useState<GradeCategory["average"]>("");
  const [i, setI] = useState<number>(0);
  const [showCheckboxes, setShowCheckboxes] = useState(false);

  const reset = () => {
    setAssignments(
      props.category.assignments?.reduce((x, data) => {
        x.push({
          assignment: data,
          moddedGrade: undefined,
          moddedCount: undefined,
          moddedDropped: undefined,
          test: false,
        });
        return x;
      }, [] as AssignmentData[]) ?? []
    );

    setAverage(props.category.average);
    setI(1);
  };

  useEffect(reset, [props.category.assignments, props.category.average]);
  useEffect(() => {
    if (props.reset) {
      reset();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.reset]);

  const calcAvg = () => {
    let avg = props.sum(props.category, assignments);
    let avgStr = isNaN(avg) ? "" : Math.round(avg).toString();
    setAverage(avgStr);

    props.setCategoryAverage(
      avgStr === props.category.average ? undefined : avg
    );
  };

  useEffect(() => {
    calcAvg();

    props.setChanged(
      !!assignments &&
        !assignments.every(
          (a, i) =>
            a.assignment === props.category.assignments?.[i] &&
            a.moddedGrade === undefined &&
            a.moddedCount === undefined &&
            a.moddedDropped === undefined
        )
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [assignments]);

  const addTestAssignment = () => {
    setAssignments((old) => {
      old = old?.map((x) => x);
      old?.push({
        assignment: {
          name: `Test Assignment ${i}`,
          grade: "",
          dropped: false,
          error: false,
          count: 1,
        },
        moddedGrade: undefined,
        moddedCount: undefined,
        test: true,
      });
      setI(i + 1);

      return old;
    });
  };

  const siderailRef = React.useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!showCheckboxes) return;

    const listener = (e: MouseEvent) => {
      if (siderailRef.current) {
        const rect = siderailRef.current.getBoundingClientRect();
        if (
          e.clientX < rect.left ||
          e.clientX > rect.right ||
          e.clientY < rect.top ||
          e.clientY > rect.bottom
        ) {
          setShowCheckboxes(false);
        }
      }
    };
    window.addEventListener("mousemove", listener);

    return () => {
      window.removeEventListener("mousemove", listener);
    };
  }, [showCheckboxes]);

  return (
    <div className="w-full">
      <CategoryMeta
        name={props.category.name}
        weight={props.category.weight}
        average={average}
        isTesting={props.testing}
        assignments={assignments}
      />

      <div className="flex">
        <div
          ref={siderailRef}
          className={`w-12 flex-shrink-0 relative top-0 bottom-0 ${
            showCheckboxes ? "" : "z-10"
          }`}
          onMouseEnter={() => {
            setShowCheckboxes(true);
          }}
        />
        <div className="flex-1">
          {assignments.map((assignment, idx) => {
            return (
              <TableRow
                showCheckboxes={showCheckboxes || props.testing}
                key={idx}
                test={assignment.test}
                assignment={assignment.assignment}
                dropped={
                  assignment.moddedDropped !== undefined
                    ? assignment.moddedDropped
                    : assignment.assignment.dropped
                }
                setDropped={(dropped) => {
                  setAssignments(
                    assignments.map((a, i) => {
                      if (i === idx) {
                        a.moddedDropped = dropped;
                      }
                      return a;
                    })
                  );
                }}
                grade={
                  assignment.moddedGrade !== undefined
                    ? assignment.moddedGrade.toString() + "%"
                    : assignment.assignment.grade
                }
                setGrade={(grade) => {
                  setAssignments(
                    assignments.map((a, i) => {
                      if (i === idx) {
                        a.moddedGrade = grade;
                      }
                      return a;
                    })
                  );
                }}
                count={
                  assignment.moddedCount !== undefined
                    ? assignment.moddedCount
                    : assignment.assignment.count
                }
                setCount={(count) => {
                  setAssignments(
                    assignments.map((a, i) => {
                      if (i === idx) {
                        a.moddedCount = count;
                      }
                      return a;
                    })
                  );
                }}
                remove={() => {
                  const filter = (_: any, i: number) => i !== idx;

                  setAssignments(assignments.filter(filter));
                }}
              />
            );
          })}
        </div>
      </div>

      <div className="flex gap-4 ml-12 my-4">
        <button
          className="text-accent-300 border border-accent-200 bg-accent-100 dark:text-accent-250 dark:bg-accent-600 dark:border-accent-700 rounded-full text-sm px-4 py-1 flex items-center gap-2"
          onClick={addTestAssignment}
        >
          <IoAdd />
          <span>Test Assignment</span>
        </button>

        {props.addTestCategory && (
          <button
            className="text-accent-300 border border-accent-200 bg-accent-100 dark:text-accent-250 dark:bg-accent-600 dark:border-accent-700 rounded-full text-sm px-4 py-1 flex items-center gap-2"
            onClick={props.addTestCategory}
          >
            <IoAdd />
            <span>Test Category</span>
          </button>
        )}

        {props.removeTestCategory && (
          <button
            className="text-accent-300 border border-accent-200 bg-accent-100 dark:text-accent-250 dark:bg-accent-600 dark:border-accent-700 rounded-full text-sm px-4 py-1 flex items-center gap-2"
            onClick={props.removeTestCategory}
          >
            <IoTrashBinOutline />
            <span>Remove Me</span>
          </button>
        )}
      </div>
    </div>
  );
}
