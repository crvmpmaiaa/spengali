"use client";
import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import {
  PlayingCard,
  buildShuffledTrickDeck,
  type Card,
} from "./playing-card";

type Stage = "intro" | "round-1" | "round-2" | "round-3" | "reveal";

const ROW_LABELS = ["Top row", "Middle row", "Bottom row"] as const;
const TOTAL_ROUNDS_BEFORE_REVEAL = 3;

/**
 * Reorders a 21-card deck so the indicated row's cards land in the middle 7.
 * Deck is laid out column-by-column into a 3-row × 7-column grid:
 *   grid[row][col] = deck[col * 3 + row]
 * After 3 rounds of "pick row → gather with row in middle → re-deal", the
 * spectator's card is mathematically forced to deck[10], which is the dead
 * centre (row 1, col 3) of the next deal. Pure column-by-column dealing math.
 */
function gatherWithMiddleRow(deck: Card[], pickedRow: 0 | 1 | 2): Card[] {
  const rows: Card[][] = [[], [], []];
  for (let c = 0; c < 7; c++) {
    for (let r = 0; r < 3; r++) {
      rows[r].push(deck[c * 3 + r]);
    }
  }
  const others = ([0, 1, 2] as const).filter((r) => r !== pickedRow);
  return [...rows[others[0]], ...rows[pickedRow], ...rows[others[1]]];
}

export function TwentyOneCardTrick({ onClose }: { onClose: () => void }) {
  const [stage, setStage] = useState<Stage>("intro");
  const [deck, setDeck] = useState<Card[]>(() => buildShuffledTrickDeck());
  const [transitioning, setTransitioning] = useState(false);

  const grid = useMemo<Card[][]>(() => {
    const out: Card[][] = [[], [], []];
    for (let c = 0; c < 7; c++) {
      for (let r = 0; r < 3; r++) {
        out[r].push(deck[c * 3 + r]);
      }
    }
    return out;
  }, [deck]);

  // After three rounds, the spectator's card is at deck[10] (row 1, col 3 of
  // the next deal). The reveal pulls that card directly.
  const forcedCard = deck[10];

  function handleStart() {
    setStage("round-1");
  }

  function handleRowPick(rowIndex: 0 | 1 | 2) {
    if (transitioning) return;
    setTransitioning(true);
    const next = gatherWithMiddleRow(deck, rowIndex);
    setDeck(next);

    // Sequence: let the layout animation play, then advance stage.
    setTimeout(() => {
      setStage((current) => {
        if (current === "round-1") return "round-2";
        if (current === "round-2") return "round-3";
        return "reveal";
      });
      setTransitioning(false);
    }, 700);
  }

  function handleRestart() {
    setDeck(buildShuffledTrickDeck());
    setStage("intro");
  }

  if (stage === "intro") {
    return (
      <div className="flex flex-col items-center text-center">
        <p className="font-mono text-[10px] uppercase tracking-eyebrow-wide text-gold/85">
          A small piece of close-up
        </p>
        <h2 className="mt-4 font-display text-3xl italic leading-tight text-cream md:text-5xl">
          Pick a card. Any card.
        </h2>
        <p className="mx-auto mt-6 max-w-[420px] text-sm leading-relaxed text-cream/80 md:text-base">
          You'll see twenty-one cards on the next screen. Look at one. Memorise
          it. Don't tell me what it is — just hold it in your mind.
        </p>
        <button
          type="button"
          onClick={handleStart}
          className="mt-8 border border-gold/60 bg-ink-warm px-7 py-3 font-mono text-[11px] uppercase tracking-eyebrow text-gold transition-colors hover:bg-gold/10"
        >
          I have a card
        </button>
      </div>
    );
  }

  if (stage === "reveal") {
    return (
      <div className="flex flex-col items-center text-center">
        <p className="font-mono text-[10px] uppercase tracking-eyebrow-wide text-gold/85">
          The reveal
        </p>
        <h2 className="mt-4 font-display text-3xl italic leading-tight text-cream md:text-5xl">
          Was it the …
        </h2>
        <motion.div
          initial={{ rotateY: 180, scale: 0.6, opacity: 0 }}
          animate={{ rotateY: 0, scale: 1, opacity: 1 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          style={{ perspective: 1500 }}
          className="mt-8 flex justify-center"
        >
          <PlayingCard card={forcedCard} big highlight />
        </motion.div>
        <p className="mt-6 font-display text-2xl italic text-cream md:text-3xl">
          {forcedCard.rank} of {suitName(forcedCard.suit)}.
        </p>
        <p className="mx-auto mt-3 max-w-[460px] text-sm leading-relaxed text-cream/75">
          That's the trick from a website. Imagine what twenty years of doing
          it in person looks like.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <button
            type="button"
            onClick={handleRestart}
            className="border border-gold/40 bg-ink-warm px-6 py-3 font-mono text-[11px] uppercase tracking-eyebrow text-cream/80 transition-colors hover:bg-gold/10 hover:text-cream"
          >
            Try again
          </button>
          <button
            type="button"
            onClick={onClose}
            className="border border-gold bg-gold/15 px-6 py-3 font-mono text-[11px] uppercase tracking-eyebrow text-gold transition-colors hover:bg-gold/25"
          >
            Book Spencer
          </button>
        </div>
      </div>
    );
  }

  // Rounds 1-3 share the same UI: grid + row prompt
  const roundNumber =
    stage === "round-1" ? 1 : stage === "round-2" ? 2 : 3;

  return (
    <div className="flex flex-col items-center text-center">
      <p className="font-mono text-[10px] uppercase tracking-eyebrow-wide text-gold/85">
        Round {roundNumber} of {TOTAL_ROUNDS_BEFORE_REVEAL}
      </p>
      <h2 className="mt-3 font-display text-2xl italic leading-tight text-cream md:text-3xl">
        Which row is your card in?
      </h2>

      <div className="mt-6 grid w-full max-w-[640px] gap-1.5 md:gap-2">
        {grid.map((row, rowIndex) => (
          <motion.button
            key={`row-${rowIndex}`}
            type="button"
            onClick={() => handleRowPick(rowIndex as 0 | 1 | 2)}
            disabled={transitioning}
            className={cn(
              "group grid grid-cols-7 gap-1.5 border border-transparent p-1.5 transition-colors md:gap-2 md:p-2",
              !transitioning && "hover:border-gold/40 hover:bg-gold/5",
              transitioning && "cursor-not-allowed opacity-60",
            )}
            aria-label={`${ROW_LABELS[rowIndex]} - my card is here`}
          >
            {row.map((card) => (
              <PlayingCard key={card.id} card={card} />
            ))}
          </motion.button>
        ))}
      </div>

      <p className="mt-5 font-mono text-[10px] uppercase tracking-eyebrow text-cream/55">
        Tap the row containing your card
      </p>
    </div>
  );
}

function suitName(suit: Card["suit"]): string {
  switch (suit) {
    case "♠":
      return "Spades";
    case "♥":
      return "Hearts";
    case "♦":
      return "Diamonds";
    case "♣":
      return "Clubs";
  }
}
