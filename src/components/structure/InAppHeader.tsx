import React from 'react';

import AccountsMenu from './AccountsMenu';

export default function InAppHeader() {
  return (
    <div className="flex justify-between w-full">
      <div />
      <div>
        <AccountsMenu />
      </div>
    </div>
  );
}
