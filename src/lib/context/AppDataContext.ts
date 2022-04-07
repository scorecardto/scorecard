import { createContext, Dispatch, SetStateAction } from 'react';

import { Course } from '../types/Course';
import { GPAFormula } from '../types/GPAFormula';
import { GradingPeriod } from '../types/GradingPeriod';

export const AppDataContext = createContext<AppDataProvider>({
  appData: null,
  setAppData: () => {},
});

export type AppDataProvider = {
  appData: AppData | null;
  setAppData: Dispatch<SetStateAction<AppData | null>>;
};

export type AppData = {
  courses: Course[];
  gradingPeriods: GradingPeriod[];
  selectedGradingPeriod: number;
  formula: GPAFormula;
};
