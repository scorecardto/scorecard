import React from "react";
import LastUpdated from "./LastUpdated";

export default function TopBar() {
  return (
    <div className="fixed top-0 left-0 h-8 w-full bg-accent-100 dark:bg-accent-800 flex flex-justify items-center px-8">
      <LastUpdated />
    </div>
  );
}
