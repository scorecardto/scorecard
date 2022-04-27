import React, { useMemo, useState } from 'react';

import { IoWarning } from 'react-icons/io5';

import TabSwitcher from '../interactive/TabSwitcher';
import { signInWithEmail } from '@/lib/context/AuthContext';

type IAuthEmailFormProps = {
  newUser: boolean;
};

export default function AuthEmailForm({ newUser }: IAuthEmailFormProps) {
  const [email, setEmail] = useState({ value: '', error: '' });
  const [password, setPassword] = useState({ value: '', error: '' });
  const [confirm, setConfirm] = useState({ value: '', error: '' });
  const [loading, setLoading] = useState(false);

  const [error, setError] = useState<
    { text: string; type: 'WARNING' | 'ERROR' } | undefined
  >(undefined);

  const inputDisabled = useMemo(() => {
    console.log(loading, !!email.error, !!password.error, !!confirm.error);

    return loading || !!email.error || !!password.error || !!confirm.error;
  }, [loading, email.error, password.error, confirm.error]);

  return (
    <div>
      <TabSwitcher
        tabs={[
          { name: 'Login', link: '/login' },
          { name: 'Signup', link: '/signup' },
        ]}
        selected={newUser ? 1 : 0}
        layoutId={'authEmailFormTab'}
      />
      {error && (
        <div
          className={`flex items-center gap-4 border py-2 px-3 rounded-md w-72 mt-4 ${
            error.type === 'ERROR'
              ? 'bg-red-100 text-red-400 border-red-200 dark:bg-red-900 dark:text-red-200 dark:border-red-800'
              : 'bg-orange-100 text-orange-400 border-orange-200 dark:bg-yellow-900 dark:text-yellow-200 dark:border-yellow-800'
          }`}
        >
          {error.type === 'ERROR' && <IoWarning className="text-xl w-6" />}
          <div className="w-60 text-md">{error.text}</div>
        </div>
      )}
      <form
        className="flex flex-col gap-4 mt-4"
        onSubmit={(e) => {
          e.preventDefault();

          if (newUser && password.value !== confirm.value) {
            setConfirm({
              ...confirm,
              error: "Passwords don't match.",
            });
            return;
          }

          setLoading(true);

          signInWithEmail(email.value, password.value, newUser)
            .catch((reason) => {
              setLoading(false);
              switch (reason.code) {
                case 'auth/app-deleted':
                case 'auth/app-not-authorized':
                case 'auth/invalid-api-key':
                  setError({
                    text: `Sorry, Scorecard is not available right now. ${reason.code}`,
                    type: 'ERROR',
                  });
                  break;
                case 'auth/unauthorized-domain':
                case 'auth/user-disabled':
                  setError({
                    text: `Sorry, you cannot use Scorecard right now. ${reason.code}`,
                    type: 'ERROR',
                  });
                  break;
                case 'auth/email-already-exists':
                  setEmail({
                    ...email,
                    error: 'This account already exists.',
                  });
                  break;
                case 'auth/invalid-password':
                  setPassword({
                    ...password,
                    error: 'Invalid password format.',
                  });
                  break;
                case 'auth/user-not-found':
                  setEmail({
                    ...email,
                    error: "This account doesn't exist.",
                  });
                  break;
                case 'auth/wrong-password':
                  setPassword({ ...password, error: 'Incorrect password.' });
                  break;
                case 'auth/too-many-requests':
                  setError({
                    text: "You're logging in too much. Please wait a few moments.",
                    type: 'ERROR',
                  });
                  break;
                default:
                  setError({
                    text: `Sorry, an unknown error occured. ${reason.code}`,
                    type: 'ERROR',
                  });
              }
            })
            .then(() => {
              setLoading(false);
            });
        }}
      >
        <label>
          <span className=" mb-1 flex text-sm justify-between w-full">
            <div className="text-day-400 dark:text-night-400">Email</div>
            {email.error && (
              <div className="text-red-600 dark:text-red-400">
                {email.error}
              </div>
            )}
          </span>
          <input
            value={email.value}
            onChange={(e) => {
              setEmail({ error: '', value: e.target.value });
            }}
            placeholder="Email"
            type={'email'}
            className="block bg-day-100 dark:bg-night-100 border border-day-300 dark:border-night-300 py-2 px-3 w-72 rounded-md outline-none text-day-700 dark:text-night-700 focus:border-theme-200"
          />
        </label>
        <label>
          <span className=" mb-1 flex text-sm justify-between w-full">
            <div className="text-day-400 dark:text-night-400">Password</div>
            {password.error && (
              <div className="text-red-600 dark:text-red-400">
                {password.error}
              </div>
            )}
          </span>
          <input
            value={password.value}
            onChange={(e) => {
              setPassword({ error: '', value: e.target.value });
            }}
            placeholder="Password"
            type={'password'}
            className="block bg-day-100 dark:bg-night-100 border border-day-300 dark:border-night-300 py-2 px-3 w-72 rounded-md outline-none text-day-700 dark:text-night-700 focus:border-theme-200"
          />
        </label>
        {newUser && (
          <label>
            <span className=" mb-1 flex text-sm justify-between w-72 flex-wrap">
              <div className="text-day-400 dark:text-night-400">
                Confirm Password
              </div>
              {confirm.error && (
                <div className="text-red-600 dark:text-red-400">
                  {confirm.error}
                </div>
              )}
            </span>
            <input
              value={confirm.value}
              onChange={(e) => {
                setConfirm({ error: '', value: e.target.value });
              }}
              placeholder="Confirm Password"
              type={'password'}
              className="block bg-day-100 dark:bg-night-100 border border-day-300 dark:border-night-300 py-2 px-3 w-72 rounded-md outline-none text-day-700 dark:text-night-700 focus:border-theme-200"
            />
          </label>
        )}
        <input
          disabled={inputDisabled}
          type={'submit'}
          value={newUser ? 'Signup' : 'Login'}
          className="bg-theme-100 dark:bg-theme-200 text-theme-200 dark:text-white py-2 rounded-md mt-2 disabled:opacity-50 transition-opacity"
        />
      </form>
    </div>
  );
}
