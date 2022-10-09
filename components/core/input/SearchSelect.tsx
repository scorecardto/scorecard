import React, { useEffect, useMemo, useState } from "react";
import { IoSearchOutline } from "react-icons/io5";
import TextInput from "./TextInput";
import axios from "axios";

type setValueType = React.Dispatch<React.SetStateAction<string | undefined>>;
type setComponentType = React.Dispatch<React.SetStateAction<React.ReactNode>>;

export default function SearchSelect(props: {
  children(arg0: setValueType, arg1: setComponentType): React.ReactNode;
  label?: string;
  placeholder?: string;
}) {
  const { label, placeholder } = props;

  const [search, setSearch] = useState("");
  const [value, setValue] = useState<string | undefined>(undefined);
  const [component, setComponent] = useState<React.ReactNode>(<></>);

  let ref = React.createRef<HTMLDivElement>();

  const [displaySuggestions, setDisplaySuggestions] = useState(false);

  const onFocus = () => {
    setDisplaySuggestions(true);
  };

  useEffect(() => {
    if (displaySuggestions) {
      const handleClick = (e: any) => {
        if (e.target == null || !ref.current?.contains(e.target)) {
          setDisplaySuggestions(false);
        }
      };

      document.addEventListener("click", handleClick);
      return () => {
        document.removeEventListener("click", handleClick);
      };
    }
  }, [displaySuggestions, ref]);

  return (
    <div className="relative" ref={ref}>
      {value ? (
        <div className="flex flex-col gap-1">
          {label && <p className="font-os text-mono-l-600">{label}</p>}
          {component}
        </div>
      ) : (
        <>
          <TextInput
            label={label}
            focused={displaySuggestions}
            onFocus={onFocus}
            value={search}
            setValue={setSearch}
            placeholder={placeholder}
            icon={<IoSearchOutline className="text-mono-l-500" />}
          />
          {displaySuggestions && (
            <div className="w-full absolute z-20 bg-mono-l-100 border-mono-l-300 border rounded-md mt-2">
              {props.children(setValue, setComponent)}
            </div>
          )}
        </>
      )}
    </div>
  );
}
