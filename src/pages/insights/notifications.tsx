import React from 'react';

import { NextSeo } from 'next-seo';

export default function NotificationsPage() {
  return (
    <div>
      <NextSeo title="Notifications" />
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
