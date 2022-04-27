import React from 'react';

import { IoLogoGoogle } from 'react-icons/io5';

import Auth3rdPartyButton from '@/components/auth/Auth3rdPartyButton';
import { signInWithGoogle } from '@/lib/context/AuthContext';

export default function LoginWithGoogle() {
  return (
    <div className="text-center flex flex-col gap-6 px-20 py-2">
      <h3 className="text-2xl font-medium text-day-700 dark:text-night-700">
        Continue with Google
      </h3>
      <p className="text-day-400 dark:text-night-400">
        You&apos;re using Google to sign up or sign in to Scorecard. We strongly
        reccomend using your school-issued account.
      </p>
      <hr className="border-day-300 dark:border-night-300 py-2"></hr>
      <span className="mx-auto w-fit block">
        <Auth3rdPartyButton
          label="Sign In"
          onClick={() => {
            signInWithGoogle();
          }}
          backgroundColor="#e86f5e"
          dark="#e65b43"
        >
          <IoLogoGoogle />
        </Auth3rdPartyButton>
        <div
          className="text-day-400 dark:text-night-400 mt-4 bg-day-200 dark:bg-night-200 py-2 px-3 border border-day-300 dark:border-night-300 rounded-md cursor-pointer"
          onClick={() => {
            window.close();
          }}
        >
          Nevermind
        </div>
      </span>
    </div>
  );
}
