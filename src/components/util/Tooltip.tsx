import React from 'react';

type Props = {
  message: string;
  shown: boolean;
};

export default function Tooltip({ message, shown }: Props) {
  return shown ? (
    <span className="relative bg-black bg-opacity-50 text-white text-center px-3 py-1 rounded w-fit animate-tooltip-appear whitespace-nowrap block">
      {message}
    </span>
  ) : (
    <></>
  );
}
