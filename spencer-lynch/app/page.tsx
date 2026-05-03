// app/page.tsx
import { CinemaFrame } from "@/components/showreel/cinema-frame";
import { HeroShowreel } from "@/components/showreel/hero-showreel";

export default function Home() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-ink p-10">
      <CinemaFrame
        slateTop={{ left: "SL · Reel · 2026", right: "● Live · 1080p" }}
        slateBottom={{ left: "Memorable Magic", right: "02:07" }}
      >
        <HeroShowreel />
      </CinemaFrame>
    </main>
  );
}
