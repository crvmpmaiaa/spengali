"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export type Suit = "spades" | "hearts" | "diamonds" | "clubs";

const SUIT_GLYPH: Record<Suit, string> = {
  spades: "♠",
  hearts: "♥",
  diamonds: "♦",
  clubs: "♣",
};

const SUIT_TONE: Record<Suit, string> = {
  spades: "text-cream",
  hearts: "text-red-logo",
  diamonds: "text-red-logo",
  clubs: "text-cream",
};

export type CredentialCardProps = {
  suit: Suit;
  rank: string;
  title: string;
  body: string;
};

export function CredentialCard({ suit, rank, title, body }: CredentialCardProps) {
  const [flipped, setFlipped] = useState(false);
  const glyph = SUIT_GLYPH[suit];
  const tone = SUIT_TONE[suit];

  return (
    <button
      type="button"
      onClick={() => setFlipped((v) => !v)}
      aria-pressed={flipped}
      aria-label={`${title} - tap to ${flipped ? "hide" : "reveal"}`}
      className="group relative aspect-[5/7] w-full select-none [perspective:1500px] focus:outline-none"
    >
      <motion.div
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
        className="relative h-full w-full [transform-style:preserve-3d]"
      >
        {/* Back face - suit on a dark card */}
        <div
          className={cn(
            "absolute inset-0 flex flex-col items-center justify-center border border-gold/40 bg-gradient-to-br from-ink-warm to-ink-tinted [backface-visibility:hidden]",
            "shadow-[0_24px_60px_rgba(0,0,0,0.6),inset_0_0_0_1px_rgba(212,175,55,0.15)]",
            "transition-shadow duration-500 group-hover:shadow-[0_28px_68px_rgba(0,0,0,0.75),inset_0_0_0_1px_rgba(212,175,55,0.3)]",
          )}
        >
          <span className="pointer-events-none absolute left-2 top-2 h-[14px] w-[14px] border-l border-t border-gold/70" />
          <span className="pointer-events-none absolute right-2 top-2 h-[14px] w-[14px] border-r border-t border-gold/70" />
          <span className="pointer-events-none absolute bottom-2 left-2 h-[14px] w-[14px] border-b border-l border-gold/70" />
          <span className="pointer-events-none absolute bottom-2 right-2 h-[14px] w-[14px] border-b border-r border-gold/70" />

          <span className={cn("font-mono text-[10px] uppercase tracking-eyebrow-wide text-gold/85")}>
            {rank}
          </span>
          <span
            className={cn(
              "mt-3 font-display text-[80px] leading-none md:text-[110px]",
              tone,
            )}
            style={{ textShadow: "0 6px 24px rgba(0,0,0,0.4)" }}
          >
            {glyph}
          </span>
          <span className="mt-4 font-mono text-[9px] uppercase tracking-eyebrow text-cream/55">
            Tap to reveal
          </span>
        </div>

        {/* Front face - the credential copy */}
        <div
          className={cn(
            "absolute inset-0 flex flex-col items-center justify-between border border-gold/55 bg-gradient-to-br from-ink-warm to-ink p-5 text-center [backface-visibility:hidden] [transform:rotateY(180deg)] md:p-7",
            "shadow-[0_24px_60px_rgba(0,0,0,0.65),inset_0_0_0_1px_rgba(212,175,55,0.18)]",
          )}
        >
          <span className="pointer-events-none absolute left-2 top-2 h-[14px] w-[14px] border-l border-t border-gold/70" />
          <span className="pointer-events-none absolute right-2 top-2 h-[14px] w-[14px] border-r border-t border-gold/70" />
          <span className="pointer-events-none absolute bottom-2 left-2 h-[14px] w-[14px] border-b border-l border-gold/70" />
          <span className="pointer-events-none absolute bottom-2 right-2 h-[14px] w-[14px] border-b border-r border-gold/70" />

          <div className="flex w-full items-center justify-between font-mono text-[10px] uppercase tracking-eyebrow-wide">
            <span className="text-gold/85">{rank}</span>
            <span className={tone}>{glyph}</span>
          </div>

          <div className="flex flex-col items-center px-1">
            <h3 className="font-display text-xl italic leading-[1.1] text-cream md:text-2xl">
              {title}
            </h3>
            <p className="mt-3 text-[12px] leading-relaxed text-cream/85 md:text-sm">
              {body}
            </p>
          </div>

          <div className="flex w-full rotate-180 items-center justify-between font-mono text-[10px] uppercase tracking-eyebrow-wide">
            <span className="text-gold/85">{rank}</span>
            <span className={tone}>{glyph}</span>
          </div>
        </div>
      </motion.div>
    </button>
  );
}
