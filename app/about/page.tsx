import type { Metadata } from "next";
import { TopNav } from "@/components/nav/top-nav";
import { SiteFooter } from "@/components/footer/site-footer";
import { AboutHero } from "@/components/about/about-hero";
import { AboutStory } from "@/components/about/about-story";
import { AboutGerrard } from "@/components/about/about-gerrard";
import { AboutAtWork } from "@/components/about/about-at-work";

export const metadata: Metadata = {
  title: "About · Spencer Lynch",
  description:
    "Twenty years. Two clubs. One magician. The story of Spencer Lynch — the only magician to hold simultaneous resident positions at two Premier League clubs.",
};

const PHONE_TEL = "+447706319468";
const EMAIL = "spencer@example.com";

const COPY = {
  p1: "Spencer Lynch has been performing close-up magic professionally since 2006. What started in the rooms of Liverpool's hospitality circuit became something no other magician in the country can claim: simultaneous residencies at both Liverpool FC and Everton FC — the first and only magician to hold that position.",
  p2: "Over twenty seasons at Anfield, he's performed for UEFA delegates, Premier League legends, and the full range of the beautiful game's human drama. He's been in boardrooms for Google, on the high street for Marks & Spencer, and at private tables where the guests don't give their names.",
  p3: "The trick is never the point. The moment is. That's what close-up magic does that nothing else can: it stops time. For three seconds, the most senior person in the room is eight years old again. Spencer Lynch has been engineering those seconds for twenty years.",
};

export default function AboutPage() {
  return (
    <>
      <TopNav />
      <main className="bg-ink">
        <AboutHero />
        <AboutStory copy={COPY} />
        <AboutGerrard showGerrard />
        <AboutAtWork />

        <section className="bg-ink px-5 py-20 text-center md:py-28">
          <p className="font-display text-2xl italic text-cream md:text-3xl">
            "Ready to make your room remember?"
          </p>
          <a
            href="/book"
            className="mt-8 inline-block border border-gold/40 px-8 py-3 font-mono text-[11px] uppercase tracking-eyebrow text-cream/80 transition-colors hover:bg-gold/10 hover:text-cream"
          >
            Book Spencer
          </a>
        </section>
      </main>
      <SiteFooter phoneTel={PHONE_TEL} emailMailto={EMAIL} />
    </>
  );
}
