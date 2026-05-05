// spencer-lynch/lib/hooks/use-reduced-motion.ts
"use client";
import { useEffect, useState } from "react";

const QUERY = "(prefers-reduced-motion: reduce)";

export function useReducedMotion(): boolean {
  // SSR-safe: server render returns false (no autoplay block on server)
  const [prefers, setPrefers] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;
    const mql = window.matchMedia(QUERY);
    setPrefers(mql.matches);
    const handler = (e: MediaQueryListEvent) => setPrefers(e.matches);
    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
  }, []);

  return prefers;
}
