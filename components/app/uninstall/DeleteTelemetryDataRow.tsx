import React from "react";
import { IoCheckmarkCircle, IoCloseCircle } from "react-icons/io5";
import { DeletionStatus } from "../../../pages/uninstall";
import Loading from "../../core/util/Loading";

export default function DeleteTelemetryDataRow(props: {
  title: string;
  status: "DONE" | "LOADING" | "WAITING" | "ERROR";
  error: string | undefined;
}) {
  return (
    <div className="group">
      <div className="flex justify-between py-4 px-6 gap-4 items-center">
        <div className="">
          <p className="text-mono-l-600 dark:text-mono-d-600 font-os">
            {props.title}
          </p>
          {props.error && <p className="font-os pt-2 p">{props.error}</p>}
        </div>
        <div className="flex-shrink-0">
          {props.status === "LOADING" && (
            <div>
              <Loading />
            </div>
          )}

          {props.status === "DONE" && (
            <div>
              <IoCheckmarkCircle className="text-accent-300 text-2xl" />
            </div>
          )}

          {props.status === "ERROR" && (
            <div>
              <IoCloseCircle className="text-red-500 text-2xl" />
            </div>
          )}

          {props.status === "WAITING" && <div></div>}
        </div>
      </div>
      <div className="border-b group-last:border-b-0 border-b-mono-l-300 dark:border-b-mono-d-300" />
    </div>
  );
}
