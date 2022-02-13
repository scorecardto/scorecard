import { useEffect } from 'react';

import { AppProps } from 'next/app';

import { listen, updateColorScheme } from '@/utils/ColorSchemeHandler';
import '../styles/global.css';

const MyApp = ({ Component, pageProps }: AppProps) => {
  useEffect(() => {
    console.log('gfffi');

    updateColorScheme();
    listen();
  }, []);

  return <Component {...pageProps} />;
};

export default MyApp;
