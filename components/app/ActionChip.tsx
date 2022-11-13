import { useMemo } from "react";

export default function ActionChip(props: { children?: any }) {
  return (
    <div className="leading-none flex-none bg-accent-100 dark:bg-accent-600 border border-accent-200 dark:border-accent-700 rounded-xl px-3 group min-w-[3rem] flex items-center">
      <p
        className={`align-middle text-center text-accent-300 dark:text-accent-250`}
      >
        {props.children}
      </p>
    </div>
  );
}
