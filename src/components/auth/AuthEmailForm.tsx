import React from 'react';

import TabSwitcher from '../interactive/TabSwitcher';

type IAuthEmailFormProps = {
  newUser: boolean;
};

export default function AuthEmailForm({ newUser }: IAuthEmailFormProps) {
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
      <form className="flex flex-col gap-4 mt-4">
        <label>
          <span className="text-day-500 dark:text-night-500 mb-1 block">
            Email
          </span>
          <input
            placeholder="Email"
            type={'email'}
            className="block bg-day-100 dark:bg-night-100 border border-day-300 dark:border-night-300 py-2 px-3 w-72 rounded-md outline-none text-day-700 dark:text-night-700 focus:border-theme-200"
          />
        </label>
        <label>
          <span className="text-day-500 dark:text-night-500 mb-1 block">
            Password
          </span>
          <input
            placeholder="Password"
            type={'password'}
            className="block bg-day-100 dark:bg-night-100 border border-day-300 dark:border-night-300 py-2 px-3 w-72 rounded-md outline-none text-day-700 dark:text-night-700 focus:border-theme-200"
          />
        </label>
        {newUser && (
          <label>
            <span className="text-day-500 dark:text-night-500 mb-1 block">
              Confirm Password
            </span>
            <input
              placeholder="Confirm Password"
              type={'password'}
              className="block bg-day-100 dark:bg-night-100 border border-day-300 dark:border-night-300 py-2 px-3 w-72 rounded-md outline-none text-day-700 dark:text-night-700 focus:border-theme-200"
            />
          </label>
        )}
        <input
          onSubmit={(e) => {
            e.preventDefault();
          }}
          type={'submit'}
          value={newUser ? 'Signup' : 'Login'}
          className="bg-theme-100 dark:bg-theme-200 text-theme-200 dark:text-white py-2 rounded-md mt-2"
        />
      </form>
    </div>
  );
}