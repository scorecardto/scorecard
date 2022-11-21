import React, { useEffect, useState } from "react";
import parser from "ua-parser-js";
import Image from "next/image";

export default function TestNotificationsPrompt(props: {
  done: (working: boolean) => void;
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

  const [ready, setReady] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setReady(true);
    }, 1000);

    return () => {
      clearTimeout(timeout);
    };
  }, []);

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
          <div
            className={`overflow-hidden relative select-none mx-4 ${
              isMac ? "h-24" : "h-36"
            }`}
          >
            <Image
              src={`/assets/img/notifications/${osName}-test.png`}
              alt={"Notification Example"}
              layout="fill"
              objectFit="contain"
            />
          </div>
        </div>
        <div className="w-1/2 flex flex-col justify-center gap-4 px-10">
          <h1
            className={`
${dark ? "text-white" : "text-black"} text-4xl font-bold
        `}
          >
            Did you Get This?
          </h1>
          <p className="p">
            We sent you a notification to make sure you can get them.
          </p>

          <div
            className={`children:max-w-sm children:w-full children:py-4 children:px-6 children:block children:rounded-full flex flex-col gap-4 py-4 transition-opacity ${
              ready ? "" : "opacity-50 children:cursor-default"
            }`}
          >
            <button
              className={
                dark ? "bg-accent-400 text-white" : "bg-accent-400 text-white"
              }
              onClick={() => {
                if (ready) {
                  props.done(true);
                }
              }}
            >
              I Got This
            </button>
            <button
              onClick={() => {
                if (ready) {
                  props.done(false);
                }
              }}
              className={
                dark
                  ? "bg-mono-d-400 text-mono-d-500"
                  : "bg-mono-l-500 text-mono-l-100"
              }
            >
              I Didn&apos;t Get This
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
