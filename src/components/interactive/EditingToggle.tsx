import React from 'react';

import { IoOptions } from 'react-icons/io5';

import StaticCard from '../card/StaticCard';
import AnimateMyWidth from '../util/AnimateMyWidth';

type EditingToggleProps = {
  editing: boolean;
  setEditing: React.Dispatch<React.SetStateAction<boolean>>;
  textStart?: string;
  textDone?: string;
};

export default function EditingToggle({
  editing,
  setEditing,
  textStart,
  textDone,
}: EditingToggleProps) {
  return (
    <div className={`${editing ? 'mt-4' : 'mt-2'} transition-all h-fit`}>
      <AnimateMyWidth>
        {editing ? (
          <StaticCard
            colored={true}
            onClick={() => {
              setEditing(!editing);
            }}
            icon={<IoOptions />}
          >
            {textDone ?? 'Done'}
          </StaticCard>
        ) : (
          <StaticCard
            colored={true}
            icon={<IoOptions />}
            onClick={() => {
              setEditing(!editing);
            }}
          >
            {textStart ?? 'Edit'}
          </StaticCard>
        )}
      </AnimateMyWidth>
    </div>
  );
}
