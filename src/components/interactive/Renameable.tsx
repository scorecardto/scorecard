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

  const editable = React.createRef<HTMLLabelElement>();
  const widthRef = React.createRef<HTMLDivElement>();

  const [input, setInput] = useState(children);

  const handleEditButton = () => {
    if (!editingEnabled) return;

    if (currentlyEditing) {
      setName(input || children);

      if (!input) {
        setInput(children);
      }
    }
    setCurrentlyEditing(!currentlyEditing);
  };

  const [inputMaxWidth, setInputMaxWidth] = useState<number | undefined>(0);

  useEffect(() => {
    const w = widthRef.current?.clientWidth;
    setInputMaxWidth(w ? w + 0 : undefined);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [input]);

  useEffect(() => {
    if (currentlyEditing) {
      editable.current?.focus();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentlyEditing]);

  useEffect(() => {
    if (!editingEnabled && currentlyEditing) {
      setName(input || children);
      setCurrentlyEditing(false);

      if (!input) {
        setInput(children);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editingEnabled]);

  const [ready, setReady] = useState(false);

  useEffect(() => {
    const w = widthRef.current?.clientWidth;
    setInputMaxWidth(w ? w + 0 : undefined);
    setReady(true);
  }, [widthRef]);

  useEffect(() => {
    setInput(children);
  }, [children]);

  return (
    <div
      className={`_renameable flex flex-row cursor-auto items-center w-fit mr-0`}
    >
      {ready ? (
        <div className="relative">
          <p
            className="absolute top-0 left-0 invisible whitespace-pre"
            ref={widthRef}
          >
            {input || children}
          </p>
          <label ref={editable}>
            <input
              style={{ maxWidth: inputMaxWidth }}
              className={`mr-4 outline-none transition-background-padding duration-300 rounded-md resize-none h-8 w-fit box-content ${
                currentlyEditing
                  ? 'bg-theme-100 dark:bg-night-250 px-2'
                  : 'bg-transparent'
              }`}
              autoFocus
              disabled={!currentlyEditing}
              value={input}
              onChange={(e) => {
                setInput(e.target.value);
              }}
              placeholder={children}
              maxLength={28}
            />
          </label>
        </div>
      ) : (
        <p className="mr-4 h-8 flex items-center" ref={widthRef}>
          <span>{input}</span>
        </p>
      )}

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
