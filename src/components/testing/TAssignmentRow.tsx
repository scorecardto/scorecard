import React, { useEffect, useMemo, useState } from 'react';

import Checkbox from '../interactive/Checkbox';
import TAssignmentOptions from './TAssignmentOptions';
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

  const widthRef = React.createRef<HTMLDivElement>();

  const inputRef = React.createRef<HTMLInputElement>();

  const updateInput = (n?: string) => {
    if (inputRef.current) {
      inputRef.current.value = n ?? assignment.grade.toString();
    }
  };

  const [width, setWidth] = useState(0);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const originalAssignment = useMemo<Assignment>(() => assignment, []);

  const generateSuggestions = (): {
    title: string;
    fn(): void;
    lightHighlight?: boolean;
    darkHighlight?: boolean;
  }[] => {
    const revertable =
      JSON.stringify(assignment) !== JSON.stringify(originalAssignment);

    const returnable = [
      {
        title: assignment.dropped ? 'Undrop' : 'Drop',
        fn: () => {
          setAssignment({ ...assignment, dropped: !assignment.dropped });
        },
        lightHighlight: assignment.dropped,
        darkHighlight: assignment.dropped || !revertable,
      },
    ];

    if (revertable) {
      returnable.push({
        title: 'Revert',
        fn: () => {
          setAssignment(originalAssignment);
        },
        lightHighlight: true,
        darkHighlight: true,
      });
    }

    const parsed = parseNumberRevert(assignment.grade);

    if (typeof parsed === 'number' && parsed < 70) {
      returnable.push({
        title: 'Passing',
        fn: () => {
          setAssignment({ ...assignment, grade: 70 });
          updateInput('70');
        },
        lightHighlight: false,
        darkHighlight: !assignment.dropped && !revertable,
      });
    }

    if (typeof parsed === 'number' && parsed < 100) {
      returnable.push({
        title: 'Half Back',
        fn: () => {
          const halfBack = Math.round((100 + parsed) / 2);
          setAssignment({ ...assignment, grade: halfBack });
          updateInput(halfBack.toString());
        },
        lightHighlight: false,
        darkHighlight: !assignment.dropped && !revertable,
      });

      returnable.push({
        title: '100',
        fn: () => {
          setAssignment({ ...assignment, grade: 100 });
          updateInput('100');
        },
        lightHighlight: false,
        darkHighlight: !assignment.dropped && !revertable,
      });
    }

    return returnable;
  };

  const generateRightSide = () => {
    if (focus) {
      return generateSuggestions().map((btn, idx) => {
        return (
          <div
            className={`_input-suggestion-card h-fit ${
              btn.lightHighlight
                ? 'bg-theme-200 text-day-100'
                : 'bg-theme-100 text-theme-200'
            } ${
              btn.darkHighlight
                ? 'dark:bg-theme-200 dark:text-theme-100'
                : 'dark:text-theme-200 dark:bg-night-250'
            } w-fit px-1.5 py-0.5 rounded-md transition-colors cursor-pointer font-normal whitespace-nowrap overflow-hidden`}
            key={idx}
            onMouseDown={(e) => {
              if (e.button === 0) {
                btn.fn();
              }
            }}
          >
            <p className="overflow-hidden text-ellipsis">{btn.title}</p>
          </div>
        );
      });
    }

    return <></>;
    // {
    //   return focus ? (

    //   ) : (
    //     <></>
    //   );
    // })}
  };

  const getGradeIsValid = (): boolean => {
    const parsed = parseNumberRevert(assignment.grade);

    if (typeof parsed === 'number' && !Number.isNaN(+assignment.grade)) {
      return parsed >= 0;
    }

    return ['PND', 'MSG', 'EXC', ''].includes(
      assignment.grade.toString().toUpperCase()
    );
  };
  // useEffect(() => {
  //   if (optionsShown) {
  //     const onClick = () => {
  //       setOptionsShown(false);
  //     };

  //     document.addEventListener('click', onClick);

  //     return () => {
  //       document.removeEventListener('click', onClick);
  //     };
  //   }
  //   return () => {};
  // }, [optionsShown]);

  useEffect(() => {
    setWidth(widthRef.current?.clientWidth ?? 0);
  }, [assignment.grade, widthRef]);

  return (
    <div
      className="_TAssignmentRow flex justify-between h-12 items-center hover:bg-day-150 dark:hover:bg-night-150 focus-within:bg-day-150  focus-within:dark:bg-night-150 pl-12 pr-4 _TAssignmentRow-auto-focus"
      onClick={(e) => {
        // @ts-ignore
        if (e.target?.classList?.contains('_TAssignmentRow-auto-focus')) {
          inputRef.current?.focus();
        }
      }}
    >
      <span className="_TAssignmentRow-left text-day-700 dark:text-night-700 flex items-center gap-4 _TAssignmentRow-auto-focus">
        <Checkbox
          checked={!assignment.dropped}
          editingEnabled={true}
          onClick={(b) => {
            setAssignment({ ...assignment, dropped: !b });
          }}
          cancelEvent={true}
        />
        <span className="_TAssignmentRow-auto-focus">{assignment.name}</span>
      </span>
      <span>
        <div className="_TAssignmentRow-input-wrapper flex flex-row-reverse group items-center gap-2">
          <TAssignmentOptions
            assignment={assignment}
            originalAssignment={originalAssignment}
            setAssignment={setAssignment}
          />
          <span className="relative">
            <input
              style={{ width: width != null ? width + 18 : width }}
              ref={inputRef}
              onFocus={() => {
                setFocus(true);
              }}
              onBlur={() => {
                setFocus(false);
              }}
              className={`_TAssignmentRow-input whitespace-nowrap outline-none py-1 px-2 border border-day-300 dark:border-night-300 rounded-lg transition-colors ${
                getGradeIsValid()
                  ? 'focus:border-theme-200'
                  : 'focus:border-red-400'
              } text-day-700 dark:text-night-700`}
              onInput={(e) => {
                setAssignment({
                  ...assignment,
                  grade:
                    parseNumberRevert(e.currentTarget.value ?? '', true) ?? '',
                });
              }}
              role={'textbox'}
              value={assignment.grade.toString()}
            />
            <div
              ref={widthRef}
              className="w-fit whitespace-pre invisible absolute top-0 left-0"
            >
              {assignment.grade.toString()}
            </div>

            {originalAssignment.grade.toString() !==
            assignment.grade.toString() ? (
              <span className="bg-theme-200 w-3 h-3 block rounded-full absolute -right-1 -top-1" />
            ) : (
              <></>
            )}
          </span>
          <div className="_TAssignmentRow-input-suggestions flex flex-row text-sm items-center gap-2">
            {generateRightSide()}
          </div>
        </div>
      </span>
    </div>
  );
}
