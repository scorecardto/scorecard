import { createContext, Dispatch, SetStateAction } from 'react';

export const HistoryContext = createContext<HistoryProvider>({
  history: [],
  setHistory: () => {},
});

export type HistoryProvider = {
  history: History;
  setHistory: Dispatch<SetStateAction<History>>;
};

export type History = string[];
