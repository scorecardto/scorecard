import React, { useEffect, useState } from 'react';

type TableColumnProps = {
  cells: Element[];
  columnIndex: number;
  totalColumns: number;
  setColumnWidth?: SetColumnWidthsFunc;
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
}: TableColumnProps) {
  /**
   * Minumum width of the column
   */
  const [width, setWidth] = useState(0);

  /**
   * Whitespace added to the column
   * = current width - minimum width
   */
  const [whitespace, setWhitespace] = useState(0);

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
      const newWhitespace = Math.max(0, whitespace + e2.clientX - e.clientX);

      // update whitespace
      setWhitespace(newWhitespace);

      // update column width
      if (setColumnWidth) {
        setColumnWidth(width + newWhitespace - (columnIndex === 0 ? 32 : 8));
      }
    };

    /**
     * Called when the mouse is lifted during the resizing process, indicating that the user is done resizing.
     */
    const mouseUp = () => {
      setResizing(false);
      // remove event listeners only used during the resizing process.
      document.documentElement.removeEventListener('mousemove', mouseMove);
      document.documentElement.removeEventListener('mouseup', mouseUp);
    };

    document.documentElement.addEventListener('mousemove', mouseMove);
    document.documentElement.addEventListener('mouseup', mouseUp);

    setResizing(true);
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
      setColumnWidth(newWidth + whitespace - (columnIndex === 0 ? 32 : 8));
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [applyWidth]);

  return (
    <div
      className="relative group-1"
      style={{
        zIndex:
          totalColumns -
          columnIndex /* Allows resize padding on left and right sides */,
      }}
      ref={colContainer}
    >
      <div
        style={{ width: applyWidth ? width + whitespace : undefined }}
        className="w-fit mr-4 -ml-6 group-1-last:mr-0"
      >
        {cells.map((cell, idx) => {
          return (
            <p
              key={idx}
              className="relative border-b border-b-gray-400 last:border-b-0"
            >
              <span className="pl-6 py-2 pr-10 inline-block whitespace-nowrap">
                {cell}
              </span>
            </p>
          );
        })}
      </div>

      <span
        className={`w-8 h-full top-0 right-0 absolute group-1-last:-mr-6  ${
          resizing ? 'cursor-col-resize' : ''
        }`}
      >
        <span // column resizing handle, including padding
          className="w-4 cursor-col-resize h-full absolute group"
          onMouseDown={resizeMouseDown}
        >
          <span // column resizing handle left side, used to display handle
            className={`${
              resizing
                ? 'border-r-2 border-r-blue-400'
                : 'border-r border-r-gray-400 group-hover:border-r-2 group-hover:border-r-blue-400'
            } w-2 h-full absolute transition-all`}
          />
        </span>
      </span>
    </div>
  );
}
