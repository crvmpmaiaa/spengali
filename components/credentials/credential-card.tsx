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

// Each card gets a slightly different glare timing so they don't all sweep at once
const GLARE_DELAY: Record<Suit, string> = {
  clubs:    "-6.3s",
  hearts:   "-2.1s",
  spades:   "-4.5s",
  diamonds: "-0.8s",
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
  const glareDelay = GLARE_DELAY[suit];

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!wrapRef.current || !shineRef.current) return;
    const rect = wrapRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    const rotX = (y - 0.5) * -14;
    const rotY = (x - 0.5) * 14;
    wrapRef.current.style.transform = `perspective(900px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale(1.04)`;
    shineRef.current.style.opacity = "1";
    shineRef.current.style.background = `radial-gradient(circle at ${x * 100}% ${y * 100}%, rgba(212,175,55,0.22) 0%, rgba(255,255,255,0.06) 40%, transparent 70%)`;
  }, []);

  const handleMouseLeave = useCallback(() => {
    if (!wrapRef.current || !shineRef.current) return;
    wrapRef.current.style.transform = "";
    shineRef.current.style.opacity = "0";
  }, []);

  return (
    <>
      {/* Inject keyframes once — harmless if duplicated, browser deduplicates */}
      <style>{`
        @keyframes cardGlare {
          0%   { transform: translateX(-120%) rotate(25deg); opacity: 0; }
          10%  { opacity: 1; }
          90%  { opacity: 1; }
          100% { transform: translateX(220%) rotate(25deg); opacity: 0; }
        }
        @keyframes cardFloat {
          0%, 100% { transform: translateY(0px); }
          50%       { transform: translateY(-6px); }
        }
      `}</style>

      <div
        ref={wrapRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="relative aspect-[5/7] w-full"
        style={{
          transition: "transform 2.1s cubic-bezier(0.23, 1, 0.32, 1)",
          willChange: "transform",
        }}
      >
        {/* Cursor-tracking gold specular */}
        <div
          ref={shineRef}
          style={{
            position: "absolute",
            inset: 0,
            opacity: 0,
            transition: "opacity 0.15s",
            pointerEvents: "none",
            zIndex: 30,
            borderRadius: "inherit",
          }}
        />

        {/* Coloured glow behind the card */}
        <div
          style={{
            position: "absolute",
            inset: "-12px",
            borderRadius: "40px",
            background: "radial-gradient(ellipse at 50% 60%, rgba(212,175,55,0.18) 0%, transparent 70%)",
            pointerEvents: "none",
            zIndex: -1,
            filter: "blur(12px)",
          }}
        />

        <button
          type="button"
          onClick={() => setFlipped((v) => !v)}
          aria-pressed={flipped}
          aria-label={`${title} - tap to ${flipped ? "hide" : "reveal"}`}
          className="group relative h-full w-full select-none focus:outline-none"
          style={{ perspective: "1500px" }}
        >
          <motion.div
            animate={{ rotateY: flipped ? 180 : 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="relative h-full w-full [transform-style:preserve-3d]"
          >

            {/* ── BACK FACE ── */}
            <div
              className={cn(
                "absolute inset-0 flex flex-col items-center justify-center [backface-visibility:hidden]",
                "border border-gold/40 bg-gradient-to-br from-ink-warm to-ink-tinted",
              )}
              style={{
                borderRadius: "28px 14px",
                boxShadow: "0 16px 40px rgba(212,175,55,0.12), 0 32px 64px rgba(0,0,0,0.65), inset 0 0 0 1px rgba(212,175,55,0.12)",
                overflow: "hidden",
              }}
            >
              {/* Grain texture overlay — same technique as tarotoo */}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")`,
                  backgroundSize: "160px 160px",
                  opacity: 0.04,
                  pointerEvents: "none",
                  zIndex: 2,
                  mixBlendMode: "overlay",
                }}
              />

              {/* Sweeping glare stripe */}
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "35%",
                  height: "100%",
                  background: "linear-gradient(to right, rgba(255,255,255,0) 0%, rgba(255,255,255,0.55) 50%, rgba(255,255,255,0) 100%)",
                  animationName: "cardGlare",
                  animationDuration: "8s",
                  animationDelay: glareDelay,
                  animationIterationCount: "infinite",
                  animationTimingFunction: "cubic-bezier(0.5, 0, 0.5, 1)",
                  pointerEvents: "none",
                  zIndex: 3,
                }}
              />

              {/* Corner brackets */}
              <span className="pointer-events-none absolute left-2 top-2 z-10 h-[14px] w-[14px] border-l border-t border-gold/70" />
              <span className="pointer-events-none absolute right-2 top-2 z-10 h-[14px] w-[14px] border-r border-t border-gold/70" />
              <span className="pointer-events-none absolute bottom-2 left-2 z-10 h-[14px] w-[14px] border-b border-l border-gold/70" />
              <span className="pointer-events-none absolute bottom-2 right-2 z-10 h-[14px] w-[14px] border-b border-r border-gold/70" />

              <span className="relative z-10 font-mono text-[10px] uppercase tracking-eyebrow-wide text-gold/85">
                {rank}
              </span>
              <span
                className={cn(
                  "relative z-10 mt-3 font-display text-[80px] leading-none md:text-[110px]",
                  tone,
                )}
                style={{
                  textShadow: "0 0 40px rgba(212,175,55,0.5), 0 6px 24px rgba(0,0,0,0.4)",
                  animationName: "cardFloat",
                  animationDuration: "4s",
                  animationTimingFunction: "ease-in-out",
                  animationIterationCount: "infinite",
                }}
              >
                {glyph}
              </span>
              <span className="relative z-10 mt-4 font-mono text-[9px] uppercase tracking-eyebrow text-cream/55">
                Tap to reveal
              </span>
            </div>

            {/* ── FRONT FACE ── */}
            <div
              className={cn(
                "absolute inset-0 flex flex-col items-center justify-between [backface-visibility:hidden]",
                "border border-gold/55 bg-gradient-to-br from-ink-warm to-ink",
                "p-5 text-center md:p-7",
              )}
              style={{
                borderRadius: "28px 14px",
                boxShadow: "0 16px 40px rgba(212,175,55,0.1), 0 32px 64px rgba(0,0,0,0.65), inset 0 0 0 1px rgba(212,175,55,0.15)",
                transform: "rotateY(180deg)",
                overflow: "hidden",
              }}
            >
              {/* Grain on front face too */}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")`,
                  backgroundSize: "160px 160px",
                  opacity: 0.04,
                  pointerEvents: "none",
                  zIndex: 2,
                  mixBlendMode: "overlay",
                }}
              />

              {/* Sweeping glare on front too */}
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "35%",
                  height: "100%",
                  background: "linear-gradient(to right, rgba(255,255,255,0) 0%, rgba(255,255,255,0.4) 50%, rgba(255,255,255,0) 100%)",
                  animationName: "cardGlare",
                  animationDuration: "8s",
                  animationDelay: glareDelay,
                  animationIterationCount: "infinite",
                  animationTimingFunction: "cubic-bezier(0.5, 0, 0.5, 1)",
                  pointerEvents: "none",
                  zIndex: 3,
                }}
              />

              <span className="pointer-events-none absolute left-2 top-2 z-10 h-[14px] w-[14px] border-l border-t border-gold/70" />
              <span className="pointer-events-none absolute right-2 top-2 z-10 h-[14px] w-[14px] border-r border-t border-gold/70" />
              <span className="pointer-events-none absolute bottom-2 left-2 z-10 h-[14px] w-[14px] border-b border-l border-gold/70" />
              <span className="pointer-events-none absolute bottom-2 right-2 z-10 h-[14px] w-[14px] border-b border-r border-gold/70" />

              <div className="relative z-10 flex w-full items-center justify-between font-mono text-[10px] uppercase tracking-eyebrow-wide">
                <span className="text-gold/85">{rank}</span>
                <span className={tone}>{glyph}</span>
              </div>

              <div className="relative z-10 flex flex-col items-center px-1">
                <h3 className="font-display text-xl italic leading-[1.1] text-cream md:text-2xl">
                  {title}
                </h3>
                <p className="mt-3 text-[12px] leading-relaxed text-cream/85 md:text-sm">
                  {body}
                </p>
              </div>

              <div className="relative z-10 flex w-full rotate-180 items-center justify-between font-mono text-[10px] uppercase tracking-eyebrow-wide">
                <span className="text-gold/85">{rank}</span>
                <span className={tone}>{glyph}</span>
              </div>
            </div>

          </motion.div>
        </button>
      </div>
    </>
  );
}
