import React, { createContext, useContext, useEffect, useState } from "react";
import { Settings, SettingsContext } from "scorecard-types";

export type AppLoadState =
  | "LOADING"
  | "DONE"
  | "ERR_BROWSER"
  | "ERR_EXT_NOT_INSTALLED"
  | "ERR_EXT_VERSION";

export const PortContext = createContext<PortContextProvider>({
  port: null,
});

export interface PortContextProvider {
  port: chrome.runtime.Port | null;
}

export default function ExtensionConnector(props: {
  loadState: [AppLoadState, React.Dispatch<React.SetStateAction<AppLoadState>>];
  children: React.ReactNode;
  onMessage: (message: any, port: chrome.runtime.Port) => void;
  onConnect: (port: chrome.runtime.Port) => void;
}) {
  const [port, setPort] = useState<chrome.runtime.Port | null>(null);

  const settingsContext = useContext(SettingsContext);

  const CURRENT_VERSION = 0.1;

  const [load, setLoad] = props.loadState;

  const connectChrome = () => {
    const EXTENSION_ID =
      (document.cookie.includes("EXT_ID=") &&
        decodeURIComponent(document.cookie)
          .split("EXT_ID=")[1]
          .split(";")[0]) ||
      "fkpgodekaimcnfknnkgkkdclfodblifl";

    const port = chrome.runtime.connect(EXTENSION_ID);

    port.onDisconnect.addListener(() => {
      location.reload();
    });

    setPort(port);

    port.onMessage.addListener((msg, port) => {
      if (msg.type === "handshake") {
        if (msg.version === CURRENT_VERSION) {
          setLoad("DONE");
          props.onConnect(port);
        } else {
          setLoad("ERR_EXT_VERSION");
        }
      } else if (msg.type === "setSettings") {
        const settings: Settings = msg.settings;

        settingsContext.setLoaded(true);

        if (settings?.appearance) {
          settingsContext.setAppearance(settings?.appearance);
        }
        if (settings?.accentColor) {
          settingsContext.setAccentColor(settings?.accentColor);
        }
        if (settings?.spoilerMode) {
          settingsContext.setSpoilerMode(settings?.spoilerMode);
        }
        if (settings?.checkGradesInterval) {
          settingsContext.setCheckGradesInterval(settings?.checkGradesInterval);
        }
        if (settings?.usePushNotifications) {
          settingsContext.setUsePushNotifications(
            settings?.usePushNotifications
          );
        }
        if (settings?.deleteNotificationsAfter) {
          settingsContext.setDeleteNotificationsAfter(
            settings?.deleteNotificationsAfter
          );
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

  useEffect(() => {
    if (load === "DONE") {
      port?.postMessage({ type: "requestSettings" });
    }
  }, [load, port]);

  return (
    <>
      {load === "LOADING" && <p>Loading...</p>}
      {load === "ERR_BROWSER" && <p>Sorry, your browser is not compatible.</p>}
      {load === "ERR_EXT_NOT_INSTALLED" && (
        <p>Please install Scorecard to continue.</p>
      )}
      {load === "ERR_EXT_VERSION" && <p>Your Scorecard is outdated.</p>}
      {load === "DONE" && (
        <PortContext.Provider value={{ port }}>
          {props.children}
        </PortContext.Provider>
      )}
    </>
  );
}
