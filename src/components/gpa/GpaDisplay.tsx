import React from 'react';

import GPARing from './GpaRing';

type IGpaDisplayProps = {
  gpa: number;
  weighted: boolean;
};

export default function GpaDisplay({ gpa, weighted }: IGpaDisplayProps) {
  return (
    <div className="_gpa-display">
      <p className="text-4xl text-theme-200 font-semibold leading-none tracking-tight">
        {gpa}
      </p>

      <div className="flex items-center mt-3">
        <GPARing gpa={gpa} weighted={weighted} />
        <h3 className="text-day-400 my-0 ml-3 whitespace-nowrap">
          {weighted ? 'Weighted GPA' : 'Unweighted GPA'}
        </h3>
      </div>
    </div>
  );
}
