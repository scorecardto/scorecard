import { useContext, useMemo } from "react";
import { SettingsContext } from "scorecard-types";

export default function GradeChip(props: {
  children?: any;
  faded?: boolean;
  spoiler?: boolean;
  red?: boolean;
}) {
  const settingsContext = useContext(SettingsContext);
  const spoiler = props.spoiler ?? settingsContext.spoilerMode;

  return (
    <div className="leading-none flex-none from-accent-400 to-accent-500 bg-gradient-to-tr rounded-xl pt-2.5 pb-1.5 px-3 group min-w-[3rem]">
      {spoiler && (
        <p className="align-middle text-white font-mono group-hover:hidden text-center">
          {". . ."}
        </p>
      )}
      <p
        className={`align-middle text-center text-white font-mono ${
          spoiler ? "hidden group-hover:block" : ""
        } ${
            props.red ? "text-red-500" : ""
        }`}
      >
        {props.children ?? "NG"}
      </p>
    </div>
  );
}
