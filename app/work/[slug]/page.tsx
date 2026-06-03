import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { TopNav } from "@/components/nav/top-nav";
import { SiteFooter } from "@/components/footer/site-footer";
import { WORK, CATEGORIES, getWorkBySlug } from "@/lib/work-data";


const PHONE_TEL = "+447706319468";
const EMAIL = "spencer@example.com";

export function generateStaticParams() {
  return WORK.map((w) => ({ slug: w.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const entry = getWorkBySlug(slug);
  if (!entry) return {};
  return {
    title: `${entry.title} · Spencer Lynch`,
    description: entry.subtitle,
  };
}

export default async function WorkDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const entry = getWorkBySlug(slug);
  if (!entry) notFound();

  const catMeta = CATEGORIES[entry.category];

  // Related entries — same category, not this one (max 2)
  const related = WORK.filter(
    (w) => w.category === entry.category && w.slug !== entry.slug
  ).slice(0, 2);

  return (
    <>
      <TopNav />
      <main className="bg-ink min-h-screen">

        {/* Back breadcrumb */}
        <div className="mx-auto max-w-[760px] px-5 pt-5 md:px-10 md:pt-8">
          <Link
            href="/work"
            className="font-mono text-[9px] uppercase tracking-eyebrow text-cream/35 transition-colors hover:text-gold/70"
          >
            ← Work
          </Link>
        </div>

        {/* Hero */}
        <header className="mx-auto max-w-[760px] px-5 py-14 md:px-10 md:py-20">
          <p className="font-mono text-[10px] uppercase tracking-eyebrow text-gold/80">
            {entry.eyebrow}
          </p>
          <h1 className="mt-5 font-display text-4xl italic leading-tight text-cream md:text-5xl lg:text-6xl">
            {entry.title}
          </h1>
          <p className="mt-3 font-display text-xl italic text-cream/60 md:text-2xl">
            {entry.subtitle}
          </p>

          {entry.stat && (
            <div className="mt-8 inline-flex items-baseline gap-3 border border-gold/20 px-5 py-3">
              <span className="font-display text-3xl italic text-gold">
                {entry.stat.value}
              </span>
              <span className="font-mono text-[9px] uppercase tracking-eyebrow text-cream/50">
                {entry.stat.label}
              </span>
            </div>
          )}
        </header>

        <div className="h-px w-full" style={{ background: "var(--gold-hairline)" }} />

        {/* Body copy */}
        <div className="mx-auto max-w-[760px] px-5 py-14 md:px-10 md:py-20">
          <div className="space-y-5 text-[16px] leading-relaxed text-cream/75">
            {entry.body.map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>
        </div>

        <div className="h-px w-full" style={{ background: "var(--gold-hairline)" }} />



        {/* Related */}
        {related.length > 0 && (
          <>
            <div className="h-px w-full" style={{ background: "var(--gold-hairline)" }} />
            <section className="bg-ink px-5 py-14 md:px-10 md:py-20">
              <div className="mx-auto max-w-[1100px]">
                <p className="font-mono text-[10px] uppercase tracking-eyebrow text-gold/60 mb-8">
                  — More {catMeta.label} —
                </p>
                <div className="grid gap-4 md:grid-cols-2">
                  {related.map((r) => (
                    <Link
                      key={r.slug}
                      href={`/work/${r.slug}`}
                      className="group relative border border-gold/15 bg-ink-tinted px-6 py-7 transition-colors hover:border-gold/35"
                    >
                      <span className="pointer-events-none absolute left-0 top-0 h-[10px] w-[10px] border-l border-t border-gold/40 transition-colors group-hover:border-gold/70" />
                      <span className="pointer-events-none absolute right-0 top-0 h-[10px] w-[10px] border-r border-t border-gold/40 transition-colors group-hover:border-gold/70" />
                      <h3 className="font-display text-xl italic text-cream">{r.title}</h3>
                      <p className="mt-2 text-[13px] text-cream/50">{r.subtitle}</p>
                      <p className="mt-5 font-mono text-[9px] uppercase tracking-eyebrow text-gold/50 group-hover:text-gold/80">
                        Read more →
                      </p>
                    </Link>
                  ))}
                </div>
              </div>
            </section>
          </>
        )}

      </main>
      <SiteFooter phoneTel={PHONE_TEL} emailMailto={EMAIL} />
    </>
  );
}
