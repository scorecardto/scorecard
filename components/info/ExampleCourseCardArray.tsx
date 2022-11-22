import React, { useEffect, useState } from "react";
import GradeChip from "../app/GradeChip";
import ExampleCourseCard from "./ExampleCourseCard";

export default function ExampleCourseCardArray(props: {}) {
  const [offset, setOffset] = useState(-1);

  useEffect(() => {
    setOffset(Math.floor(Math.random() * 6));
  }, []);

  // const [skewX, setSkewX] = useState(0);
  // const [skewY, setSkewY] = useState(0);

  // useEffect(() => {
  //   // mouse move event
  //   const handleMouseMove = (e: MouseEvent) => {
  //     const x = e.clientX;
  //     const y = e.clientY;

  //     setSkewX((x / window.innerWidth) * 8 - 4);
  //     setSkewY((y / window.innerHeight) * 8 - 4);
  //   };

  //   // add mouse move event listener
  //   window.addEventListener("mousemove", handleMouseMove);

  //   // remove mouse move event listener
  //   return () => {
  //     window.removeEventListener("mousemove", handleMouseMove);
  //   };
  // }, []);

  return (
    <div
      className="relative whitespace-nowrap"
      // style={{
      //   transform: `rotateX(${skewX}deg) rotateY(${skewY}deg)`,
      // }}
    >
      {offset !== -1 && (
        <>
          <div>
            <ExampleCourseCard
              opacity={1}
              index={0 + offset}
              animateIndex={3}
            />
          </div>
          <div className="absolute right-full top-0 w-full mr-8">
            <ExampleCourseCard
              opacity={0.5}
              index={1 + offset}
              animateIndex={4}
            />
          </div>
          <div className="absolute left-full top-0 w-full ml-8">
            <ExampleCourseCard
              opacity={0.5}
              index={2 + offset}
              animateIndex={5}
            />
          </div>
          <div className="absolute bottom-full left-0 w-full mb-8">
            <ExampleCourseCard
              opacity={0.5}
              index={3 + offset}
              animateIndex={1}
            />
          </div>
          <div className="absolute right-full w-full mr-8 bottom-full mb-8">
            <ExampleCourseCard
              opacity={0.3}
              index={4 + offset}
              animateIndex={0}
            />
          </div>
          <div className="absolute left-full w-full ml-8 bottom-full mb-8">
            <ExampleCourseCard
              opacity={0.3}
              index={5 + offset}
              animateIndex={2}
            />
          </div>
        </>
      )}
    </div>
  );
}
