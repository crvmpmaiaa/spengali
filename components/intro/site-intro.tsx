"use client";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useReducedMotion } from "@/lib/hooks/use-reduced-motion";
import { BASE_PATH } from "@/lib/base-path";

const STORAGE_KEY = "sl-intro-seen";

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
  // Start open=true so the black overlay is visible immediately — no flash of content
  const [open, setOpen] = useState(true);
  const [src, setSrc] = useState(videoSrc);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  function dismiss() {
    if (typeof window !== "undefined") {
      window.sessionStorage.setItem(STORAGE_KEY, "1");
    }
    setOpen(false);
    onDismiss?.();
  }

  useEffect(() => {
    if (typeof window === "undefined") return;

    if (mobileSrc && window.matchMedia("(max-width: 767px)").matches) {
      setSrc(`${BASE_PATH}${mobileSrc}`);
    }

    // Dismiss immediately (no video) if reduced motion or already seen
    if (reducedMotion) { dismiss(); return; }
    const seen = window.sessionStorage.getItem(STORAGE_KEY);
    if (seen) { dismiss(); return; }
  }, [reducedMotion, mobileSrc]);

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
            onError={dismiss}
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
