import React from 'react';

import { NextSeo } from 'next-seo';

export default function NotificationsPage() {
  return (
    <div>
      <NextSeo title="Grade Point" />
    </div>
  );
}

export async function getStaticProps() {
  return {
    props: {
      pageTitle: 'Insights',
    },
  };
}
