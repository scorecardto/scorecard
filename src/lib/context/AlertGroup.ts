import { createContext, Dispatch, SetStateAction } from 'react';

import { ConfirmAlertData } from '../types/AlertData';

export const AlertGroupContext = createContext<AlertGroupProvider>({
  alerts: [],
  setAlerts: () => {},
});

export type AlertGroupProvider = {
  alerts: ConfirmAlertData[];
  setAlerts: Dispatch<SetStateAction<AlertGroupProvider['alerts']>>;
};
