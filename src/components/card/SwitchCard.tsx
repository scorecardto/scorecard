import React from 'react';

import { motion } from 'framer-motion';

import { ClickEventCallback } from '../../lib/CommonCallbacks';

type IIconCardProps = {
  children: string | Element;
  colored: boolean;
  onClick?: ClickEventCallback;
};

export default function IconCard({
  children,
  onClick,
  colored,
}: IIconCardProps) {
  return (
    <motion.div
      initial={{ translateY: 0 }}
      whileHover={colored ? {} : { translateY: -4 }}
      transition={{
        type: 'spring',
        stiffness: 260,
        damping: 20,
      }}
      className={`_switch-card ${
        colored
          ? 'bg-theme-100 text-theme-200 dark:bg-theme-200 dark:text-theme-100'
          : 'bg-day-600 text-day-500 dark:bg-night-600 dark:text-night-500'
      }  w-fit px-3 py-1 rounded-md transition-colors cursor-pointer font-normal text-lg mt-1 whitespace-nowrap overflow-hidden text-ellipsis`}
      onClick={onClick}
    >
      {children}
    </motion.div>
  );
}
