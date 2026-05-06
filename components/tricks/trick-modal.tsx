"use client";
import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";

export function TrickModal({
  open,
  onClose,
  children,
  className,
}: {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  className?: string;
}) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="trick-modal"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
            className={cn(
              "relative max-h-[92vh] w-[min(96vw,820px)] overflow-y-auto border border-gold/40 bg-gradient-to-b from-ink-tinted to-ink-warm p-6 text-cream shadow-[0_32px_80px_rgba(0,0,0,0.7)] md:p-10",
              className,
            )}
            role="dialog"
            aria-modal="true"
          >
            <span className="pointer-events-none absolute left-2 top-2 h-[18px] w-[18px] border-l border-t border-gold" />
            <span className="pointer-events-none absolute right-2 top-2 h-[18px] w-[18px] border-r border-t border-gold" />
            <span className="pointer-events-none absolute bottom-2 left-2 h-[18px] w-[18px] border-b border-l border-gold" />
            <span className="pointer-events-none absolute bottom-2 right-2 h-[18px] w-[18px] border-b border-r border-gold" />

            <button
              type="button"
              onClick={onClose}
              aria-label="Close trick"
              className="absolute right-4 top-4 z-10 flex h-8 w-8 items-center justify-center border border-gold/40 bg-ink/60 font-mono text-[12px] text-cream transition-colors hover:bg-gold/20"
            >
              ✕
            </button>

            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
