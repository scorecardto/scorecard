import { createContext, Dispatch, SetStateAction } from 'react';

import { GoogleAuthProvider, signInWithPopup, User } from 'firebase/auth';

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

export const signInWithGoogle = () => {
  signInWithPopup(auth, provider).then(() => {});
};

export type AuthState = {
  currentUser: User | null;
};
