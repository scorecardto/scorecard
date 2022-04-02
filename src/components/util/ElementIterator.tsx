import React, { useEffect, useState } from 'react';

type IElementIteratorProps = {
  items: {
    duration: number;
    element: JSX.Element;
  }[];
  props?: JSX.Element['props'];
  transitionDuration?: number;
};

export default function ElementIterator({
  items,
  props,
  transitionDuration,
}: IElementIteratorProps) {
  const [opacity, setOpacity] = useState(1);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    setOpacity(1);

    setTimeout(() => {
      setOpacity(0);
    }, items[index]?.duration ?? 0);

    setTimeout(() => {
      if (index + 1 === items.length) setIndex(0);
      else setIndex(index + 1);
    }, (items[index]?.duration ?? 0) + (transitionDuration ?? 150));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index]);

  return (
    <div {...props} style={{ ...props?.style, opacity }}>
      {items[index]?.element ?? <> </>}
    </div>
  );
}
