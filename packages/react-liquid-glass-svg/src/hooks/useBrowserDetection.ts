'use client';

import { useEffect, useState } from 'react';

const IOS_REGEX = /iPad|iPhone|iPod/;
const SAFARI_REGEX = /^((?!chrome|android).)*safari/i;

/**
 * Detects if the browser has limited SVG filter support (Safari/iOS)
 * Uses feature detection combined with user agent as fallback
 */
const detectFullFilterSupport = (): boolean => {
  if (typeof window === 'undefined') return true;

  const userAgent = window.navigator.userAgent;
  const isLimited = IOS_REGEX.test(userAgent) || SAFARI_REGEX.test(userAgent);
  return !isLimited;
};

/**
 * Custom hook for detecting browser capabilities.
 * Returns whether the browser fully supports advanced SVG filter primitives
 * (non-Safari, non-iOS). When `false`, consumers should render a simplified
 * filter fallback.
 *
 * Hydration-safe: both server and the first client render return `true`
 * (assume full support), matching the server HTML. The actual detection
 * runs in `useEffect` (client-only, after hydration) and triggers a
 * re-render if a fallback is needed.
 */
export const useBrowserDetection = () => {
  const [hasFullFilterSupport, setHasFullFilterSupport] = useState(true);

  useEffect(() => {
    // Intentional: detection must run on the client after hydration so the
    // first render matches the server HTML. The follow-up re-render is the
    // whole point of this pattern.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setHasFullFilterSupport(detectFullFilterSupport());
  }, []);

  return { hasFullFilterSupport };
};
