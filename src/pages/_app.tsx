import { useEffect } from 'react';

import { AnimateSharedLayout } from 'framer-motion';
import { DefaultSeo } from 'next-seo';
import { AppProps } from 'next/app';
import '../styles/global.css';
import Head from 'next/head';

import Header from '@/components/structure/Header';
import { AppConfig } from '@/lib/AppConfig';
import { updateColorScheme } from '@/lib/ColorSchemeHandler';

const MyApp = ({ Component, pageProps, router }: AppProps) => {
  const url = `https://scorecard.to${router.route}`;

  useEffect(() => {
    updateColorScheme();
  }, []);

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
      <Header
        currentRoute={router.route}
        pageTitle={pageProps.pageTitle}
      ></Header>
      <AnimateSharedLayout>
        <Component {...pageProps} cannonical={url} key={url} />
      </AnimateSharedLayout>
    </>
  );
};

export default MyApp;
