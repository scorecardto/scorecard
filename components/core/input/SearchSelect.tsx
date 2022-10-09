import React, { useState } from "react";
import { IoSearchOutline } from "react-icons/io5";
import TextInput from "./TextInput";

export default function SearchSelect() {
  const [search, setSearch] = useState("");
  return (
    <div>
      <TextInput
        value={search}
        setValue={setSearch}
        placeholder="Search for your school or district"
        icon={<IoSearchOutline className="text-mono-l-500" />}
      />
    </div>
  );
}
