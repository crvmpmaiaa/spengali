// app/page.tsx
import { TopNav } from "@/components/nav/top-nav";
import { CinemaFrame } from "@/components/showreel/cinema-frame";
import { HeroShowreel } from "@/components/showreel/hero-showreel";
import { SiteFooter } from "@/components/footer/site-footer";

export default function Home() {
  return (
    <>
      <TopNav />
      <main className="flex min-h-[80vh] items-center justify-center bg-ink p-10">
        <CinemaFrame
          slateTop={{ left: "SL · Reel · 2026", right: "● Live · 1080p" }}
          slateBottom={{ left: "Memorable Magic", right: "02:07" }}
        >
          <HeroShowreel />
        </CinemaFrame>
      </main>
      <SiteFooter
        phoneTel="+447000000000"
        emailMailto="spencer@example.com"
      />
    </>
  );
}
