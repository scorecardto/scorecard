import { detect } from 'detect-browser';
import { doc, getDoc, setDoc } from 'firebase/firestore';

import { db } from './firebase';
import { SyncedAppData } from './types/SyncedAppData';
import { createInternalDeviceName, extractBrowser } from './Util';

const generateDefaultData = (): SyncedAppData => {
  const myDevice = detect();

  const browser = extractBrowser(myDevice?.name ?? 'UFO');
  const os = myDevice?.os ?? 'UFO';

  return {
    blocks: [],
    devices: [
      {
        os,
        browser,
        version: myDevice?.version ?? 'Unspecified',
        interalName: createInternalDeviceName(browser, os),
      },
    ],
    settings: {
      formula: {
        weighted: true,
      },
    },
  };
};

export const getData = async (userId: string) => {
  const userDoc = await doc(db, 'users', userId);
  const user = await getDoc(userDoc);

  if (user.exists()) {
    console.log(user.data());
  } else {
    await setDoc(userDoc, generateDefaultData());
  }
};
