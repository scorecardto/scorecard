import Link from "next/link";
import React from "react";
import { IoSettingsOutline } from "react-icons/io5";

export default function PreferencesButton(props: {courseIdx: number}) {
  return (
    <Link href={"/app/preferences"}>
      <div className="flex text-sm items-center gap-2 text-mono-l-500 dark:text-mono-d-500 group cursor-pointer">
        <div tabIndex={props.courseIdx == -1 ? 0 : -1} className="group-hover:bg-accent-200 dark:group-hover:bg-accent-750 p-1 rounded-md text-mono-l-500 dark:text-mono-d-500">
          <IoSettingsOutline />
        </div>
        <p>Preferences</p>
      </div>
    </Link>
  );
}
