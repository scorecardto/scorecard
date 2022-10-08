import React, { useEffect, useState } from "react";

export type AppLoadState =
  | "LOADING"
  | "DONE"
  | "ERR_BROWSER"
  | "ERR_EXT_NOT_INSTALLED"
  | "ERR_EXT_VERSION";

export default function ExtensionConnector(props: {
  loadState: [AppLoadState, React.Dispatch<React.SetStateAction<AppLoadState>>];
  children: React.ReactNode;
  onMessage: (message: any, port: chrome.runtime.Port) => void;
  onConnect: (port: chrome.runtime.Port) => void;
}) {
  const EXTENSION_ID = "fkpgodekaimcnfknnkgkkdclfodblifl";
  const CURRENT_VERSION = 0.1;

  const [load, setLoad] = props.loadState;

  const connectChrome = () => {
    const port = chrome.runtime.connect(EXTENSION_ID);

    port.onMessage.addListener((msg, port) => {
      if (msg.type === "handshake") {
        if (msg.version === CURRENT_VERSION) {
          setLoad("DONE");
          props.onConnect(port);
        } else {
          setLoad("ERR_EXT_VERSION");
        }
      }

      props.onMessage(msg, port);
    });
  };

  const handleConnection = () => {
    if (window["chrome"]) {
      if (chrome.runtime && chrome.runtime["connect"]) {
        connectChrome();
      } else {
        setLoad("ERR_EXT_NOT_INSTALLED");
      }
    } else {
      setLoad("ERR_BROWSER");
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      handleConnection();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {load === "LOADING" && <p>Loading...</p>}
      {load === "ERR_BROWSER" && <p>Sorry, your browser is not compatible.</p>}
      {load === "ERR_EXT_NOT_INSTALLED" && (
        <p>Please install Scorecard to continue.</p>
      )}
      {load === "ERR_EXT_VERSION" && <p>Your Scorecard is outdated.</p>}
      {load === "DONE" && props.children}
    </>
  );
}
