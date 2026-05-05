"use client";
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
const SUITS: Suit[] = ["♠", "♥", "♦", "♣"];

/** Builds a freshly-shuffled 21-card subset from a standard 52-card deck. */
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

export function PlayingCard({
  card,
  highlight = false,
  big = false,
}: {
  card: Card;
  highlight?: boolean;
  big?: boolean;
}) {
  const red = isRed(card.suit);

  return (
    <motion.div
      layout
      transition={{ type: "spring", stiffness: 380, damping: 32 }}
      className={cn(
        "relative aspect-[5/7] select-none rounded-[6px] bg-white shadow-[0_2px_6px_rgba(0,0,0,0.4)] ring-1 ring-black/10",
        highlight && "ring-2 ring-gold shadow-[0_0_28px_rgba(212,175,55,0.6),0_2px_6px_rgba(0,0,0,0.5)]",
        big ? "w-32 md:w-40" : "w-full",
      )}
    >
      <div
        className={cn(
          "absolute left-1 top-0.5 flex flex-col items-center font-display leading-none",
          red ? "text-red-600" : "text-black",
          big ? "text-sm md:text-base" : "text-[8px] md:text-[10px]",
        )}
      >
        <span className="font-semibold">{card.rank}</span>
        <span className={big ? "text-xs md:text-sm" : "text-[8px] md:text-[10px]"}>
          {card.suit}
        </span>
      </div>
      <div
        className={cn(
          "absolute right-1 bottom-0.5 flex rotate-180 flex-col items-center font-display leading-none",
          red ? "text-red-600" : "text-black",
          big ? "text-sm md:text-base" : "text-[8px] md:text-[10px]",
        )}
      >
        <span className="font-semibold">{card.rank}</span>
        <span className={big ? "text-xs md:text-sm" : "text-[8px] md:text-[10px]"}>
          {card.suit}
        </span>
      </div>
      <div
        className={cn(
          "absolute inset-0 flex items-center justify-center font-display",
          red ? "text-red-600" : "text-black",
          big ? "text-4xl md:text-5xl" : "text-base md:text-xl",
        )}
      >
        {card.suit}
      </div>
    </motion.div>
  );
}
