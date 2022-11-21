import React, { useContext, useState } from "react";
import parser from "ua-parser-js";
import Image from "next/image";
import { PortContext } from "../../core/ExtensionConnector";

export default function NotificationsPrompt(props: {
  done: (enabled: boolean) => void;
}) {
  // code to use ua-parser-js to get windows, mac, or chrome os
  const ua = parser();

  const isWindows = ua.os.name === "Windows";
  const isMac = ua.os.name === "Mac OS";
  const isChromeOS = ua.os.name === "Chromium OS";

  const dark = isWindows;

  const CAROUSEL_LENGTH = 3;

  const osName = isWindows ? "win" : isChromeOS ? "chrome" : "mac";

  const [carousel, setCarousel] = useState(0);

  const port = useContext(PortContext);

  return (
    <div
      className={`w-full h-full ${dark ? "bg-accent-800" : "bg-accent-100"}`}
    >
      <div className="flex gap-8 h-full">
        <div
          className={`flex flex-col gap-4 w-1/2 h-full relative justify-center`}
        >
          <div
            className={`absolute w-full h-full ${"from-accent-400 to-accent-500 bg-gradient-to-tr"} opacity-25`}
          />
          {Array(CAROUSEL_LENGTH)
            .fill(0)
            .map((_, i) => (
              <div
                key={i}
                className={`overflow-hidden relative select-none mx-4 ${
                  isMac ? "h-24" : "h-36"
                }`}
              >
                <Image
                  src={`/assets/img/notifications/${osName}-1.png`}
                  alt={"Notification Example"}
                  layout="fill"
                  objectFit="contain"
                />
              </div>
            ))}
        </div>
        <div className="w-1/2 flex flex-col justify-center gap-4 px-10">
          <h1
            className={`
${dark ? "text-white" : "text-black"} text-4xl font-bold
        `}
          >
            Notifications
          </h1>
          <p className="p">
            Want Scorecard to notify you of new grades and assignments? You can
            change your mind later in settings.
          </p>

          <div className="children:max-w-sm children:w-full children:py-4 children:px-6 children:block children:rounded-full flex flex-col gap-4 py-4">
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
              Enable Notifications
            </button>
            <button
              className={
                dark
                  ? "bg-mono-d-400 text-mono-d-500"
                  : "bg-mono-l-500 text-mono-l-100"
              }
              onClick={() => props.done(false)}
            >
              Maybe Later
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
