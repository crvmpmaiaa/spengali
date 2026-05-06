"use client";
import { useRef, useCallback } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export type Suit = "♠" | "♥" | "♦" | "♣";
export type Rank =
  | "A"
  | "2"
  | "3"
  | "4"
  | "5"
  | "6"
  | "7"
  | "8"
  | "9"
  | "10"
  | "J"
  | "Q"
  | "K";

export type Card = { suit: Suit; rank: Rank; id: string };

const RANKS: Rank[] = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
const SUITS: Suit[] = ["♣", "♥", "♠", "♦"];

export function buildShuffledTrickDeck(): Card[] {
  const full: Card[] = [];
  for (const suit of SUITS) {
    for (const rank of RANKS) {
      full.push({ suit, rank, id: `${rank}${suit}` });
    }
  }
  for (let i = full.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [full[i], full[j]] = [full[j], full[i]];
  }
  return full.slice(0, 21);
}

const isRed = (suit: Suit) => suit === "♥" || suit === "♦";
const CARD_RED = "#C8102E";
const CARD_BLACK = "#1A1A1A";

function CornerIndex({
  rank,
  suit,
  flipped,
  big,
}: {
  rank: Rank;
  suit: Suit;
  flipped?: boolean;
  big: boolean;
}) {
  const color = isRed(suit) ? CARD_RED : CARD_BLACK;
  const pos = flipped
    ? { bottom: big ? "7px" : "3px", right: big ? "8px" : "3.5px" }
    : { top: big ? "7px" : "3px", left: big ? "8px" : "3.5px" };

  return (
    <div
      style={{
        position: "absolute",
        ...pos,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        lineHeight: 1,
        color,
        transform: flipped ? "rotate(180deg)" : undefined,
        fontFamily: "'Georgia', 'Times New Roman', serif",
        pointerEvents: "none",
        zIndex: 2,
      }}
    >
      <span
        style={{
          fontWeight: 700,
          fontSize: big
            ? "clamp(0.85rem, 2.5vw, 1.1rem)"
            : "clamp(0.42rem, 1.3vw, 0.6rem)",
          letterSpacing: "-0.02em",
        }}
      >
        {rank}
      </span>
      <span
        style={{
          fontSize: big
            ? "clamp(0.7rem, 2vw, 0.88rem)"
            : "clamp(0.36rem, 1.1vw, 0.5rem)",
          marginTop: "-0.05em",
        }}
      >
        {suit}
      </span>
    </div>
  );
}

function CardCenter({ rank, suit, big }: { rank: Rank; suit: Suit; big: boolean }) {
  const color = isRed(suit) ? CARD_RED : CARD_BLACK;
  const isFace = rank === "J" || rank === "Q" || rank === "K";

  if (rank === "A") {
    return (
      <span
        style={{
          color,
          fontSize: big
            ? "clamp(2.2rem, 6vw, 3.4rem)"
            : "clamp(0.95rem, 2.8vw, 1.55rem)",
          lineHeight: 1,
          fontFamily: "'Georgia', serif",
          display: "block",
          filter: "drop-shadow(0 1px 2px rgba(0,0,0,0.13))",
        }}
      >
        {suit}
      </span>
    );
  }

  if (isFace) {
    return (
      <div
        style={{
          color,
          textAlign: "center",
          fontFamily: "'Georgia', 'Times New Roman', serif",
          lineHeight: 1,
        }}
      >
        <div
          style={{
            fontStyle: "italic",
            fontWeight: 700,
            fontSize: big
              ? "clamp(1.5rem, 4.5vw, 2.4rem)"
              : "clamp(0.7rem, 2.2vw, 1.15rem)",
            filter: "drop-shadow(0 1px 2px rgba(0,0,0,0.15))",
          }}
        >
          {rank}
        </div>
        <div
          style={{
            fontSize: big
              ? "clamp(0.9rem, 2.8vw, 1.5rem)"
              : "clamp(0.44rem, 1.4vw, 0.72rem)",
            marginTop: "0.18em",
            opacity: 0.88,
          }}
        >
          {suit}
        </div>
      </div>
    );
  }

  return (
    <span
      style={{
        color,
        fontSize: big
          ? "clamp(1.2rem, 3.5vw, 2rem)"
          : "clamp(0.58rem, 1.8vw, 1rem)",
        lineHeight: 1,
        fontFamily: "'Georgia', serif",
        filter: "drop-shadow(0 1px 1px rgba(0,0,0,0.1))",
      }}
    >
      {suit}
    </span>
  );
}

export function PlayingCard({
  card,
  highlight = false,
  big = false,
}: {
  card: Card;
  highlight?: boolean;
  big?: boolean;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const shineRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!cardRef.current || !shineRef.current) return;
      const rect = cardRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
      const maxTilt = big ? 18 : 10;
      const scale = big ? 1.05 : 1.08;
      const rotX = (y - 0.5) * -maxTilt;
      const rotY = (x - 0.5) * maxTilt;
      cardRef.current.style.transform = `perspective(700px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale(${scale})`;
      shineRef.current.style.opacity = "1";
      shineRef.current.style.background = `radial-gradient(circle at ${x * 100}% ${y * 100}%, rgba(255,255,255,${big ? 0.48 : 0.38}) 0%, transparent 65%)`;
    },
    [big],
  );

  const handleMouseLeave = useCallback(() => {
    if (!cardRef.current || !shineRef.current) return;
    cardRef.current.style.transform = "";
    shineRef.current.style.opacity = "0";
  }, []);

  const boxShadow = highlight
    ? "0 0 0 2px #D4AF37, 0 0 32px rgba(212,175,55,0.55), 0 6px 24px rgba(0,0,0,0.55), 0 2px 6px rgba(0,0,0,0.3), inset 0 0 0 0.5px rgba(255,255,255,0.9)"
    : big
      ? "0 2px 4px rgba(0,0,0,0.18), 0 8px 20px rgba(0,0,0,0.2), 0 20px 40px rgba(0,0,0,0.12), inset 0 0 0 0.5px rgba(0,0,0,0.07)"
      : "0 1px 2px rgba(0,0,0,0.22), 0 3px 8px rgba(0,0,0,0.16), inset 0 0 0 0.5px rgba(0,0,0,0.07)";

  const radius = big ? "10px" : "5px";
  const innerRadius = big ? "7px" : "3px";
  const innerInset = big ? "5px" : "2.5px";

  return (
    <motion.div
      layout
      transition={{ type: "spring", stiffness: 380, damping: 32 }}
      className={cn(big ? "w-32 md:w-44" : "w-full")}
      style={{ aspectRatio: "5/7", position: "relative" }}
    >
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          width: "100%",
          height: "100%",
          position: "relative",
          borderRadius: radius,
          backgroundColor: "#FDFAF6",
          backgroundImage: `
            linear-gradient(rgba(0,0,0,0.022) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,0,0,0.022) 1px, transparent 1px)
          `,
          backgroundSize: big ? "8px 8px" : "4px 4px",
          boxShadow,
          transition: "transform 0.1s ease, box-shadow 0.2s ease",
          overflow: "hidden",
          userSelect: "none",
        }}
      >
        {/* Specular shine */}
        <div
          ref={shineRef}
          style={{
            position: "absolute",
            inset: 0,
            opacity: 0,
            transition: "opacity 0.1s",
            pointerEvents: "none",
            zIndex: 10,
            borderRadius: radius,
          }}
        />

        <CornerIndex rank={card.rank} suit={card.suit} big={!!big} />

        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1,
          }}
        >
          <CardCenter rank={card.rank} suit={card.suit} big={!!big} />
        </div>

        <CornerIndex rank={card.rank} suit={card.suit} flipped big={!!big} />

        {/* Inner decorative frame */}
        <div
          style={{
            position: "absolute",
            inset: innerInset,
            border: `${big ? "0.75px" : "0.4px"} solid rgba(0,0,0,0.1)`,
            borderRadius: innerRadius,
            pointerEvents: "none",
            zIndex: 1,
          }}
        />
      </div>
    </motion.div>
  );
}
