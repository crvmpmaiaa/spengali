// spencer-lynch/components/showreel/hero-showreel.tsx
"use client";
import Image from "next/image";
import { useReducedMotion } from "@/lib/hooks/use-reduced-motion";
import { BASE_PATH } from "@/lib/base-path";

const VIMEO_ID = "214361408";
const VIMEO_PAGE = `https://vimeo.com/${VIMEO_ID}`;
const VIMEO_EMBED = `https://player.vimeo.com/video/${VIMEO_ID}?background=1&autoplay=1&loop=1&muted=1&dnt=1`;

/**
 * Poster always renders behind the iframe — paints immediately so
 * visitors don't see a blank black box during the brief Vimeo bootstrap.
 * Reduced-motion branch suppresses the iframe entirely and surfaces a
 * "Watch on Vimeo" link in its place.
 *
 * Pass autoplay=false to hold the iframe until the site intro finishes.
 */
export function HeroShowreel({ autoplay = true }: { autoplay?: boolean }) {
  const reducedMotion = useReducedMotion();

  return (
    <div className="group relative h-full w-full">
      {/* poster — always behind */}
      <Image
        src={`${BASE_PATH}/img/showreel-poster.jpg`}
        alt="Spencer Lynch performing close-up magic"
        fill
        priority
        sizes="(max-width: 768px) 100vw, 760px"
        className="object-cover"
      />

      {!reducedMotion && autoplay && (
        <iframe
          src={VIMEO_EMBED}
          title="Spencer Lynch Showreel · Memorable Magic"
          allow="autoplay; fullscreen; picture-in-picture"
          referrerPolicy="strict-origin-when-cross-origin"
          className="absolute inset-0 h-full w-full border-0"
        />
      )}

      {reducedMotion ? (
        <a
          href={VIMEO_PAGE}
          target="_blank"
          rel="noopener noreferrer"
          className="absolute inset-x-0 bottom-4 z-10 mx-auto flex w-fit items-center gap-2 border border-gold/55 bg-ink-warm/80 px-4 py-2 font-mono text-[11px] uppercase tracking-eyebrow text-cream backdrop-blur transition-colors hover:bg-gold/15"
        >
          ▶ Watch on Vimeo
        </a>
      ) : (
        <div className="pointer-events-none absolute inset-0 z-10 flex items-end justify-end gap-2 bg-gradient-to-t from-black/45 via-transparent to-transparent p-3 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
          <a
            href={VIMEO_PAGE}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Watch with sound on Vimeo"
            className="pointer-events-auto flex h-9 w-9 items-center justify-center border border-gold/55 bg-ink-warm/75 text-cream backdrop-blur transition-colors hover:bg-gold/15"
          >
            🔊
          </a>
        </div>
      )}
    </div>
  );
}
