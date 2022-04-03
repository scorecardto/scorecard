import React from 'react';

import { IoFlag, IoHelp, IoWarning } from 'react-icons/io5';

type IGradeProps = {
  grade: any;
};

const isGradeHigh = (
  grade: string,
  tolerance: number
): 'high' | 'low' | 'unsure' => {
  const parsed = Number.parseInt(grade, 10);
  if (!Number.isNaN(parsed)) {
    return parsed >= tolerance ? 'high' : 'low';
  }
  return 'unsure';
};

export default function Grade({ grade }: IGradeProps) {
  const gradeDisplay = isGradeHigh(grade, 85);

  return typeof grade !== 'string' ? (
    <span className="h-8 whitespace-nowrap block mt-2 text-day-400 dark:text-night-400">
      {grade === undefined ? (
        <IoFlag fontSize={20} className="ml-auto" />
      ) : (
        <IoWarning fontSize={20} className="ml-auto" />
      )}
    </span>
  ) : (
    <span
      className={`block from-theme-600 to-theme-700 bg-gradient-to-tr w-fit py-1 px-3 rounded-xl my-1 text-white ml-auto relative ${
        gradeDisplay === 'high' ? '' : 'opacity-50'
      }`}
    >
      {grade}
      {gradeDisplay === 'unsure' ? (
        <span className="absolute w-5 h-5 bg-theme-800 -right-1 -bottom-1 rounded-full flex justify-center items-center">
          <IoHelp fontSize={14} />
        </span>
      ) : (
        <></>
      )}
    </span>
  );
}
