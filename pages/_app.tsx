import type { AppProps } from "next/app";
import Head from "next/head";
import { DefaultSeo } from "next-seo";
import "../styles/globals.css";
import { GradebookRecord, LoadingContext, DataContext } from "scorecard-types";
import { useMemo, useState } from "react";

function MyApp({ Component, pageProps, router }: AppProps) {
  const [data, setData] = useState<GradebookRecord | null>(null);
  const [gradingPeriod, setGradingPeriod] = useState<number>(0);

  const dataContext = useMemo(
    () => ({
      data,
      setData,
      gradingPeriod,
      setGradingPeriod,
    }),
    [data, gradingPeriod, setGradingPeriod]
  );

  const [loading, setLoading] = useState(false);

  const reloadContent = () => {
    // do nothing
  };

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

      <LoadingContext.Provider value={{ loading, setLoading, reloadContent }}>
        <DataContext.Provider value={dataContext}>
          <Component {...pageProps} />
        </DataContext.Provider>
      </LoadingContext.Provider>
    </>
  );
}

export default MyApp;
