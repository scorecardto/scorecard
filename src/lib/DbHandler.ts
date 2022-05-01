import { doc, getDoc, setDoc } from 'firebase/firestore';

import { db } from './firebase';
import { SyncedAppData } from './types/SyncedAppData';

const generateDefaultData = (): SyncedAppData => {
  return {
    blocks: [],
    devices: [], // implement getting current device
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
