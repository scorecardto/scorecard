import React, { useRef, useState, useEffect, ReactElement } from 'react';

import { motion } from 'framer-motion';

import Grade from '../grade/Grade';
import ConditionalLink from '../util/ConditionalLink';
import Tooltip from '../util/Tooltip';
import GradebookCategory from '@/lib/types/GradebookCategory';

export type ColumnType = 'COURSE_NAME' | 'OTHER_FIELD' | 'GRADE';

export type Column = {
  header: ReactElement | HTMLElement | string;
  cells: {
    type: 'VALUE' | 'CATEGORY';
    link?: string;
    element:
      | ReactElement
      | HTMLElement
      | string
      | undefined
      | GradebookCategory;
  }[];

  type: ColumnType;
  amFirstColumn?: boolean;
  amLastColumn?: boolean;
  setComponentShowing: ColumnShowingCallback;
  getSetComponentShowing: GetSetColumnShowingCallback;
  hoveredRow: number;
  onCellMouseOver?: CellHoverCallback;
  clickable?: boolean;
  onResize?: {
    (): void;
  };
  deltaSnapPoint?: number;
  animated?: boolean;
  forceShow?: boolean;
};

export type ColumnStringContents = {
  header: string;
  cells: (string | undefined | GradebookCategory)[];
  type: ColumnType;
};

type CellHoverCallback = {
  (idx: number): void;
};

type ColumnShowingCallback = {
  (isShowing: boolean): void;
};

type GetSetColumnShowingCallback = {
  (setComponentShowing: SetColumnShowingCallback): void;
};

export type SetColumnShowingCallback = {
  (isShowing: boolean): void;
};

export default function TableColumn({
  header,
  cells,
  type,
  setComponentShowing,
  getSetComponentShowing,
  amFirstColumn,
  amLastColumn,
  hoveredRow,
  onCellMouseOver,
  clickable,
  onResize,
  animated,
  deltaSnapPoint,
  forceShow,
}: Column) {
  /**
   * Whitespace added to the column
   * = current width - minimum width
   *
   * uses ref and state to prevent closure with event listeners
   */
  const [whitespace, setWhitespaceState] = useState(0);
  const whitespaceRef = useRef(whitespace);

  const setWhitespace = (newValue: number) => {
    setWhitespaceState(newValue);
    whitespaceRef.current = newValue;
  };

  /**
   * If user is currently resizing this column
   * Used for resizing indicators and event listeners
   */
  const [resizing, setResizing] = useState(false);

  const cellContainerRef = useRef<HTMLDivElement>(null);
  const colHeaderRef = useRef<HTMLDivElement>(null);

  const inDeletionAction = whitespace < -8;

  const [isComponentDissapearing, setComponentDissapearing] = useState<
    number | undefined
  >(undefined);

  const [minCellWidth, setMinCellWidth] = useState<number>(0);

  const calculateDeletionBackground = (currentWhitespace: number) => {
    if (!inDeletionAction) {
      return `rgba(255,0,0,0)`;
    }

    const overallCompletion =
      currentWhitespace / (cellContainerRef.current?.clientWidth ?? 1);

    const neededCompletion = Math.min(overallCompletion * -2.7, 1);

    return `rgba(255,0,0,${Math.max(0, neededCompletion * 0.45)}`;
  };

  const calculateDeletionTextOpacity = (currentWhitespace: number) => {
    const overallCompletion =
      currentWhitespace / (cellContainerRef.current?.clientWidth ?? 1);

    const neededCompletion = Math.min(overallCompletion * -3.3, 1);

    return 1 - Math.max(0, neededCompletion * 0.8);
  };

  const mouseDownHandler = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    event.preventDefault();

    setResizing(true);

    const eventStart = Date.now();

    let futureToolbarTimeout: NodeJS.Timeout;

    const onMouseMove = (event2: MouseEvent) => {
      const delta = event2.clientX - event.clientX;

      const useSnapPoint =
        deltaSnapPoint != null && Math.abs(deltaSnapPoint - delta) <= 10;

      const newWhitespace =
        whitespace + (useSnapPoint ? deltaSnapPoint : delta);

      const now = Date.now();

      if (futureToolbarTimeout) {
        clearTimeout(futureToolbarTimeout);
      }

      if (newWhitespace <= -8 && now - eventStart < 750) {
        setWhitespace(0);

        if (!amFirstColumn && !amLastColumn && !forceShow) {
          futureToolbarTimeout = setTimeout(() => {
            setWhitespace(newWhitespace);
          }, 500);
        }
      } else if (amFirstColumn || amLastColumn || forceShow) {
        setWhitespace(Math.max(newWhitespace, 0));
        // update whitespace
      } else {
        setWhitespace(newWhitespace);
      }
    };

    const onMouseUp = () => {
      if (futureToolbarTimeout) {
        clearTimeout(futureToolbarTimeout);
      }

      if (whitespaceRef.current < -16) {
        setComponentDissapearing(cellContainerRef.current?.clientWidth);
        setComponentShowing(false);
        setWhitespace(0);
      }

      setWhitespace(Math.max(0, whitespaceRef.current));
      // remove event listeners only used during the resizing process.
      document.documentElement.removeEventListener('mousemove', onMouseMove);
      document.documentElement.removeEventListener('mouseup', onMouseUp);

      setResizing(false);

      if (onResize) onResize();
    };

    document.documentElement.addEventListener('mousemove', onMouseMove);
    document.documentElement.addEventListener('mouseup', onMouseUp);
  };

  useEffect(() => {
    if (isComponentDissapearing) {
      setComponentDissapearing(0);
    } else if (isComponentDissapearing == null) {
      setComponentShowing(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isComponentDissapearing]);

  useEffect(() => {
    getSetComponentShowing((isShowing: boolean) => {
      if (isShowing && isComponentDissapearing !== -1) {
        setComponentDissapearing(undefined);
      } else if (!isShowing && isComponentDissapearing === undefined) {
        setComponentDissapearing(cellContainerRef.current?.clientWidth);
        setComponentShowing(false);
        setWhitespace(0);
        setWhitespace(Math.max(0, whitespaceRef.current));
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setMinCellWidth(colHeaderRef.current?.clientWidth ?? 0);
  }, []);

  return (
    <div
      className={`_table-column group-1 ${resizing ? 'cursor-col-resize' : ''}${
        isComponentDissapearing === 0 ? '' : ''
      }`}
    >
      <div
        className={`_table-column-header block relative transition-opacity ${
          isComponentDissapearing === 0 ? 'opacity-0 w-0' : 'opacity-100'
        }`}
        ref={colHeaderRef}
      >
        {header}
      </div>

      <div className="_table-column-cells-wrapper flex w-fit group-1-first:border-l border-l-day-300 dark:border-l-night-300">
        <div
          className="_table-column-cells"
          ref={cellContainerRef}
          style={{
            ...(isComponentDissapearing != null && {
              whiteSpace: 'nowrap',
              height: 0,
              transition: '0.4s width ease',
              width: isComponentDissapearing,
            }),
          }}
        >
          {(() => {
            let realIdx = -1;

            return cells.map((cell, idx) => {
              if (!(cells[idx - 1] && cells[idx - 1]?.type === 'CATEGORY'))
                realIdx += 1;

              const myRealIdx = realIdx;

              const inner = (
                <motion.div
                  initial={{
                    ...(animated && {
                      translateX: -75,
                      translateY: -10,
                      opacity: 0,
                    }),
                  }}
                  animate={{ translateX: 0, translateY: 0, opacity: 1 }}
                  transition={{
                    delay: myRealIdx * 0.03,
                    duration: 0.3,
                  }}
                  className={`_table-column-single-cell border-b py-1 first:border-t transition-colors ${
                    clickable ? 'cursor-pointer' : ''
                  } ${
                    inDeletionAction
                      ? 'border-red-500'
                      : 'border-day-300 dark:border-night-300'
                  }${
                    type !== 'OTHER_FIELD'
                      ? ` text-day-700 dark:text-night-700 bg-day-200 dark:bg-night-200 ${
                          hoveredRow === myRealIdx && clickable
                            ? 'group-2-hover:bg-day-250 group-2-hover:dark:bg-night-250'
                            : ''
                        }`
                      : ` text-day-400 dark:text-night-400 bg-day-100 dark:bg-night-100 ${
                          hoveredRow === myRealIdx && clickable
                            ? 'group-2-hover:bg-day-150 group-2-hover:dark:bg-night-150'
                            : ''
                        }`
                  }${
                    cell.type === 'CATEGORY'
                      ? ' absolute bg-day-200 dark:bg-night-200 z-10 border-day-300 dark:border-night-300 border-r w-full--1'
                      : ' pl-4 pr-4 w-full'
                  }`}
                  onMouseOver={
                    onCellMouseOver &&
                    (() => {
                      onCellMouseOver(myRealIdx);
                    })
                  }
                  style={{
                    ...{
                      paddingLeft:
                        type !== 'GRADE' || cell.type === 'CATEGORY'
                          ? undefined
                          : Math.max(whitespace, 0) + 40,

                      paddingRight:
                        type === 'GRADE' || cell.type === 'CATEGORY'
                          ? undefined
                          : Math.max(whitespace, 0) + 40,

                      opacity: calculateDeletionTextOpacity(whitespace),
                    },
                    ...(isComponentDissapearing != null && {
                      transition: '0.15s opacity ease, 0.15s padding ease',
                      opacity: 0,
                    }),
                  }}
                >
                  <span
                    className={`_table-column-single-cell-inner block`}
                    style={{ minWidth: Math.max(minCellWidth - 46, 70) }}
                  >
                    {type === 'GRADE' ? (
                      <Grade grade={cell.element} />
                    ) : (
                      cell.element
                    )}
                  </span>
                </motion.div>
              );

              return (
                <ConditionalLink
                  href={cell.link}
                  key={idx}
                  enabled={cell.link != null}
                >
                  {inner}
                </ConditionalLink>
                // <Link href={cell.link ?? '/'} key={idx}>
                //   {inner}
                // </Link>
              );
            });
          })()}
          {whitespace < -20 ? (
            <div
              className="w-full h-full -translate-y-full z-10 relative"
              style={{ background: calculateDeletionBackground(whitespace) }}
            >
              <div className="_table-column-tooltip absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 overflow-hidden max-w-full z-10">
                <Tooltip message="Hide Column" shown={whitespace < -20} />
              </div>
            </div>
          ) : (
            <></>
          )}
        </div>
        <div
          className={`_table-column-handle-wrapper cursor-col-resize group relative ${
            whitespace < -20 ? 'z-10' : ''
          }`}
          onMouseDown={mouseDownHandler}
        >
          <div
            className={`_table-column-handle absolute top-0 right-0 h-full w-2 border-r border-r-day-300 dark:border-r-night-300 transition-colors duration-200 group-hover:border-r-blue-400 dark:group-hover:border-r-blue-400 group-hover:border-r-2 dark:group-hover:border-r-2 ${
              resizing
                ? `${
                    inDeletionAction
                      ? 'border-r-red-500 dark:border-r-red-500'
                      : 'border-r-blue-400 dark:border-r-blue-400'
                  } border-r-2`
                : ''
            }`}
          />
          <div className="_table-column-handle-grabbable-overhang absolute top-0 -right-2 h-full w-2"></div>
        </div>
        <div
          className={`_table-column-handle-cursor-overhang absolute top-0 -right-4 h-full w-4 ${
            resizing ? 'cursor-col-resize' : 'hidden'
          }`}
        ></div>
      </div>
    </div>
  );
}
