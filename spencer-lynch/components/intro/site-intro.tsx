"use client";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useReducedMotion } from "@/lib/hooks/use-reduced-motion";

const STORAGE_KEY = "sl-intro-seen";

/**
 * Site-intro overlay. Plays a short cinematic clip of Spencer materialising
 * from smoke, performing a flourish, and dissolving back into smoke. The
 * video sits on top of the hero with `mix-blend-mode: screen` so its
 * pure-black background drops to transparent, leaving only the smoke +
 * character composited over the live homepage.
 *
 * Skipped silently when:
 *   - The viewer has seen it this session (sessionStorage flag)
 *   - The viewer prefers reduced motion
 *   - The video asset 404s (errors out before play)
 */
export function SiteIntro({
  videoSrc = "/intro/spencer-emerges.mp4",
  posterSrc = "/intro/spencer-still.png",
}: {
  videoSrc?: string;
  posterSrc?: string;
}) {
  const reducedMotion = useReducedMotion();
  const [open, setOpen] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (reducedMotion) return;
    const seen = window.sessionStorage.getItem(STORAGE_KEY);
    if (seen) return;
    setOpen(true);
  }, [reducedMotion]);

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
          className="pointer-events-none fixed inset-0 z-[100] flex items-center justify-center"
          aria-hidden={!open}
        >
          <video
            ref={videoRef}
            src={videoSrc}
            poster={posterSrc}
            autoPlay
            muted
            playsInline
            preload="auto"
            onEnded={dismiss}
            onError={() => setOpen(false)}
            onCanPlay={() => {
              videoRef.current?.play().catch(() => {});
            }}
            className="h-full max-h-[100vh] w-auto select-none object-contain"
            style={{ mixBlendMode: "screen" }}
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
