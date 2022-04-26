import React, { useEffect } from 'react';

export type ContextMenuState = 'CLOSED' | 'CLOSING' | 'OPEN' | 'OPENING';

type IContextMenuProps = {
  children: JSX.Element;
  shown: ContextMenuState;
  setShown: React.Dispatch<React.SetStateAction<ContextMenuState>>;
  transformOrigin: 'TR' | 'BR' | 'TL' | 'BL';
};

export default function ContextMenu({
  children,
  shown,
  setShown,
  transformOrigin,
}: IContextMenuProps) {
  useEffect(() => {
    if (shown === 'OPENING') {
      setShown('OPEN');
    }
    if (shown === 'OPEN') {
      const onClick = () => {
        setShown('CLOSING');
      };

      document.addEventListener('click', onClick);

      return () => {
        document.removeEventListener('click', onClick);
      };
    }
    if (shown === 'CLOSING') {
      setTimeout(() => {
        setShown('CLOSED');
      }, 200);
    }
    return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shown]);

  return (
    <div
      className={`_TAssignmentOptions absolute pb-2 bg-day-100 dark:bg-night-100 border border-day-300 dark:border-night-300 z-10 transition-opacity-transform duration-200 ${(() => {
        if (transformOrigin === 'TL') return 'origin-top-left';
        if (transformOrigin === 'TR') return 'origin-top-right';
        if (transformOrigin === 'BL') return 'origin-bottom-left';
        return 'origin-bottom-right';
      })()} right-0 top-6 rounded-md text-day-400 dark:text-night-400 ${
        shown === 'CLOSED' ? 'hidden' : ''
      } ${shown !== 'OPEN' ? 'scale-75 opacity-0' : ''}`}
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      {children}
    </div>
  );
}
