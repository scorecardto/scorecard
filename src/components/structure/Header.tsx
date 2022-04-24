import React, { useContext } from 'react';

import AppControls from './AppControls';
import { AppDataContext } from '@/lib/context/AppDataContext';

type IHeaderProps = {
  currentRoute: string;
  pageTitle?: string;
};

export default function Header({ currentRoute, pageTitle }: IHeaderProps) {
  const routeInApp =
    currentRoute !== '/login' && !currentRoute.startsWith('/about');

  const { appData, setAppData } = useContext(AppDataContext);

  return (
    <div className="_header-wrapper">
      <div className="_header-fixed fixed top-0 left-0 w-full h-12 bg-black opacity-50" />
      <div
        className={`_header-spacer ${
          routeInApp && '_includes-app-controls'
        } w-full pt-12`}
      >
        {routeInApp && appData && (
          <AppControls
            appData={appData}
            setAppData={setAppData}
            currentRoute={currentRoute}
            pageTitle={pageTitle ?? 'Scorecard'}
          />
        )}
      </div>
    </div>
  );
}
