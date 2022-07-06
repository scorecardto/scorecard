import { useEffect, useState } from "react";

export const useMediaQuery = (query: string, invert?: boolean) => {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const mediaMatch = window.matchMedia(query);
    setMatches(invert ? !mediaMatch.matches : mediaMatch.matches);

    const handler = (e: any) => setMatches(invert ? !e.matches : e.matches);
    mediaMatch.addListener(handler);
    return () => mediaMatch.removeListener(handler);
  }, [query, invert]);

  return matches;
};
