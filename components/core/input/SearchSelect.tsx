import React, { useEffect, useMemo, useState } from "react";
import { IoSearchOutline } from "react-icons/io5";
import TextInput from "./TextInput";
import axios from "axios";

type setValueType = React.Dispatch<React.SetStateAction<string | undefined>>;
type setComponentType = React.Dispatch<React.SetStateAction<React.ReactNode>>;

export default function SearchSelect(props: {
  children(
    arg0: string,
    arg1: setValueType,
    arg2: setComponentType
  ): React.ReactNode;
  label?: string;
  placeholder?: string;
  value: string | undefined;
  setValue: setValueType;
  component: React.ReactNode;
  setComponent: setComponentType;
}) {
  const { label, placeholder, value, setValue, component, setComponent } =
    props;

  const [search, setSearch] = useState("");

  let ref = React.createRef<HTMLDivElement>();

  const [displaySuggestions, setDisplaySuggestions] = useState(false);

  const onFocus = () => {
    setError(false);
    setDisplaySuggestions(true);
  };

  const [error, setError] = useState(false);

  useEffect(() => {
    if (displaySuggestions) {
      const handleClick = (e: any) => {
        if (e.target == null || !ref.current?.contains(e.target)) {
          if (search) {
            setError(true);
          }
          setDisplaySuggestions(false);
        }
      };

      document.addEventListener("click", handleClick);
      return () => {
        document.removeEventListener("click", handleClick);
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [displaySuggestions, ref]);

  return (
    <div className="relative" ref={ref}>
      {value ? (
        <div className="flex flex-col gap-1">
          {label && (
            <p className="font-os text-mono-l-600 dark:text-mono-d-600">
              {label}
            </p>
          )}
          {component}
        </div>
      ) : (
        <>
          <TextInput
            error={error}
            label={label}
            focused={displaySuggestions}
            onFocus={onFocus}
            value={search}
            setValue={setSearch}
            placeholder={placeholder}
            icon={
              <IoSearchOutline
                className={"text-mono-l-500 dark:text-mono-d-500"}
              />
            }
          />
          {displaySuggestions && (
            <div className="w-full absolute z-20 bg-mono-l-100 dark:bg-mono-d-100 border-mono-l-300 dark:border-mono-d-300 border rounded-md mt-2 overflow-hidden">
              {props.children(search, setValue, setComponent)}
            </div>
          )}
        </>
      )}
    </div>
  );
}
