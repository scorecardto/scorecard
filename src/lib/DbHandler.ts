import { doc, getDoc } from 'firebase/firestore';

import { db } from './firebase';

// const DEFAULT_INITIAL_DATA = {

// }
export const getData = async (userId: string) => {
  const user = await doc(db, 'users', userId);
  const userRef = await getDoc(user);

  if (userRef.exists()) {
    console.log(userRef.data());
  } else {
    console.log("User doesn't exist yet");
  }
};
