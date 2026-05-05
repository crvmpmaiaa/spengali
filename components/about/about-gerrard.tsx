import Image from "next/image";

interface AboutGerrardProps {
  showGerrard?: boolean;
}

export function AboutGerrard({ showGerrard = true }: AboutGerrardProps) {
  const photo = showGerrard ? "/photos/gerrard.jpeg" : "/photos/spence-fire-3.jpeg";
  const eyebrow = showGerrard ? "— Anfield, 2017 —" : "— At Anfield —";
  const alt = showGerrard
    ? "Spencer Lynch performing close-up magic at Anfield hospitality suite"
    : "Spencer Lynch performing fire magic";

  return (
    <section className="relative flex max-h-[420px] min-h-[320px] items-center justify-center overflow-hidden">
      <Image
        src={photo}
        alt={alt}
        fill
        className="object-cover object-center"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-ink/60" />
      <div className="relative z-10 text-center">
        <p className="font-mono text-[10px] uppercase tracking-eyebrow text-gold/85">
          {eyebrow}
        </p>
        <p className="mt-3 font-display text-2xl italic text-cream md:text-3xl">
          "Some rooms you never forget."
        </p>
      </div>
    </section>
  );
}
