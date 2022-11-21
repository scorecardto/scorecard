import React, { useContext, useState } from "react";
import parser from "ua-parser-js";
import Image from "next/image";
import { PortContext } from "../../core/ExtensionConnector";

export default function TroubleshootNotifications(props: {
  done: (tryAgain: boolean) => void;
}) {
  // code to use ua-parser-js to get windows, mac, or chrome os
  const ua = parser();

  const isWindows = ua.os.name === "Windows";

  const dark = isWindows;

  const port = useContext(PortContext);
  return (
    <div
      className={`w-full h-full ${dark ? "bg-accent-800" : "bg-accent-100"}`}
    >
      <div className="h-full flex justify-center items-center px-10">
        <div className="flex flex-col gap-4 w-2/3">
          <h1
            className={`
${dark ? "text-white" : "text-black"} text-4xl font-bold
        `}
          >
            Notifications are Disabled by Your Device.
          </h1>
          <p className="p">
            Notifications are disabled by your device, meaning your browser
            cannot send you notifications. To enable notifications, you must
            enable them in your device settings.
          </p>
          <p className="p">
            Once you do this, you&apos;ll automatically recieve notifications.
          </p>

          <div className="children:max-w-sm children:w-full children:py-4 children:px-6 children:block children:rounded-full flex flex-col gap-4 py-4">
            <button
              className={
                dark ? "bg-accent-400 text-white" : "bg-accent-400 text-white"
              }
              onClick={() => {
                props.done(false);
              }}
            >
              Done
            </button>
            <button
              className={
                dark ? "bg-accent-400 text-white" : "bg-accent-400 text-white"
              }
              onClick={() => {
                port.port?.postMessage({
                  type: "enableNotifications",
                });
                props.done(true);
              }}
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
