import React, { useContext, useState } from 'react';

import { IoLogOutOutline, IoPeopleOutline } from 'react-icons/io5';

import StaticCard from '../card/StaticCard';
import ContextMenu, { ContextMenuState } from '../interactive/ContextMenu';
import { AuthContext } from '@/lib/context/AuthContext';

export default function AccountsMenu() {
  const [accountsContextShowing, setAccountsContextShowing] =
    useState<ContextMenuState>('CLOSED');

  const auth = useContext(AuthContext);
  return (
    <div className="relative">
      <StaticCard
        icon={<IoPeopleOutline />}
        colored={false}
        onClick={(e) => {
          if (accountsContextShowing === 'CLOSED') {
            setAccountsContextShowing('OPENING');
          } else if (accountsContextShowing === 'OPEN') {
            setAccountsContextShowing('CLOSING');
          }
          e.preventDefault();
          e.stopPropagation();
        }}
      >
        Accounts
      </StaticCard>

      <ContextMenu
        shown={accountsContextShowing}
        setShown={setAccountsContextShowing}
        transformOrigin={'TR'}
      >
        <div>
          <div className="max-w-[240px] text-ellipsis">
            <p className="text-day-700 dark:text-night-700 text-sm whitespace-nowrap">
              Your Account
            </p>
            <p className="whitespace-nowrap">
              {auth.auth.currentUser?.displayName ?? 'Not Logged In'}
            </p>
          </div>
          <StaticCard
            icon={<IoLogOutOutline />}
            colored={false}
            onClick={() => {
              auth.setAuth({ ...auth.auth, currentUser: null });
              setAccountsContextShowing('CLOSING');
            }}
          >
            Logout
          </StaticCard>
        </div>
      </ContextMenu>
    </div>
  );
}
