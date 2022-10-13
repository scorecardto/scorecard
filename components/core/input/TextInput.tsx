import React, { useRef } from "react";
import { IoCloseCircle, IoSearchOutline } from "react-icons/io5";

export default function TextInput(props: {
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  placeholder?: string;
  label?: string;
  password?: boolean;
  icon?: React.ReactNode;
  onFocus?: () => void;
  focused?: boolean;
  error?: boolean;
}) {
  const {
    value,
    setValue,
    placeholder,
    label,
    password,
    icon,
    onFocus,
    focused,
    error,
  } = props;

  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div className="flex flex-col gap-1">
      {label && (
        <p className="text-mono-l-600 dark:text-mono-d-600 font-os">{label}</p>
      )}
      <div className="relative">
        <input
          onFocus={onFocus}
          ref={inputRef}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          type={password ? "password" : "text"}
          placeholder={placeholder}
          className={`w-full border rounded-lg px-4 py-2 focus:outline-none focus:border-accent-300 transition-colors placeholder:text-mono-l-400 dark:placeholder:text-mono-d-400 font-os dark:text-mono-d-600 ${
            icon ? "pl-10 " : ""
          }${focused ? "border-accent-300 " : ""}${
            !focused && error
              ? "focus:border-mono-l-300 dark:focus:border-mono-d-300 border-red-500 "
              : ""
          }${
            !focused && !error
              ? "border-mono-l-300 dark:border-mono-d-300 "
              : ""
          }${
            error
              ? "bg-red-100 focus:bg-mono-l-100 dark:focus:bg-mono-d-100"
              : "bg-mono-l-100 dark:bg-mono-d-100"
          }`}
        />
        {icon && (
          <div className="absolute top-1/2 left-4 transform -translate-y-1/2">
            {icon}
          </div>
        )}
        {value.length > 0 && (
          <IoCloseCircle
            onClick={(e) => {
              setValue("");
              setTimeout(() => {
                inputRef.current?.focus();
              });
            }}
            className="text-mono-l-400 dark:text-mono-d-400 absolute top-1/2 -translate-y-1/2 right-4 hover:text-mono-l-500 dark:hover:text-mono-d-500 cursor-pointer"
          />
        )}
      </div>
    </div>
  );
}
