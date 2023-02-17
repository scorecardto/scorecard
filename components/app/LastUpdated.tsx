import React, { useContext, useEffect, useState } from "react";
import { IoRefreshOutline } from "react-icons/io5";
import { DataContext, LoadingContext } from "scorecard-types";
import { PortContext } from "../core/ExtensionConnector";
import Loading from "../core/util/Loading";
import Tooltip from "../core/util/Tooltip";

export default function LastUpdated(props: { courseIdx: number }) {
  const [text, setText] = useState("Click to Reload");

  const [ready, setReady] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setReady(true);
    }, 1000);
  }, []);

  const data = useContext(DataContext);

  const date = data.data?.date;

  const update = (): string => {
    if (!date) {
      return "Never";
    }

    const then = date;
    const now = Date.now();

    const min = Math.floor((now - then) / 1000 / 60);
    const hour = Math.floor(min / 60);
    const day = Math.floor(hour / 24);

    if (min < 2) {
      return "Up to date";
    }
    if (min < 60) {
      return `Updated  ${min} minutes ago`;
    }
    if (hour < 24) {
      if (hour === 1) {
        return `Updated 1 hour ago`;
      }
      return `Updated ${hour} hours ago`;
    }
    if (day === 1) {
      return `Updated yesterday`;
    }
    if (day < 7) {
      return `Updated ${new Date(date).toLocaleString("en-us", {
        weekday: "long",
      })}`;
    }
    return `Updated ${new Date(date).toLocaleString("en-us", {
      month: "short",
      day: "numeric",
    })}`;
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setText(update());
    }, 1000 * 60);
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setText(update());

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [date]);

  const { port } = useContext(PortContext);
  const loading = useContext(LoadingContext);
  return (
    <div>
      {loading.loading ? (
        <Loading />
      ) : (
        <div
          className={`text-sm flex gap-2 group items-center cursor-pointer relative transition-opacity duration-200 ${
            ready ? "opacity-100" : "opacity-50"
          }`}
          onClick={() => {
            if (!ready) return;
            port?.postMessage({ type: "requestReloadContent" });
            loading.setLoading(true);
          }}
        >
          <p className="p">{text}</p>
          <Tooltip
            className="absolute top-full -left-2 mt-4 hidden group-hover:block"
            side="left"
          >
            <p className="p">Click to refresh</p>
          </Tooltip>
        </div>
      )}
    </div>
  );
}
