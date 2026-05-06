import type { Metadata } from "next";
import { TopNav } from "@/components/nav/top-nav";
import { SiteFooter } from "@/components/footer/site-footer";
import { GalleryShowreel } from "@/components/gallery/gallery-showreel";
import { GalleryPhotos } from "@/components/gallery/gallery-photos";

export const metadata: Metadata = {
  title: "Showreel & Photos · Spencer Lynch Close-Up Magician",
  description:
    "Watch Spencer Lynch's magic showreel and browse performance photography from twenty years of close-up magic at Liverpool FC, corporate events, weddings and private parties.",
  alternates: { canonical: "https://spencerlynch.co.uk/gallery" },
  openGraph: {
    title: "Showreel & Photos · Spencer Lynch Close-Up Magician",
    description:
      "Watch the showreel and browse photos from twenty years of close-up magic — Premier League stadiums, boardrooms, weddings and private events.",
    url: "https://spencerlynch.co.uk/gallery",
  },
};

const PHONE_TEL = "+447706319468";
const EMAIL = "spencer@example.com";

export default function GalleryPage() {
  return (
    <>
      <TopNav />
      <main className="bg-ink">
        <div className="px-5 pb-4 pt-8 text-center md:pb-6 md:pt-12">
          <p className="font-mono text-[10px] uppercase tracking-eyebrow text-gold/85">
            — Gallery —
          </p>
          <h1 className="mt-4 font-display text-4xl italic text-cream md:text-5xl">
            The Work
          </h1>
        </div>

        <GalleryShowreel />
        <GalleryPhotos />
      </main>
      <SiteFooter phoneTel={PHONE_TEL} emailMailto={EMAIL} />
    </>
  );
}
