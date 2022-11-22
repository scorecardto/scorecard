import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import { PortContext } from "../../core/ExtensionConnector";
import Alert from "./Alert";

export default function AlertTray() {
  const [alerts, setAlerts] = useState<React.ReactNode[]>([]);

  // fetch errors
  const port = useContext(PortContext).port;
  const router = useRouter();

  function processErrors(
    errors: {
      timestamp: number;
      message: string;
    }[]
  ) {
    errors.forEach(({ message, timestamp }) => {
      if (message === "INCORRECT_PASSWORD") {
        router.push("/app/connect-account?error=newlyIncorrectPassword");
      } else if (message === "INCORRECT_USERNAME") {
        router.push("/app/connect-account?error=newlyIncorrectUsername");
      } else {
        setAlerts((oldAlerts) => {
          const newAlerts = [...oldAlerts];
          newAlerts.push(
            <Alert
              key={oldAlerts.length}
              message={`An Error Occured: ${message}`}
            />
          );
          return newAlerts;
        });
      }
    });
  }

  useEffect(() => {
    port?.postMessage({ type: "requestErrors" });

    const listener = (msg: any) => {
      if (msg.type === "setErrors") {
        processErrors(msg.errors);
      }
    };

    port?.onMessage.addListener(listener);

    return () => {
      port?.onMessage.removeListener(listener);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [port]);

  return (
    <div className="fixed bottom-10 left-10 z-10">
      <div className="flex flex-col gap-2">{alerts}</div>
    </div>
  );
}
