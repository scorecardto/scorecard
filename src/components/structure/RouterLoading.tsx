import React from 'react';

type IRouterLoadingProps = {
  done: boolean;
  children: JSX.Element;
};

export default function RouterLoading({ done, children }: IRouterLoadingProps) {
  return (
    <div>
      {done ? (
        <div className="_router-loaded animate-page-appear">{children}</div>
      ) : (
        <div className="_router-loading text-day-400 dark:text-night-400 w-full h-full top-0 left-0 bottom-0 right-0 absolute flex items-center justify-center">
          <p>Loading...</p>
        </div>
      )}
    </div>
  );
}
