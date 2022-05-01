import { useEffect, useMemo, useState } from 'react';

import { AnimateSharedLayout } from 'framer-motion';
import { DefaultSeo } from 'next-seo';
import { AppProps } from 'next/app';
import '../styles/global.css';
import Head from 'next/head';

import Header from '@/components/structure/Header';
import RouteGuard from '@/components/structure/RouteGuard';
import { AppConfig } from '@/lib/AppConfig';
import { updateColorScheme } from '@/lib/ColorSchemeHandler';
import { AppData, AppDataContext } from '@/lib/context/AppDataContext';
import { AuthContext, AuthState } from '@/lib/context/AuthContext';
import { HistoryContext, History } from '@/lib/context/HistoryContext';
import { getData } from '@/lib/DbHandler';
import { auth } from '@/lib/firebase';

const MyApp = ({ Component, pageProps, router }: AppProps) => {
  const url = `https://scorecard.to${router.route}`;

  useEffect(() => {
    updateColorScheme();
  }, []);

  const [appData, setAppData] = useState<AppData | null>(null);

  const appDataProvider = useMemo(
    () => ({ appData, setAppData }),
    [appData, setAppData]
  );

  const [authState, setAuthState] = useState<AuthState>({ currentUser: null });

  const authProvider = useMemo(
    () => ({ auth: authState, setAuth: setAuthState }),
    [authState, setAuthState]
  );

  useEffect(() => {
    return auth.onAuthStateChanged((user) => {
      setAuthState({ ...authState, currentUser: user });
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setAppData({
      courses: [
        {
          name: 'Advanced Biology',
          grades: [95, 92, 80, 91, 95, 'NG'],
          cellKey: '!!!',
          hash: '!!!',
          credit: 1,
          otherFields: [{ key: 'Course Code', value: 'ADV BIO' }],
          weighted: true,
        },
        {
          name: 'Magnet English',
          grades: [80, 95, 100, 90, 70, 'NG'],
          cellKey: '@@@',
          hash: '@@@',
          credit: 1,
          otherFields: [{ key: 'Course Code', value: 'ADV ENG' }],
          weighted: true,
        },
        {
          name: 'Everyday Algebra I',
          grades: ['P', 'P', '75', 'P', 'P', 'NG'],
          cellKey: '###',
          hash: '###',
          credit: 2,
          otherFields: [{ key: 'Course Code', value: 'ED ALGEBRA I' }],
          weighted: false,
        },
        {
          name: 'US History',
          grades: ['80', '85', 'EXC', '83', '90', 'NG'],
          cellKey: '$$$',
          hash: '$$$',
          credit: 1,
          otherFields: [{ key: 'Course Code', value: 'US HISTORY' }],
          weighted: false,
        },
      ],
      gradingPeriods: [
        {
          name: '1st Nine Weeks',
          code: '1 Nin Wks',
        },
        {
          name: '2nd Nine Weeks',
          code: '2 Nin Wks',
        },
        {
          name: 'Midterm',
          code: 'Final Sem 1',
        },
        {
          name: 'Fall Average',
          code: 'Sem 1 Avg',
        },
        {
          name: '3rd Nine Weeks',
          code: '3 Nin Wks',
        },
        {
          name: '4th Nine Weeks',
          code: '4 Nin Wks',
        },
      ],
      selectedGradingPeriod: 0,
      formula: {
        weighted: true,
      },
    });
  }, []);

  const [history, setHistory] = useState<History>([]);

  const historyProvider = useMemo(
    () => ({ history, setHistory }),
    [history, setHistory]
  );

  useEffect(() => {
    setHistory([...history, router.route]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.route]);

  useEffect(() => {
    if (authState.currentUser) {
      getData(authState.currentUser.uid);
    }
  }, [authState.currentUser]);

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
          type: 'website',
          locale: AppConfig.locale,
          url,
          title: AppConfig.title,
          description: AppConfig.description,
          site_name: AppConfig.site_name,
          images: [],
        }}
        canonical={url}
      />
      <div>
        <AuthContext.Provider value={authProvider}>
          <AppDataContext.Provider value={appDataProvider}>
            <HistoryContext.Provider value={historyProvider}>
              <RouteGuard>
                <>
                  <Header
                    currentRoute={router.route}
                    pageTitle={pageProps.pageTitle}
                  />

                  <AnimateSharedLayout>
                    <Component {...pageProps} cannonical={url} key={url} />
                  </AnimateSharedLayout>
                </>
              </RouteGuard>
            </HistoryContext.Provider>
          </AppDataContext.Provider>
        </AuthContext.Provider>
      </div>
    </>
  );
};

export default MyApp;
