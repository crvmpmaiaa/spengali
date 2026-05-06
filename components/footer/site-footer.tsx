// spencer-lynch/components/footer/site-footer.tsx
import Link from "next/link";

const SOCIALS = [
  { label: "Instagram", href: "https://instagram.com/" },
  { label: "TikTok", href: "https://tiktok.com/" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/spencelynch/" },
  { label: "Facebook", href: "https://facebook.com/" },
];

export function SiteFooter({
  phoneTel,
  emailMailto,
}: {
  phoneTel: string; // e.g. "+447000000000"
  emailMailto: string; // e.g. "spencer@example.com"
}) {
  return (
    <footer className="border-t border-gold/30 bg-ink-warm px-5 pb-10 pt-12 text-cream md:px-10 md:pb-12 md:pt-16">
      <div className="mx-auto flex max-w-[1200px] flex-col items-center text-center gap-10">
        <div className="flex flex-col items-center">
          <p className="font-mono text-[10px] uppercase tracking-eyebrow-wide text-gold">Bookings</p>
          <h2 className="mt-3 font-display text-3xl italic text-cream">Ready to have your mind blown?</h2>
          <div className="mt-8 grid w-full max-w-md grid-cols-1 gap-3 sm:grid-cols-3">
            <a
              href={`tel:${phoneTel}`}
              className="border border-gold/50 bg-ink py-3 text-center font-mono text-[10px] uppercase tracking-eyebrow text-cream transition-colors hover:bg-gold/10"
            >
              Click to Call
            </a>
            <a
              href={`mailto:${emailMailto}`}
              className="border border-gold/50 bg-ink py-3 text-center font-mono text-[10px] uppercase tracking-eyebrow text-cream transition-colors hover:bg-gold/10"
            >
              Click to Email
            </a>
            <Link
              href="/book"
              className="border border-gold bg-gold/15 py-3 text-center font-mono text-[10px] uppercase tracking-eyebrow text-gold transition-colors hover:bg-gold/25"
            >
              Use Enquiry Form
            </Link>
          </div>
        </div>

        <ul className="flex flex-row gap-6">
          {SOCIALS.map((s) => (
            <li key={s.label}>
              <Link
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-[10px] uppercase tracking-eyebrow text-cream/70 transition-colors hover:text-gold"
              >
                {s.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-16 flex flex-col items-center gap-2 border-t border-gold/15 pt-6 text-center font-mono text-[9px] uppercase tracking-eyebrow text-cream/40">
        <span>Spencer Lynch · Memorable Magic · Liverpool</span>
        <span>© {new Date().getFullYear()} · All rights reserved</span>
        <span>
          <Link
            href="https://maiaa.ai"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-gold"
          >
            Dev by maiaa.ai
          </Link>
        </span>
      </div>
    </footer>
  );
}
