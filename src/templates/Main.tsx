import React, { ReactNode } from 'react';

type IMainProps = {
  meta: ReactNode;
  children: ReactNode;
};

const Main = (props: IMainProps) => {
  return (
    <>
      {props.meta}
      {props.children}
    </>
  );
};

export { Main };
