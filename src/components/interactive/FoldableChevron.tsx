import React from 'react';

import { motion, Variants } from 'framer-motion';
import { IoChevronForward } from 'react-icons/io5';

type IFoldableChevronProps = {
  expanded: boolean;
};

export default function FoldableChevron({ expanded }: IFoldableChevronProps) {
  const variants: Variants = {
    closed: { rotate: 0 },
    open: { rotate: 90 },
  };

  return (
    <motion.div
      className={`text-day-400 dark:text-night-400 transition-colors duration-200 ease-out p-2 rounded-full text-sm`}
      initial={false}
      animate={expanded ? 'open' : 'closed'}
      variants={variants}
    >
      <IoChevronForward />
    </motion.div>
  );
}
