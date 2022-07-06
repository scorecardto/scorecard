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
    console.log("/app route loaded");
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (window["chrome"]) {
        if (chrome.runtime?.["sendMessage"]) {
          const port = chrome.runtime.connect(
            "fkpgodekaimcnfknnkgkkdclfodblifl"
          );
          console.log(port);
        } else {
          setLoadState("ERR_EXT_NOT_INSTALLED");
        }
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
