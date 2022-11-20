import type { NextPage } from "next";
import { useContext, useEffect, useState } from "react";
import { Course, DataContext, NotificationContext } from "scorecard-types";
import AllNotifications from "../../components/app/notifications/AllNotifications";
import Summary from "../../components/app/Summary";
import ExtensionConnector, {
  AppLoadState,
} from "../../components/core/ExtensionConnector";

const App: NextPage = () => {
  const notificationContext = useContext(NotificationContext);

  const loadState = useState<AppLoadState>("LOADING");

  const onConnect = (port: chrome.runtime.Port) => {
    port.postMessage({ type: "requestNotifications" });
  };

  const onMessage = (msg: any, port: chrome.runtime.Port) => {
    if (msg.type === "setNotifications") {
      notificationContext.setNotifications(msg.notifications);
    }
  };

  return (
    <ExtensionConnector
      onMessage={onMessage}
      loadState={loadState}
      onConnect={onConnect}
    >
      <AllNotifications />
    </ExtensionConnector>
  );
};

export default App;
