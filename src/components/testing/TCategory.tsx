import React, { useEffect, useState } from 'react';

import TAssignmentRow from './TAssignmentRow';
import { Assignment } from '@/lib/types/Assignment';
import { CategoryAssignments } from '@/lib/types/CategoryAssignments';

type ITCategoryProps = {
  category: CategoryAssignments;
  categoryIdx: number;
  update(arg0: CategoryAssignments): void;
};

export default function TCategory({
  update,
  category,
  categoryIdx,
}: ITCategoryProps) {
  const [existingAssignments, setExistingAssignments] = useState<Assignment[]>(
    category.assignments
  );

  const [addedAssignments, setAddedAssignments] = useState<Assignment[]>([]);
  const [addedAssignmentCounter, setAddedAssignmentCounter] = useState(1);

  useEffect(() => {
    update({
      category: category.category,
      assignments: existingAssignments.concat(addedAssignments),
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [addedAssignments]);

  return (
    <div className="_TCategory" key={categoryIdx}>
      <div className="_TCategory-name h-12 flex items-center text-day-400 dark:text-night-400 px-12">
        <p>{category.category.name}</p>
        <button
          onClick={() => {
            setAddedAssignments([
              ...addedAssignments,
              {
                name:
                  addedAssignmentCounter === 1
                    ? 'New Assignment'
                    : `New Assignment ${addedAssignmentCounter}`,
                grade: 'Enter a Grade',
                weight: 1,
                otherFields: [],
              },
            ]);
            setAddedAssignmentCounter(addedAssignmentCounter + 1);
          }}
        >
          Add
        </button>
      </div>
      <div className="_TCategory-items">
        {existingAssignments.map((assignment, assignmentIdx) => {
          return (
            <TAssignmentRow
              setAssignment={(n) => {
                const assignments = existingAssignments.slice(0);

                assignments[assignmentIdx] = n;

                setExistingAssignments(assignments);
                update({
                  category: category.category,
                  assignments: assignments.concat(addedAssignments),
                });
              }}
              assignment={assignment}
              key={assignmentIdx}
            />
          );
        })}
        {addedAssignments.map((assignment, assignmentIdx) => {
          return (
            <TAssignmentRow
              removeMe={() => {
                const newAddedAssignments = addedAssignments.slice(0);
                newAddedAssignments.splice(assignmentIdx, 1);

                setAddedAssignments(newAddedAssignments);
              }}
              setAssignment={(n) => {
                const assignments = addedAssignments.slice(0);

                assignments[assignmentIdx] = n;

                setAddedAssignments(assignments);
              }}
              assignment={assignment}
              key={assignmentIdx}
            />
          );
        })}
      </div>
    </div>
  );
}
