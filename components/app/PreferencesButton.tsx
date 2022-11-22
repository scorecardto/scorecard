import Link from "next/link";
import React from "react";
import { IoSettingsOutline } from "react-icons/io5";

export default function PreferencesButton() {
  return (
    <Link href={"/app/preferences"}>
      <a href="/app/preferences">
        <div className="flex items-center gap-2 text-mono-l-500 dark:text-mono-d-500 group cursor-pointer">
          <div className="group-hover:bg-accent-200 dark:group-hover:bg-accent-750 p-1 rounded-md text-mono-l-500 dark:text-mono-d-500">
            <IoSettingsOutline />
          </div>
          <p>Preferences</p>
        </div>
      </a>
    </Link>
  );
}
