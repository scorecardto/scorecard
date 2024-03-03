import {
    IoTrendingUp,
    IoTrendingDown,
    IoPulse,
    IoHeart, IoClose,
} from "react-icons/io5";
import { GradebookNotification } from "scorecard-types";
import { motion } from "framer-motion";
import React from "react";

export default function Notification(props: {
  notification: GradebookNotification;
  index: number;
  onClose: () => void;
}) {
  const { notification, index } = props;
  return (
      <motion.div
          key={`notification-${index}`}
          initial={
              props.index === 0
                  ? {}
                  : {
                      opacity: 0,
                      translateY: 20,
                      scale: 0.8,
                  }
          }
          animate={{
              opacity: 1,
              translateY: 0,
              scale: 1,
          }}
          exit={{
              position: "absolute",
              bottom: 0,
              opacity: 0,
              translateX: "-100%",
              scale: 0.8,
          }}
          transition={{
              duration: 0.5,
              ease: "easeOut",
          }}
          className="relative"
      >
          <div
              className="z-50 absolute top-2 -left-3.5 -translate-y-1/2 text-mono-100 bg-accent-350 hover:bg-accent-400 cursor-pointer border border-accent-400 w-8 h-8 rounded-full flex items-center justify-center text-white"
              tabIndex={-1}
              onClick={props.onClose}
          >
              <IoClose/>
          </div>

          <div
              className="notification-glow relative py-4 pl-6 pr-10 flex border border-mono-l-300 dark:border-mono-d-300 rounded-lg max-w-[30rem] w-full bg-mono-l-100 dark:bg-mono-d-100">
              <div className="flex flex-row gap-6 items-center z-10">
                  <div className="flex flex-col text-accent-300 text-3xl">
                      {notification.icon === "RISE" && <IoTrendingUp/>}
                      {notification.icon === "FALL" && <IoTrendingDown/>}
                      {notification.icon === "NEUTRAL" && <IoPulse/>}
                      {/* {notification.icon === "" && <IoHeart />} */}
                  </div>
                  <div className="flex flex-col gap-2 max-w-[24rem]">
                      <b className="b">{notification.title}</b>
                      <p className="p">{notification.message}</p>
                  </div>
              </div>
          </div>
      </motion.div>
  );
}
