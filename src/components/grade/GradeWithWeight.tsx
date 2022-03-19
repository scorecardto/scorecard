import React from 'react';

import { IoFlag, IoHelp, IoWarning } from 'react-icons/io5';
import { MdBubbleChart } from 'react-icons/md';

type IGradeWithWeightProps = {
  grade: any;
  weight: number;
};

const isGradeHigh = (
  grade: string,
  tolerance: number
): 'high' | 'low' | 'unsure' => {
  // eslint-disable-next-line radix
  const parsed = Number.parseInt(grade);
  if (!Number.isNaN(parsed)) {
    return parsed >= tolerance ? 'high' : 'low';
  }
  return 'unsure';
};

export default function GradeWithWeight({
  grade,
  weight,
}: IGradeWithWeightProps) {
  const gradeDisplay = isGradeHigh(grade, 85);

  return (
    <div className="relative flex mr-4">
      <span
        className={`block from-theme-600 to-theme-700 bg-gradient-to-tr w-fit py-1 px-3 rounded-l-xl my-1 text-white ml-auto ${
          gradeDisplay === 'high' ? '' : 'opacity-50'
        }`}
      >
        {(() => {
          if (typeof grade !== 'string') {
            return grade === undefined ? (
              <IoWarning fontSize={16} className="ml-auto my-1" />
            ) : (
              <IoFlag fontSize={16} className="ml-auto my-1" />
            );
          }
          return grade;
        })()}

        {gradeDisplay === 'unsure' ? (
          <span className="absolute w-5 h-5 bg-theme-800 -right-1 -bottom-1 rounded-full flex justify-center items-center">
            <IoHelp fontSize={14} />
          </span>
        ) : (
          <></>
        )}
      </span>
      <span className="bg-theme-400 w-fit py-1 pl-2 pr-3 rounded-r-xl my-1 text-white ml-auto items-center flex">
        <MdBubbleChart className="mr-1" />
        <span>{weight}</span>
      </span>
    </div>
  );
}
