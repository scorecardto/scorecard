import React, { useState } from 'react';

type TableColumnProps = {
  cells: Element[];
};

export default function TableColumn({ cells }: TableColumnProps) {
  const [width, setWidth] = useState(100);

  const resizeMouseDown = (e) => {
    const startX = e.clientX;
    const startWidth = parseInt(
      document?.defaultView?.getComputedStyle(e.target)?.width ?? '',
      10
    );

    const mouseMove = (e2) => {
      setWidth(startWidth + e2.clientX - startX);
    };

    const mouseUp = () => {
      document.documentElement.removeEventListener('mousemove', mouseMove);
      document.documentElement.removeEventListener('mouseup', mouseUp);
      // document.documentElement.addEventListener('mousedown', mouseUp);
    };

    document.documentElement.addEventListener('mousemove', mouseMove);
    document.documentElement.addEventListener('mouseup', mouseUp);
    // document.documentElement.addEventListener('mousedown', mouseUp);
  };

  return (
    <>
      <div style={{ width }}>
        {cells.map((cell, idx) => {
          return (
            <p
              className="block pl-6 py-2 pr-2 border-b border-b-gray-400 last:border-none text-base"
              key={idx}
            >
              {cell}
            </p>
          );
        })}
      </div>

      <div
        className="border-r-8 border-r-blue-400"
        onMouseDown={resizeMouseDown}
      ></div>
    </>
  );
}
