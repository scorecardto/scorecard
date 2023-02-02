import React from "react";
import {
  IoCheckbox,
  IoCheckmarkOutline,
  IoSquareOutline,
} from "react-icons/io5";

export default function Checkbox(props: {
  checked: boolean;
  onChange: (checked: boolean) => void;
}) {
  return (
    <div>
      {props.checked ? (
        <IoCheckbox
          className={`w-5 h-5 text-accent-300`}
          onClick={() => {
            props.onChange(!props.checked);
            console.log("clicked");
          }}
        />
      ) : (
        <IoSquareOutline
          className={`w-5 h-5 text-mono-l-400`}
          onClick={() => {
            props.onChange(!props.checked);
            console.log("clicked");
          }}
        />
      )}
    </div>
  );
}
