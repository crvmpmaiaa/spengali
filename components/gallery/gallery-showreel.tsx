import { CinemaFrame } from "@/components/showreel/cinema-frame";

export function GalleryShowreel() {
  return (
    <section id="showreel" className="px-5 py-16 md:px-10">
      <div className="mx-auto max-w-[960px]">
        <p className="mb-6 text-center font-display text-lg italic text-cream/70">
          "Two minutes. Twenty years."
        </p>
        <CinemaFrame
          slateTop={{ left: "SL · Showreel · 2017", right: "" }}
          slateBottom={{ left: "Memorable Magic", right: "02:07" }}
          className="max-w-none"
        >
          <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
            <iframe
              src="https://player.vimeo.com/video/214361408?autoplay=0&loop=0&color=D4AF37&byline=0&portrait=0&title=0&dnt=1"
              className="absolute inset-0 h-full w-full"
              allow="autoplay; fullscreen; picture-in-picture"
              allowFullScreen
              title="Spencer Lynch Showreel — Memorable Magic"
            />
          </div>
        </CinemaFrame>
      </div>
    </section>
  );
}
