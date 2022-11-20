import { NextSeo } from "next-seo";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import DeleteTelemetryDataRow from "../components/app/uninstall/DeleteTelemetryDataRow";

export default function DeleteTelemetryData() {
  const [clientId, setClientId] = useState<string | undefined>(undefined);
  const [done, setDone] = useState(false);
  const [error, setError] = useState<string | undefined>(undefined);

  const router = useRouter();

  useEffect(() => {
    const { clientId } = router.query;

    if (clientId !== undefined && typeof clientId === "string") {
      setClientId(clientId);
    }
  }, [router.query]);

  useEffect(() => {
    if (clientId !== undefined) {
      return;
    }

    const timeout = setTimeout(() => {
      setError("Client ID not found in URL Paremeters.");
    }, 1000);

    return () => {
      clearTimeout(timeout);
    };
  }, [clientId]);

  return (
    <>
      <NextSeo title="Delete your Telemetry Data" />
      <div className="w-screen h-screen flex items-center justify-center bg-accent-100">
        <div className="max-w-md w-full flex flex-col gap-4 mx-auto">
          <div className="bg-mono-l-100 dark:bg-mono-d-100 rounded-md shadow-sm">
            <DeleteTelemetryDataRow
              title="Getting Client ID"
              status={clientId ? "DONE" : error ? "ERROR" : "LOADING"}
              error={clientId ? undefined : error}
            />
            <DeleteTelemetryDataRow
              title="Requesting Deletion"
              status={!clientId ? "WAITING" : error ? "ERROR" : "LOADING"}
              error={clientId ? error : undefined}
            />
          </div>
        </div>
      </div>
    </>
  );
}
