import { AnimatePresence } from "framer-motion";
import React, { useContext, useMemo } from "react";
import { IoChevronForwardOutline } from "react-icons/io5";
import { NotificationContext } from "scorecard-types";
import { PortContext } from "../core/ExtensionConnector";
import Notification from "./Notification";
import Summary from "./Summary";
import { motion } from "framer-motion";

export default function NotificationSummary() {
  const notificationContext = useContext(NotificationContext);

  const { notifications, markRead, unreadNotifications } = notificationContext;

  const { port } = useContext(PortContext);

  console.log(unreadNotifications);

  const currentNotificationId = unreadNotifications[0]?.id;

  const showingNotification = !!unreadNotifications[0];

  return (
    <div className="relative my-4">
      {notifications.map((notification, i) => {
        return (
          <React.Fragment key={i}>
            <AnimatePresence>
              {currentNotificationId === notification.id && (
                <Notification notification={notification} key={i} index={i} />
              )}
            </AnimatePresence>
          </React.Fragment>
        );
      })}
      {showingNotification && (
        <div
          className="absolute top-1/2 right-0 -translate-y-1/2 text-mono-100 bg-accent-300 hover:bg-accent-400 cursor-pointer border border-accent-400 w-8 h-8 rounded-full flex items-center justify-center"
          onClick={() => {
            console.log(port);

            if (port) {
              markRead(port);
            }
          }}
        >
          <IoChevronForwardOutline />
        </div>
      )}
      {!showingNotification && (
        <div className="border border-mono-l-300 dark:border-mono-d-400 py-4 px-6 rounded-md flex items-center gap-4">
          <div className="w-2 h-2 rounded-full bg-accent-300" />
          <p>View Past Notifications</p>
        </div>
      )}
    </div>
  );
}
