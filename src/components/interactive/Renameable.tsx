import React, { useEffect, useState } from 'react';

import { motion } from 'framer-motion';
import { IoCheckmarkSharp, IoPencil } from 'react-icons/io5';

type IRenameableProps = {
  children: string;
  setName(arg0: string): void;
  editingEnabled: boolean;
};

export default function Renameable({
  children,
  setName,
  editingEnabled,
}: IRenameableProps) {
  const [currentlyEditing, setCurrentlyEditing] = useState(false);

  const editable = React.createRef<HTMLInputElement>();
  const widthRef = React.createRef<HTMLDivElement>();

  const handleEditButton = () => {
    if (!editingEnabled) return;

    if (currentlyEditing) {
      setName(editable.current?.textContent || children);
    }
    setCurrentlyEditing(!currentlyEditing);
  };

  const [input, setInput] = useState(children);
  const [inputMaxWidth, setInputMaxWidth] = useState<number | undefined>(0);

  useEffect(() => {
    const w = widthRef.current?.clientWidth;
    setInputMaxWidth(w ? w + 0 : undefined);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [input]);

  return (
    <div
      className={`_renameable flex flex-row cursor-auto items-center w-fit mr-0`}
    >
      <div className="relative">
        <p className="absolute top-0 left-0 invisible" ref={widthRef}>
          {input}
        </p>

        <input
          style={{ maxWidth: inputMaxWidth }}
          className={`mr-4 outline-none transition-background-padding duration-300 rounded-md resize-none h-8 w-fit box-content ${
            currentlyEditing
              ? 'bg-theme-100 dark:bg-night-150 px-2'
              : 'bg-transparent'
          }`}
          disabled={!currentlyEditing}
          ref={editable}
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
          }}
        />
      </div>

      <div
        className={`flex gap-1 transition-opacity-transform ${
          editingEnabled ? 'opacity-100' : 'opacity-0 scale-50'
        }`}
      >
        <button
          onClick={handleEditButton}
          className={`bg-theme-200 text-day-100 w-6 h-6 flex items-center justify-center align-middle text-sm rounded-lg`}
        >
          {currentlyEditing ? (
            <motion.div
              initial={{ rotate: 180 }}
              animate={{ rotate: 360 }}
              transition={{ duration: 0.7, type: 'spring' }}
            >
              <IoCheckmarkSharp />
            </motion.div>
          ) : (
            <IoPencil />
          )}
        </button>
      </div>
    </div>
  );
}
