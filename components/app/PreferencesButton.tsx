import Link from "next/link";
import React from "react";
import {
  IoFingerPrintOutline,
  IoFootstepsOutline,
  IoHandLeft,
  IoHandLeftOutline,
  IoPersonOutline,
  IoSettingsOutline,
} from "react-icons/io5";

export default function PreferencesButton(props: { courseIdx: number }) {
  return (
    <div className="flex gap-2 items-center pb-4">
      <Link href={"/app/view-setup"}>
        <div className="flex text-sm items-center gap-2 cursor-pointer py-2 px-4 rounded-lg border border-transparent text-mono-l-500 dark:text-mono-d-500 hover:bg-mono-l-200 hover:border-mono-l-300 dark:hover:bg-mono-d-200 dark:hover:border-mono-d-300">
          <div tabIndex={props.courseIdx == -1 ? 0 : -1}>
            <IoPersonOutline />
          </div>
          <p>Account</p>
        </div>
      </Link>
      <Link href={"/app/preferences"}>
        <div className="flex text-sm items-center gap-2 cursor-pointer py-2 px-4 rounded-lg border border-transparent text-mono-l-500 dark:text-mono-d-500 hover:bg-mono-l-200 hover:border-mono-l-300 dark:hover:bg-mono-d-200 dark:hover:border-mono-d-300">
          <div tabIndex={props.courseIdx == -1 ? 0 : -1}>
            <IoSettingsOutline />
          </div>
          <p>Settings</p>
        </div>
      </Link>
      <Link href={"/privacy-policy"}>
        <div className="flex text-sm items-center gap-2 cursor-pointer py-2 px-4 rounded-lg border border-transparent text-mono-l-500 dark:text-mono-d-500 hover:bg-mono-l-200 hover:border-mono-l-300 dark:hover:bg-mono-d-200 dark:hover:border-mono-d-300">
          <div tabIndex={props.courseIdx == -1 ? 0 : -1}>
            <IoHandLeftOutline />
          </div>
          <p>Privacy</p>
        </div>
      </Link>
    </div>
  );
}
