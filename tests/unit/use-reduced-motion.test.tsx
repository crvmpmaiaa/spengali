// spencer-lynch/tests/unit/use-reduced-motion.test.tsx
import { renderHook, act } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { useReducedMotion } from "@/lib/hooks/use-reduced-motion";

let listeners: Array<(e: MediaQueryListEvent) => void> = [];
let currentMatch = false;

beforeEach(() => {
  listeners = [];
  currentMatch = false;
  vi.stubGlobal("matchMedia", (query: string) => ({
    matches: currentMatch,
    media: query,
    addEventListener: (_: string, cb: (e: MediaQueryListEvent) => void) => {
      listeners.push(cb);
    },
    removeEventListener: (_: string, cb: (e: MediaQueryListEvent) => void) => {
      listeners = listeners.filter((l) => l !== cb);
    },
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    dispatchEvent: () => true,
  }));
});

describe("useReducedMotion", () => {
  it("returns false by default when the OS does not prefer reduced motion", () => {
    currentMatch = false;
    const { result } = renderHook(() => useReducedMotion());
    expect(result.current).toBe(false);
  });

  it("returns true when the OS prefers reduced motion", () => {
    currentMatch = true;
    const { result } = renderHook(() => useReducedMotion());
    expect(result.current).toBe(true);
  });

  it("updates when the OS preference changes", () => {
    currentMatch = false;
    const { result } = renderHook(() => useReducedMotion());
    expect(result.current).toBe(false);
    act(() => {
      currentMatch = true;
      listeners.forEach((l) => l({ matches: true } as MediaQueryListEvent));
    });
    expect(result.current).toBe(true);
  });
});
