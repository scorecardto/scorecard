import React from "react";
import { IoEllipsisVertical } from "react-icons/io5";

export default function Context(props: {courseIdx: number}) {
  return (
    <div>
      <div tabIndex={props.courseIdx == -1 ? 0 : -1} className="h-10 w-10 border border-mono-l-300 rounded-md flex items-center justify-center text-mono-l-500 bg-mono-l-150 hover:bg-mono-l-200 cursor-pointer">
        <IoEllipsisVertical />
      </div>
    </div>
  );
}
