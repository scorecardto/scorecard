import React, { useEffect, useState } from 'react';

import { IoAdd } from 'react-icons/io5';

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
    <div
      className="_TCategory border-b border-day-300 dark:border-night-300 pb-2 last:border-b-0"
      key={categoryIdx}
    >
      <div className="_TCategory-name h-12 flex items-center text-day-400 dark:text-night-400 pl-12 pr-4 justify-between">
        <p>{category.category.name}</p>
        <label className="flex items-center gap-1 bg-theme-100 text-theme-200 py-1 px-2 rounded-md text-sm">
          <IoAdd />
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
        </label>
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
