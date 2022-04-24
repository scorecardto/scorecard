import React from 'react';

import { NextSeo } from 'next-seo';

import AuthPanel from '@/components/auth/AuthPanel';

export default function Login() {
  return (
    <div>
      <NextSeo title="Login" />
      <AuthPanel tab={'LOGIN'} />
    </div>
  );
}
