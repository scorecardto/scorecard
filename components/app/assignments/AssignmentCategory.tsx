import React, {useEffect, useMemo, useState} from "react";
import { GradeCategory } from "scorecard-types";
import CategoryMeta from "./CategoryMeta";
import TableRow from "./TableRow";

export default function AssignmentCategory(props: {
    category: GradeCategory;
    setCategoryAverage: (avg: number|undefined) => void;
    sum: (category: GradeCategory, grades: ((number|undefined)[]|undefined)) => number;
}) {
    const [ moddedGrades, setModdedGrades ]  = useState<((number|undefined)[]|undefined)>();
    let [ average, setAverage ] = useState<string>("");

    // reset states when category changes
    useMemo(() => {
        setModdedGrades(props.category.assignments?.map(()=>undefined));
        setAverage(props.category.average);
    }, [props.category.assignments, props.category.average]);

    return (
        <div className="pl-12">
            <CategoryMeta
                name={props.category.name}
                weight={props.category.weight}
                average={average}
                defaultAverage={props.category.average}
            />
            {props.category.assignments?.map((assignment, idx) => {
            return <TableRow
                key={idx}
                assignment={assignment}
                setGrade={(grade) => {
                    if (moddedGrades) {
                        moddedGrades[idx] = grade;

                        let avg = props.sum(props.category, moddedGrades);
                        setAverage(Math.round(avg).toString());

                        props.setCategoryAverage(Math.round(avg).toString() === props.category.average ? undefined : avg);
                    }
                }}
            />;
          })}
        </div>
    );
}
