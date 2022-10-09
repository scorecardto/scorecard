import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { IoClose, IoCloseCircle, IoCloseCircleOutline } from "react-icons/io5";
import SearchSelect from "./SearchSelect";

export default function DistrictSearch() {
  const [districts, setDistricts] = useState<any>();

  useEffect(() => {
    axios.get("/api/districts").then((value) => {
      setDistricts(value.data);
    });
  }, []);

  return (
    <SearchSelect
      label="School or District"
      placeholder="Search for your schohol or district"
    >
      {(setValue, setComponent) => {
        return (
          <div className="flex flex-col px-2 py-1">
            {districts?.districts &&
              districts?.districts?.map((district: any, idx: number) => {
                return (
                  <div
                    key={idx}
                    className="py-1 group cursor-pointer"
                    onClick={() => {
                      setValue(district.url);
                      setComponent(
                        <div className="bg-white py-4 px-4 rounded-md border border-mono-l-300 flex items-center justify-between">
                          <div>
                            <p className="text-mono-l-600 font-os">
                              {district.name}
                            </p>
                            <p className="text-mono-l-500 font-os">
                              {district.url}
                            </p>
                          </div>
                          <div
                            className="p-1 rounded-md hover:bg-mono-l-200 mr-4 cursor-pointer"
                            onClick={() => {
                              setValue(undefined);
                              setComponent(null);
                            }}
                          >
                            <IoCloseCircle className="text-mono-l-500" />
                          </div>
                        </div>
                      );
                    }}
                  >
                    <div className="bg-mono-l-200 rounded-md py-2 px-4 font-os group-hover:bg-accent-300">
                      <p className="text-mono-l-600 group-hover:text-white">
                        {district.name}
                      </p>
                      <p className="group-hover:text-mono-l-300">
                        {district.url}
                      </p>
                    </div>
                  </div>
                );
              })}
          </div>
        );
      }}
    </SearchSelect>
  );
}
