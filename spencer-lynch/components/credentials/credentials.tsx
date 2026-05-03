// spencer-lynch/components/credentials/credentials.tsx
import { existsSync } from "node:fs";
import path from "node:path";
import { LogoCloud } from "@/components/ui/logo-cloud-4";

type Logo = { src: string; alt: string };

const ALL_LOGOS: Logo[] = [
  { src: "/brand/crests/liverpool.svg", alt: "Liverpool Football Club" },
  { src: "/brand/logos/google.svg", alt: "Google" },
  { src: "/brand/charities/lfc-foundation.jpg", alt: "LFC Foundation" },
  { src: "/brand/crests/everton.svg", alt: "Everton Football Club" },
  { src: "/brand/logos/marks-and-spencer.svg", alt: "Marks & Spencer" },
  { src: "/brand/crests/uefa.svg", alt: "UEFA" },
  { src: "/brand/logos/edward-jones.jpg", alt: "Edward Jones" },
  { src: "/brand/logos/santander.svg", alt: "Santander" },
  { src: "/brand/charities/owen-mcveigh-foundation.png", alt: "Owen McVeigh Foundation" },
  { src: "/brand/crests/chester-racecourse.svg", alt: "Chester Racecourse" },
  { src: "/brand/logos/liverpool-echo.webp", alt: "Liverpool Echo" },
  { src: "/brand/logos/morrisons.svg", alt: "Morrisons" },
  { src: "/brand/crests/wrexham.svg", alt: "Wrexham AFC" },
  { src: "/brand/charities/lfc-disabled-supporters.jpg", alt: "Liverpool Disabled Supporters Association" },
  { src: "/brand/logos/specsavers.svg", alt: "Specsavers" },
  { src: "/brand/logos/holloway-friendly.svg", alt: "Holloway Friendly" },
  { src: "/brand/logos/five-guys.svg", alt: "Five Guys" },
  { src: "/brand/charities/down-syndrome-liverpool.webp", alt: "Down Syndrome Liverpool" },
  { src: "/brand/logos/aon.svg", alt: "Aon" },
  { src: "/brand/logos/pension-insurance-corporation.png", alt: "Pension Insurance Corporation" },
  { src: "/brand/logos/nec.svg", alt: "National Exhibition Centre" },
  { src: "/brand/logos/gbg.png", alt: "GBG plc" },
  { src: "/brand/charities/nhs-countess-of-chester.png", alt: "NHS — Countess of Chester Hospital" },
  { src: "/brand/logos/worldwide-hospitality.png", alt: "Worldwide Hospitality" },
  { src: "/brand/logos/chester-zoo.svg", alt: "Chester Zoo" },
  { src: "/brand/logos/wirral-met-college.jpg", alt: "Wirral Met College" },
];

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

      <div className="mt-14">
        <LogoCloud logos={logos} />
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
          Disabled Supporters Association, the Owen McVeigh Foundation, Down
          Syndrome Liverpool, and the Countess of Chester Hospital.
        </p>
        <p className="text-lg leading-relaxed text-cream/85 md:text-xl">
          The trusted choice for players&apos; families, private parties, and
          the rooms you don&apos;t hear about.
        </p>
      </div>
    </section>
  );
}
