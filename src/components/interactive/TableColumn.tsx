import React, { useEffect, useState } from 'react';

type TableColumnProps = {
  cells: Element[];
};

export default function TableColumn({ cells }: TableColumnProps) {
  const [width, setWidth] = useState<number | undefined>(undefined);
  const [resizing, setResizing] = useState(false);
  const [originalWidth, setOriginalWidth] = useState(0);
  const [defaultWidth, setDefaultWidth] = useState(0);

  const resizeMouseDown = (e: any) => {
    e.preventDefault();

    const startX = e.clientX;
    const startWidth = parseInt(
      document?.defaultView?.getComputedStyle(e.target)?.width ?? '',
      10
    );

    const mouseMove = (e2: any) => {
      setWidth(
        Math.max(
          originalWidth + 1,
          defaultWidth + startWidth + e2.clientX - startX
        )
      );
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

  const col = React.createRef<HTMLDivElement>();

  useEffect(() => {
    setOriginalWidth(col?.current?.clientWidth ?? 0);
  }, []);

  useEffect(() => {
    setDefaultWidth(col?.current?.clientWidth ?? 0);
  }, [col]);

  return (
    <>
      <div style={{ width }} ref={col}>
        {cells.map((cell, idx) => {
          return (
            <p
              className="block text-base relative border-b border-b-gray-400 last:border-none"
              key={idx}
            >
              <span className="pl-6 py-2 pr-2 inline-block ">{cell}</span>
              <span
                className="w-1 h-full absolute right-1 cursor-col-resize"
                onMouseDown={resizeMouseDown}
              ></span>
              <span
                className={`w-1 h-full absolute right-0 ${
                  resizing ? 'border-l-2' : 'border-l'
                } border-l-gray-400 cursor-col-resize`}
                onMouseDown={resizeMouseDown}
              ></span>
            </p>
          );
        })}
      </div>
    </>
  );
}
