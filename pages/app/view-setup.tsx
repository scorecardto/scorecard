import type { NextPage } from "next";
import { useContext, useEffect, useState } from "react";
import { Course, DataContext } from "scorecard-types";
import Setup from "../../components/app/setup/Setup";
import Summary from "../../components/app/Summary";
import ExtensionConnector, {
  AppLoadState,
} from "../../components/core/ExtensionConnector";
import { SetupContext } from "../../components/core/context/SetupContext";
import ViewSetup from "../../components/app/setup/ViewSetup";
import { useRouter } from "next/router";
import { markAsUntransferable } from "worker_threads";

const ViewSetupPage: NextPage = () => {
  const router = useRouter();
  const setupContext = useContext(SetupContext);

  const loadState = useState<AppLoadState>("LOADING");

  const [port, setPort] = useState<chrome.runtime.Port | null>(null);

  const onConnect = (port: chrome.runtime.Port) => {
    port.postMessage({ type: "requestSetup" });
    setPort(port);
  };

  const onMessage = (msg: any, port: chrome.runtime.Port) => {
    if (msg.type === "setSetup") {
      if (msg.setup == null) {
        router.push("/app/connect-account");
      } else if (
        msg.setup?.host == null ||
        msg.setup?.username == null ||
        !msg.setup?.hasPassword
      ) {
        const district =
          msg.setup?.host == null ? {} : { district: msg.setup.host! };

        const username =
          msg.setup?.username == null ? {} : { district: msg.setup.username! };

        const password = msg.setup.hasPassword ? { changePassword: false } : {};

        const search = new URLSearchParams();
        const query = { ...district, ...username, ...password };

        Object.entries(query).forEach(([key, value]) => {
          search.set(key, value);
        });

        console.log(msg.setup);

        router.push(`/app/connect-account?${search.toString()}`);
      } else {
        setupContext.setSetup(msg.setup);
      }
    }
  };

  return (
    <ExtensionConnector
      onMessage={onMessage}
      loadState={loadState}
      onConnect={onConnect}
    >
      <ViewSetup />
    </ExtensionConnector>
  );
};

export default ViewSetupPage;
