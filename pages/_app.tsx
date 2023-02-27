import type { AppProps } from "next/app";
import Head from "next/head";
import { DefaultSeo } from "next-seo";
import "../styles/globals.css";
import {
  GradebookRecord,
  DataContext,
  LoadingContext,
  SetupState,
  DataProvider,
  NotificationContext,
  GradebookNotification,
  Appearance,
  AccentColor,
  SpoilerMode,
  CheckGradesInterval,
  UsePushNotifications,
  DeleteNotificationsAfter,
  SettingsContext, CourseSettings,
} from "scorecard-types";
import { useEffect, useMemo, useState } from "react";
import { SetupContext } from "../components/core/context/SetupContext";
import { useMediaQuery } from "../components/hooks/hooks";

function MyApp({ Component, pageProps, router }: AppProps) {
  const [data, setData] = useState<GradebookRecord | null>(null);
  const [gradeCategory, setGradeCategory] = useState<number>(0);

  const [courseSettings, setCourseSettings] = useState<{
    [key: string]: CourseSettings;
  }>({});

  const dataContext = useMemo(
    () => ({
      data,
      setData,
      gradeCategory,
      setGradeCategory,
      // courseNames,
      // setCourseName: (id: string, name: string) => {
      //   // setCourseNames((prev) => ({ ...prev, [id]: name }));
      // },
      // setCourseNames,
      courseSettings,
      setCourseSettings,
    }),
    [
      data,
      gradeCategory,
      setGradeCategory,
      courseSettings,
      setCourseSettings,
    ]
  );

  const [loading, setLoading] = useState(false);
  const reloadContent = () => {
    console.log("Using non-implemented reloadContent");
  };

  const [setup, setSetup] = useState<SetupState | null>(null);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === " " || e.key === "Enter") {
        const el = e.view?.document.activeElement as HTMLElement;

        if (
          el !== e.view?.document.body &&
          e.view?.document.designMode !== "on" &&
          !el.isContentEditable &&
          !(el instanceof HTMLInputElement || el instanceof HTMLTextAreaElement)
        ) {
          el.click();
          e.preventDefault();
        }
      }
    };

    document.addEventListener("keydown", handleKey, { capture: true });

    return () => {
      document.removeEventListener("keydown", handleKey, { capture: true });
    };
  });

  const [notifications, setNotifications] = useState<GradebookNotification[]>(
    []
  );

  const notificationContext = useMemo(
    () => ({
      notifications,
      setNotifications,
      markRead: (port: chrome.runtime.Port) => {
        let done = false;

        const newNotifications = notifications.map((notification) => {
          if (!notification.read && !done) {
            notification.read = true;
            done = true;
          }
          return notification;
        });

        setNotifications(newNotifications);

        port.postMessage({
          type: "markNotificationAsRead",
        });
      },
      unreadNotifications: notifications.filter((n) => !n.read),
    }),
    [notifications]
  );

  const [appearance, setAppearance] = useState<Appearance>("SYSTEM");
  const [accentColor, setAccentColor] = useState<AccentColor>("BLUE");
  const [spoilerMode, setSpoilerMode] = useState<SpoilerMode>(false);
  const [checkGradesInterval, setCheckGradesInterval] =
    useState<CheckGradesInterval>(10);
  const [usePushNotifications, setUsePushNotifications] =
    useState<UsePushNotifications>(false);
  const [deleteNotificationsAfter, setDeleteNotificationsAfter] =
    useState<DeleteNotificationsAfter>(0);

  const [settingsLoaded, setSettingsLoaded] = useState(false);

  const settingsContext = useMemo(
    () => ({
      appearance,
      setAppearance,
      accentColor,
      setAccentColor,
      spoilerMode,
      setSpoilerMode,
      checkGradesInterval,
      setCheckGradesInterval,
      usePushNotifications,
      setUsePushNotifications,
      deleteNotificationsAfter,
      setDeleteNotificationsAfter,
      loaded: settingsLoaded,
      setLoaded: setSettingsLoaded,
    }),
    [
      appearance,
      setAppearance,
      accentColor,
      setAccentColor,
      spoilerMode,
      setSpoilerMode,
      checkGradesInterval,
      setCheckGradesInterval,
      usePushNotifications,
      setUsePushNotifications,
      deleteNotificationsAfter,
      setDeleteNotificationsAfter,
      settingsLoaded,
      setSettingsLoaded,
    ]
  );

  useEffect(() => {
    // On page load or when changing themes, best to add inline in `head` to avoid FOUC
    if (
      localStorage.appearance === "DARK" ||
      (localStorage.appearance === "SYSTEM" &&
        !("appearance" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  const systemDarkMode = useMediaQuery("(prefers-color-scheme: dark)", false);

  useEffect(() => {
    if (!settingsContext.loaded) return;

    if (
      settingsContext.appearance === "DARK" ||
      (settingsContext.appearance === "SYSTEM" && systemDarkMode)
    ) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }

    localStorage.appearance = settingsContext.appearance;
  }, [settingsContext.appearance, systemDarkMode, settingsContext.loaded]);

  useEffect(() => {
    if (localStorage.accentColor === "PINK") {
      document.documentElement.classList.add("use-theme-pink");
    } else {
      document.documentElement.classList.remove(
        ...Array.from(document.documentElement.classList).filter((c) =>
          c.startsWith("use-theme-")
        )
      );
    }
  }, []);

  useEffect(() => {
    if (settingsContext.accentColor === "PINK") {
      document.documentElement.classList.add("use-theme-pink");
    } else {
      document.documentElement.classList.remove(
        ...Array.from(document.documentElement.classList).filter((c) =>
          c.startsWith("use-theme-")
        )
      );
    }

    localStorage.accentColor = settingsContext.accentColor;
  }, [settingsContext]);

  return (
    <>
      <Head>
        <meta charSet="UTF-8" key="charset" />
        <meta
          name="viewport"
          content="width=device-width,initial-scale=1"
          key="viewport"
        />
        <link
          rel="apple-touch-icon"
          href={`${router.basePath}/apple-touch-icon.png`}
          key="apple"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href={`${router.basePath}/favicon-32x32.png`}
          key="icon32"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href={`${router.basePath}/favicon-16x16.png`}
          key="icon16"
        />
        <link
          rel="icon"
          href={`${router.basePath}/favicon.ico`}
          key="favicon"
        />
      </Head>
      <DefaultSeo
        titleTemplate="%s - Scorecard"
        openGraph={{
          type: "website",
          locale: "en",
          url: `https://scorecard.to${router.route}`,
          title: "Scorecard",
          description:
            "Scorecard: Free Gradebook Viewer for Frontline with Grade Testing, History, and GPA.",
          site_name: "Scorecard",
          images: [],
        }}
        canonical={`https://scorecard.to${router.route}`}
      />

      <SettingsContext.Provider value={settingsContext}>
        <SetupContext.Provider value={{ setup, setSetup }}>
          <NotificationContext.Provider value={notificationContext}>
            <LoadingContext.Provider
              value={{ loading, setLoading, reloadContent }}
            >
              <DataContext.Provider value={dataContext}>
                <Component {...pageProps} />
              </DataContext.Provider>
            </LoadingContext.Provider>
          </NotificationContext.Provider>
        </SetupContext.Provider>
      </SettingsContext.Provider>
    </>
  );
}

export default MyApp;
