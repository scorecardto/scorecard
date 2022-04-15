import React, { useEffect, useState } from 'react';

import { IoMenuOutline } from 'react-icons/io5';

import Checkbox from '../interactive/Checkbox';
import ScalingInput from '../interactive/ScalingInput';
import { parseNumberRevert } from '@/lib/GradeUtils';
import { Assignment } from '@/lib/types/Assignment';

type ITAssignmentOptionsProps = {
  assignment: Assignment;
  originalAssignment: Assignment;
  setAssignment(arg0: Assignment): void;
};

export default function TAssignmentOptions({
  assignment,
  originalAssignment,
  setAssignment,
}: ITAssignmentOptionsProps) {
  const [weight, setWeight] = useState(assignment.weight.toString());

  useEffect(() => {
    const parsed = parseNumberRevert(weight, true);

    setAssignment({
      ...assignment,
      weight: typeof parsed === 'number' ? parsed : 0,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [weight]);

  const [animateState, setAnimateState] = useState(-2);

  useEffect(() => {
    if (animateState === 0) {
      setAnimateState(1);
    }
    if (animateState === 1) {
      const onClick = () => {
        setAnimateState(-1);
      };

      document.addEventListener('click', onClick);

      return () => {
        document.removeEventListener('click', onClick);
      };
    }
    if (animateState === -1) {
      setTimeout(() => {
        setAnimateState(-2);
      }, 200);
    }
    return () => {};
  }, [animateState]);

  return (
    <div className="relative">
      <div
        className="w-8 h-8 hover:bg-theme-100 dark:hover:bg-night-250 rounded-lg flex items-center justify-center relative"
        onClick={() => {
          if (animateState === -2) {
            setAnimateState(0);
          } else if (animateState === 1) {
            setAnimateState(-1);
          }
        }}
      >
        {JSON.stringify({
          ...originalAssignment,
          dropped: !!originalAssignment.dropped,
          grade: 0,
        }) !==
        JSON.stringify({
          ...assignment,
          grade: 0,
          dropped: !!assignment.dropped,
        }) ? (
          <span className="bg-theme-200 w-2 h-2 block rounded-full absolute right-1 top-1.5" />
        ) : (
          <></>
        )}
        <IoMenuOutline className="block text-xl text-day-400 dark:text-night-400" />
      </div>

      <div
        className={`_TAssignmentOptions absolute pb-2 bg-day-100 dark:bg-night-100 border border-day-300 dark:border-night-300 z-10 transition-opacity-transform duration-200 origin-top-right right-0 top-6 rounded-md text-day-400 dark:text-night-400 ${
          animateState === -2 ? 'hidden' : ''
        } ${animateState !== 1 ? 'scale-75 opacity-0' : ''}`}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <p className="px-5 py-2 text-day-700 dark:text-night-700">Options</p>

        <div className="flex items-center gap-4 px-5 py-2 border-t border-day-300 dark:border-night-300">
          <p>Weight</p>
          <ScalingInput
            checkValidity={() => {
              return typeof parseNumberRevert(weight, true) === 'number';
            }}
            update={(n) => {
              setWeight(n);
            }}
            value={weight}
          />
        </div>

        <div className="flex items-center gap-4 px-5 py-2 border-t border-day-300 dark:border-night-300">
          <p>Dropped</p>
          <Checkbox
            checked={!!assignment.dropped}
            editingEnabled={true}
            onClick={(n) => {
              setAssignment({ ...assignment, dropped: n });
            }}
          />
        </div>
      </div>
    </div>
  );
}
