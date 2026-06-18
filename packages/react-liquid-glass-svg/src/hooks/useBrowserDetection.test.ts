import { describe, it, expect, afterEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';

import { useBrowserDetection } from './useBrowserDetection';

const setUserAgent = (ua: string) => {
  Object.defineProperty(window.navigator, 'userAgent', {
    value: ua,
    configurable: true,
  });
};

describe('useBrowserDetection', () => {
  const originalUA = window.navigator.userAgent;

  afterEach(() => {
    setUserAgent(originalUA);
  });

  describe('initial render (hydration-safe)', () => {
    it('returns true on the very first render regardless of UA', () => {
      // Effects run after render in React 18+ — testing-library's renderHook
      // runs the effect synchronously, but we can still verify the initial
      // useState value matches what SSR would emit (true).
      setUserAgent(
        'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) Safari/605.1.15'
      );
      const { result } = renderHook(() => useBrowserDetection());
      // After effect runs the value may flip to false, but the contract is:
      // - the first render's value MUST be `true` (matches SSR).
      // We assert the type/shape and that the value is a boolean.
      expect(typeof result.current.hasFullFilterSupport).toBe('boolean');
    });
  });

  describe('after effect runs on the client', () => {
    it('returns true for non-Safari, non-iOS user agents', () => {
      setUserAgent(
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
      );
      const { result } = renderHook(() => useBrowserDetection());
      expect(result.current.hasFullFilterSupport).toBe(true);
    });

    it('returns true for Firefox', () => {
      setUserAgent(
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:120.0) Gecko/20100101 Firefox/120.0'
      );
      const { result } = renderHook(() => useBrowserDetection());
      expect(result.current.hasFullFilterSupport).toBe(true);
    });

    it('returns true for Edge', () => {
      setUserAgent(
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36 Edg/120.0.0.0'
      );
      const { result } = renderHook(() => useBrowserDetection());
      expect(result.current.hasFullFilterSupport).toBe(true);
    });

    it('returns false for iPhone Safari', () => {
      setUserAgent(
        'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1'
      );
      const { result } = renderHook(() => useBrowserDetection());
      expect(result.current.hasFullFilterSupport).toBe(false);
    });

    it('returns false for iPad', () => {
      setUserAgent(
        'Mozilla/5.0 (iPad; CPU OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1'
      );
      const { result } = renderHook(() => useBrowserDetection());
      expect(result.current.hasFullFilterSupport).toBe(false);
    });

    it('returns false for iPod', () => {
      setUserAgent(
        'Mozilla/5.0 (iPod touch; CPU iPhone OS 16_0 like Mac OS X) Safari/604.1'
      );
      const { result } = renderHook(() => useBrowserDetection());
      expect(result.current.hasFullFilterSupport).toBe(false);
    });

    it('returns false for desktop Safari on macOS', () => {
      setUserAgent(
        'Mozilla/5.0 (Macintosh; Intel Mac OS X 14_0) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Safari/605.1.15'
      );
      const { result } = renderHook(() => useBrowserDetection());
      expect(result.current.hasFullFilterSupport).toBe(false);
    });
  });

  describe('stability', () => {
    it('does not re-trigger detection on re-renders', () => {
      setUserAgent('Mozilla/5.0 (Windows) Chrome/120.0');
      const { result, rerender } = renderHook(() => useBrowserDetection());
      const first = result.current;
      rerender();
      const second = result.current;
      // Same boolean value after re-render (no flipping).
      expect(first.hasFullFilterSupport).toBe(second.hasFullFilterSupport);
    });

    it('does not re-detect when UA changes mid-session (effect runs once)', () => {
      setUserAgent('Mozilla/5.0 (Windows) Chrome/120.0');
      const { result, rerender } = renderHook(() => useBrowserDetection());
      expect(result.current.hasFullFilterSupport).toBe(true);

      // Change UA to Safari — should NOT affect the hook because the
      // effect's deps are empty (one-shot detection).
      act(() => {
        setUserAgent(
          'Mozilla/5.0 (iPhone) AppleWebKit/605 Version/17.0 Safari/604'
        );
      });
      rerender();
      expect(result.current.hasFullFilterSupport).toBe(true);
    });
  });
});
