import React, {useMemo, useState} from "react";
import {GradeCategory} from "scorecard-types";
import CategoryMeta from "./CategoryMeta";
import TableRow from "./TableRow";

export default function AssignmentCategory(props: {
    category: GradeCategory;
    setCategoryAverage: (avg: number|undefined) => void;
    sum: (category: GradeCategory, assignments: GradeCategory["assignments"], grades: ((number|undefined)[]|undefined)) => number;
}) {
    const [ isTest, setIsTest ] = useState<boolean[]>();
    const [ assignments, setAssignments ] = useState<GradeCategory["assignments"]>();
    const [ moddedGrades, setModdedGrades ] = useState<((number|undefined)[]|undefined)>();
    const [ average, setAverage ] = useState<GradeCategory["average"]>("");
    const [ i, setI ] = useState<number>(0);

    // reset states when category changes
    useMemo(() => {
        setIsTest(new Array(props.category.assignments?.length).fill(false));
        setAssignments(props.category.assignments?.map(x=>x));
        setModdedGrades(props.category.assignments?.map(()=>undefined));
        setAverage(props.category.average);
        setI(1);
    }, [props.category.assignments, props.category.average]);

    const calcAvg = () => {
        let avg = props.sum(props.category, assignments, moddedGrades);
        setAverage(Math.round(avg).toString());

        props.setCategoryAverage(Math.round(avg).toString() === props.category.average ? undefined : avg);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useMemo(calcAvg, [assignments]);

    const addTestAssignment = () => {
        setModdedGrades((old)=>{old=old?.map(x=>x); old?.push(undefined); return old});
        setIsTest((old) => {old=old?.map(x=>x); old?.push(true); return old});
        setAssignments((old) => {
            old=old?.map(x=>x);
            old?.push({
                name: `Test Assignment ${i}`,
                grade: "",
                dropped: false,
                error: false
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
            {assignments?.map((assignment, idx) => {
            return <TableRow
                key={idx}
                test={isTest?.[idx] ?? false}
                assignment={assignment}
                setGrade={(grade) => {
                    if (moddedGrades) {
                        moddedGrades[idx] = grade;

                        calcAvg();
                    }
                }}
                remove={() => {
                    if (assignments) {
                        setAssignments(assignments.filter((_, i) => i !== idx));
                        setModdedGrades(moddedGrades?.filter((_, i) => i !== idx));
                        setIsTest(isTest?.filter((_, i) => i !== idx));
                    }
                }}
            />;
          })}
         <button className="text-blue-500 hover:bg-slate-100 rounded-md p-1" onClick={addTestAssignment}>Add Test Assignment</button>
        </div>
    );
}
