import { useEffect, useState } from 'react';

/**
 * React hook to subscribe to a CSS media query.
 * Returns true if the query matches, false otherwise.
 * Safe for SSR (returns false on server).
 */
/**
 * React hook to subscribe to a CSS media query.
 * @param query CSS media query string
 * @returns true if the query matches, false otherwise
 * @example
 *   const isMobile = useMediaQuery('(max-width: 640px)');
 */
export function useMediaQuery(query: string): boolean {
  const getMatches = () =>
    typeof window !== 'undefined' && typeof window.matchMedia === 'function'
      ? window.matchMedia(query).matches
      : false;

  const [matches, setMatches] = useState<boolean>(getMatches);

  useEffect(() => {
    if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
      setMatches(false);
      return;
    }
    const media = window.matchMedia(query);
    const listener = (e: MediaQueryListEvent) => setMatches(e.matches);
    media.addEventListener('change', listener);
    setMatches(media.matches);
    return () => media.removeEventListener('change', listener);
  }, [query]);

  return matches;
}
