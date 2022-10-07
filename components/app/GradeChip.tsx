export default function GradeChip(props: { children?: any; faded?: boolean }) {
  return (
    <div className="flex-none from-accent-400 to-accent-500 bg-gradient-to-tr rounded-xl pt-2.5 pb-1.5 px-3 group">
      <p className="align-middle text-white font-mono group-hover:hidden">
        {"😀"}
      </p>
      <p className="align-middle text-white font-mono hidden group-hover:block">
        {props.children}
      </p>
    </div>
  );
}
