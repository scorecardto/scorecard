import { useEffect } from 'react';

import { AppProps } from 'next/app';

import '../styles/global.css';
import { listen, updateColorScheme } from '@/lib/ColorSchemeHandler';

const MyApp = ({ Component, pageProps }: AppProps) => {
  useEffect(() => {
    updateColorScheme();
    listen();
  }, []);

  return <Component {...pageProps} />;
};

export default MyApp;
