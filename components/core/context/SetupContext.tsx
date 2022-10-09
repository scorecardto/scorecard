import { createContext, Dispatch, SetStateAction } from "react";
import { SetupState } from "scorecard-types";

export const SetupContext = createContext<SetupContextProvider>({
  setup: null,
  setSetup: () => {},
});

export interface SetupContextProvider {
  setup: SetupState | null;
  setSetup: Dispatch<SetStateAction<SetupState | null>>;
}
