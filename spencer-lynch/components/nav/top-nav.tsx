// spencer-lynch/components/nav/top-nav.tsx
import Link from "next/link";
import { SLLogo } from "@/components/brand/sl-logo";

// Two links each side of the centred logo — symmetric.
// Gallery rolls up showreel + tech-illusion content (Plan 5).
// The "Try a Trick" affordance lives in the hero now, not the nav.
const leftLinks = [
  { href: "/about", label: "About", prefetch: false },
  { href: "/book", label: "Book", prefetch: true },
];

const rightLinks = [
  { href: "/work", label: "Work", prefetch: false },
  { href: "/gallery", label: "Gallery", prefetch: false },
];

export function TopNav() {
  return (
    <header className="relative z-30 px-10 pt-7">
      <div className="grid grid-cols-3 items-center gap-6">
        {/* Left nav — right-aligned, hugs the logo */}
        <nav className="hidden items-center justify-end gap-8 font-sans text-[11px] uppercase tracking-eyebrow text-cream/70 md:flex">
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

        {/* Centre — logo */}
        <Link
          href="/"
          aria-label="Spencer Lynch home"
          className="flex items-center justify-center"
        >
          <SLLogo variant="no-pips" width={182} height={42} />
        </Link>

        {/* Right nav — left-aligned, hugs the logo */}
        <nav className="hidden items-center justify-start gap-8 font-sans text-[11px] uppercase tracking-eyebrow text-cream/70 md:flex">
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

      <div className="mt-5 h-px w-full" style={{ background: "var(--gold-hairline)" }} />
    </header>
  );
}
