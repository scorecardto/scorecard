import React, { useEffect } from 'react';

import { parseNumberRevert } from '@/lib/GradeUtils';
import { Assignment } from '@/lib/types/Assignment';

type ITAssignmentRowProps = {
  assignment: Assignment;
  setAssignment(arg0: Assignment): void;
};

export default function TAssignmentRow({
  assignment,
  setAssignment,
}: ITAssignmentRowProps) {
  useEffect(() => {
    setAssignment({ ...assignment, grade: 50 });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="_TAssignmentRow flex justify-between">
      <span className="_TAssignmentRow-name">{assignment.name}</span>
      <span>
        <input
          className="_TAssignmentRow-input outline-none w-12 py-1 px-2 border border-day-300 dark:border-night-300"
          value={assignment.grade}
          onChange={(e) => {
            setAssignment({
              ...assignment,
              grade: parseNumberRevert(e.target.value),
            });
          }}
        />
      </span>
    </div>
  );
}
