"use client";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useReducedMotion } from "@/lib/hooks/use-reduced-motion";

const STORAGE_KEY = "sl-intro-seen";

/**
 * Site-intro overlay. Plays a short cinematic clip of Spencer materialising
 * from smoke, performing a flourish, and dissolving back into smoke.
 *
 * Approach: instead of using mix-blend-mode (unreliable on <video> in some
 * browsers), the overlay shows a Playwright-captured screenshot of the live
 * hero as a full-screen backdrop. The Kling video sits centred on top of
 * that backdrop with screen blend, so the smoke + Spencer composite over
 * what looks like the live hero. When the video ends, the entire overlay
 * fades out, revealing the actual homepage already mounted underneath.
 *
 * Skipped silently when:
 *   - The viewer has seen it this session (sessionStorage flag)
 *   - The viewer prefers reduced motion
 *   - The video asset 404s
 */
export function SiteIntro({
  videoSrc = "/intro/spencer-emerges.mp4",
  backdropSrc = "/intro/hero-snapshot.jpg",
}: {
  videoSrc?: string;
  backdropSrc?: string;
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
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[100] overflow-hidden bg-ink"
          aria-hidden={!open}
        >
          {/* Static hero snapshot as the backdrop */}
          <div
            className="absolute inset-0 bg-cover bg-top bg-no-repeat"
            style={{ backgroundImage: `url(${backdropSrc})` }}
            aria-hidden="true"
          />

          {/* Kling video centred on top, screen-blends with the snapshot */}
          <div className="absolute inset-0 flex items-center justify-center">
            <video
              ref={videoRef}
              src={videoSrc}
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
          </div>

          {/* Skip button on top of everything */}
          <div className="absolute inset-x-0 top-0 flex items-start justify-end p-5 md:p-7">
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
