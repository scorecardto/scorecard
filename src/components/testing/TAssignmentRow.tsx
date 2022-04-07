import React, { useEffect, useState } from 'react';

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
  const [focus, setFocus] = useState(false);

  const inputRef = React.createRef<HTMLDivElement>();

  useEffect(() => {
    if (inputRef.current) {
      // @ts-ignore
      inputRef.current.textContent = assignment.grade.toString();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const generateSuggestions = (): { title: string; fn(): void }[] => {
    const returnable = [
      {
        title: 'Drop',
        fn: () => {
          setAssignment({ ...assignment, dropped: true, grade: 0 });
        },
      },
    ];
    return returnable;
  };

  return (
    <div className="_TAssignmentRow flex justify-between h-12 items-center">
      <span className="_TAssignmentRow-name">{assignment.name}</span>
      <span>
        <div className="_TAssignmentRow-input-wrapper flex flex-row-reverse group">
          <span>
            <div
              onFocus={() => {
                setFocus(true);
              }}
              onBlur={() => {
                setFocus(false);
              }}
              ref={inputRef}
              className="_TAssignmentRow-input whitespace-nowrap outline-none w-fit py-1 px-2 border border-day-300 dark:border-night-300 rounded-lg transition-colors focus:border-theme-200"
              onInput={(e) => {
                setAssignment({
                  ...assignment,
                  grade: parseNumberRevert(e.currentTarget.textContent ?? ''),
                });
              }}
              contentEditable={true}
              role={'textbox'}
            />
          </span>
          <div className="_TAssignmentRow-input-suggestions flex flex-row text-sm items-center">
            {generateSuggestions().map((btn, idx) => {
              return focus ? (
                <div
                  className="_input-suggestion-card mr-2 h-fit bg-theme-100 text-theme-200 dark:bg-theme-200 dark:text-theme-100 w-fit px-1.5 py-0.5 rounded-md transition-colors cursor-pointer font-normal whitespace-nowrap overflow-hidden"
                  key={idx}
                  onMouseDown={(e) => {
                    if (e.button === 0) {
                      btn.fn();
                    }
                  }}
                >
                  <p className="overflow-hidden text-ellipsis">{btn.title}</p>
                </div>
              ) : (
                <></>
              );
            })}
          </div>
        </div>
      </span>
    </div>
  );
}
