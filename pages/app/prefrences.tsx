import type { NextPage } from "next";
import { useContext, useEffect, useState } from "react";
import AllNotifications from "../../components/app/notifications/AllNotifications";
import Prefrences from "../../components/app/prefrences/Prefrences";

import ExtensionConnector, {
  AppLoadState,
} from "../../components/core/ExtensionConnector";

const PrefrencesPage: NextPage = () => {
  const loadState = useState<AppLoadState>("LOADING");

  const onConnect = (port: chrome.runtime.Port) => {};

  const onMessage = (msg: any, port: chrome.runtime.Port) => {};

  return (
    <ExtensionConnector
      onMessage={onMessage}
      loadState={loadState}
      onConnect={onConnect}
    >
      <Prefrences />
    </ExtensionConnector>
  );
};

export default PrefrencesPage;
