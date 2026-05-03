// spencer-lynch/components/credentials/credentials.tsx
import Image from "next/image";
import { existsSync } from "node:fs";
import path from "node:path";
import { InfiniteSlider } from "@/components/ui/infinite-slider";
import { ProgressiveBlur } from "@/components/ui/progressive-blur";

type Logo = { name: string; src: string; alt: string };

// Single source of truth — every brand whose logo lives in /public/brand/.
// Order alternates club crests with corporate / charity logos so the marquee
// reads visually varied. Names are grouped here for one-line maintenance.
const ALL_LOGOS: Logo[] = [
  { name: "Liverpool FC", src: "/brand/crests/liverpool.svg", alt: "Liverpool Football Club" },
  { name: "Google", src: "/brand/logos/google.svg", alt: "Google" },
  { name: "Everton FC", src: "/brand/crests/everton.svg", alt: "Everton Football Club" },
  { name: "Marks & Spencer", src: "/brand/logos/marks-and-spencer.svg", alt: "Marks & Spencer" },
  { name: "UEFA", src: "/brand/crests/uefa.svg", alt: "UEFA" },
  { name: "Santander", src: "/brand/logos/santander.svg", alt: "Santander" },
  { name: "Chester Racecourse", src: "/brand/crests/chester-racecourse.svg", alt: "Chester Racecourse" },
  { name: "Morrisons", src: "/brand/logos/morrisons.svg", alt: "Morrisons" },
  { name: "Wrexham AFC", src: "/brand/crests/wrexham.svg", alt: "Wrexham AFC" },
  { name: "Specsavers", src: "/brand/logos/specsavers.svg", alt: "Specsavers" },
  { name: "Five Guys", src: "/brand/logos/five-guys.svg", alt: "Five Guys" },
  { name: "Aon", src: "/brand/logos/aon.svg", alt: "Aon" },
  { name: "NEC", src: "/brand/logos/nec.svg", alt: "National Exhibition Centre" },
  { name: "Chester Zoo", src: "/brand/logos/chester-zoo.svg", alt: "Chester Zoo" },
];

// Filters out any logo whose source file is missing — so a sourcing run can
// drop new SVGs into /public/brand/logos/ and they'll appear without code edits.
function resolveAvailableLogos(): Logo[] {
  return ALL_LOGOS.filter((logo) =>
    existsSync(path.join(process.cwd(), "public", logo.src.replace(/^\//, ""))),
  );
}

export function Credentials() {
  const logos = resolveAvailableLogos();

  return (
    <section className="px-6 py-24 md:px-10 md:py-32">
      <div className="mx-auto max-w-[1100px] text-center">
        <p className="font-mono text-[10px] uppercase tracking-eyebrow-wide text-gold/85">
          — Twenty years on stage —
        </p>
        <h2 className="mt-6 font-display text-4xl italic leading-[1.05] text-cream md:text-6xl lg:text-[64px]">
          Two Premier League clubs.
          <br />
          The world&apos;s most discerning rooms.
        </h2>
      </div>

      <div className="relative mx-auto mt-14 max-w-[1280px]">
        <InfiniteSlider duration={32} durationOnHover={75} gapClassName="gap-12">
          {logos.map((logo) => (
            <div
              key={logo.name}
              className="flex h-20 w-[180px] items-center justify-center"
            >
              <Image
                src={logo.src}
                alt={logo.alt}
                width={180}
                height={72}
                className="h-14 w-auto object-contain opacity-75 grayscale transition duration-500 hover:opacity-100 hover:grayscale-0"
              />
            </div>
          ))}
        </InfiniteSlider>
        <ProgressiveBlur side="left" width="120px" />
        <ProgressiveBlur side="right" width="120px" />
      </div>

      <div className="mx-auto mt-16 max-w-[820px] space-y-5 px-2 text-center">
        <p className="text-lg leading-relaxed text-cream/85 md:text-xl">
          Official magician of Liverpool FC since 2006 — the only person to ever
          hold simultaneous resident positions at two Premier League clubs
          (Liverpool, Everton). Twenty years of close-up at the highest level.
        </p>
        <p className="text-lg leading-relaxed text-cream/85 md:text-xl">
          Behind the scenes for global tech, high-street retail, financial
          services, hospitality, education, healthcare, broadcasters — and a
          long list of charities including the LFC Foundation, Liverpool
          Disabled Supporters Association, Owen McVeigh Foundation, Down
          Syndrome Liverpool, and the Countess of Chester Hospital.
        </p>
        <p className="text-lg leading-relaxed text-cream/85 md:text-xl">
          Trusted by the Carragher and Rooney families for private events.
        </p>
      </div>
    </section>
  );
}
