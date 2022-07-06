import MQ from "../core/MQ";

export default function Toolbar() {
  return (
    <>
      <MQ query="(min-width: 1024px)">
        <div>
          <div className="flex flex-row transition-colors gap-0.5 children:px-8 children:py-3 children:bg-accent-100 dark:children:bg-accent-600 children:text-accent-300 dark:children:text-white children:transition-colors rounded-lg overflow-hidden cursor-pointer bg-accent-200 dark:bg-accent-700">
            <div className="hover:bg-accent-200 dark:hover:bg-accent-700">
              GPA Calculator
            </div>
            <div className="hover:bg-accent-200 dark:hover:bg-accent-700">
              More Tools
            </div>
          </div>
        </div>
      </MQ>

      <MQ query="(min-width: 1024px)" invert>
        <div className="flex-none">
          <div className="flex flex-col gap-2 children:cursor-pointer children:rounded-md children:transition-colors">
            <div className="px-8 py-3 bg-accent-100 hover:bg-accent-200 dark:bg-accent-600 dark:hover:bg-accent-700 text-accent-300 dark:text-white">
              GPA Calculator
            </div>
            <div className="py-1 w-full text-xs text-center bg-mono-l-300 hover:bg-mono-l-350 dark:bg-mono-d-300 dark:hover:bg-mono-d-350 text-mono-l-500 dark:text-mono-d-500">
              More Tools
            </div>
          </div>
        </div>
      </MQ>
    </>
  );
}
