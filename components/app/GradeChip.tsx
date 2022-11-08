import { useMemo } from "react";

export default function GradeChip(props: {
  children?: any;
  faded?: boolean;
  spoiler?: boolean;
}) {
  const value = useMemo(() => Math.floor(Math.random() * 31) + 70, []);

  const spoiler = props.spoiler ?? true;

  return (
    <div className="flex-none from-accent-400 to-accent-500 bg-gradient-to-tr rounded-xl pt-2.5 pb-1.5 px-3 group min-w-[3rem]">
      {spoiler && (
        <p className="align-middle text-white font-mono group-hover:hidden text-center">
          {". . ."}
        </p>
      )}
      <p
        className={`align-middle text-center text-white font-mono ${
          spoiler ? "hidden group-hover:block" : ""
        }`}
      >
        {props.children}
      </p>
    </div>
  );
}
