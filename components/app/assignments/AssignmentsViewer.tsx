import React, { useContext, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { DataContext } from "scorecard-types";
import GradeChip from "../GradeChip";
import Dropdown from "../../core/input/Dropdown";
export default function AssignmentsViewer(props: {
  course: number;
  setCourse: React.Dispatch<React.SetStateAction<number>>;
}) {
  const { course, setCourse } = props;
  const show = course !== -1;

  const data = useContext(DataContext);

  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (show) {
      const handleClick = (e: any) => {
        if (e.target == null || !ref.current?.contains(e.target)) {
          setCourse(-1);
        }
      };

      document.addEventListener("click", handleClick, { capture: true });

      return () => {
        document.removeEventListener("click", handleClick, { capture: true });
      };
    }
  }, [show, setCourse]);

  return (
    <motion.div
      className={`${
        show ? "block" : "hidden"
      } z-40 fixed top-0 left-0 w-full h-full flex items-center justify-center`}
      animate={{ backgroundColor: show ? "rgba(0,0,0,0.5)" : "rgba(0,0,0,0)" }}
      transition={{ duration: 0.2 }}
    >
      <div ref={ref}>
        <motion.div
          animate={show ? "show" : "hide"}
          variants={{
            show: {
              opacity: 1,
              scale: 1,
              transition: {
                duration: 0.2,
                bounce: false,
              },
            },
            hide: {
              opacity: 0.7,
              scale: 0.9,
            },
          }}
        >
          <div className="bg-mono-l-100 dark:bg-mono-d-100 flex overflow-hidden rounded-lg">
            <div className="bg-accent-100 pt-16 w-80">
              {data.data?.data?.map((c, idx) => {
                return (
                  <div
                    key={idx}
                    className={`flex justify-between items-center py-2 leading-none border-b-2 border-accent-200 pl-8 pr-4 ${
                      course === idx ? "bg-accent-200" : "cursor-pointer"
                    }`}
                    onClick={() => {
                      setCourse(idx);
                    }}
                  >
                    <p className={`${course === idx ? "text-accent-300" : ""}`}>
                      {c.name}
                    </p>

                    <div className="flex-none w-fit">
                      <GradeChip>
                        {c.grades[data.gradingPeriod]?.value ?? "NG"}
                      </GradeChip>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="flex-1 w-[44rem]">
              <div className="h-16 flex items-center px-4">
                <Dropdown
                  options={data.data?.gradingPeriods ?? []}
                  selected={data.gradingPeriod}
                  setSelected={data.setGradingPeriod}
                />
              </div>
              <p>bottom section</p>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
