import React from 'react';

import { IoPencil } from 'react-icons/io5';

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
  const handleRename = () => {
    if (!editingEnabled) return;

    const renamed = prompt('Rename');

    if (renamed) {
      setName(renamed);
    }
  };

  return (
    <div className={`_renameable flex flex-row`}>
      <p className="mr-4">{children}</p>
      <div
        className={`flex gap-1 transition-opacity-transform ${
          editingEnabled ? 'opacity-100' : 'opacity-0 scale-50'
        }`}
      >
        <button
          onClick={handleRename}
          className={`bg-theme-200 text-day-100 w-6 h-6 flex items-center justify-center align-middle text-sm rounded-lg`}
        >
          <IoPencil />
        </button>
      </div>
    </div>
  );
}
