import React, { useEffect, useState } from 'react';

import StaticCard from './StaticCard';

type ISelectorCardProps = {
  children: string;
  icon?: JSX.Element;
  selectedIcon?: JSX.Element;
  cardIcon?: JSX.Element;
};

export default function SelectorCard({
  children,
  icon,
  selectedIcon,
  cardIcon,
}: ISelectorCardProps) {
  const options = [
    '1st Nine Weeks',
    '2nd Nine Weeks',
    'Fall Final',
    'Fall Average',
  ];

  const [open, setOpened] = useState(false);

  useEffect(() => {
    if (open) {
      const listen = () => {
        setOpened(false);
      };

      document.addEventListener('click', listen);

      return () => {
        document.removeEventListener('click', listen);
      };
    }

    return () => {};
  }, [open]);

  return (
    <div className="_selector-card">
      <StaticCard
        colored={true}
        icon={cardIcon ?? icon}
        onClick={(e) => {
          setOpened(!open);
          e.stopPropagation();
        }}
      >
        {children}
      </StaticCard>
      <div
        className={`_seletor-selector absolute bg-day-100 dark:bg-night-100 right-0 border border-day-300 dark:border-night-300 rounded-md text-day-400 dark:text-day-400 overflow-hidden mt-2 transition-all origin-top-right duration-200 ${
          !open ? 'scale-75 opacity-0' : ''
        }`}
      >
        {options.map((opt, idx) => {
          const selected = idx === 0;

          return (
            <div
              className={`_selector-option transition-colors ${
                selected
                  ? 'bg-theme-100 dark:bg-theme-200 text-theme-200 dark:text-theme-100'
                  : 'hover:bg-day-150 hover:dark:bg-night-150'
              } py-2 pl-4 pr-10 cursor-pointer flex`}
              key={idx}
            >
              {selectedIcon != null && selected ? selectedIcon : icon ?? <></>}
              <p>{opt}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
