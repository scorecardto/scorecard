import React from 'react';

import GpaRing from './GpaRing';

type IGpaDisplayProps = {
  gpa: number;
};

export default function GpaDisplay({ gpa }: IGpaDisplayProps) {
  return (
    <div className="_gpa-display">
      <p className="text-4xl text-theme-200 font-semibold leading-none tracking-tight">
        {gpa}
      </p>

      <div className="flex items-center mt-3">
        <GpaRing gpa={gpa} />
        <h3 className="text-day-400 my-0 ml-3 whitespace-nowrap">
          Weighted GPA
        </h3>
      </div>
    </div>
  );
}
