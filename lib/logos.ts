import { existsSync } from "node:fs";
import path from "node:path";

export type Logo = { src: string; alt: string; className?: string; whiteBg?: boolean };

export const ALL_LOGOS: Logo[] = [
  { src: "/brand/crests/liverpool.png", alt: "Liverpool Football Club", className: "!h-12 md:!h-16" },
  { src: "/brand/logos/google.webp", alt: "Google", className: "!h-16 !max-h-16 md:!h-20 md:!max-h-20" },
  { src: "/brand/charities/lfc-foundation.jpg", alt: "LFC Foundation", className: "!h-16 !max-h-16 md:!h-20 md:!max-h-20" },
  { src: "/brand/crests/everton.svg", alt: "Everton Football Club" },
  { src: "/brand/logos/marks-and-spencer.jpg", alt: "Marks & Spencer" },
  { src: "/brand/crests/uefa.svg", alt: "UEFA" },
  { src: "/brand/logos/edward-jones.jpg", alt: "Edward Jones", className: "!h-16 !max-h-16 md:!h-20 md:!max-h-20" },
  { src: "/brand/logos/santander.png", alt: "Santander" },
  { src: "/brand/charities/owen-mcveigh-foundation.png", alt: "Owen McVeigh Foundation" },
  { src: "/brand/crests/chester-racecourse.jpg", alt: "Chester Racecourse" },
  { src: "/brand/logos/liverpool-echo.webp", alt: "Liverpool Echo" },
  { src: "/brand/logos/morrisons.jpeg", alt: "Morrisons" },
  { src: "/brand/logos/specsavers.jpg", alt: "Specsavers", className: "!h-16 !max-h-16 md:!h-20 md:!max-h-20" },
  { src: "/brand/logos/holloway-friendly.svg", alt: "Holloway Friendly", className: "!h-7 md:!h-10" },
  { src: "/brand/logos/five-guys.png", alt: "Five Guys" },
  { src: "/brand/charities/down-syndrome-liverpool.webp", alt: "Down Syndrome Liverpool" },
  { src: "/brand/logos/aon.png", alt: "Aon" },
  { src: "/brand/logos/pension-insurance-corporation.png", alt: "Pension Insurance Corporation", className: "!h-16 !max-h-16 md:!h-20 md:!max-h-20" },
  { src: "/brand/logos/nec.avif", alt: "National Exhibition Centre" },
  { src: "/brand/logos/gbg.png", alt: "GBG plc", className: "!h-7 md:!h-10", whiteBg: true },
  { src: "/brand/charities/nhs-countess-of-chester.png", alt: "NHS · Countess of Chester Hospital", className: "!h-7 md:!h-10" },
  { src: "/brand/logos/worldwide-hospitality.jpg", alt: "Worldwide Hospitality" },
  { src: "/brand/logos/chester-zoo.jpg", alt: "Chester Zoo" },
  { src: "/brand/logos/wirral-met-college.jpg", alt: "Wirral Met College" },
];

export function resolveAvailableLogos(): Logo[] {
  const available = ALL_LOGOS.filter((logo) =>
    existsSync(path.join(process.cwd(), "public", logo.src.replace(/^\//, ""))),
  );
  return available
    .map((logo) => ({ logo, sortKey: Math.random() }))
    .sort((a, b) => a.sortKey - b.sortKey)
    .map(({ logo }) => logo);
}
