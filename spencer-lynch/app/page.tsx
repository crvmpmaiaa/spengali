// spencer-lynch/app/page.tsx
import { TopNav } from "@/components/nav/top-nav";
import { CinemaFrame } from "@/components/showreel/cinema-frame";
import { HeroShowreel } from "@/components/showreel/hero-showreel";
import { CredentialsBlock } from "@/components/credentials/credentials-block";
import { SiteFooter } from "@/components/footer/site-footer";

const PHONE_TEL = "+447706319468";       // Spencer's real number
const EMAIL = "spencer@example.com";     // TODO: replace with Spencer's real email when supplied

export default function Home() {
  return (
    <>
      <TopNav />

      <main className="pinstripe relative bg-ink">
        <section className="px-6 pb-24 pt-12 md:px-10">
          <div className="mx-auto max-w-[1100px] text-center">
            <p className="font-mono text-[10px] uppercase tracking-eyebrow-wide text-gold/85">
              Established 2006 · Liverpool
            </p>
            <h1 className="mt-5 font-display text-5xl italic leading-[0.96] text-cream md:text-7xl lg:text-[88px]">
              How did <br />he do <span className="text-gold">that</span>?
            </h1>
            <p className="mx-auto mt-7 max-w-[520px] text-[15px] leading-relaxed text-cream/85">
              The only magician to hold simultaneous resident positions at two Premier League clubs. Twenty years of close-up. One card, up close.
            </p>
            <p className="mt-4 font-mono text-[11px] uppercase tracking-eyebrow text-cream/55">
              Liverpool · Everton · Wrexham · &amp; the room you&apos;re in
            </p>

            <div className="mt-10 flex justify-center">
              <button
                type="button"
                aria-label="Open a random magic trick"
                className="border border-gold/60 bg-ink-warm px-7 py-3 font-mono text-[11px] uppercase tracking-eyebrow text-gold transition-colors hover:bg-gold/10"
              >
                ⌕ Try a Trick
              </button>
            </div>
          </div>

          <div className="mx-auto mt-14 flex max-w-[760px] justify-center">
            <CinemaFrame
              slateTop={{ left: "SL · Reel · 2026", right: "● Live · 1080p" }}
              slateBottom={{ left: "Memorable Magic", right: "Hover for sound · 02:07" }}
            >
              <HeroShowreel />
            </CinemaFrame>
          </div>
        </section>

        <CredentialsBlock />
      </main>

      <SiteFooter phoneTel={PHONE_TEL} emailMailto={EMAIL} />
    </>
  );
}
