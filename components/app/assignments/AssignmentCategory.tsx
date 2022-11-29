import React, {useEffect, useMemo, useState} from "react";
import { GradeCategory } from "scorecard-types";
import CategoryMeta from "./CategoryMeta";
import TableRow from "./TableRow";

export default function AssignmentCategory(props: {
    category: GradeCategory;
    setCategoryAverage: (avg: number|undefined) => void;
}) {
    const [ moddedGrades, setModdedGrades ]  = useState<((number|undefined)[]|undefined)>();
    let [ average, setAverage ] = useState<string>("");

    useMemo(() => {
        setModdedGrades(props.category.assignments?.map(()=>undefined));
        setAverage(props.category.average);
    }, [props.category.assignments, props.category.average]);

    const sum = () => {
        if (!moddedGrades) return 0;

        let sum = 0;
        let count = 0;

        moddedGrades.forEach((grade, i) => {
            let def = props.category.assignments?.[i].grade?.replace("%", "").toLowerCase();

            if (props.category.assignments?.[i].dropped) return;

            if (grade != undefined) {
                sum += grade;
                count++;
            } else if (def) {
                if (def === "msg") def = "0";
                if (def.match(/[a-z]/g)) return;

                sum += Math.round(parseFloat(def));
                count++;
            }
        });

        return Math.round(sum/count);
    }

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

                        let avg = sum();
                        setAverage(avg.toString());
                        props.setCategoryAverage(avg === parseFloat(props.category.average) ? undefined : avg);
                    }
                }}
            />;
          })}
        </div>
    );
}
