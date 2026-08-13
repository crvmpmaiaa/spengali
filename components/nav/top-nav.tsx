"use client";

import { useState } from "react";
import Link from "next/link";
import { SLLogo } from "@/components/brand/sl-logo";

const allLinks = [
  { href: "/about", label: "About", prefetch: false },
  { href: "/work", label: "Work", prefetch: false },
  { href: "/gallery", label: "Gallery", prefetch: false },
  // prefetch must stay false: with prefetch={true}, Next 16.2.12's full
  // prefetch requests /book?_rsc=... which a static export can't serve —
  // Netlify returns HTML, poisoning the router cache so navigation to
  // /book silently no-ops. See site-audit commit 699964e (next bump).
  { href: "/book", label: "Book", prefetch: false },
];

const leftLinks = allLinks.slice(0, 2);
const rightLinks = allLinks.slice(2);

export function TopNav() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <header className="relative z-30 px-4 pt-4 md:px-10 md:pt-7">
        {/* Mobile: logo centred + hamburger button */}
        <div className="relative flex items-center justify-center md:hidden">
          <Link href="/" aria-label="Spencer Lynch home" onClick={() => setOpen(false)}>
            <SLLogo variant="color" width={260} height={60} className="w-[220px]" />
          </Link>

          <button
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            className="absolute right-0 flex h-9 w-9 flex-col items-center justify-center gap-[5px] text-cream/70 transition-colors hover:text-cream"
          >
            <span
              className={`block h-px w-5 bg-current transition-all duration-300 ${open ? "translate-y-[6px] rotate-45" : ""}`}
            />
            <span
              className={`block h-px w-5 bg-current transition-all duration-300 ${open ? "opacity-0" : ""}`}
            />
            <span
              className={`block h-px w-5 bg-current transition-all duration-300 ${open ? "-translate-y-[6px] -rotate-45" : ""}`}
            />
          </button>
        </div>

        {/* Desktop: 3-col grid with side links */}
        <div className="hidden grid-cols-3 items-center gap-6 md:grid">
          <nav className="flex items-center justify-end gap-8 font-sans text-[13px] uppercase tracking-eyebrow text-cream/70">
            {leftLinks.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                prefetch={l.prefetch}
                className="transition-colors hover:text-cream"
              >
                {l.label}
              </Link>
            ))}
          </nav>

          <Link
            href="/"
            aria-label="Spencer Lynch home"
            className="flex items-center justify-center"
          >
            <SLLogo variant="color" width={290} height={68} />
          </Link>

          <nav className="flex items-center justify-start gap-8 font-sans text-[13px] uppercase tracking-eyebrow text-cream/70">
            {rightLinks.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                prefetch={l.prefetch}
                className="transition-colors hover:text-cream"
              >
                {l.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="mt-4 h-px w-full md:mt-5" style={{ background: "var(--gold-hairline)" }} />
      </header>

      {/* Mobile dropdown menu */}
      <div
        className={`fixed inset-x-0 top-0 z-20 flex flex-col bg-ink-warm transition-all duration-300 ease-in-out md:hidden ${
          open ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0 pointer-events-none"
        }`}
        aria-hidden={!open}
      >
        {/* Spacer so content clears the header */}
        <div className="h-[72px]" />
        <div className="h-px w-full" style={{ background: "var(--gold-hairline)" }} />

        <nav className="flex flex-col px-8 py-8">
          {allLinks.map((l, i) => (
            <Link
              key={l.href}
              href={l.href}
              prefetch={l.prefetch}
              onClick={() => setOpen(false)}
              className="group flex items-center justify-between border-b border-gold/10 py-5 font-display text-3xl italic text-cream/80 transition-colors hover:text-gold"
              style={{ transitionDelay: open ? `${i * 40}ms` : "0ms" }}
            >
              {l.label}
              <span className="font-mono text-[10px] not-italic uppercase tracking-eyebrow text-gold/40 transition-colors group-hover:text-gold/70">
                0{i + 1}
              </span>
            </Link>
          ))}
        </nav>

        <div className="px-8 pb-10">
          <Link
            href="/book"
            onClick={() => setOpen(false)}
            className="block w-full border border-gold/40 py-4 text-center font-mono text-[11px] uppercase tracking-eyebrow text-gold/70 transition-colors hover:border-gold hover:text-gold"
          >
            Book Spencer
          </Link>
        </div>

        <div className="h-px w-full" style={{ background: "var(--gold-hairline)" }} />
      </div>

      {/* Backdrop */}
      {open && (
        <div
          className="fixed inset-0 z-10 bg-ink/60 md:hidden"
          onClick={() => setOpen(false)}
          aria-hidden
        />
      )}
    </>
  );
}
