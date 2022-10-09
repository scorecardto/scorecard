import React, { useRef } from "react";
import { IoCloseCircle } from "react-icons/io5";

export default function TextInput(props: {
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  placeholder?: string;
  label?: string;
  password?: boolean;
}) {
  const { value, setValue, placeholder, label, password } = props;

  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div className="flex flex-col gap-1">
      {label && <p className="text-mono-l-600 font-os">{label}</p>}
      <div className="relative">
        <input
          ref={inputRef}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          type={password ? "password" : "text"}
          placeholder={placeholder}
          className="w-full bg-mono-l-100 border border-mono-l-300 rounded-lg px-4 py-2 focus:outline-none focus:border-accent-300 transition-colors placeholder:text-mono-l-400 font-os"
        />
        {value.length > 0 && (
          <IoCloseCircle
            onClick={(e) => {
              setValue("");
              inputRef.current?.focus();
            }}
            className="text-mono-l-400 absolute top-1/2 -translate-y-1/2 right-4 hover:text-mono-l-500 cursor-pointer"
          />
        )}
      </div>
    </div>
  );
}
