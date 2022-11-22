import React from "react";
import GradeChip from "../app/GradeChip";
import { motion } from "framer-motion";
export default function ExampleCourseCard(props: {
  opacity: number;
  index: number;
  animateIndex: number;
}) {
  const COURSES = [
    "Spanish",
    "English",
    "Algebra",
    "US History",
    "Biology",
    "Chemistry",
  ];

  const GRADES = [92, 95, 87, 90, 85, 80];

  const LAST_UPDATED = [
    "Last Updated 3 Days Ago",
    "Last Updated Yesterday",
    "Last Updated 4 Days Ago",
    "Last Updated Today",
    "Last Updated 2 Days Ago",
    "Last Updated 5 Days Ago",
  ];
  return (
    <motion.div
      initial={{
        opacity: 0,
        translateX: -20,
        translateY: -20,
      }}
      animate={{
        opacity: props.opacity,
        translateX: 0,
        translateY: 0,
      }}
      transition={{
        delay: props.animateIndex * 0.05,
      }}
    >
      <div
        className="w-full relative rounded-md overflow-hidden font-sans shadow-sm text-lg"
        style={{
          opacity: props.opacity,
        }}
      >
        <div className="flex justify-between relative z-20 px-4 pt-4 pb-6">
          <div className="flex flex-col gap-2">
            <p>{COURSES[props.index % COURSES.length]}</p>
            <p className="text-mono-l-500">
              {LAST_UPDATED[props.index % LAST_UPDATED.length]}
            </p>
          </div>
          <div>
            <GradeChip>{GRADES[props.index % GRADES.length]}</GradeChip>
          </div>
        </div>
        <div
          className={`absolute top-0 left-0 w-full h-full from-white ${
            props.opacity === 1 ? "to-white" : "to-white/0"
          } bg-gradient-to-b`}
        />
      </div>
    </motion.div>
  );
}
