// spencer-lynch/components/credentials/credentials.tsx
import { existsSync } from "node:fs";
import path from "node:path";
import { LogoCloud } from "@/components/ui/logo-cloud-4";
import { CredentialCard, type CredentialCardProps } from "./credential-card";

const CARDS: CredentialCardProps[] = [
  {
    suit: "spades",
    rank: "A",
    title: "Stadium Years",
    body: "Official magician of Liverpool FC since 2006. The only person to ever hold simultaneous resident positions at two Premier League clubs.",
  },
  {
    suit: "hearts",
    rank: "Q",
    title: "The Work That Matters",
    body: "Twenty years of giving the trick away. LFC Foundation, Owen McVeigh Foundation, Down Syndrome Liverpool, the Countess of Chester Hospital.",
  },
  {
    suit: "diamonds",
    rank: "K",
    title: "The Boardroom",
    body: "Global tech, high-street retail, financial services, hospitality, broadcasters. The brands you know, the rooms you don't.",
  },
  {
    suit: "clubs",
    rank: "J",
    title: "The Inner Circle",
    body: "The trusted choice for players' families, private parties, and the rooms you don't hear about.",
  },
];

type Logo = { src: string; alt: string; className?: string };

const ALL_LOGOS: Logo[] = [
  { src: "/brand/crests/liverpool.png", alt: "Liverpool Football Club", className: "!h-12 md:!h-16" },
  { src: "/brand/logos/google.webp", alt: "Google", className: "!h-12 md:!h-16" },
  { src: "/brand/charities/lfc-foundation.jpg", alt: "LFC Foundation", className: "!h-12 md:!h-16" },
  { src: "/brand/crests/everton.svg", alt: "Everton Football Club" },
  { src: "/brand/logos/marks-and-spencer.jpg", alt: "Marks & Spencer" },
  { src: "/brand/crests/uefa.svg", alt: "UEFA" },
  { src: "/brand/logos/edward-jones.jpg", alt: "Edward Jones", className: "!h-14 md:!h-20" },
  { src: "/brand/logos/santander.png", alt: "Santander" },
  { src: "/brand/charities/owen-mcveigh-foundation.png", alt: "Owen McVeigh Foundation" },
  { src: "/brand/crests/chester-racecourse.jpg", alt: "Chester Racecourse" },
  { src: "/brand/logos/liverpool-echo.webp", alt: "Liverpool Echo" },
  { src: "/brand/logos/morrisons.jpeg", alt: "Morrisons" },
  { src: "/brand/logos/specsavers.jpg", alt: "Specsavers", className: "!h-12 md:!h-16" },
  { src: "/brand/logos/holloway-friendly.svg", alt: "Holloway Friendly", className: "!h-7 md:!h-10" },
  { src: "/brand/logos/five-guys.png", alt: "Five Guys" },
  { src: "/brand/charities/down-syndrome-liverpool.webp", alt: "Down Syndrome Liverpool" },
  { src: "/brand/logos/aon.png", alt: "Aon" },
  { src: "/brand/logos/pension-insurance-corporation.png", alt: "Pension Insurance Corporation" },
  { src: "/brand/logos/nec.avif", alt: "National Exhibition Centre" },
  { src: "/brand/logos/gbg.png", alt: "GBG plc", className: "!h-7 md:!h-10" },
  { src: "/brand/charities/nhs-countess-of-chester.png", alt: "NHS · Countess of Chester Hospital", className: "!h-7 md:!h-10" },
  { src: "/brand/logos/worldwide-hospitality.jpg", alt: "Worldwide Hospitality" },
  { src: "/brand/logos/chester-zoo.jpg", alt: "Chester Zoo" },
  { src: "/brand/logos/wirral-met-college.jpg", alt: "Wirral Met College" },
];

function resolveAvailableLogos(): Logo[] {
  const available = ALL_LOGOS.filter((logo) =>
    existsSync(path.join(process.cwd(), "public", logo.src.replace(/^\//, ""))),
  );
  // Shuffle once at module load so the marquee order varies between builds
  // without breaking SSR/hydration parity within a single render.
  return available
    .map((logo) => ({ logo, sortKey: Math.random() }))
    .sort((a, b) => a.sortKey - b.sortKey)
    .map(({ logo }) => logo);
}

export function Credentials() {
  const logos = resolveAvailableLogos();

  return (
    <section className="px-5 py-16 md:px-10 md:py-32">
      <div className="mx-auto max-w-[1100px] text-center">
        <p className="font-mono text-[10px] uppercase tracking-eyebrow-wide text-gold/85">
          Twenty years in show business
        </p>
        <h2 className="mt-6 font-display text-4xl italic leading-[1.05] text-cream md:text-6xl lg:text-[64px]">
          Two Premier League clubs.
          <br />
          The world&apos;s most discerning rooms.
        </h2>
      </div>

      <div className="mx-auto mt-14 grid max-w-[1100px] grid-cols-2 gap-4 px-2 md:mt-16 md:grid-cols-4 md:gap-6">
        {CARDS.map((card) => (
          <CredentialCard key={card.suit} {...card} />
        ))}
      </div>

      <div className="-mx-5 mt-12 md:-mx-10 md:mt-14">
        <LogoCloud logos={logos} />
      </div>
    </section>
  );
}
