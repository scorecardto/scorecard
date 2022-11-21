import { AnimatePresence, MotionConfig, motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import NotificationsPrompt from "./NotificationsPrompt";
import TestNotificationsPrompt from "./TestNotificationsPrompt";
import TroubleshootNotifications from "./TroubleshootNotifications";

function SetupState(props: {
  children: React.ReactNode;
  enabled: boolean;
  omitInitial?: boolean;
  id: string;
}) {
  const [setupState, setSetupState] = useState(0);

  return (
    <AnimatePresence>
      {props.enabled && (
        <motion.div
          key={props.id}
          className="h-full"
          initial={
            props.omitInitial
              ? {}
              : {
                  translateX: "-50%",
                  scale: 0.9,
                  opacity: 0.5,
                }
          }
          animate={{
            translateX: 0,
            scale: 1,
            opacity: 1,
          }}
          transition={{
            duration: 0.3,
            ease: "easeInOut",
          }}
        >
          {props.children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default function FinishSetup(props: { done: () => void }) {
  const [stage, setStage] = useState("NOTIFICATIONS_INITIAL");

  useEffect(() => {
    if (stage === "DONE") {
      props.done();
    }
  }, [stage, props]);

  return (
    <div
      className={`z-40 fixed top-0 left-0 w-full h-full flex py-10 px-20 bg-black/50`}
    >
      <div className="w-full h-full rounded-md overflow-hidden">
        <SetupState
          id={"NOTIFICATIONS_INITIAL"}
          enabled={stage === "NOTIFICATIONS_INITIAL"}
          omitInitial={true}
        >
          <NotificationsPrompt
            done={(enabled) => {
              if (enabled) {
                setStage("NOTIFICATIONS_TEST");
              } else {
                setStage("DONE");
              }
            }}
          />
        </SetupState>

        <SetupState
          enabled={stage === "NOTIFICATIONS_TEST"}
          id={"NOTIFICATIONS_TEST"}
        >
          <TestNotificationsPrompt
            done={(enabled) => {
              if (enabled) {
                setStage("DONE");
              } else {
                setStage("NOTIFICATIONS_TROUBLESHOOT");
              }
            }}
          />
        </SetupState>

        <SetupState
          enabled={stage === "NOTIFICATIONS_TROUBLESHOOT"}
          id={"NOTIFICATIONS_TROUBLESHOOT"}
        >
          <TroubleshootNotifications
            done={(tryAgain) => {
              if (tryAgain) {
                setStage("NOTIFICATIONS_TEST");
              } else {
                setStage("DONE");
              }
            }}
          />
        </SetupState>
      </div>
    </div>
  );
}
