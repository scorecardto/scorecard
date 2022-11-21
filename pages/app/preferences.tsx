import type { NextPage } from "next";
import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { Settings, SettingsContext } from "scorecard-types";
import AllNotifications from "../../components/app/notifications/AllNotifications";
import Preferences from "../../components/app/preferences/Preferences";

import ExtensionConnector, {
  AppLoadState,
} from "../../components/core/ExtensionConnector";

const PreferencesPage: NextPage = () => {
  const loadState = useState<AppLoadState>("LOADING");

  const portRef = useRef<chrome.runtime.Port | null>(null);

  const onConnect = (port: chrome.runtime.Port) => {
    portRef.current = port;

    port.postMessage({ type: "requestSettings" });
  };

  const settingsContext = useContext(SettingsContext);

  const onMessage = (msg: any, port: chrome.runtime.Port) => {
    if (msg.type === "setSettings") {
      const settings: Settings = msg.settings;

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
        settingsContext.setUsePushNotifications(settings?.usePushNotifications);
      }
      if (settings?.deleteNotificationsAfter) {
        settingsContext.setDeleteNotificationsAfter(
          settings?.deleteNotificationsAfter
        );
      }
    }
  };

  return (
    <ExtensionConnector
      onMessage={onMessage}
      loadState={loadState}
      onConnect={onConnect}
    >
      <Preferences />
    </ExtensionConnector>
  );
};

export default PreferencesPage;
