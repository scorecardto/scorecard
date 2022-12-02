import React, {useMemo, useState} from "react";
import {Assignment, GradeCategory} from "scorecard-types";
import CategoryMeta from "./CategoryMeta";
import TableRow from "./TableRow";

export interface AssignmentData {
    assignment: Assignment;
    moddedGrade?: number;
    test: boolean;
}
export default function AssignmentCategory(props: {
    category: GradeCategory;
    setCategoryAverage: (avg: number|undefined) => void;
    sum: (category: GradeCategory, assignments: AssignmentData[]) => number;
    setChanged: (changed: boolean) => void;
    reset: boolean;
}) {
    const [ assignments, setAssignments ]  = useState<AssignmentData[]>([]);
    const [ average, setAverage ] = useState<GradeCategory["average"]>("");
    const [ i, setI ] = useState<number>(0);

    const reset = () => {
        setAssignments(props.category.assignments?.reduce((x, data)=>{
            x.push({
                assignment: data,
                moddedGrade: undefined,
                test: false
            });
            return x;
        }, [] as AssignmentData[]) ?? []);

        setAverage(props.category.average);
        setI(1);
    }

    // reset states when category changes or reset button is pressed
    useMemo(reset, [props.category.assignments, props.category.average]);
    useMemo(() => {
        if (props.reset) {
            reset();
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.reset]);

    const calcAvg = () => {
        let avg = props.sum(props.category, assignments);
        setAverage(Math.round(avg).toString());

        props.setCategoryAverage(Math.round(avg).toString() === props.category.average ? undefined : avg);
    }

    useMemo(() => {
        calcAvg();

        props.setChanged(!!assignments && !assignments.every((a, i) => a.assignment === props.category.assignments?.[i] && a.moddedGrade === undefined));
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [assignments])


    const addTestAssignment = () => {
        setAssignments((old) => {
            old=old?.map(x=>x);
            old?.push({
                assignment: {
                    name: `Test Assignment ${i}`,
                    grade: "",
                    dropped: false,
                    error: false
                },
                moddedGrade: undefined,
                test: true
            });
            setI(i+1);

            return old;
        });
    }

    return (
        <div className="pl-12">
            <CategoryMeta
                name={props.category.name}
                weight={props.category.weight}
                average={average}
                defaultAverage={props.category.average}
            />
            {assignments.map((assignment, idx) => {
            return <TableRow
                key={idx}
                test={assignment.test}
                assignment={assignment.assignment}
                grade={assignment.moddedGrade ? (assignment.moddedGrade.toString()+"%") : assignment.assignment.grade}
                setGrade={(grade) => {
                    setAssignments(assignments.map((a, i) => {
                        if (i === idx) {
                            a.moddedGrade = grade;
                        }
                        return a;
                    }));
                }}
                remove={() => {
                    const filter = (_: any, i: number) => i !== idx;

                    setAssignments(assignments.filter(filter));
                }}
            />;
          })}
         <button className="text-blue-500 hover:bg-slate-100 rounded-md p-1 -translate-x-1" onClick={addTestAssignment}>Add Test Assignment</button>
        </div>
    );
}
