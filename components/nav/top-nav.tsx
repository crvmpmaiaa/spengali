// spencer-lynch/components/nav/top-nav.tsx
import Link from "next/link";
import { SLLogo } from "@/components/brand/sl-logo";

// Two links each side of the centred logo — symmetric.
// Gallery rolls up showreel + tech-illusion content (Plan 5).
// The "Try a Trick" affordance lives in the hero now, not the nav.
const leftLinks = [
  { href: "/about", label: "About", prefetch: false },
  { href: "/work", label: "Work", prefetch: false },
];

const rightLinks = [
  { href: "/gallery", label: "Gallery", prefetch: false },
  { href: "/book", label: "Book", prefetch: true },
];

export function TopNav() {
  return (
    <header className="relative z-30 px-4 pt-4 md:px-10 md:pt-7">
      {/* Mobile: just the logo, centered, no empty grid columns */}
      <div className="flex items-center justify-center md:hidden">
        <Link href="/" aria-label="Spencer Lynch home">
          <SLLogo
            variant="color"
            width={260}
            height={60}
            className="w-[220px]"
          />
        </Link>
      </div>

      {/* Desktop: 3-col grid with side links */}
      <div className="hidden grid-cols-3 items-center gap-6 md:grid">
        {/* Left nav, right-aligned, hugs the logo */}
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

        {/* Centre logo */}
        <Link
          href="/"
          aria-label="Spencer Lynch home"
          className="flex items-center justify-center"
        >
          <SLLogo variant="color" width={290} height={68} />
        </Link>

        {/* Right nav, left-aligned, hugs the logo */}
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
  );
}
