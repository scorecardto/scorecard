import { useMemo } from "react";

export default function ActionChip(props: { children?: any }) {
  return (
    <div className="leading-none flex-none bg-accent-100 border border-accent-150 rounded-xl px-3 group min-w-[3rem] flex items-center">
      <p className={`align-middle text-center text-accent-300`}>
        {props.children}
      </p>
    </div>
  );
}
