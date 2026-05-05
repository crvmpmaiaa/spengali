import Image from "next/image";
import { BASE_PATH } from "@/lib/base-path";

interface AboutGerrardProps {
  showGerrard?: boolean;
}

export function AboutGerrard({ showGerrard = true }: AboutGerrardProps) {
  const photo = showGerrard ? `${BASE_PATH}/photos/gerrard.jpeg` : `${BASE_PATH}/photos/spence-fire-3.jpeg`;
  const eyebrow = showGerrard ? "— Anfield, 2017 —" : "— At Anfield —";
  const alt = showGerrard
    ? "Spencer Lynch performing close-up magic at Anfield hospitality suite"
    : "Spencer Lynch performing fire magic";

  return (
    <section className="bg-ink-warm">
      <div className="h-px w-full bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
      <div className="mx-auto max-w-[1100px] px-5 py-16 md:px-10 md:py-24">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-[320px_1fr] md:items-center md:gap-16">
          {/* Portrait photo — crop 40px top, 10px bottom */}
          <div className="mx-auto w-full max-w-[320px] overflow-hidden ring-1 ring-gold/40">
            <Image
              src={photo}
              alt={alt}
              width={702}
              height={1248}
              className="w-full block"
              style={{ marginTop: -40, marginBottom: -10 }}
              sizes="(max-width: 768px) 100vw, 320px"
            />
          </div>

          {/* Quote + caption */}
          <div className="text-center md:text-left">
            <p className="font-mono text-[10px] uppercase tracking-eyebrow text-gold/85">
              {eyebrow}
            </p>
            <p className="mt-5 font-display text-3xl italic leading-snug text-cream md:text-4xl lg:text-5xl">
              "Some rooms you never forget."
            </p>
            {showGerrard && (
              <p className="mt-6 text-[15px] leading-relaxed text-cream/60">
                Spencer at the Anfield hospitality suite — one of hundreds of match-day performances for Liverpool FC&apos;s most discerning guests.
              </p>
            )}
          </div>
        </div>
      </div>
      <div className="h-px w-full bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
    </section>
  );
}
