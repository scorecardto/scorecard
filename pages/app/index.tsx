import type { NextPage } from "next";
import { useEffect, useState } from "react";
import { Course } from "scorecard-types";
import Summary from "../../components/app/Summary";

type AppLoadState =
  | "LOADING"
  | "DONE"
  | "ERR_BROWSER"
  | "ERR_EXT_NOT_INSTALLED"
  | "ERR_EXT_VERSION";

const EXTENSION_ID = "fkpgodekaimcnfknnkgkkdclfodblifl";

const App: NextPage = () => {
  const [loadState, setLoadState] = useState<AppLoadState>("LOADING");

  const [courses, setCourses] = useState<Course[] | undefined>(undefined);

  const connectChrome = () => {
    const port = chrome.runtime.connect(EXTENSION_ID);

    console.log(port.sender);

    port.onMessage.addListener((msg) => {
      if (msg.type === "handshake") {
        if (msg.version === 0.1) {
          setLoadState("DONE");
        } else {
          setLoadState("ERR_EXT_VERSION");
        }
      } else if (msg.type === "setCourses") {
        setCourses(msg.courses);
      }
    });
  };

  const handleConnection = () => {
    if (window["chrome"]) {
      if (chrome.runtime && chrome.runtime["connect"]) {
        connectChrome();
      } else {
        setLoadState("ERR_EXT_NOT_INSTALLED");
      }
    } else {
      setLoadState("ERR_BROWSER");
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      handleConnection();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
      {loadState === "DONE" && <Summary />}
    </div>
  );
};

export default App;
