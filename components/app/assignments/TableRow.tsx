import React, { useEffect, useMemo, useState } from "react";
import { Assignment } from "scorecard-types";
import { FiX } from "react-icons/fi";
import Checkbox from "../../core/input/Checkbox";
import { IoClose, IoCloseCircle } from "react-icons/io5";

export default function TableRow(props: {
  assignment: Assignment;
  grade: Assignment["grade"];
  count: Assignment["count"];
  dropped: Assignment["dropped"];
  setGrade: (grade: number | undefined) => void;
  setCount: (count: number | undefined) => void;
  setDropped: (dropped: boolean | undefined) => void;
  remove: () => void;
  test?: boolean;
  showCheckboxes: boolean;
}) {
  const countRef = React.useRef<HTMLDivElement>(null);
  const gradeRef = React.useRef<HTMLDivElement>(null);

  const [editingGrade, setEditingGrade] = useState<boolean>(false);
  const [editingCount, setEditingCount] = useState<boolean>(false);

  useEffect(() => {
    if (props.test) {
      if (gradeRef.current) {
        (gradeRef.current.children[0] as HTMLInputElement).focus();
      }
    }
  }, []);

  useEffect(() => {
    // fixes grades copying over when you switch between courses, but it feels more like a patch than a fix
    if (gradeRef.current) {
      (gradeRef.current.children[0] as HTMLInputElement).value =
        props.grade ?? "";
    }

    setEditingGrade(props.grade !== props.assignment.grade);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.grade]);

  useEffect(() => {
    if (countRef.current) {
      (countRef.current.children[0] as HTMLInputElement).value =
        props.count?.toString() + "ct" ?? "1ct";
    }

    setEditingCount(props.count !== props.assignment.count);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.count]);

  useEffect(() => {
    setEditingGrade(false);
    setEditingCount(false);
  }, [props.assignment]);

  const focusLostForCount = (evt: React.FocusEvent<HTMLInputElement>) => {
    const el = evt.currentTarget;

    if (!el.value) {
      el.value = props.assignment.count?.toString() + "ct" ?? "1ct";
      props.setCount(undefined);
      setEditingCount(false);
      return;
    }

    let val = parseInt(el.value);

    if (isNaN(val)) {
      val = props.assignment.count ?? 0;
    }

    el.value = val.toString() + "ct";

    setEditingCount(el.value !== props.assignment.count?.toString() + "ct");

    props.setCount(
      el.value === props.assignment.count?.toString() + "ct" ? undefined : val
    );
  };

  const focusLostForGrade = (evt: React.FocusEvent<HTMLInputElement>) => {
    const el = evt.currentTarget;

    if (!el.value) {
      el.value = props.assignment.grade ?? "";
      props.setGrade(undefined);

      setEditingGrade(false);
      return;
    }

    if (el.value.includes("/")) {
      el.value = el.value.replace(/^\//, "0/");

      if (el.value.match(/\/0*$/)) el.value = "0";

      el.value = (eval(el.value) * 100).toString();
    }

    el.value.replaceAll("%", "");
    el.value = el.value.replace(/\.0*$/, "");
    if (!el.value) el.value = "0";
    el.value = (Math.round(parseFloat(el.value) * 10) / 10).toString();
    el.value += "%";

    setEditingGrade(el.value !== props.assignment.grade ?? "");
    props.setGrade(
      el.value === props.assignment.grade ?? ""
        ? undefined
        : parseFloat(el.value.slice(0, -1))
    );
  };

  const filterInputForCount = (evt: React.KeyboardEvent<HTMLInputElement>) => {
    if (evt.key === "Enter") evt.currentTarget.blur();
    if (evt.key.length > 1 || evt.altKey || evt.metaKey || evt.ctrlKey) return;
    if (!evt.key.match(/[0-9]/)) evt.preventDefault();
  };

  const filterInputForGrade = (evt: React.KeyboardEvent<HTMLInputElement>) => {
    const el = evt.currentTarget;
    const sel = el.selectionStart ?? 0;

    if (evt.key === "Enter") el.blur();
    if (evt.key.length > 1 || evt.altKey || evt.metaKey || evt.ctrlKey) return;

    if (!evt.key.match(/[0-9.%\/]/)) evt.preventDefault();

    if (evt.key === "/" && (el.value.match(/[.%]/g) || el.value.includes("/")))
      evt.preventDefault();
    if (
      evt.key.match(/[.%]/) &&
      (el.value.includes("/") || el.value.includes(evt.key))
    )
      evt.preventDefault();
    if (el.value.includes("%") && sel > el.value.indexOf("%"))
      evt.preventDefault();
    if (evt.key.match(/[0-9]/)) {
      if (el.value.includes("/")) {
        if (
          (el.value
            .split("/")
            [
              !el.value.includes("/") || sel < el.value.indexOf("/") ? 0 : 1
            ].match(/[0-9]/g)?.length ?? 0) >= 3
        )
          evt.preventDefault();
      } else {
        let idx =
          !el.value.includes(".") || sel < el.value.indexOf(".") ? 0 : 1;

        if (
          (el.value.split(".")[idx].match(/[0-9]/g)?.length ?? 0) >= (idx || 3)
        )
          evt.preventDefault();
      }
    }
  };

  const color = props.test ? "text-red-600" : "text-mono-l-600";
  const darkColor = props.test ? "text-red-500" : "text-mono-d-600";

  return (
    <div
      className={`group-one text-sm pr-4 odd:bg-mono-l-200 dark:odd:bg-mono-d-300`}
    >
      <div className="flex items-center whitespace-nowrap justify-start relative py-1">
        <div className="absolute right-full group-one-odd:bg-mono-l-200 dark:group-one-odd:bg-mono-d-300 w-12 h-full">
          <div className="flex flex-row items-center justify-end h-full pr-2">
            {props.test ? (
              <div
                className="hover:bg-mono-l-200 dark:hover:bg-mono-d-200 p-0.5 rounded-md focus:bg-accent-250 dark:focus:bg-accent-600 outline-none"
                onClick={props.remove}
                tabIndex={0}
              >
                <IoCloseCircle className="text-mono-l-500 dark:text-mono-d-500 w-4 h-4" />
              </div>
            ) : (
              <div
                className={`transition-opacity duration-200 ${
                  props.showCheckboxes
                    ? "opacity-100"
                    : "opacity-0 focus-within:opacity-100"
                }`}
              >
                <Checkbox
                  tabIndex={0}
                  checked={!props.dropped}
                  onChange={(b) => {
                    if (props.assignment.dropped !== !b) {
                      props.setDropped(!b);
                    } else {
                      props.setDropped(undefined);
                    }
                  }}
                />
              </div>
            )}
          </div>
        </div>

        <div className="w-full pr-2 py-1">
          <p className={`${color} dark:${darkColor}`}>
            {props.assignment.name}
          </p>
        </div>
        <div className="flex shrink-0 gap-4 items-center">
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
            <p className="p">{props.dropped ? "Dropped" : ""}</p>
          </div>
          <div className="w-14 hidden md:block">
            <div className="w-14">
              <div className="group relative">
                {props.assignment.count && (
                  <div className="hidden group-hover:block absolute right-full mr-1.5 top-1/2 -translate-y-1/2 bg-black/75 rounded-md">
                    <p className="text-white py-1 px-2">
                      Weighted {props.assignment.count} point
                      {props.assignment.count === 1 ? "" : "s"}
                    </p>
                  </div>
                )}
                <div
                  className="bg-mono-l-300 dark:bg-mono-d-150 rounded-sm"
                  ref={countRef}
                >
                  <input
                    onKeyDown={filterInputForCount}
                    onFocus={(evt: React.FocusEvent<HTMLInputElement>) => {
                      evt.currentTarget.value = "";
                    }}
                    onBlur={focusLostForCount}
                    className={`py-1 px-2 first-letter:cursor-text bg-transparent w-full ${color} dark:${darkColor} text-center border-none outline-none ${
                      editingCount ? "text-red-600 dark:text-red-500" : ""
                    }`}
                    defaultValue={props.count + "ct"}
                    placeholder={props.assignment.count + "ct"}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="w-14 hidden md:block">
            <div className="w-14">
              <div className="group relative">
                {props.assignment.points &&
                  props.assignment.scale &&
                  props.assignment.grade?.match(/[0-9.]{1,3}%/) && (
                    <div className="hidden group-hover:block absolute right-full mr-1.5 top-1/2 -translate-y-1/2 bg-black/75 rounded-md">
                      <p className="text-white py-1 px-2">
                        {props.assignment.points}/{props.assignment.scale}
                      </p>
                    </div>
                  )}
                <div
                  className="bg-mono-l-300 dark:bg-mono-d-150 rounded-sm"
                  ref={gradeRef}
                >
                  <input
                    onKeyDown={filterInputForGrade}
                    onFocus={(evt: React.FocusEvent<HTMLInputElement>) => {
                      evt.currentTarget.value = "";
                    }}
                    onBlur={focusLostForGrade}
                    className={`py-1 px-2 first-letter:cursor-text bg-transparent w-full ${color} dark:${darkColor} text-center border-none  outline-none ${
                      editingGrade ? "text-red-600 dark:text-red-500" : ""
                    }`}
                    defaultValue={props.grade}
                    placeholder={props.assignment.grade}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
