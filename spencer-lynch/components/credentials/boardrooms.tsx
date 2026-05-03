// spencer-lynch/components/credentials/boardrooms.tsx
import Image from "next/image";
import { InfiniteSlider } from "@/components/ui/infinite-slider";
import { ProgressiveBlur } from "@/components/ui/progressive-blur";
import { SectionEyebrow } from "./section-eyebrow";

type Logo = { name: string; src: string; alt: string };

const LOGOS: Logo[] = [
  { name: "Google", src: "/brand/logos/google.svg", alt: "Google" },
  { name: "Marks & Spencer", src: "/brand/logos/marks-and-spencer.svg", alt: "Marks & Spencer" },
  { name: "Santander", src: "/brand/logos/santander.svg", alt: "Santander" },
  { name: "Morrisons", src: "/brand/logos/morrisons.svg", alt: "Morrisons" },
  { name: "Specsavers", src: "/brand/logos/specsavers.svg", alt: "Specsavers" },
  { name: "Five Guys", src: "/brand/logos/five-guys.svg", alt: "Five Guys" },
  { name: "Aon", src: "/brand/logos/aon.svg", alt: "Aon" },
  { name: "NEC", src: "/brand/logos/nec.svg", alt: "NEC" },
  { name: "Chester Zoo", src: "/brand/logos/chester-zoo.svg", alt: "Chester Zoo" },
];

export function Boardrooms() {
  return (
    <section className="px-6 py-24 md:px-10 md:py-32">
      <div className="mx-auto max-w-[1100px] text-center">
        <SectionEyebrow numeral="02" label="Boardrooms & Brand Activations" />
        <h2 className="mt-6 font-display text-4xl italic leading-[1.05] text-cream md:text-6xl lg:text-[64px]">
          From global tech to the high street.
        </h2>
      </div>

      <div className="relative mx-auto mt-14 max-w-[1280px]">
        <InfiniteSlider duration={22} durationOnHover={55} gapClassName="gap-12">
          {LOGOS.map((logo) => (
            <div key={logo.name} className="flex h-20 w-[180px] items-center justify-center">
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
    </section>
  );
}
