import { NextSeo } from "next-seo";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import DeleteTelemetryDataRow from "../components/app/uninstall/DeleteTelemetryDataRow";
import axios from "axios";
import { motion } from "framer-motion";
import { IoCheckmarkCircle } from "react-icons/io5";

export default function DeleteTelemetryData() {
  const [clientId, setClientId] = useState<string | undefined>(undefined);
  const [done, setDone] = useState(false);
  const [error, setError] = useState<string | undefined>(undefined);

  const [fetching, setFetching] = useState(false);
  const router = useRouter();

  const domain = "https://scorecard-iota.vercel.app";

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

  useEffect(() => {
    if (clientId && !fetching) {
      setFetching(true);

      axios
        .post(`/api/metrics/deleteTelemetryData`, {
          clientId,
        })
        .then((result) => {
          if (result.data.success) {
            setDone(true);
          } else {
            if (result.data.error === "NO_DOCUMENT_FOUND") {
              setError(
                "We couldn't find any telemetry data for your this client ID. This likely means your data is already deleted."
              );
            } else {
              setError(`Unrecognized error: ${result.data.error}`);
            }
          }
        })
        .catch((error) => {
          setError(error.message);
        });
    }
  }, [clientId, fetching]);

  useEffect(() => {
    if (done) {
      setTimeout(() => {
        window.close();
      }, 500);
    }
  }, [done]);

  return (
    <>
      <NextSeo title="Delete your Telemetry Data" />
      <div className="w-screen h-screen flex items-center justify-center bg-accent-100">
        {!done && (
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
        )}
        {done && (
          <motion.div
            initial={{ scale: 0.5, opacity: 0.5 }}
            animate={{ scale: 1, opacity: 1 }}
          >
            <IoCheckmarkCircle className="text-9xl text-accent-300" />
          </motion.div>
        )}
      </div>
    </>
  );
}
