"use client";
import { useEffect, useState } from "react";

const VAULT_KEY = "sl-vault-unlocked";

function AllSeeingEye() {
  return (
    <svg
      width="120"
      height="104"
      viewBox="0 0 120 104"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <polygon
        points="60,6 114,98 6,98"
        stroke="#D4AF37"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <ellipse cx="60" cy="70" rx="18" ry="11" stroke="#D4AF37" strokeWidth="1.5" />
      <circle cx="60" cy="70" r="5" stroke="#D4AF37" strokeWidth="1.5" />
    </svg>
  );
}

export function VaultContent() {
  const [unlocked, setUnlocked] = useState<boolean | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setUnlocked(localStorage.getItem(VAULT_KEY) !== null);
  }, []);

  if (unlocked === null) return null;

  if (!unlocked) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-ink">
        <span className="font-mono text-2xl text-gold">?</span>
      </div>
    );
  }

  function handleCopy() {
    navigator.clipboard.writeText(window.location.href).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-ink px-6 py-16 text-center">
      <div className="mx-auto max-w-[480px]">
        <AllSeeingEye />

        <p className="mt-8 font-mono text-[10px] uppercase tracking-eyebrow text-gold/85">
          — You found it —
        </p>

        <h1 className="mt-4 font-display text-4xl italic text-cream md:text-5xl">
          The Vault
        </h1>

        <p className="mt-6 font-display text-lg italic leading-relaxed text-cream/70">
          "Not many people find this place. The ones who do understand
          something most people never will: the secret isn't in the hands.
          It's in where you're looking."
        </p>

        <div className="mx-auto my-8 h-px w-24 bg-gradient-to-r from-transparent via-gold/60 to-transparent" />

        <div className="flex items-center justify-center gap-3">
          <span className="break-all font-mono text-xs text-cream/50">
            {typeof window !== "undefined" ? window.location.href : ""}
          </span>
          <button
            type="button"
            onClick={handleCopy}
            aria-label={copied ? "Copied" : "Copy link"}
            className="shrink-0 border border-gold/40 px-3 py-1 font-mono text-[10px] uppercase tracking-eyebrow text-cream/70 transition-colors hover:bg-gold/10"
          >
            {copied ? "Copied!" : "Copy"}
          </button>
        </div>

        <p className="mt-10 font-display text-sm italic text-cream/40">
          — Keep it to yourself. Or don't.
        </p>

        <a
          href="/"
          className="mt-8 inline-block font-mono text-[10px] uppercase tracking-eyebrow text-cream/40 transition-colors hover:text-cream/70"
        >
          ← Back
        </a>
      </div>
    </div>
  );
}
