import axios from "axios";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import {
  Course,
  DataContext,
  LoadingContext,
  NotificationContext,
} from "scorecard-types";
import Summary from "../../components/app/Summary";
import ExtensionConnector, {
  AppLoadState,
} from "../../components/core/ExtensionConnector";
import Loading from "../../components/core/util/Loading";

const App: NextPage = () => {
  const router = useRouter();
  const dataContext = useContext(DataContext);
  const notificationContext = useContext(NotificationContext);
  const [loaded, setLoaded] = useState(false);

  const loadState = useState<AppLoadState>("LOADING");

  const onConnect = (port: chrome.runtime.Port) => {
    port.postMessage({ type: "requestCourses" });
    port.postMessage({ type: "requestGradingCategory" });
    port.postMessage({ type: "requestCourseSettings" });
    port.postMessage({ type: "requestCourseDisplayNames" });
    port.postMessage({ type: "requestCoursesLastUpdated" });
    port.postMessage({ type: "requestNotifications" });
    port.postMessage({ type: "requestLoadingState" });
    port.postMessage({ type: "requestSetup" });
  };

  const loadingContext = useContext(LoadingContext);

  const onMessage = (msg: any, port: chrome.runtime.Port) => {
    if (msg.type === "setCourses") {
      if (msg.record == null) {
        router.push("/app/connect-account?hidden-action=setup");
        return;
      }
      dataContext.setData(msg.record);
      setLoaded(true);
    }
    if (msg.type == "setCourseSettings") {
      dataContext.setCourseSettings(msg.settings ?? {});
    }

    // TODO: only has to check courseDisplayNames and lastUpdated for compatability
    if (msg.type == "setCourseDisplayNames" && msg.courseDisplayNames) {
      const settings = dataContext.courseSettings;

      for (const key of Object.keys(msg.courseDisplayNames)) {
        if (settings[key] === undefined) {
          settings[key] = {};
        }
        settings[key].displayName = msg.courseDisplayNames[key];
      }
      dataContext.setCourseSettings(settings);
    }
    if (msg.type == "setCoursesLastUpdated") {
      const settings = dataContext.courseSettings;

      for (const key of Object.keys(msg.lastUpdated)) {
        if (settings[key] === undefined) {
          settings[key] = {};
        }
        settings[key].lastUpdated = msg.lastUpdated[key];
      }
      dataContext.setCourseSettings(settings);
    }
    if (msg.type === "setGradingCategory") {
      dataContext.setGradeCategory(msg.gradeCategory || 0);
    }
    if (msg.type === "setNotifications") {
      notificationContext.setNotifications(msg.notifications);
    }
    if (msg.type === "setLoadingState") {
      loadingContext.setLoading(msg.loading);
    }
    if (msg.type === "setSetup") {
      if (msg.setup == null) {
        router.push("/app/connect-account");
      } else if (msg.setup?.host != null) {
        // fetch /api/districts
        axios.get("/api/districts").then((res) => {
          const districts = res.data.districts;
          const district = districts.find(
            (district: any) => district.url === msg.setup.host
          );

          if (district == null) {
            router.push("/app/connect-account?error=newlyInvalidDistrict");
          }
        });
      }
    }
  };

  return (
    <ExtensionConnector
      onMessage={onMessage}
      loadState={loadState}
      onConnect={onConnect}
    >
      {loaded ? <Summary /> : <Loading center={true} />}
    </ExtensionConnector>
  );
};

export default App;
