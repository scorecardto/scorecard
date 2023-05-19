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

  const faded =
    /* faded or grade is NG or null */ props.faded ||
    props.children == "NG" ||
    props.children == null;
  return (
    <div
      className={`leading-none flex-none rounded-xl px-3 group min-w-[3rem] flex justify-center gap-2 items-center ${
        faded
          ? "bg-mono-l-300 dark:bg-mono-d-300"
          : props.active === false
          ? "bg-accent-100 dark:bg-accent-700"
          : "from-accent-400 to-accent-500 bg-gradient-to-tr"
      }`}
    >
      <div className="pt-2.5 pb-1.5">
        {spoiler && (
          <p
            className={`align-middle font-mono group-hover:hidden text-center ${
              faded
                ? "text-mono-l-500 dark:text-mono-d-500"
                : props.active === false
                ? "text-accent-300"
                : "text-white"
            }`}
          >
            {". . ."}
          </p>
        )}
        <p
          className={`align-middle text-center font-mono ${
            spoiler ? "hidden group-hover:block" : ""
          } ${
            faded
              ? "text-mono-l-500 dark:text-mono-d-500"
              : props.active === false
              ? "text-accent-300"
              : "text-white"
          }`}
        >
          {props.children ?? "NG"}
        </p>
      </div>
      {props.active === false && (
        <BsPatchCheckFill className="text-accent-300 " />
      )}
    </div>
  );
}
