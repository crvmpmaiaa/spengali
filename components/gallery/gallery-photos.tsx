import Image from "next/image";
import { BASE_PATH } from "@/lib/base-path";

const PHOTOS = [
  { src: "/photos/reaction.jpeg", alt: "Audience reaction to Spencer Lynch's card trick" },
  { src: "/photos/reaction2.jpeg", alt: "Audience reaction to Spencer Lynch's close-up magic" },
  { src: "/photos/group-magic-girls.jpeg", alt: "Spencer Lynch performing close-up magic for a group" },
  { src: "/photos/group-magic.jpeg", alt: "Spencer Lynch performing close-up magic" },
  { src: "/photos/group-magic-fire-girls-2.jpeg", alt: "Spencer Lynch performing fire magic for an audience" },
  { src: "/photos/spence-fire.jpeg", alt: "Spencer Lynch performing fire magic" },
  { src: "/photos/spence-fire-3.jpeg", alt: "Spencer Lynch performing fire magic at a live event" },
  { src: "/photos/celeb.jpeg", alt: "Spencer Lynch performing close-up magic" },
  { src: "/photos/gerrard.jpeg", alt: "Spencer Lynch performing close-up magic at Anfield hospitality suite" },
];

export function GalleryPhotos() {
  return (
    <section id="photos" className="px-5 pb-20 md:px-10">
      <div className="mx-auto max-w-[1100px]">
        <div className="mb-10 h-px w-full bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
        <p className="mb-8 text-center font-mono text-[10px] uppercase tracking-eyebrow text-gold/85">
          — In the room —
        </p>
        <div className="columns-1 gap-3 sm:columns-2 lg:columns-3">
          {PHOTOS.map((photo) => (
            <div key={photo.src} className="group mb-3 overflow-hidden">
              <Image
                src={`${BASE_PATH}${photo.src}`}
                alt={photo.alt}
                width={600}
                height={400}
                className="w-full object-cover transition-[filter,box-shadow] duration-300 group-hover:brightness-110 group-hover:ring-1 group-hover:ring-gold/40 motion-reduce:transition-none"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
