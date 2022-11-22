import type { NextPage } from "next";
import { useContext, useEffect, useState } from "react";
import { Course, DataContext } from "scorecard-types";
import Setup from "../../components/app/setup/Setup";
import Summary from "../../components/app/Summary";
import ExtensionConnector, {
  AppLoadState,
} from "../../components/core/ExtensionConnector";
import { SetupContext } from "../../components/core/context/SetupContext";
import { useRouter } from "next/router";
import { NextSeo } from "next-seo";

const Login: NextPage = () => {
  const router = useRouter();

  const loadState = useState<AppLoadState>("LOADING");

  const [port, setPort] = useState<chrome.runtime.Port | null>(null);

  const onConnect = (port: chrome.runtime.Port) => {
    port.postMessage({ type: "requestSetup" });
    setPort(port);
  };

  const onMessage = (msg: any, port: chrome.runtime.Port) => {
    if (msg.type === "setSetup") {
      if (
        msg.setup &&
        msg.setup.host &&
        msg.setup.username &&
        msg.setup.hasPassword
      ) {
        const districtParam = new URLSearchParams(window.location.search).get(
          "district"
        );
        const usernameParam = new URLSearchParams(window.location.search).get(
          "username"
        );
        const changePassword = !!new URLSearchParams(
          window.location.search
        ).get("changePassword")!;

        if (!districtParam && !usernameParam && !changePassword) {
          router.push("/app/view-setup");
        }
      }
    }
  };

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
        reject("NO_PORT");
      }
    });
  }

  return (
    <ExtensionConnector
      onMessage={onMessage}
      loadState={loadState}
      onConnect={onConnect}
    >
      <NextSeo title="Connect to Frontline" />
      <Setup checkSetup={checkSetup} />
    </ExtensionConnector>
  );
};

export default Login;
