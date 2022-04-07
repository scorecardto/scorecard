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
  // const [setFocus] = useState(false);

  const inputRef = React.createRef<HTMLDivElement>();

  const updateInput = (n?: string) => {
    if (inputRef.current) {
      // @ts-ignore
      inputRef.current.textContent = n ?? assignment.grade.toString();
    }
  };

  useEffect(() => {
    updateInput();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const generateSuggestions = (): {
    title: string;
    fn(): void;
    lightHighlight?: boolean;
    darkHighlight?: boolean;
  }[] => {
    const returnable = [
      {
        title: assignment.dropped ? 'Undrop' : 'Drop',
        fn: () => {
          setAssignment({ ...assignment, dropped: !assignment.dropped });
        },
        lightHighlight: assignment.dropped,
        darkHighlight: true,
      },
    ];

    const parsed = parseNumberRevert(assignment.grade);

    if (typeof parsed === 'number' && parsed < 70) {
      returnable.push({
        title: 'Passing',
        fn: () => {
          setAssignment({ ...assignment, grade: 70 });
          updateInput('70');
        },
        lightHighlight: false,
        darkHighlight: !assignment.dropped,
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
        darkHighlight: !assignment.dropped,
      });

      returnable.push({
        title: '100',
        fn: () => {
          setAssignment({ ...assignment, grade: 100 });
          updateInput('100');
        },
        lightHighlight: false,
        darkHighlight: !assignment.dropped,
      });
    }

    return returnable;
  };

  const generateRightSide = () => {
    // if (true) {
    return generateSuggestions().map((btn, idx) => {
      return (
        <div
          className={`_input-suggestion-card mr-2 h-fit hidden group-hover:block ${
            btn.lightHighlight
              ? 'bg-theme-200 text-day-100'
              : 'bg-theme-100 text-theme-200'
          } ${
            btn.darkHighlight
              ? 'dark:bg-theme-200 dark:text-theme-100'
              : 'dark:text-theme-200 dark:bg-night-150'
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
    // }
    // if (
    //   assignment.dropped ||
    //   assignment.weight <= 0 ||
    //   assignment.grade === ''
    // ) {
    //   return (
    //     <div className="text-day-400 dark:text-night-400 mr-4">
    //       (not counted)
    //     </div>
    //   );
    // }

    // return <></>;
    // {
    //   return focus ? (

    //   ) : (
    //     <></>
    //   );
    // })}
  };

  return (
    <div
      className="_TAssignmentRow flex justify-between h-12 items-center hover:bg-day-150 dark:hover:bg-night-150 focus-within:bg-day-150  focus-within:dark:bg-night-150 pl-12 pr-4 group"
      onClick={() => {
        inputRef.current?.focus();
      }}
    >
      <span className="_TAssignmentRow-name text-day-700 dark:text-night-700">
        {assignment.name}
      </span>
      <span>
        <div className="_TAssignmentRow-input-wrapper flex flex-row-reverse ">
          <span>
            <div
              onFocus={() => {
                // setFocus(true);
              }}
              onBlur={() => {
                // setFocus(false);
              }}
              ref={inputRef}
              className="_TAssignmentRow-input whitespace-nowrap outline-none w-fit py-1 px-2 border border-day-300 dark:border-night-300 rounded-lg transition-colors focus:border-theme-200 text-day-700 dark:text-night-700"
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
            {generateRightSide()}
          </div>
        </div>
      </span>
    </div>
  );
}
