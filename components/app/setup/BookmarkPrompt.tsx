import React, { useContext } from "react";
import { PortContext } from "../../core/ExtensionConnector";

export default function BookmarkPrompt(props: {
  done: (enabled: boolean) => void;
}) {
  const port = useContext(PortContext);
  return (
    <div className={`w-full h-full bg-accent-100`}>
      <div className="h-full flex justify-center items-center px-10">
        <div className="flex flex-col gap-4 w-2/3">
          <h1
            className={`text-block text-4xl font-bold
        `}
          >
            This is Your Scorecard.
          </h1>
          <p className="p">
            Instead of going to Frontline, you can now access your grades from
            here, without having to log in or wait for the page to load. Your
            grades are automatically kept in sync with Frontline. Would you like
            to add this page to your bookmarks?
          </p>

          <div className="children:max-w-sm children:w-full children:py-4 children:px-6 children:block children:rounded-full flex flex-col gap-4 py-4">
            <button
              className={"bg-accent-400 text-white"}
              onClick={() => {
                port.port?.postMessage({
                  type: "addBookmark",
                });
                props.done(true);
              }}
            >
              Continue
            </button>
            <button
              className={"bg-mono-l-500 text-mono-l-100"}
              onClick={() => {
                props.done(true);
              }}
            >
              Don&apos;t Add
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
