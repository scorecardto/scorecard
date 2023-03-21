import { useContext, useMemo } from "react";
import { SettingsContext } from "scorecard-types";
import { BsPatchCheckFill } from "react-icons/bs";
export default function GradeChip(props: {
  children?: any;
  faded?: boolean;
  active?: boolean;
  spoiler?: boolean;
}) {
  const settingsContext = useContext(SettingsContext);
  const spoiler = props.spoiler ?? settingsContext.spoilerMode;

  return (
    <div
      className={`leading-none flex-none rounded-xl px-3 group min-w-[3rem] flex justify-center gap-2 items-center ${
        props.faded || !props.active
          ? "bg-accent-100 dark:bg-accent-700"
          : "from-accent-400 to-accent-500 bg-gradient-to-tr"
      }`}
    >
      <div className="pt-2.5 pb-1.5">
        {spoiler && (
          <p
            className={`align-middle font-mono group-hover:hidden text-center ${
              props.faded || !props.active ? "text-accent-300" : "text-white"
            }`}
          >
            {". . ."}
          </p>
        )}
        <p
          className={`align-middle text-center font-mono ${
            spoiler ? "hidden group-hover:block" : ""
          } ${props.faded || !props.active ? "text-accent-300" : "text-white"}`}
        >
          {props.children ?? "NG"}
        </p>
      </div>
      {!props.active && <BsPatchCheckFill className="text-accent-300 " />}
    </div>
  );
}
