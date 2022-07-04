import type { AppProps } from "next/app";
import Head from "next/head";
import { DefaultSeo } from "next-seo";
import "../styles/globals.css";

function MyApp({ Component, pageProps, router }: AppProps) {
  const url = `https://scorecard.to${router.route}`;

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
          url,
          title: "Scorecard",
          description:
            "Scorecard: Free Gradebook Viewer for Frontline with Grade Testing, History, and GPA.",
          site_name: "Scorecard",
          images: [],
        }}
        canonical={url}
      />
      <Component {...pageProps} cannonical={url} key={url} />
    </>
  );
}

export default MyApp;
