"use client";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useReducedMotion } from "@/lib/hooks/use-reduced-motion";
import { cn } from "@/lib/utils";

const STORAGE_KEY = "sl-intro-seen";

/**
 * Full-screen site-intro overlay. Plays a short cinematic clip of Spencer
 * emerging from smoke, doing a flourish, and vanishing again. Auto-dismisses
 * when the video ends; reveal cross-fades into the homepage which is already
 * mounted underneath.
 *
 * Skipped silently when:
 *   - The viewer has seen it this session (localStorage flag)
 *   - The viewer prefers reduced motion
 *   - The video asset 404s (errors out before play)
 *
 * Drop the video at /public/intro/spencer-emerges.mp4 (and optionally .webm)
 * to enable; the component otherwise renders nothing.
 */
export function SiteIntro({
  videoBase = "/intro/spencer-emerges",
  posterSrc = "/intro/spencer-poster.jpg",
}: {
  videoBase?: string;
  posterSrc?: string;
}) {
  const reducedMotion = useReducedMotion();
  // Start hidden so SSR doesn't flash an overlay for return visitors. The
  // mount effect decides whether to show it after checking storage + motion.
  const [open, setOpen] = useState(false);
  const [hasError, setHasError] = useState(false);
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

  if (hasError) return null;

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="site-intro"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-ink"
          aria-hidden={!open}
        >
          <video
            ref={videoRef}
            autoPlay
            muted
            playsInline
            preload="auto"
            poster={posterSrc}
            onEnded={dismiss}
            onError={() => {
              // Asset missing — bail without showing a broken state.
              setHasError(true);
              setOpen(false);
            }}
            onCanPlay={() => {
              videoRef.current?.play().catch(() => {
                // Autoplay blocked — surface a manual play, not a hang.
                // No-op: the video element still shows the poster, and the
                // skip button is rendered.
              });
            }}
            className={cn(
              "h-full w-full object-cover",
              "motion-safe:[mask-image:radial-gradient(circle_at_center,black_70%,transparent_100%)]",
            )}
          >
            <source src={`${videoBase}.webm`} type="video/webm" />
            <source src={`${videoBase}.mp4`} type="video/mp4" />
          </video>

          <button
            type="button"
            onClick={dismiss}
            className="absolute right-5 top-5 z-10 border border-gold/40 bg-ink/60 px-4 py-2 font-mono text-[10px] uppercase tracking-eyebrow text-cream/80 backdrop-blur transition-colors hover:bg-gold/15 hover:text-cream md:right-7 md:top-7"
          >
            Skip intro
          </button>

          <p className="pointer-events-none absolute bottom-6 left-1/2 -translate-x-1/2 font-mono text-[9px] uppercase tracking-eyebrow-wide text-gold/70">
            Spencer Lynch · Memorable Magic
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
