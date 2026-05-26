import { useCallback, useSyncExternalStore } from "react";

const canUseMatchMedia = (): boolean =>
  typeof window !== "undefined" && typeof window.matchMedia === "function";

const matchesQuery = (query: string) =>
  canUseMatchMedia() ? window.matchMedia(query).matches : false;

export const useMediaQuery = (query: string): boolean => {
  const subscribe = useCallback(
    (notify: () => void) => {
      if (!canUseMatchMedia()) {
        return () => {};
      }
      const mql = window.matchMedia(query);
      mql.addEventListener("change", notify);
      return () => mql.removeEventListener("change", notify);
    },
    [query],
  );

  return useSyncExternalStore(
    subscribe,
    () => matchesQuery(query),
    () => false,
  );
};

export const useIsMobile = () => useMediaQuery("(max-width: 639px)");
