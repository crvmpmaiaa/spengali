"use client";
import { useRef, useCallback, useState } from "react";
import { motion } from "framer-motion";

export type Suit = "spades" | "hearts" | "diamonds" | "clubs";

export type CredentialCardProps = {
  suit: Suit;
  rank: string;
  title: string;
  body: string;
};

const SUIT_COLOR: Record<Suit, string> = {
  spades: "#D4AF37",
  hearts: "#C8102E",
  diamonds: "#C8102E",
  clubs: "#D4AF37",
};

function SuitArt({ suit }: { suit: Suit }) {
  const color = SUIT_COLOR[suit];

  if (suit === "spades") {
    return (
      <svg viewBox="0 0 80 96" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: "52%", height: "auto" }}>
        {/* Outer decorative ring */}
        <ellipse cx="40" cy="44" rx="32" ry="32" stroke={color} strokeWidth="0.5" strokeDasharray="2 3" opacity="0.35" />
        {/* Spade blade */}
        <path
          d="M40 8 C40 8 12 28 12 48 C12 60 20 66 30 63 C26 72 24 78 20 82 L60 82 C56 78 54 72 50 63 C60 66 68 60 68 48 C68 28 40 8 40 8Z"
          stroke={color}
          strokeWidth="1.2"
          strokeLinejoin="round"
          fill="none"
        />
        {/* Inner highlight line on blade */}
        <path
          d="M40 16 C40 16 20 32 20 48 C20 56 25 61 32 59"
          stroke={color}
          strokeWidth="0.5"
          opacity="0.4"
          fill="none"
        />
        {/* Small decorative dots */}
        <circle cx="40" cy="6" r="1.5" fill={color} opacity="0.6" />
        <circle cx="14" cy="28" r="1" fill={color} opacity="0.4" />
        <circle cx="66" cy="28" r="1" fill={color} opacity="0.4" />
        <circle cx="14" cy="60" r="1" fill={color} opacity="0.4" />
        <circle cx="66" cy="60" r="1" fill={color} opacity="0.4" />
        {/* Base line */}
        <line x1="28" y1="82" x2="52" y2="82" stroke={color} strokeWidth="0.5" opacity="0.5" />
      </svg>
    );
  }

  if (suit === "hearts") {
    return (
      <svg viewBox="0 0 80 96" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: "52%", height: "auto" }}>
        <ellipse cx="40" cy="46" rx="32" ry="32" stroke={color} strokeWidth="0.5" strokeDasharray="2 3" opacity="0.3" />
        {/* Heart outline */}
        <path
          d="M40 76 C40 76 10 56 10 36 C10 23 18 14 28 16 C34 17 39 21 40 27 C41 21 46 17 52 16 C62 14 70 23 70 36 C70 56 40 76 40 76Z"
          stroke={color}
          strokeWidth="1.2"
          strokeLinejoin="round"
          fill="none"
        />
        {/* Inner shimmer */}
        <path
          d="M40 68 C40 68 16 52 16 36 C16 26 22 19 30 19"
          stroke={color}
          strokeWidth="0.5"
          opacity="0.35"
          fill="none"
        />
        {/* Radiating lines */}
        <line x1="40" y1="6" x2="40" y2="12" stroke={color} strokeWidth="0.8" opacity="0.5" />
        <line x1="8" y1="20" x2="12" y2="24" stroke={color} strokeWidth="0.8" opacity="0.4" />
        <line x1="72" y1="20" x2="68" y2="24" stroke={color} strokeWidth="0.8" opacity="0.4" />
        <circle cx="40" cy="4" r="1.5" fill={color} opacity="0.6" />
        <circle cx="6" cy="18" r="1" fill={color} opacity="0.4" />
        <circle cx="74" cy="18" r="1" fill={color} opacity="0.4" />
        <circle cx="10" cy="58" r="1" fill={color} opacity="0.3" />
        <circle cx="70" cy="58" r="1" fill={color} opacity="0.3" />
      </svg>
    );
  }

  if (suit === "diamonds") {
    return (
      <svg viewBox="0 0 80 96" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: "52%", height: "auto" }}>
        <ellipse cx="40" cy="46" rx="32" ry="32" stroke={color} strokeWidth="0.5" strokeDasharray="2 3" opacity="0.3" />
        {/* Diamond outline */}
        <path
          d="M40 10 L68 46 L40 82 L12 46 Z"
          stroke={color}
          strokeWidth="1.2"
          strokeLinejoin="round"
          fill="none"
        />
        {/* Inner facet lines */}
        <path d="M40 10 L40 46" stroke={color} strokeWidth="0.5" opacity="0.35" />
        <path d="M40 46 L40 82" stroke={color} strokeWidth="0.5" opacity="0.35" />
        <path d="M12 46 L68 46" stroke={color} strokeWidth="0.5" opacity="0.35" />
        {/* Facet diagonals */}
        <path d="M40 10 L68 46" stroke={color} strokeWidth="0.3" opacity="0.2" />
        <path d="M40 10 L12 46" stroke={color} strokeWidth="0.3" opacity="0.2" />
        {/* Corner dots */}
        <circle cx="40" cy="8" r="1.5" fill={color} opacity="0.7" />
        <circle cx="40" cy="84" r="1.5" fill={color} opacity="0.7" />
        <circle cx="10" cy="46" r="1.5" fill={color} opacity="0.7" />
        <circle cx="70" cy="46" r="1.5" fill={color} opacity="0.7" />
        {/* Center facet dot */}
        <circle cx="40" cy="46" r="2" fill="none" stroke={color} strokeWidth="0.8" opacity="0.5" />
      </svg>
    );
  }

  // clubs
  return (
    <svg viewBox="0 0 80 96" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: "52%", height: "auto" }}>
      <ellipse cx="40" cy="44" rx="32" ry="32" stroke={color} strokeWidth="0.5" strokeDasharray="2 3" opacity="0.3" />
      {/* Three circles forming club */}
      <circle cx="40" cy="26" r="14" stroke={color} strokeWidth="1.2" fill="none" />
      <circle cx="26" cy="46" r="14" stroke={color} strokeWidth="1.2" fill="none" />
      <circle cx="54" cy="46" r="14" stroke={color} strokeWidth="1.2" fill="none" />
      {/* Inner circle highlights */}
      <path d="M33 20 A14 14 0 0 1 47 20" stroke={color} strokeWidth="0.5" opacity="0.35" fill="none" />
      <path d="M19 42 A14 14 0 0 1 23 52" stroke={color} strokeWidth="0.5" opacity="0.35" fill="none" />
      <path d="M57 42 A14 14 0 0 1 61 52" stroke={color} strokeWidth="0.5" opacity="0.35" fill="none" />
      {/* Stem */}
      <path d="M40 56 C40 56 38 68 34 74 L46 74 C42 68 40 56 40 56Z" stroke={color} strokeWidth="1.2" strokeLinejoin="round" fill="none" />
      {/* Base */}
      <line x1="30" y1="74" x2="50" y2="74" stroke={color} strokeWidth="0.8" opacity="0.6" />
      {/* Dots */}
      <circle cx="40" cy="8" r="1.5" fill={color} opacity="0.5" />
      <circle cx="12" cy="30" r="1" fill={color} opacity="0.35" />
      <circle cx="68" cy="30" r="1" fill={color} opacity="0.35" />
    </svg>
  );
}

function CornerMark({ rank, suit, flipped }: { rank: string; suit: Suit; flipped?: boolean }) {
  const color = SUIT_COLOR[suit];
  const glyph = { spades: "♠", hearts: "♥", diamonds: "♦", clubs: "♣" }[suit];
  return (
    <div
      style={{
        position: "absolute",
        ...(flipped
          ? { bottom: "10px", right: "10px", transform: "rotate(180deg)" }
          : { top: "10px", left: "10px" }),
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        lineHeight: 1,
        color,
        fontFamily: "'Georgia', serif",
        pointerEvents: "none",
        zIndex: 2,
        gap: "1px",
      }}
    >
      <span style={{ fontSize: "0.85rem", fontWeight: 700, letterSpacing: "-0.03em" }}>{rank}</span>
      <span style={{ fontSize: "0.65rem" }}>{glyph}</span>
    </div>
  );
}

// Four corner bracket ornaments
function CornerBrackets({ color }: { color: string }) {
  const size = 14;
  const corners = [
    { style: { top: 8, left: 8 }, rotate: 0 },
    { style: { top: 8, right: 8 }, rotate: 90 },
    { style: { bottom: 8, right: 8 }, rotate: 180 },
    { style: { bottom: 8, left: 8 }, rotate: 270 },
  ];
  return (
    <>
      {corners.map(({ style, rotate }, i) => (
        <svg
          key={i}
          width={size}
          height={size}
          viewBox="0 0 14 14"
          style={{ position: "absolute", ...style, transform: `rotate(${rotate}deg)`, pointerEvents: "none", zIndex: 3 }}
        >
          <path d="M1 13 L1 1 L13 1" stroke={color} strokeWidth="1" fill="none" strokeLinecap="round" />
        </svg>
      ))}
    </>
  );
}

export function CredentialCard({ suit, rank, title, body }: CredentialCardProps) {
  const [locked, setLocked] = useState(false);  // click locks it flipped
  const [hovered, setHovered] = useState(false);
  const flipped = locked || hovered;
  const wrapRef = useRef<HTMLDivElement>(null);
  const shineRef = useRef<HTMLDivElement>(null);
  const suitColor = SUIT_COLOR[suit];

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!wrapRef.current || !shineRef.current) return;
    const rect = wrapRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    const rotX = (y - 0.5) * -8;
    const rotY = (x - 0.5) * 8;
    wrapRef.current.style.transform = `perspective(900px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale(1.03)`;
    shineRef.current.style.opacity = "1";
    shineRef.current.style.background = `radial-gradient(circle at ${x * 100}% ${y * 100}%, rgba(212,175,55,0.15) 0%, rgba(255,255,255,0.04) 45%, transparent 70%)`;
  }, []);

  const handleMouseEnter = useCallback(() => setHovered(true), []);

  const handleMouseLeave = useCallback(() => {
    if (!wrapRef.current || !shineRef.current) return;
    wrapRef.current.style.transform = "";
    shineRef.current.style.opacity = "0";
    setHovered(false);
  }, []);

  const cardStyle: React.CSSProperties = {
    position: "absolute",
    inset: 0,
    borderRadius: "12px",
    border: `1px solid ${suitColor}55`,
    boxShadow: `0 0 0 1px ${suitColor}11 inset, 0 0 40px rgba(0,0,0,0.6), 0 24px 60px rgba(0,0,0,0.6)`,
    background: `radial-gradient(ellipse at 50% 30%, #1e1508 0%, #0d0b08 60%, #080808 100%)`,
    overflow: "hidden",
  };

  return (
    <div
      ref={wrapRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="relative aspect-[5/7] w-full"
      style={{ transition: "transform 0.12s ease", willChange: "transform" }}
    >
      {/* Specular shine */}
      <div
        ref={shineRef}
        style={{
          position: "absolute",
          inset: 0,
          opacity: 0,
          transition: "opacity 0.12s",
          pointerEvents: "none",
          zIndex: 20,
          borderRadius: "12px",
        }}
      />

      <button
        type="button"
        onClick={() => setLocked((v) => !v)}
        aria-pressed={locked}
        aria-label={`${title} - tap to ${locked ? "unlock" : "lock open"}`}
        className="group relative h-full w-full select-none focus:outline-none"
        style={{ perspective: "1500px" }}
      >
        <motion.div
          animate={{ rotateY: flipped ? 180 : 0 }}
          transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
          style={{ position: "relative", width: "100%", height: "100%", transformStyle: "preserve-3d" }}
        >
          {/* ── BACK FACE ── */}
          <div style={{ ...cardStyle, backfaceVisibility: "hidden" }}>
            <CornerBrackets color={suitColor} />
            <CornerMark rank={rank} suit={suit} />
            <CornerMark rank={rank} suit={suit} flipped />

            {/* Center suit illustration */}
            <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "10px" }}>
              <SuitArt suit={suit} />
              <span
                style={{
                  fontFamily: "'Georgia', serif",
                  fontSize: "0.55rem",
                  letterSpacing: "0.22em",
                  textTransform: "uppercase",
                  color: `${suitColor}80`,
                }}
              >
                tap to reveal
              </span>
            </div>

            {/* Subtle inner glow at center */}
            <div style={{
              position: "absolute",
              top: "25%",
              left: "50%",
              transform: "translate(-50%, 0)",
              width: "60%",
              height: "55%",
              background: `radial-gradient(ellipse, ${suitColor}08 0%, transparent 70%)`,
              pointerEvents: "none",
            }} />
          </div>

          {/* ── FRONT FACE ── */}
          <div
            style={{
              ...cardStyle,
              backfaceVisibility: "hidden",
              transform: "rotateY(180deg)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "clamp(16px, 4%, 28px)",
              textAlign: "center",
            }}
          >
            <CornerBrackets color={suitColor} />

            {/* Top rank row */}
            <div style={{ width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center", fontFamily: "'Georgia', serif" }}>
              <span style={{ fontSize: "0.75rem", fontWeight: 700, color: suitColor }}>{rank}</span>
              <span style={{ fontSize: "0.6rem", color: suitColor }}>
                {{ spades: "♠", hearts: "♥", diamonds: "♦", clubs: "♣" }[suit]}
              </span>
            </div>

            {/* Copy */}
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "10px", padding: "0 4px" }}>
              <h3
                style={{
                  fontFamily: "'Georgia', serif",
                  fontStyle: "italic",
                  fontSize: "clamp(1rem, 3vw, 1.3rem)",
                  lineHeight: 1.15,
                  color: "#F5E6C8",
                  margin: 0,
                }}
              >
                {title}
              </h3>
              <p
                style={{
                  fontSize: "clamp(0.65rem, 1.8vw, 0.78rem)",
                  lineHeight: 1.6,
                  color: "rgba(245,230,200,0.75)",
                  margin: 0,
                }}
              >
                {body}
              </p>
            </div>

            {/* Bottom rank row (rotated) */}
            <div
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                transform: "rotate(180deg)",
                fontFamily: "'Georgia', serif",
              }}
            >
              <span style={{ fontSize: "0.75rem", fontWeight: 700, color: suitColor }}>{rank}</span>
              <span style={{ fontSize: "0.6rem", color: suitColor }}>
                {{ spades: "♠", hearts: "♥", diamonds: "♦", clubs: "♣" }[suit]}
              </span>
            </div>
          </div>
        </motion.div>
      </button>
    </div>
  );
}
