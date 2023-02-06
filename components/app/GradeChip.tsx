import { useContext, useMemo } from "react";
import { SettingsContext } from "scorecard-types";

export default function GradeChip(props: {
  children?: any;
  faded?: boolean;
  spoiler?: boolean;
}) {
  const settingsContext = useContext(SettingsContext);
  const spoiler = props.spoiler ?? settingsContext.spoilerMode;

  return (
    <div
      className={`leading-none flex-none rounded-xl pt-2.5 pb-1.5 px-3 group min-w-[3rem] ${
        props.faded
          ? "bg-mono-l-300 dark:bg-mono-d-300"
          : "from-accent-400 to-accent-500 bg-gradient-to-tr"
      }`}
    >
      {spoiler && (
        <p
          className={`align-middle font-mono group-hover:hidden text-center ${
            props.faded ? "text-white dark:text-mono-d-500" : "text-white"
          }`}
        >
          {". . ."}
        </p>
      )}
      <p
        className={`align-middle text-center font-mono ${
          spoiler ? "hidden group-hover:block" : ""
        } ${props.faded ? "text-white dark:text-mono-d-500" : "text-white"}`}
      >
        {props.children ?? "NG"}
      </p>
    </div>
  );
}
