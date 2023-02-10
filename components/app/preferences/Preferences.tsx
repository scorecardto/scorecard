import React, { useContext, useEffect, useState } from "react";
import { IoCaretUp, IoChevronUp } from "react-icons/io5";
import FormPage from "../../core/FormPage";
import Dropdown from "../../core/input/Dropdown";
import LargeCard from "../LargeCard";
import { AnimateSharedLayout, motion } from "framer-motion";
import Toggle from "../../core/input/Toggle";
import { SettingsContext } from "scorecard-types";
import { PortContext } from "../../core/ExtensionConnector";

export default function Preferences(props: {}) {
  const APPEARANCE_OPTIONS = {
    LIGHT: "Light",
    DARK: "Dark",
    SYSTEM: "System",
  };

  const COLOR_OPTIONS = {
    BLUE: {
      background: "#F1F8FE",
      border: "#E2EEFF",
      darkBackground: "#1c2e4a",
      darkBorder: "#182843",
      arrow: "#64A4FC",
    },
    PINK: {
      background: "#fff2f7",
      border: "#ffe1ea",
      darkBackground: "#571b30",
      darkBorder: "#4a1125",
      arrow: "#FC64AD",
    },
  };

  const CHECK_OPTIONS = {
    10: "10 minutes",
    20: "20 minutes",
    30: "30 minutes",
    45: "45 minutes",
    60: "60 minutes",
    180: "3 hours",
    360: "6 hours",
  };

  const DELETE_NOTIFICATION_OPTIONS = {
    0: "Immediately",
    2: "2 days",
    5: "5 days",
    14: "2 weeks",
    30: "1 month",
  };

  const [disabled, setDisabled] = useState(false);

  const settings = useContext(SettingsContext);
  const { port } = useContext(PortContext);

  useEffect(() => {
    if (disabled) {
      port?.postMessage({
        type: "setSettings",
        settings: {
          appearance: settings.appearance,
          accentColor: settings.accentColor,
          spoilerMode: settings.spoilerMode,
          checkGradesInterval: settings.checkGradesInterval,
          usePushNotifications: settings.usePushNotifications,
          deleteNotificationsAfter: settings.deleteNotificationsAfter,
        },
      });
    }
  }, [disabled, settings, port]);

  // effect for onmessage
  useEffect(() => {
    if (port) {
      const listener = (msg: any) => {
        if (msg.type === "setSettingsResponse") {
          setTimeout(() => {
            setDisabled(false);
          }, 500);
        }
      };

      port.onMessage.addListener(listener);

      return () => {
        port.onMessage.removeListener(listener);
      };
    }
  }, [port]);

  return (
    <FormPage
      backLink="/app"
      backLinkText="Back to Scorecard"
      title="Preferences"
      description="These are your preferences for Scorecard. Changing them will affect the Scorecard website, extension, and background processes."
      omitTopPadding={true}
    >
      <div
        className={`font-os flex flex-col gap-4 transition-opacity ${
          disabled ? "opacity-50" : ""
        }`}
      >
        <LargeCard>
          <div className="flex justify-between items-center">
            <p>Appearance</p>
            <Dropdown
              tabIndex={0}
              disabled={disabled}
              options={Object.values(APPEARANCE_OPTIONS)}
              selected={Object.keys(APPEARANCE_OPTIONS).indexOf(
                settings.appearance
              )}
              setSelected={(n) => {
                setDisabled(true);
                settings.setAppearance(
                  Object.keys(APPEARANCE_OPTIONS)[
                    n
                  ] as keyof typeof APPEARANCE_OPTIONS
                );
              }}
            />
          </div>
          <div className="flex justify-between items-center">
            <p>Accent Color</p>
            <div className="flex gap-2">
              <AnimateSharedLayout>
                {Object.keys(COLOR_OPTIONS).map((key, idx) => {
                  const color =
                    COLOR_OPTIONS[key as keyof typeof COLOR_OPTIONS];

                  const inner = (dark: boolean) => (
                    <div className="absolute z-10 bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2">
                      {key === settings.accentColor && (
                        <motion.div
                          layoutId={`accent-color-indicator${
                            dark ? "-dark" : ""
                          }`}
                          style={{
                            color: color.arrow,
                          }}
                        >
                          <IoCaretUp className="text-xl" />
                        </motion.div>
                      )}
                    </div>
                  );

                  const defaultClassName =
                    "w-10 h-10 rounded-md relative cursor-pointer";

                  const onClick = () => {
                    if (!disabled) {
                      setDisabled(true);
                      settings.setAccentColor(
                        key as keyof typeof COLOR_OPTIONS
                      );
                    }
                  };

                  return (
                    <React.Fragment key={idx}>
                      <div
                        tabIndex={0}
                        className={`${defaultClassName} block dark:hidden`}
                        onClick={onClick}
                        style={{
                          backgroundColor: color.background,
                          border: `1px solid ${color.border}`,
                        }}
                      >
                        {inner(false)}
                      </div>
                      <div
                        className={`${defaultClassName} hidden dark:block`}
                        onClick={onClick}
                        style={{
                          backgroundColor: color.darkBackground,
                          border: `1px solid ${color.darkBorder}`,
                        }}
                      >
                        {inner(true)}
                      </div>
                    </React.Fragment>
                  );
                })}
              </AnimateSharedLayout>
            </div>
          </div>
          <div className="flex justify-between items-center">
            <div>
              Spoiler Mode
              <p className="p">
                Hides grades on your Scorecard until hovered over.
              </p>
            </div>
            <Toggle
              disabled={disabled}
              value={settings.spoilerMode}
              setValue={(n) => {
                settings.setSpoilerMode(n);
                setDisabled(true);
              }}
            />
          </div>
        </LargeCard>

        <LargeCard>
          <div className="flex justify-between items-start gap-4">
            <div>
              Check for New Grades Every
              <p className="p">
                This affects how often you recieve notifications.
              </p>
            </div>
            <div className="whitespace-nowrap">
              <Dropdown
                tabIndex={0}
                disabled={disabled}
                options={Object.values(CHECK_OPTIONS)}
                selected={Object.keys(CHECK_OPTIONS).indexOf(
                  settings.checkGradesInterval.toString()
                )}
                setSelected={(n) => {
                  setDisabled(true);
                  settings.setCheckGradesInterval(
                    parseInt(
                      Object.keys(CHECK_OPTIONS)[n]
                    ) as keyof typeof CHECK_OPTIONS
                  );
                }}
              />
            </div>
          </div>
          <div className="flex justify-between items-start gap-4">
            <div>
              Push Notifications
              <p className="p">
                Send notifications to your device. You can still see them in
                Scorecard.
              </p>
            </div>
            <div className="whitespace-nowrap">
              <Toggle
                disabled={disabled}
                value={settings.usePushNotifications}
                setValue={(n) => {
                  setDisabled(true);
                  settings.setUsePushNotifications(n);
                }}
              />
            </div>
          </div>

          <div className="flex justify-between items-center gap-4">
            <p>Delete Notifications After</p>
            <div className="whitespace-nowrap">
              <Dropdown
                tabIndex={0}
                disabled={disabled}
                top={true}
                options={Object.values(DELETE_NOTIFICATION_OPTIONS)}
                selected={Object.keys(DELETE_NOTIFICATION_OPTIONS).indexOf(
                  settings.deleteNotificationsAfter.toString()
                )}
                setSelected={(n) => {
                  setDisabled(true);
                  settings.setDeleteNotificationsAfter(
                    parseInt(
                      Object.keys(DELETE_NOTIFICATION_OPTIONS)[n]
                    ) as keyof typeof DELETE_NOTIFICATION_OPTIONS
                  );
                }}
              />
            </div>
          </div>
        </LargeCard>
      </div>
    </FormPage>
  );
}
