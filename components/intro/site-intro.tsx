"use client";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useReducedMotion } from "@/lib/hooks/use-reduced-motion";
import { BASE_PATH } from "@/lib/base-path";

const STORAGE_KEY = "sl-intro-seen";

/**
 * Site-intro overlay. Full-screen black backdrop with a Kling-rendered clip
 * of Spencer materialising from smoke, performing a flourish, and dissolving
 * back into smoke. The video's last frame is pure black, so when the video
 * ends the overlay fades out smoothly to reveal the live homepage already
 * mounted underneath. No compositing tricks: the black overlay matches the
 * video's black bg so the transition is seamless.
 *
 * Skipped silently when:
 *   - The viewer has seen it this session (sessionStorage flag)
 *   - The viewer prefers reduced motion
 *   - The video asset 404s
 *
 * onDismiss fires in all cases (play-through, skip, error) so callers can
 * gate downstream autoplay on the intro completing.
 */
export function SiteIntro({
  videoSrc = `${BASE_PATH}/intro/spencer-emerges.mp4`,
  mobileSrc,
  onDismiss,
}: {
  videoSrc?: string;
  mobileSrc?: string;
  onDismiss?: () => void;
}) {
  const reducedMotion = useReducedMotion();
  const [open, setOpen] = useState(false);
  const [src, setSrc] = useState(videoSrc);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Swap to mobile src on narrow viewports when one is provided
    if (mobileSrc && window.matchMedia("(max-width: 767px)").matches) {
      setSrc(`${BASE_PATH}${mobileSrc}`);
    }

    if (reducedMotion) { onDismiss?.(); return; }
    const seen = window.sessionStorage.getItem(STORAGE_KEY);
    if (seen) { onDismiss?.(); return; }
    setOpen(true);
  }, [reducedMotion, mobileSrc, onDismiss]);

  function dismiss() {
    if (typeof window !== "undefined") {
      window.sessionStorage.setItem(STORAGE_KEY, "1");
    }
    setOpen(false);
    onDismiss?.();
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="site-intro"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black"
          aria-hidden={!open}
        >
          <video
            ref={videoRef}
            src={src}
            autoPlay
            muted
            playsInline
            preload="auto"
            onEnded={dismiss}
            onError={() => { setOpen(false); onDismiss?.(); }}
            onCanPlay={() => {
              videoRef.current?.play().catch(() => {});
            }}
            className="h-full w-full select-none object-cover md:object-contain"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
