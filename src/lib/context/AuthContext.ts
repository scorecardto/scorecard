import { createContext, Dispatch, SetStateAction } from 'react';

import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithRedirect,
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

const googleProvider = new GoogleAuthProvider();

export const signInWithGoogle = (): Promise<UserCredential> => {
  return signInWithRedirect(auth, googleProvider);
};

export const signInWithEmail = (
  email: string,
  password: string,
  newUser: boolean
): Promise<UserCredential> => {
  if (newUser) {
    return createUserWithEmailAndPassword(auth, email, password);
  }
  return signInWithEmailAndPassword(auth, email, password);
};

export const signOut = (): Promise<void> => {
  return auth.signOut();
};

export type AuthState = {
  currentUser: User | null;
};
