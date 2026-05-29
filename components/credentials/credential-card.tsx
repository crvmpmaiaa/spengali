"use client";
import { useRef, useCallback, useState } from "react";
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
  const wrapRef = useRef<HTMLDivElement>(null);
  const shineRef = useRef<HTMLDivElement>(null);
  const glyph = SUIT_GLYPH[suit];
  const tone = SUIT_TONE[suit];

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!wrapRef.current || !shineRef.current) return;
    const rect = wrapRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    const rotX = (y - 0.5) * -14;
    const rotY = (x - 0.5) * 14;
    wrapRef.current.style.transform = `perspective(900px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale(1.03)`;
    shineRef.current.style.opacity = "1";
    shineRef.current.style.background = `radial-gradient(circle at ${x * 100}% ${y * 100}%, rgba(212,175,55,0.18) 0%, rgba(255,255,255,0.06) 40%, transparent 70%)`;
  }, []);

  const handleMouseLeave = useCallback(() => {
    if (!wrapRef.current || !shineRef.current) return;
    wrapRef.current.style.transform = "";
    shineRef.current.style.opacity = "0";
  }, []);

  return (
    <div
      ref={wrapRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative aspect-[5/7] w-full"
      style={{ transition: "transform 0.12s ease", willChange: "transform" }}
    >
      {/* Gold specular shine that follows cursor */}
      <div
        ref={shineRef}
        style={{
          position: "absolute",
          inset: 0,
          opacity: 0,
          transition: "opacity 0.12s",
          pointerEvents: "none",
          zIndex: 20,
          borderRadius: "2px",
        }}
      />

      <button
        type="button"
        onClick={() => setFlipped((v) => !v)}
        aria-pressed={flipped}
        aria-label={`${title} - tap to ${flipped ? "hide" : "reveal"}`}
        className="group relative h-full w-full select-none [perspective:1500px] focus:outline-none"
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
              "absolute inset-0 flex flex-col items-center justify-between border border-gold/55 bg-gradient-to-br from-ink-warm to-ink p-3 text-center [backface-visibility:hidden] [transform:rotateY(180deg)] md:p-7",
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

            <div className="flex min-h-0 flex-col items-center overflow-hidden px-1">
              <h3 className="font-display text-xl italic leading-[1.1] text-cream md:text-2xl">
                {title}
              </h3>
              <p className="mt-3 text-[11px] leading-snug text-cream/85 md:text-[12px] md:leading-relaxed">
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
    </div>
  );
}
