import { DefaultSeo, NextSeo } from "next-seo";
import React, { useContext, useEffect, useState } from "react";
import { IoTrendingUp } from "react-icons/io5";
import { DataContext, NotificationContext } from "scorecard-types";
import { PortContext } from "../core/ExtensionConnector";
import Dropdown from "../core/input/Dropdown";
import AssignmentsViewer from "./assignments/AssignmentsViewer";
import Context from "./Context";
import CourseCard from "./CourseCard";
import NotificationSummary from "./notifications/NotificationSummary";
import FinishSetup from "./setup/FinishSetup";
import Toolbar from "./Toolbar";
import TopBar from "./TopBar";

export default function Summary() {
  const data = useContext(DataContext);

  const [course, setCourse] = useState(-1);

  const { unreadNotifications } = useContext(NotificationContext);

  const [lastUpdated, setLastUpdated] = useState<{
    [key: string]: number;
  }>({});

  const title =
    course === -1
      ? "Your Scorecard"
      : data.courseDisplayNames[data.data?.courses[course].key ?? ""] ??
        data.data?.courses[course].name;

  const [setup, setSetup] = useState(
    // true if setup in url params
    typeof window !== "undefined" &&
      new URLSearchParams(window.location.search).get("hidden-action") ===
        "setup"
  );

  useEffect(() => {
    // open course card if in url
    const href = decodeURI(window.location.href);

    if (href.indexOf("#") != -1) {
      const course = href.slice(href.indexOf("#") + 1);
      const index = data.data?.courses.findIndex(
        (c) => (data.courseDisplayNames[c.key] ?? c.name) == course
      );

      if (index != undefined && index != -1) {
        setCourse(index);
        window.history.pushState({}, "", href.slice(0, href.indexOf("#")));
      }
    }
  }, [setup, data.data?.courses, data.courseDisplayNames]);

  const port = useContext(PortContext).port;

  useEffect(() => {
    port?.postMessage({ type: "requestCoursesLastUpdated" });

    const listener = (msg: any) => {
      if (msg.type === "setCoursesLastUpdated") {
        setLastUpdated(msg.lastUpdated);
      }
    };

    port?.onMessage.addListener(listener);

    return () => {
      port?.onMessage.removeListener(listener);
    };
  }, []);

  return (
    <div className="w-full flex flex-col h-screen">
      <NextSeo title={title} />
      <TopBar />

      <AssignmentsViewer course={course} setCourse={setCourse} />
      {setup && <FinishSetup done={() => setSetup(false)} />}

      <div className="flex-shrink-0 h-4" />

      <div
        className={`max-w-6xl mx-auto px-8 flex flex-col pt-8 w-full ${
          unreadNotifications.length > 0 ? "gap-8" : "gap-0"
        }`}
      >
        <div className="flex flex-row justify-between items-end gap-8">
          <h1 className="flex-shrink-0 h1">Your Scorecard</h1>
          <div className="flex gap-2">
            <Dropdown
              options={data.data?.gradeCategoryNames ?? []}
              selected={data.gradeCategory}
              setSelected={data.setGradeCategory}
              tabIndex={course == -1 ? 0 : -1}
            />
            {/* <Context courseIdx={course} /> */}
          </div>
        </div>

        <div className="flex flex-row justify-between items-end gap-8">
          <NotificationSummary courseIdx={course} />

          {/* <Toolbar courseIdx={course} /> */}
        </div>
      </div>

      <div className="w-full bg-mono-l-200 dark:bg-mono-d-200 h-full">
        <div className="max-w-6xl mx-auto p-8 relative">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {data.data?.courses.map((c, idx) => {
              const updateString = (() => {
                if (lastUpdated[c.key]) {
                  const date = new Date(lastUpdated[c.key]);

                  // if today
                  if (date.toDateString() == new Date().toDateString()) {
                    return `Last updated today.`;
                  }

                  // if yesterday
                  if (
                    date.toDateString() ==
                    new Date(new Date().getTime() - 86400000).toDateString()
                  ) {
                    return `Last updated yesterday.`;
                  }

                  // if within the last week, 5 days ago
                  if (
                    date.getTime() >
                    new Date(new Date().getTime() - 432000000).getTime()
                  ) {
                    return `Last updated ${
                      new Date().getDay() - date.getDay()
                    } days ago.`;
                  }

                  return `Last updated ${date.toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                  })}.`;
                } else {
                  return "No recent updates.";
                }
              })();
              return (
                <CourseCard
                  lastUpdated={updateString}
                  key={idx}
                  onClick={() => {
                    setCourse(idx);
                    (document.activeElement as HTMLElement)?.blur();
                  }}
                  courseName={data.courseDisplayNames[c.key] ?? c.name}
                  description1={c.key}
                  description2=" "
                  grade={c.grades[data.gradeCategory]?.value ?? "NG"}
                  id={c.key}
                  courseIdx={course}
                />
                //
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
