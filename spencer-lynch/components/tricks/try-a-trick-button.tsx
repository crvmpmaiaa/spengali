"use client";
import { useState } from "react";
import { TrickModal } from "./trick-modal";
import { TwentyOneCardTrick } from "./twenty-one-card-trick";

export function TryATrickButton() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Open a magic trick"
        className="border border-gold/60 bg-ink-warm px-7 py-3 font-mono text-[11px] uppercase tracking-eyebrow text-gold transition-colors hover:bg-gold/10"
      >
        ⌕ Try a Trick
      </button>
      <TrickModal open={open} onClose={() => setOpen(false)}>
        <TwentyOneCardTrick onClose={() => setOpen(false)} />
      </TrickModal>
    </>
  );
}
