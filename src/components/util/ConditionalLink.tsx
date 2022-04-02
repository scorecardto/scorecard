import React from 'react';

import Link from 'next/link';

type IConditionalLinkProps = {
  enabled: boolean;
  href?: string;
  children: JSX.Element;
};

export default function ConditionalLink({
  enabled,
  children,
  href,
}: IConditionalLinkProps) {
  return (
    <Link href={href ?? '#'}>
      <a
        onClick={(e) => {
          if (!enabled) {
            e.preventDefault();
            e.stopPropagation();
          }
        }}
      >
        {children}
      </a>
    </Link>
  );
}
