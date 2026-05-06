import Image from "next/image";
import { BASE_PATH } from "@/lib/base-path";

const PHOTOS = [
  { src: "/photos/spence-fire-3.jpeg", alt: "Spencer Lynch performing fire magic at a live event" },
  { src: "/photos/group-magic-girls.jpeg", alt: "Spencer Lynch performing close-up magic for a group" },
  { src: "/photos/group-magic-fire-girls-2.jpeg", alt: "Spencer Lynch performing fire magic for an audience" },
];

export function AboutAtWork() {
  return (
    <section className="grid grid-cols-1 md:grid-cols-3">
      {PHOTOS.map((photo, i) => (
        <div
          key={photo.src}
          className={`relative h-64 overflow-hidden md:h-80 ${i < PHOTOS.length - 1 ? "md:border-r md:border-r-gold/20" : ""}`}
        >
          <Image
            src={`${BASE_PATH}${photo.src}`}
            alt={photo.alt}
            fill
            className="object-cover object-center transition-[filter] duration-300 hover:brightness-110 motion-reduce:transition-none"
            sizes="(max-width: 640px) 100vw, 33vw"
          />
        </div>
      ))}
    </section>
  );
}
