import Link from "next/link";
import GradeChip from "./GradeChip";

export default function CourseCard(props: {
  courseName: string;
  description1: string;
  description2: string;
  grade: string;
  id: string;
  onClick(id: string): void;
}) {
  return (
    <div
      className=""
      onClick={() => {
        props.onClick(props.id);
      }}
    >
      <div className="max-w-md md:max-w-none mx-auto rounded-lg p-4 leading-none bg-mono-l-100 dark:bg-mono-d-100 hover:bg-mono-l-150 hover:dark:bg-mono-d-150 cursor-pointer">
        <div className="flex flex-row justify-between gap-5">
          <div className="whitespace-nowrap flex-shrink min-w-0 overflow-hidden">
            <div className="flex flex-col gap-5 p-1 whitespace-nowrap">
              <b className="text-ellipsis overflow-hidden">
                {props.courseName}
              </b>
              <div className="flex flex-col gap-3 children:text-ellipsis children:overflow-hidden">
                <p>{props.description1}</p>
                <p>{props.description2}</p>
              </div>
            </div>
          </div>
          <div className="flex-none">
            <GradeChip>{props.grade}</GradeChip>
          </div>
        </div>
      </div>
    </div>
  );
}
