import React from "react";
import LastUpdated from "./LastUpdated";
import PreferencesButton from "./PreferencesButton";

export default function TopBar(props: { courseIdx: number }) {
  return (
    <div className="fixed top-0 left-0 h-12 w-full flex justify-between items-center px-8">
      <LastUpdated courseIdx={props.courseIdx} />
      <PreferencesButton courseIdx={props.courseIdx} />
    </div>
  );
}
