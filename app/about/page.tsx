import type { Metadata } from "next";
import { TopNav } from "@/components/nav/top-nav";
import { SiteFooter } from "@/components/footer/site-footer";
import { AboutHero } from "@/components/about/about-hero";
import { AboutStory } from "@/components/about/about-story";
import { AboutGerrard } from "@/components/about/about-gerrard";
import { AboutAtWork } from "@/components/about/about-at-work";
import { BookingCta } from "@/components/booking-cta";

export const metadata: Metadata = {
  title: "About Spencer Lynch · Liverpool FC's Official Magician Since 2006",
  description:
    "Spencer Lynch is Liverpool FC's official close-up magician since 2006, a Founding Member of The Liverpool Magic Circle, and the only magician ever to hold simultaneous residencies at two Premier League clubs.",
  alternates: { canonical: "https://spencerlynch.co.uk/about" },
  openGraph: {
    title: "About Spencer Lynch · Liverpool FC's Official Magician Since 2006",
    description:
      "Twenty years of professional close-up magic. Liverpool FC, Everton FC, Google, Marks & Spencer and hundreds of weddings. Founding Member of The Liverpool Magic Circle.",
    url: "https://spencerlynch.co.uk/about",
  },
};

const PHONE_TEL = "+447706319468";
const EMAIL = "spencer@example.com";

const COPY: string[] = [
  "I've been interested in magic since the age of 6 and performed professionally since I was about 20. I'm one of the Founding Members of The Liverpool Magic Circle and focus predominantly on close-up magic — typically walking around and entertaining guests at their tables. I also perform parlour magic for groups of seated guests.",
  "My magic uses everything from cards, coins, elastic bands, fire, predictions and mind reading to levitations — all delivered with a dry sense of humour. Seeing is believing.",
  "Since 2006 I have worked as Liverpool Football Club's official magician. You may have seen me performing on match days in the Executive Boxes in the Sir Kenny Dalglish stand, in the Boot Room restaurant at Anfield, on museum tour days, or at one of the many parties, events and weddings hosted there. I was also the first Resident Magician at Everton Football Club — and I am the only magician to ever hold that position at two clubs at the same time.",
  "I live just outside Chester and my work takes me all over the country. I perform at weddings, corporate events, trade shows, private parties and dinner parties throughout the year. I have over 20 years of experience entertaining clients ranging from couples on their wedding day to global brands and Premier League hospitality — and I strive to constantly introduce new effects so repeat bookings always feel fresh.",
];

export default function AboutPage() {
  return (
    <>
      <TopNav />
      <main className="bg-ink">
        <AboutHero />
        <AboutStory copy={COPY} />
        <AboutGerrard showGerrard />
        <AboutAtWork />

        {/* Why Choose Me */}
        <section className="pinstripe bg-ink-warm px-5 py-20 md:px-10 md:py-28">
          <div className="h-px w-full bg-gradient-to-r from-transparent via-gold/30 to-transparent mb-16" />
          <div className="mx-auto max-w-[760px] text-center">
            <p className="font-mono text-[10px] uppercase tracking-eyebrow text-gold/85">
              — Why Choose Me —
            </p>
            <h2 className="mt-5 font-display text-4xl italic leading-tight text-cream md:text-5xl">
              Meet me before you book me.
            </h2>
            <div className="mt-8 space-y-5 text-[16px] leading-relaxed text-cream/75 text-left md:text-center">
              <p>
                I am happy to travel anywhere in the UK to meet with you before you decide if I&apos;m the right magician for your event. I don&apos;t charge for the meeting. It&apos;s the ideal opportunity for me to understand your event, for you to experience some of my magic, get a feel for my personality, and see how it all comes together in a performance.
              </p>
              <p>
                I believe I am the only magician in the UK that offers a money-back guarantee. If we meet, you decide to book me, and my performance doesn&apos;t meet your expectations — I will refund you the entire fee. In over 20 years of performing, I have never had an unhappy client.
              </p>
            </div>
          </div>
          <div className="h-px w-full bg-gradient-to-r from-transparent via-gold/30 to-transparent mt-16" />
        </section>

        <BookingCta label="Book Spencer" />
      </main>
      <SiteFooter phoneTel={PHONE_TEL} emailMailto={EMAIL} />
    </>
  );
}
