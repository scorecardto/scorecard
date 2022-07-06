import type { NextPage } from "next";
import { useEffect, useState } from "react";

type AppLoadState =
  | "LOADING"
  | "DONE"
  | "ERR_BROWSER"
  | "ERR_EXT_NOT_INSTALLED"
  | "ERR_EXT_VERSION";

const App: NextPage = () => {
  const [data, setData] = useState(undefined);

  const [loadState, setLoadState] = useState<AppLoadState>("LOADING");

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (window["chrome"] && chrome.runtime?.["sendMessage"]) {
        chrome.runtime.sendMessage(
          "fkpgodekaimcnfknnkgkkdclfodblifl",
          { type: "getData" },
          (response) => {
            if (response.version === "0.1") {
              setData(response.data);
              setLoadState("DONE");
            } else {
              setLoadState("ERR_EXT_VERSION");
            }
          }
        );
      } else {
        setLoadState("ERR_BROWSER");
      }
    }
  }, []);

  return (
    <div>
      {loadState === "LOADING" && <p>Loading...</p>}
      {loadState === "ERR_BROWSER" && (
        <p>Sorry, your browser is not compatible.</p>
      )}
      {loadState === "ERR_EXT_NOT_INSTALLED" && (
        <p>Please install Scorecard to continue.</p>
      )}
      {loadState === "ERR_EXT_VERSION" && <p>Your Scorecard is outdated.</p>}
    </div>
  );
};

export default App;
