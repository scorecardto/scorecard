import React, { MouseEvent } from "react";
import {
  IoCheckbox,
  IoCheckmarkOutline,
  IoSquareOutline,
} from "react-icons/io5";

export default function Checkbox(props: {
  checked: boolean;
  onChange: (checked: boolean) => void;
  tabIndex: number;
}) {
  function onClick(e: MouseEvent<HTMLDivElement>) {
    props.onChange(!props.checked);
    e.currentTarget.blur();
  }
  return (
    <div tabIndex={props.tabIndex} onClick={onClick}>
      {props.checked ? (
        <IoCheckbox className={`w-5 h-5 text-accent-300`} />
      ) : (
        <IoSquareOutline className={`w-5 h-5 text-mono-l-400`} />
      )}
    </div>
  );
}
