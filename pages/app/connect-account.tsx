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
  const setupContext = useContext(SetupContext);
  //   const setupContext = useContext(SetupStateContext);
  const loadState = useState<AppLoadState>("LOADING");

  const onConnect = (port: chrome.runtime.Port) => {
    port.postMessage({ type: "requestSetup" });
  };

  const onMessage = (msg: any, port: chrome.runtime.Port) => {
    if (msg.type === "setSetup") {
      console.log(msg);

      setupContext.setSetup(msg.setup);
    }
  };

  return (
    <ExtensionConnector
      onMessage={onMessage}
      loadState={loadState}
      onConnect={onConnect}
    >
      <Setup />
    </ExtensionConnector>
  );
};

export default Login;
