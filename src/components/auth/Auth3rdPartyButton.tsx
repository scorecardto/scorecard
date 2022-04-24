import React, { useState } from 'react';

type IAuth3rdPartyButtonProps = {
  children: JSX.Element;
  label: string;
  backgroundColor: string;
  dark: string;
  onClick(): void;
};

export default function Auth3rdPartyButton({
  children,
  label,
  backgroundColor,
  dark,
  onClick,
}: IAuth3rdPartyButtonProps) {
  const [hover, setHover] = useState(false);
  return (
    <span className="_auth-3rd-party-button block">
      <button
        onClick={onClick}
        style={{
          backgroundColor: hover ? dark : backgroundColor,
          borderColor: dark,
        }}
        onMouseOver={() => {
          setHover(true);
        }}
        onMouseOut={() => {
          setHover(false);
        }}
        className="flex items-center gap-4 text-white py-2 px-3 rounded-md w-72 cursor-pointer border duration-200"
      >
        <div>{children}</div>
        <div>{label}</div>
      </button>
    </span>
  );
}
