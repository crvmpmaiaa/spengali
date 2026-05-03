// spencer-lynch/components/credentials/stadium-years.tsx
import Image from "next/image";
import { existsSync } from "node:fs";
import path from "node:path";
import { SectionEyebrow } from "./section-eyebrow";

type Crest = { name: string; src: string; alt: string };

const REQUIRED_CRESTS: Crest[] = [
  { name: "Liverpool FC", src: "/brand/crests/liverpool.svg", alt: "Liverpool Football Club crest" },
  { name: "Everton FC", src: "/brand/crests/everton.svg", alt: "Everton Football Club crest" },
  { name: "UEFA", src: "/brand/crests/uefa.svg", alt: "UEFA logo" },
  { name: "Chester Racecourse", src: "/brand/crests/chester-racecourse.svg", alt: "Chester Racecourse logo" },
];

const OPTIONAL_WREXHAM: Crest = {
  name: "Wrexham AFC",
  src: "/brand/crests/wrexham.svg",
  alt: "Wrexham AFC crest",
};

function resolveCrests(): Crest[] {
  // Optional crest is included only if the file actually exists at build time.
  // Server component — fs check is safe.
  const wrexhamPath = path.join(process.cwd(), "public", "brand", "crests", "wrexham.svg");
  return existsSync(wrexhamPath)
    ? [...REQUIRED_CRESTS, OPTIONAL_WREXHAM]
    : REQUIRED_CRESTS;
}

export function StadiumYears() {
  const crests = resolveCrests();

  return (
    <section className="px-6 py-24 md:px-10 md:py-32">
      <div className="mx-auto max-w-[1100px] text-center">
        <SectionEyebrow numeral="01" label="The Stadium Years" />
        <h2 className="mt-6 font-display text-4xl italic leading-[1.05] text-cream md:text-6xl lg:text-[64px]">
          Twenty seasons. Two clubs. One magician.
        </h2>

        <ul className="mt-12 flex flex-wrap items-center justify-center gap-5 md:gap-8">
          {crests.map((crest) => (
            <li
              key={crest.name}
              className="flex items-center gap-3 border border-gold/30 px-5 py-3 text-cream/80"
            >
              <Image
                src={crest.src}
                alt={crest.alt}
                width={32}
                height={32}
                className="h-8 w-8 object-contain"
              />
              <span className="font-mono text-[11px] uppercase tracking-eyebrow text-cream/85">
                {crest.name}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
