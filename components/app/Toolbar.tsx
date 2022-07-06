export default function Toolbar() {
  return (
    <div className="flex-none w-fit flex flex-col gap-2 lg:bg-accent-200 lg:flex-row lg:gap-0.5 lg:rounded-lg lg:overflow-hidden">
      <div className="bg-accent-100 px-8 py-3 rounded-lg lg:rounded-none text-accent-300">
        GPA Calculator
      </div>
      <div className="bg-mono-l-200 dark:bg-mono-d-200 lg:bg-accent-100 lg:dark:bg-accent-600 py-1 lg:px-8 lg:py-3 text-center text-xs rounded-lg lg:rounded-none lg:text-base lg:text-accent-300 lg:dark:text-white">
        More Tools
      </div>
    </div>
  );
}
