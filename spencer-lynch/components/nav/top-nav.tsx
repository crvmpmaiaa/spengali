// spencer-lynch/components/nav/top-nav.tsx
import Link from "next/link";
import { SLLogo } from "@/components/brand/sl-logo";

// Three links each side of the centred logo for a symmetric layout.
const leftLinks = [
  { href: "/work", label: "The Work", prefetch: false },
  { href: "/tech-illusions", label: "Tech Illusions", prefetch: false },
  { href: "/showreel", label: "Showreel", prefetch: false },
];

const rightLinks = [
  { href: "/about", label: "About", prefetch: false },
  { href: "/book", label: "Book", prefetch: true },
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
          aria-label="Spencer Lynch — home"
          className="flex items-center justify-center"
        >
          <SLLogo variant="no-pips" width={182} height={42} />
        </Link>

        {/* Right nav — left-aligned, hugs the logo. Try-a-Trick pill last. */}
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
          <button
            type="button"
            className="border border-gold/60 bg-ink-warm px-4 py-2 font-mono text-[10px] tracking-eyebrow text-gold transition-colors hover:bg-gold/10"
            aria-label="Open a random magic trick"
          >
            ⌕ Try a Trick
          </button>
        </nav>
      </div>

      <div className="mt-5 h-px w-full" style={{ background: "var(--gold-hairline)" }} />
    </header>
  );
}
