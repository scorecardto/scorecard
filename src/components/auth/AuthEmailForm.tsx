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
      <div>
        <input
          placeholder="Email"
          type={'email'}
          className="block bg-day-100 dark:bg-night-100 border border-day-300 dark:border-night-300 py-2 px-3 w-72 rounded-md outline-none text-day-700 dark:text-night-700 focus:border-theme-200"
        />
        <input
          placeholder="Password"
          type={'password'}
          className="block bg-day-100 dark:bg-night-100 border border-day-300 dark:border-night-300 py-2 px-3 w-72 rounded-md outline-none text-day-700 dark:text-night-700 focus:border-theme-200"
        />
      </div>
    </div>
  );
}
