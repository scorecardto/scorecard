import React, { useEffect, useState } from 'react';

type TableColumnProps = {
  cells: Element[];
  columnIndex: number;
  totalColumns: number;
};

export default function TableColumn({
  cells,
  columnIndex,
  totalColumns,
}: TableColumnProps) {
  const [width, setWidth] = useState(0);
  const [whitespace, setWhitespace] = useState(0);

  const [resizing, setResizing] = useState(false);
  const [applyWhitespace, setApplyWhitespace] = useState(false);

  const resizeMouseDown = (e: any) => {
    e.preventDefault();

    const mouseMove = (e2: any) => {
      setWhitespace(Math.max(0, whitespace + e2.clientX - e.clientX));
    };

    const mouseUp = () => {
      setResizing(false);
      document.documentElement.removeEventListener('mousemove', mouseMove);
      document.documentElement.removeEventListener('mouseup', mouseUp);
    };

    document.documentElement.addEventListener('mousemove', mouseMove);
    document.documentElement.addEventListener('mouseup', mouseUp);

    setResizing(true);
  };

  const colContainer = React.createRef<HTMLDivElement>();

  useEffect(() => {
    setApplyWhitespace(false);
  }, [cells]);

  useEffect(() => {
    if (applyWhitespace) return;

    setWidth(colContainer.current?.clientWidth ?? width);
    setApplyWhitespace(true);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [applyWhitespace]);

  return (
    <div
      className="relative group-one"
      style={{ zIndex: totalColumns - columnIndex }}
      ref={colContainer}
    >
      <div
        style={{ width: applyWhitespace ? width + whitespace : undefined }}
        className="w-fit mr-4 -ml-6 group-one-last:mr-0"
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
        className={`w-8 h-full top-0 right-0 absolute group-one-last:-mr-6  ${
          resizing ? 'cursor-col-resize' : ''
        }`}
      >
        <span
          className="w-4 cursor-col-resize h-full absolute group"
          onMouseDown={resizeMouseDown}
        >
          <span
            className={`${
              resizing
                ? 'border-r-2 border-r-blue-400'
                : 'border-r border-r-gray-400 group-hover:border-r-2 group-hover:border-r-blue-400'
            } w-2 h-full absolute transition-all`}
          ></span>
        </span>
      </span>
    </div>
  );
}
