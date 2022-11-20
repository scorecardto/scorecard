import React, { useContext } from "react";
import { NotificationContext } from "scorecard-types";
import Notification from "./Notification";
import { motion } from "framer-motion";
import FormPage from "../../core/FormPage";

export default function AllNotifications() {
  const notificationContext = useContext(NotificationContext);

  const { notifications } = notificationContext;
  let date: string = "";

  return (
    <FormPage
      title="Notifications"
      description="These are your past notifications. You'll get new notifications every time Scorecard detects a new grade. You can adjust how often Scorecard checks for notifications in settings."
      omitTopPadding={true}
      backLink="/app"
      backLinkText="Back to Scorecard"
    >
      <div className="flex flex-col gap-4 flex-wrap mx-auto w-fit mb-10">
        <div className="lg:pt-56" />
        {notifications.map((notification, i) => {
          const newDate = new Date(notification.date).toLocaleDateString(
            "en-US",
            {
              month: "long",
              day: "numeric",
            }
          );

          const includeHeader = date !== newDate;

          date = newDate;

          return (
            <div key={i}>
              {includeHeader && (
                <div className="relative mb-2">
                  <h2 className="text-lg font-medium text-mono-l-600 dark:text-mono-d-600">
                    {date}
                  </h2>
                  <div className="absolute top-1/2 -translate-y-1/2 -left-16 w-12 h-0.5 bg-mono-l-300 dark:bg-mono-d-300" />
                </div>
              )}
              <motion.div
                initial={{
                  translateX: -20,
                  translateY: -20,
                  opacity: 0,
                }}
                animate={{
                  translateX: 0,
                  translateY: 0,
                  opacity: 1,
                }}
                transition={{
                  delay: i * 0.1,
                }}
              >
                <Notification notification={notification} index={0} />
              </motion.div>
            </div>
          );
        })}
      </div>
    </FormPage>
  );
}
