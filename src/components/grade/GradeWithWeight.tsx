import React from 'react';

type IGradeWithWeightProps = {
  grade: any;
  weight: number;
};

export default function GradeWithWeight({
  grade,
  weight,
}: IGradeWithWeightProps) {
  return (
    <div className="relative text-xs text-right mr-4">
      <p>
        <b>Grade:</b> {grade}
      </p>
      <p>
        <b>Weight:</b> {weight}
      </p>
    </div>
  );
}
