import { AnimatePresence } from "framer-motion";
import React, {useContext, useEffect, useMemo, useRef, useState} from "react";
import {
  IoChevronForwardOutline,
  IoClose,
  IoCloseOutline,
  IoExitOutline,
} from "react-icons/io5";
import { NotificationContext } from "scorecard-types";
import { PortContext } from "../../core/ExtensionConnector";
import Notification from "./Notification";
import Summary from "../Summary";
import { motion } from "framer-motion";
import Link from "next/link";

export default function NotificationSummary(props: { courseIdx: number }) {
  const notificationContext = useContext(NotificationContext);

  const { notifications, markRead, unreadNotifications } = notificationContext;

  const { port } = useContext(PortContext);

  console.log(unreadNotifications);

  const currentNotificationId = unreadNotifications[0]?.id;

  const showingNotification = !!unreadNotifications[0];

  return (
    <div className="notification-summary relative my-4">
      {notifications.map((notification, i) => {
        return (
          <React.Fragment key={i}>
            <AnimatePresence>
              {currentNotificationId === notification.id && (
                <Notification
                    notification={notification}
                    key={i}
                    index={i}
                    onClose={() => {
                      if (port) {
                        markRead(port);
                      }
                    }}
                />
              )}
            </AnimatePresence>
          </React.Fragment>
        );
      })}
      {!showingNotification && (
        <Link href="/app/notifications">
          <div
            tabIndex={props.courseIdx == -1 ? 0 : -1}
            className="cursor-pointer border border-mono-l-300 dark:border-mono-d-300 py-4 px-6 rounded-md flex items-center gap-4 hover:bg-mono-l-150 hover:dark:bg-mono-d-150"
          >
            <div className="w-2 h-2 rounded-full bg-accent-300" />
            <p className="p">View Past Notifications</p>
          </div>
        </Link>
      )}
    </div>
  );
}
