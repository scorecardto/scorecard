import type { NextPage } from "next";
import { useContext, useEffect, useState } from "react";
import { Course, DataContext } from "scorecard-types";
import Setup from "../../components/app/setup/Setup";
import Summary from "../../components/app/Summary";
import ExtensionConnector, {
  AppLoadState,
} from "../../components/core/ExtensionConnector";
import { SetupContext } from "../../components/core/context/SetupContext";

const Login: NextPage = () => {
  const loadState = useState<AppLoadState>("LOADING");

  const [port, setPort] = useState<chrome.runtime.Port | null>(null);

  const onConnect = (port: chrome.runtime.Port) => {
    setPort(port);
  };

  const onMessage = (msg: any, port: chrome.runtime.Port) => {};

  function checkSetup(
    host: string,
    username: string,
    password?: string
  ): Promise<string> {
    return new Promise((resolve, reject) => {
      if (port) {
        port.postMessage({
          type: "requestLoginValidation",
          host,
          username,
          password,
        });

        const listener = (message: any) => {
          if (message.type === "validLoginResponse") {
            resolve(message.result);
            port.onMessage.removeListener(listener);
          }
        };

        port.onMessage.addListener(listener);
      } else {
        resolve("NO_PORT");
      }
    });
  }

  return (
    <ExtensionConnector
      onMessage={onMessage}
      loadState={loadState}
      onConnect={onConnect}
    >
      <Setup checkSetup={checkSetup} />
    </ExtensionConnector>
  );
};

export default Login;
