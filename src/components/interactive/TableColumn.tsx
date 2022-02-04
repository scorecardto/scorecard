import React, { useEffect, useRef, useState } from 'react';

import Color from 'color';

type TableColumnProps = {
  cells: Element[];
  columnIndex: number;
  totalColumns: number;
  setColumnWidth?: SetColumnWidthsFunc;
  background?: [number, number, number, number]; // r, g, b, a
};

/**
 * Passes column width to parent
 */
type SetColumnWidthsFunc = {
  (width: number): void;
};

export default function TableColumn({
  cells,
  columnIndex,
  totalColumns,
  setColumnWidth,
  background,
}: TableColumnProps) {
  /**
   * Minumum width of the column
   */
  const [width, setWidth] = useState(0);

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

  /**
   * If whitespace is currently being applied.
   * Used to remeasure minimum width when cell data changes.
   */
  const [applyWidth, setApplyWidth] = useState(false);

  /**
   * If component is playing disspearing animation
   */
  const [isComponentDissapearing, setComponentDissapearing] = useState(false);

  /**
   * Called when user begins resizing by holding mouse on handle.
   * @param e MouseEvent
   */
  const resizeMouseDown = (e: any) => {
    e.preventDefault();

    /**
     * Called when the mouse moves during the resizing process.
     * @param e2 MouseEvent
     */
    const mouseMove = (e2: any) => {
      // add difference from mouse down to mouse move
      const newWhitespace = whitespace + e2.clientX - e.clientX;

      // update whitespace
      setWhitespace(newWhitespace);

      // update column width
      if (setColumnWidth) {
        setColumnWidth(width + Math.max(newWhitespace, 0));
      }
    };

    /**
     * Called when the mouse is lifted during the resizing process, indicating that the user is done resizing.
     */
    const mouseUp = () => {
      if (whitespaceRef.current < width / -4.5) {
        setComponentDissapearing(true);
      }

      setWhitespace(Math.max(0, whitespaceRef.current));
      // remove event listeners only used during the resizing process.
      document.documentElement.removeEventListener('mousemove', mouseMove);
      document.documentElement.removeEventListener('mouseup', mouseUp);

      setResizing(false);
    };

    document.documentElement.addEventListener('mousemove', mouseMove);
    document.documentElement.addEventListener('mouseup', mouseUp);

    setResizing(true);
  };

  const buildResizeHandleClassname = () => {
    let returnable = 'w-2 h-full absolute transition-all';

    if (!resizing) {
      returnable +=
        ' border-r border-r-neutral-400 group-hover:border-r-2 group-hover:border-r-blue-400';
    } else {
      returnable += ` border-r-2 ws-${whitespace}`;

      if (whitespace < -8) {
        returnable += ' border-r-red-400';
      } else {
        returnable += ' border-r-blue-400';
      }
    }
    return returnable;
  };

  const buildColumnBackground = (): string => {
    const returnable = background ?? [0, 0, 0, 0];
    let color = Color.rgb(returnable);

    if (whitespace < -8) {
      color = color.mix(
        Color.rgb([255, 0, 0]),
        Math.min(0.3, Math.max(whitespace / width, -1) * -0.5) // calculate fitting opacity
      );
    }
    return color.toString();
  };

  const colContainer = React.createRef<HTMLDivElement>();

  useEffect(() => {
    setApplyWidth(false);
  }, [cells]);

  useEffect(() => {
    if (applyWidth) return;

    const newWidth = colContainer.current?.clientWidth ?? width;

    setWidth(newWidth);
    setApplyWidth(true);

    if (setColumnWidth) {
      setColumnWidth(newWidth + Math.max(0, whitespace));
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [applyWidth]);

  /**
   * Code to run when component is dissapearing
   */
  useEffect(() => {
    if (isComponentDissapearing) {
      setWidth(0);

      if (setColumnWidth) {
        setColumnWidth(-1);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isComponentDissapearing]);

  return (
    <div
      className={`relative group-1 ${resizing ? 'cursor-col-resize' : ''}`}
      style={{
        zIndex:
          totalColumns -
          columnIndex /* Allows resize padding on left and right sides */,
      }}
      ref={colContainer}
    >
      <div
        style={{
          transition: isComponentDissapearing ? '0.3s width ease' : undefined,
          visibility: isComponentDissapearing ? 'hidden' : undefined,
          width: applyWidth ? width + Math.max(whitespace, 0) : undefined,
          background: buildColumnBackground(),
        }}
        className="w-fit -ml-0 mr-0"
      >
        {cells.map((cell, idx) => {
          return (
            <p
              key={idx}
              className={`relative border-b last:border-b-0 ${
                whitespace < -8 ? 'border-b-red-400' : 'border-b-neutral-400'
              }`}
            >
              <span
                className="pl-6 py-2 pr-10 inline-block whitespace-nowrap"
                style={{
                  opacity:
                    whitespace < -8.5 // calculate fitting text opacity
                      ? Math.max(0.1, 1.25 - (whitespace / width) * -5)
                      : 1,
                }}
              >
                {cell}
              </span>
            </p>
          );
        })}
      </div>

      <span
        className={`w-8 h-full top-0 right-0 absolute -mr-6  ${
          resizing ? 'cursor-col-resize' : ''
        }`}
      >
        <span // column resizing handle, including padding
          className="w-4 cursor-col-resize h-full absolute group"
          onMouseDown={resizeMouseDown}
        >
          <span // column resizing handle left side, used to display handle
            className={`${buildResizeHandleClassname()}`}
          />
        </span>
      </span>

      {whitespace < width / -4.5 ? (
        <span
          className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-black bg-opacity-50 text-white text-center px-3 py-1 rounded w-fit animate-tooltip-appear ${''}`}
        >
          Hide Column
        </span>
      ) : (
        <></>
      )}
    </div>
  );
}
