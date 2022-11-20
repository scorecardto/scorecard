import React from "react";
import { DeletionStatus } from "../../../pages/uninstall";
import Loading from "../../core/util/Loading";

export default function DeleteDataRow(props: {
  title: string;
  description?: string;
  status: DeletionStatus;
}) {
  return (
    <div className="group">
      <div className="flex justify-between py-4 px-6 gap-4 items-center">
        <div className="">
          <p className="text-mono-l-600 dark:text-mono-d-600 font-os">
            {props.title}
          </p>
        </div>
        <div className="flex-shrink-0">
          {props.status === "PENDING" ? (
            <div>
              <Loading />
            </div>
          ) : (
            <div className="children:font-os children:py-1 children:px-3 children:rounded-md">
              {props.status === "SUCCESS" && (
                <p className="bg-accent-100 text-accent-300 dark:bg-accent-600">
                  Deleted
                </p>
              )}
              {props.status === "ERROR" && (
                <p className="bg-red-100 text-red-400 dark:bg-red-700 dark:text-white">
                  Error Deleting
                </p>
              )}
              {props.status === "WILL_NOT_DELETE" && (
                <p className="bg-accent-100 text-accent-300 dark:bg-accent-600">
                  Not Deleted
                </p>
              )}
            </div>
          )}
        </div>
      </div>
      <div className="border-b group-last:border-b-0 border-b-mono-l-300 dark:border-b-mono-d-300" />
    </div>
  );
}
