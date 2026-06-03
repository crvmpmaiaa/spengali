import Image from "next/image";
import { BASE_PATH } from "@/lib/base-path";

export function AboutHero() {
  return (
    <section className="relative flex min-h-[70vh] items-center justify-center overflow-hidden">
      <Image
        src={`${BASE_PATH}/photos/spence-fire.jpeg`}
        alt="Spencer Lynch performing fire magic"
        fill
        className="object-cover object-center"
        sizes="100vw"
        priority
      />
      <div className="absolute inset-0 bg-ink/80" />

      <div className="relative z-10 mx-auto max-w-[600px] px-8 py-12 text-center">
        <span className="pointer-events-none absolute left-0 top-0 h-[18px] w-[18px] border-l border-t border-gold" />
        <span className="pointer-events-none absolute right-0 top-0 h-[18px] w-[18px] border-r border-t border-gold" />
        <span className="pointer-events-none absolute bottom-0 left-0 h-[18px] w-[18px] border-b border-l border-gold" />
        <span className="pointer-events-none absolute bottom-0 right-0 h-[18px] w-[18px] border-b border-r border-gold" />
        <div className="absolute inset-0 border border-gold/30" />

        <p className="font-mono text-[10px] uppercase tracking-eyebrow text-gold/85">
          — Purveyor of Mystery &amp; Marvels —
        </p>
        <h1 className="mt-5 font-display text-5xl italic leading-tight text-cream md:text-6xl lg:text-7xl">
          Spencer Lynch
        </h1>
        <p className="mt-3 font-display text-xl italic text-cream/70">
          Twenty years. Two clubs. One magician.
        </p>
      </div>
    </section>
  );
}
