// spencer-lynch/components/nav/top-nav.tsx
import Link from "next/link";
import { SLLogo } from "@/components/brand/sl-logo";

const links = [
  { href: "/work", label: "The Work", prefetch: false },
  { href: "/tech-illusions", label: "Tech Illusions", prefetch: false },
  { href: "/showreel", label: "Showreel", prefetch: false },
  { href: "/about", label: "About", prefetch: false },
  { href: "/book", label: "Book", prefetch: true },
];

export function TopNav() {
  return (
    <header className="relative z-30 px-10 pt-7">
      <div className="flex items-center justify-between gap-6">
        <Link href="/" aria-label="Spencer Lynch — home" className="flex items-center">
          <SLLogo variant="no-pips" invertOnDark width={140} height={32} />
        </Link>

        <nav className="hidden items-center gap-8 font-sans text-[11px] uppercase tracking-eyebrow text-cream/70 md:flex">
          {links.map((l) => (
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
