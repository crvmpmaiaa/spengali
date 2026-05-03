"use client";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useReducedMotion } from "@/lib/hooks/use-reduced-motion";

const STORAGE_KEY = "sl-intro-seen";
// Total time the still is on screen (ms). 0.6s fade-in + 2.8s hold + 0.6s fade-out.
const HOLD_MS = 4000;

/**
 * Site-intro overlay. While we wait for the Kling animated video, this
 * displays a still 3D render of Spencer composited over the hero via
 * mix-blend-mode: screen. Pure-black areas of the source drop to transparent
 * so the homepage stays visible behind him.
 *
 * Skipped silently when:
 *   - The viewer has seen it this session (sessionStorage flag)
 *   - The viewer prefers reduced motion
 *
 * Drop a transparent-on-black PNG at /public/intro/spencer-still.png to
 * enable. When the Kling video lands, swap to <video> in this component.
 */
export function SiteIntro({
  stillSrc = "/intro/spencer-still.png",
}: {
  stillSrc?: string;
}) {
  const reducedMotion = useReducedMotion();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (reducedMotion) return;
    const seen = window.sessionStorage.getItem(STORAGE_KEY);
    if (seen) return;
    setOpen(true);
  }, [reducedMotion]);

  useEffect(() => {
    if (!open) return;
    const t = window.setTimeout(() => {
      dismiss();
    }, HOLD_MS);
    return () => window.clearTimeout(t);
  }, [open]);

  function dismiss() {
    if (typeof window !== "undefined") {
      window.sessionStorage.setItem(STORAGE_KEY, "1");
    }
    setOpen(false);
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="site-intro"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          // Transparent container so the hero stays visible. The image
          // uses `mix-blend-mode: screen` so its pure-black background drops
          // to transparent, leaving only Spencer composited on top.
          className="pointer-events-none fixed inset-0 z-[100] flex items-center justify-center"
          aria-hidden={!open}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <motion.img
            src={stillSrc}
            alt=""
            initial={{ scale: 0.96 }}
            animate={{ scale: 1 }}
            transition={{ duration: HOLD_MS / 1000, ease: "linear" }}
            onError={() => setOpen(false)}
            className="h-full max-h-[92vh] w-auto select-none object-contain"
            style={{ mixBlendMode: "screen" }}
            draggable={false}
          />

          <div className="pointer-events-auto absolute inset-x-0 top-0 flex items-start justify-end p-5 md:p-7">
            <button
              type="button"
              onClick={dismiss}
              className="border border-gold/40 bg-ink/70 px-4 py-2 font-mono text-[10px] uppercase tracking-eyebrow text-cream/80 backdrop-blur transition-colors hover:bg-gold/15 hover:text-cream"
            >
              Skip intro
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
