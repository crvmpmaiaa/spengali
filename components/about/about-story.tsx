import Image from "next/image";
import { BASE_PATH } from "@/lib/base-path";

interface AboutStoryProps {
  copy: string[];
}

export function AboutStory({ copy }: AboutStoryProps) {
  return (
    <section className="pinstripe bg-ink-warm">
      <div className="h-px w-full bg-gradient-to-r from-transparent via-gold/30 to-transparent" />

      <div className="mx-auto max-w-[1100px] px-5 py-16 md:px-10 md:py-24">
        <div className="grid gap-12 lg:grid-cols-[1fr_320px] lg:gap-16">
          <div className="space-y-5 text-[14px] leading-relaxed text-cream/80">
            {copy.map((p, i) => <p key={i}>{p}</p>)}
          </div>

          <div className="flex flex-col items-center lg:justify-center">
            <div className="ring-1 ring-gold/50">
              <Image
                src={`${BASE_PATH}/photos/spencer.jpg`}
                alt="Spencer Lynch, close-up magician"
                width={320}
                height={320}
                className="block object-cover"
                sizes="(max-width: 1024px) 100vw, 320px"
              />
            </div>
            <p className="mt-3 font-display text-sm italic text-cream/50">
              — Spencer Lynch, Liverpool
            </p>
          </div>
        </div>
      </div>

      <div className="h-px w-full bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
    </section>
  );
}
