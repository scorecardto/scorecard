import axios from "axios";
import React, { ReactNode } from "react";
import { useEffect } from "react";
import { useState } from "react";
import {
  IoClose,
  IoCloseCircle,
  IoCloseCircleOutline,
  IoSadOutline,
} from "react-icons/io5";
import SearchSelect from "./SearchSelect";

export default function DistrictSearch(props: {
  value: string | undefined;
  setValue: React.Dispatch<React.SetStateAction<string | undefined>>;
}) {
  const [districts, setDistricts] = useState<any>([]);
  const [component, setComponent] = useState<ReactNode>(<></>);

  useEffect(() => {
    axios.get("/api/districts").then((value) => {
      setDistricts(value.data);
    });
  }, []);

  const districtList = districts?.districts?.filter((district: any) => {
    return district.url;
  });

  const [initial, setInitial] = useState(props.value);

  useEffect(() => {
    if (initial && districtList) {
      const district = districtList.find((district: any) => {
        return district.url == initial;
      });

      setInitial(undefined);

      if (district) {
        setComponent(
          <div className="bg-mono-l-100 dark:bg-mono-d-100 py-4 px-4 rounded-md border border-mono-l-300 dark:border-mono-d-300 flex items-center justify-between">
            <div>
              <p className="text-mono-l-600 dark:text-mono-d-600 font-os">
                {district.name}
              </p>
              <p className="text-mono-l-500 dark:text-mono-d-500 font-os">
                {district.url}
              </p>
            </div>
            <div
              className="p-1 rounded-md hover:bg-mono-l-200 dark:hover:bg-mono-d-200 mr-4 cursor-pointer"
              onClick={() => {
                props.setValue(undefined);
                setComponent(null);
              }}
            >
              <IoCloseCircle className="text-mono-l-500 dark:text-mono-d-500" />
            </div>
          </div>
        );
      } else {
        props.setValue(undefined);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initial, districtList]);

  return (
    <SearchSelect
      component={component}
      setComponent={setComponent}
      value={props.value}
      setValue={props.setValue}
      label="School District"
      placeholder="Search for your school or district"
    >
      {(search, setValue, setComponent) => {
        const districtList2 = districtList.filter((district: any) => {
          return district.name.toLowerCase().includes(search.toLowerCase());
        });

        return (
          <div className="border-b-8 border-b-mono-l-100 dark:border-b-mono-d-100">
            <div className="flex flex-col px-2 max-h-80 overflow-scroll">
              {districtList2 && districtList2.length > 0 ? (
                districtList2.map((district: any, idx: number) => {
                  return (
                    <div
                      key={idx}
                      className="pt-2 group cursor-pointer"
                      onClick={() => {
                        setValue(district.url);
                        setComponent(
                          <div className="bg-mono-l-100 dark:bg-mono-d-100 py-4 px-4 rounded-md border border-mono-l-300 dark:border-mono-d-300 flex items-center justify-between">
                            <div>
                              <p className="text-mono-l-600 dark:text-mono-d-600 font-os">
                                {district.name}
                              </p>
                              <p className="text-mono-l-500 dark:text-mono-d-500 font-os">
                                {district.url}
                              </p>
                            </div>
                            <div
                              className="p-1 rounded-md hover:bg-mono-l-200 dark:hover:bg-mono-d-200 mr-4 cursor-pointer"
                              onClick={() => {
                                setValue(undefined);
                                setComponent(null);
                              }}
                            >
                              <IoCloseCircle className="text-mono-l-500 dark:text-mono-d-500" />
                            </div>
                          </div>
                        );
                      }}
                    >
                      <div className="bg-mono-l-200 dark:bg-mono-d-200 rounded-md py-2 px-4 font-os group-hover:bg-accent-300 dark:group-hover:bg-accent-400">
                        <p className="text-mono-l-600 dark:text-mono-d-600 group-hover:text-white">
                          {district.name}
                        </p>
                        <p className="group-hover:text-mono-l-300 p">
                          {district.url}
                        </p>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="flex flex-col gap-2 items-center pt-4 pb-2">
                  <p className="text-mono-l-500 font-os">No results found</p>
                  <p className="text-mono-l-500 font-os">
                    Last updated{" "}
                    {new Date(districts?.lastUpdated).toLocaleDateString(
                      "en-US",
                      {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      }
                    )}
                  </p>
                </div>
              )}
            </div>
          </div>
        );
      }}
    </SearchSelect>
  );
}
