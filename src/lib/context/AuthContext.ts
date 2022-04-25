import { createContext, Dispatch, SetStateAction } from 'react';

import {
  GoogleAuthProvider,
  signInWithPopup,
  User,
  UserCredential,
} from 'firebase/auth';

import { auth } from '../firebase';

export const AuthContext = createContext<AuthProvider>({
  auth: { currentUser: null },
  setAuth: () => {},
});

export type AuthProvider = {
  auth: AuthState;
  setAuth: Dispatch<SetStateAction<AuthState>>;
};

const provider = new GoogleAuthProvider();

export const signInWithGoogle = (): Promise<UserCredential> => {
  return signInWithPopup(auth, provider);
};

export type AuthState = {
  currentUser: User | null;
};
