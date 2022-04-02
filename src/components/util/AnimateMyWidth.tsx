import React, { useEffect, useState } from 'react';

type IAnimateMyWidthProps = {
  children: JSX.Element;
};

export default function AnimateMyWidth({ children }: IAnimateMyWidthProps) {
  const childRef = React.createRef<HTMLDivElement>();

  const [width, setWidth] = useState(0);
  const [childState, setChildState] = useState(children);
  const [opacity, setOpacity] = useState(1);

  useEffect(() => {
    const oldWidth = width;
    const newWidth = childRef.current?.clientWidth ?? 0;

    setWidth(newWidth);

    setOpacity(0);

    setTimeout(
      () => {
        setOpacity(1);
        setChildState(children);
      },
      oldWidth > newWidth ? 300 : 0
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [children]);

  return (
    <div
      style={{
        width,
        transition: '0.3s width ease, 0.3s opacity ease',
        overflow: 'hidden',
        opacity,
      }}
    >
      <div className="w-fit whitespace-nowrap">{childState}</div>

      <div
        ref={childRef}
        className="w-fit whitespace-nowrap invisible absolute"
      >
        {children}
      </div>
    </div>
  );
}
