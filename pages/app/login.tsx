import type { NextPage } from "next";
import { useContext, useEffect, useState } from "react";
import { Course, DataContext } from "scorecard-types";
import Setup from "../../components/app/setup/Setup";
import Summary from "../../components/app/Summary";
import ExtensionConnector, {
  AppLoadState,
} from "../../components/core/ExtensionConnector";

const Login: NextPage = () => {
  const dataContext = useContext(DataContext);

  const loadState = useState<AppLoadState>("LOADING");

  const onMessage = (msg: any, port: chrome.runtime.Port) => {
    if (msg.type === "setCourses") {
      dataContext.setData(msg.record);
    }
  };

  return (
    <ExtensionConnector onMessage={onMessage} loadState={loadState}>
      <Setup />
    </ExtensionConnector>
  );
};

export default Login;
