import React, {useMemo, useState} from "react";
import { Assignment } from "scorecard-types";
import {FiX} from "react-icons/fi";

export default function TableRow(props: {
  assignment: Assignment;
  grade: Assignment["grade"];
  setGrade: (grade: number|undefined) => void;
  remove: () => void;
  test?: boolean;
}) {
  const gradeRef = React.useRef<HTMLDivElement>(null);

  const [ editing, setEditing ] = useState<boolean>(false);

  useMemo(() => {
    // fixes grades copying over when you switch between courses, but it feels more like a patch than a fix
    if (gradeRef.current) {
      (gradeRef.current.children[0] as HTMLInputElement).value = props.grade ?? "";
    }

    setEditing(props.grade !== props.assignment.grade);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.grade]);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useMemo(() => setEditing(false), [props.assignment]);

  const focusLost = (evt: React.FocusEvent<HTMLInputElement>) => {
    const el = evt.currentTarget;

    if (!el.value) {
      el.value = props.assignment.grade ?? "";
      props.setGrade(undefined);

      setEditing(false);
      return;
    }

    if (el.value.includes("/")) {
      el.value = el.value.replace(/^\//, "0/");

      if (el.value.match(/\/0*$/)) el.value = "0";

      el.value = (eval(el.value)*100).toString();
    }

    el.value.replaceAll("%", "");
    el.value = el.value.replace(/\.0*$/, "");
    if (!el.value) el.value = "0";
    el.value = (Math.round(parseFloat(el.value)*10)/10).toString();
    el.value += "%";

    setEditing(el.value !== props.assignment.grade ?? "");
    props.setGrade((el.value === props.assignment.grade ?? "") ? undefined : parseFloat(el.value.slice(0, -1)));
  }

  const filterInput = (evt: React.KeyboardEvent<HTMLInputElement>) => {
    const el = evt.currentTarget;
    const sel = el.selectionStart ?? 0;

    if (evt.key === "Enter") el.blur();
    if (evt.key.length > 1 || evt.altKey || evt.metaKey || evt.ctrlKey) return;

    if (!evt.key.match(/[0-9.%\/]/)) evt.preventDefault();

    if (evt.key === "/" && (el.value.match(/[.%]/g) || el.value.includes("/"))) evt.preventDefault();
    if (evt.key.match(/[.%]/) && (el.value.includes("/") || el.value.includes(evt.key))) evt.preventDefault();
    if (el.value.includes("%") && sel > el.value.indexOf("%")) evt.preventDefault();
    if (evt.key.match(/[0-9]/)) {
      if (el.value.includes("/")) {
        if ((el.value.split("/")[!el.value.includes("/") || sel < el.value.indexOf("/") ? 0 : 1].match(/[0-9]/g)?.length ?? 0) >= 3) evt.preventDefault();
      } else {
        let idx = !el.value.includes(".") || sel < el.value.indexOf(".") ? 0 : 1;

        if ((el.value.split(".")[idx].match(/[0-9]/g)?.length ?? 0) >= (idx || 3)) evt.preventDefault();
      }
    }

  }

  const color = props.test ? "text-red-600" : "text-mono-l-600"
  const darkColor = props.test ? "text-red-500" : "text-mono-d-600";

  return (
    <div className={`text-sm pr-4 pt-1`}>
      <div className="flex items-center whitespace-nowrap justify-start relative">
        {props.test && (
            <button
                onClick={props.remove}
                className="duration-200 text-mono-l-500 dark:text-mono-d-500 absolute right-full mr-1 hover:bg-slate-100 rounded-md p-1"
            >
              <FiX />
            </button>
            )
        }
        <div className="w-full pr-2 py-1">
          <p className={`${color} dark:${darkColor}`}>
            {props.assignment.name}
          </p>
        </div>
        <div className="flex shrink-0 gap-4">
          <div className="w-20 hidden lg:block">
            <p className="p">
              {props.assignment.due
                ? `Due ${new Date(props.assignment.due).toLocaleString(
                    "en-US",
                    {
                      month: "short",
                      day: "numeric",
                    }
                  )}`
                : ""}
            </p>
          </div>
          <div className="w-24 hidden lg:block">
            <p className="p">
              {props.assignment.assign
                ? `Assign ${new Date(props.assignment.assign).toLocaleString(
                    "en-US",
                    {
                      month: "short",
                      day: "numeric",
                    }
                  )}`
                : ""}
            </p>
          </div>
          <div className="w-14 hidden md:block">
            <p className="p">{props.assignment.dropped ? "Dropped" : ""}</p>
          </div>
          <div className="w-14">
            <div className="group relative">
              {props.assignment.points && props.assignment.max && props.assignment.grade?.match(/[0-9.]{1,3}%/) && (
                <div className="hidden group-hover:block absolute right-full mr-1.5 top-1/2 -translate-y-1/2 bg-black/75 rounded-md">
                  <p className="text-white py-1 px-2">
                    {props.assignment.points}/{props.assignment.max}
                  </p>
                </div>
              )}
              <div
                className="bg-mono-l-200 dark:bg-mono-d-200 py-1 px-2 rounded-sm"
                ref={gradeRef}
              >
                <input onKeyDown={filterInput} onFocus={(evt: React.FocusEvent<HTMLInputElement>) => {evt.currentTarget.value = ""}} onBlur={focusLost} className={`cursor-text bg-transparent w-full ${color} dark:${darkColor} text-center ${editing ? 'text-red-600 dark:text-red-500' : ''}`} defaultValue={props.grade} placeholder={props.assignment.grade} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
