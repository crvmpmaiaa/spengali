import type { Metadata } from "next";
import Link from "next/link";
import { TopNav } from "@/components/nav/top-nav";
import { SiteFooter } from "@/components/footer/site-footer";
import { WORK, CATEGORIES, type EventCategory } from "@/lib/work-data";


export const metadata: Metadata = {
  title: "Close-Up Magic for Every Event · The Work · Spencer Lynch",
  description:
    "Twenty years of close-up magic at Liverpool FC, Everton FC, Google, Marks & Spencer and hundreds of weddings and private events. Hire a top UK corporate and wedding magician.",
  alternates: { canonical: "https://howdidhedothat.co.uk/work" },
  openGraph: {
    title: "Close-Up Magic for Every Event · Spencer Lynch",
    description:
      "From Premier League stadiums to boardrooms and weddings — Spencer Lynch is one of the UK's most experienced close-up magicians for hire.",
    url: "https://howdidhedothat.co.uk/work",
  },
};

const PHONE_TEL = "+447706319468";
const EMAIL = "spencario@yahoo.com";

const CATEGORY_ORDER: EventCategory[] = [
  "stadium",
  "corporate",
  "wedding",
  "hospitality",
  "private",
  "charity",
];

export default function WorkPage() {
  return (
    <>
      <TopNav />
      <main className="bg-ink min-h-screen">

        {/* Page header */}
        <div className="px-5 pb-8 pt-14 text-center md:pb-8 md:pt-20">
          <p className="font-mono text-[10px] uppercase tracking-eyebrow text-gold/85">
            — The Work —
          </p>
          <h1 className="mt-5 font-display text-4xl italic text-cream md:text-5xl">
            Twenty years. Every room.
          </h1>
          <p className="mt-3 font-mono text-[11px] uppercase tracking-eyebrow text-cream/45">
            Stadiums · Boardrooms · Weddings · Private Events
          </p>
        </div>

        <div className="h-px w-full" style={{ background: "var(--gold-hairline)" }} />

        {/* Category sections */}
        {CATEGORY_ORDER.map((cat, i) => {
          const meta = CATEGORIES[cat];
          const entries = WORK.filter((w) => w.category === cat);
          return (
            <section key={cat} className={i % 2 === 1 ? "bg-ink-warm" : "bg-ink"}>
              <div className="mx-auto max-w-[1100px] px-5 py-14 md:px-10 md:py-20">
                {/* Category header */}
                <div className="mb-8 md:mb-14">
                  <p className="font-mono text-[10px] uppercase tracking-eyebrow text-gold/70">
                    {String(i + 1).padStart(2, "0")}
                  </p>
                  <h2 className="mt-2 font-display text-3xl italic text-cream md:text-4xl">
                    {meta.label}
                  </h2>
                  <p className="mt-2 text-[14px] leading-relaxed text-cream/55 max-w-[480px]">
                    {meta.description}
                  </p>
                </div>

                {/* Entry cards */}
                <div className="flex flex-wrap justify-center gap-6">
                  {entries.map((entry) => (
                    <Link
                      key={entry.slug}
                      href={`/work/${entry.slug}`}
                      className="group relative w-full max-w-[320px] border-2 border-gold/40 bg-[#100e08] px-2 py-2 text-center shadow-[0_4px_24px_rgba(0,0,0,0.6)] transition-all hover:border-gold/70 hover:shadow-[0_6px_32px_rgba(0,0,0,0.8)]"
                    >
                      {/* Inner border */}
                      <div className="border border-gold/20 px-5 py-6 group-hover:border-gold/35 transition-colors">

                      {/* Top ornament */}
                      <p className="font-mono text-[11px] uppercase tracking-eyebrow text-gold/60 mb-1">
                        ✦ {meta.label} ✦
                      </p>

                      {/* Decorative rule */}
                      <div className="mx-auto my-3 flex items-center gap-2">
                        <span className="flex-1 border-t border-gold/25" />
                        <span className="text-gold/40 text-[10px]">◆</span>
                        <span className="flex-1 border-t border-gold/25" />
                      </div>

                      <h3 className="font-display text-2xl leading-snug text-cream group-hover:text-gold transition-colors">
                        {entry.title}
                      </h3>
                      <p className="mt-3 text-[14px] leading-relaxed text-cream/55">
                        {entry.subtitle}
                      </p>

                      {entry.stat && (
                        <>
                          <div className="mx-auto my-4 flex items-center gap-2">
                            <span className="flex-1 border-t border-gold/20" />
                            <span className="text-gold/30 text-[8px]">◆</span>
                            <span className="flex-1 border-t border-gold/20" />
                          </div>
                          <span className="font-display text-2xl italic text-gold">
                            {entry.stat.value}
                          </span>
                          <span className="ml-2 font-mono text-[9px] uppercase tracking-eyebrow text-cream/40">
                            {entry.stat.label}
                          </span>
                        </>
                      )}

                      <p className="mt-5 font-mono text-[11px] uppercase tracking-eyebrow text-gold/45 transition-colors group-hover:text-gold/80">
                        — Read more —
                      </p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              <div className="h-px w-full" style={{ background: "var(--gold-hairline)" }} />
            </section>
          );
        })}



      </main>
      <SiteFooter phoneTel={PHONE_TEL} emailMailto={EMAIL} />
    </>
  );
}
