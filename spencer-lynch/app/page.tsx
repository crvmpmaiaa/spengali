// app/page.tsx (TEMPORARY)
import { CinemaFrame } from "@/components/showreel/cinema-frame";

export default function Home() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-ink p-10">
      <CinemaFrame
        slateTop={{ left: "SL · Reel · 2026", right: "● Live · 1080p" }}
        slateBottom={{ left: "Memorable Magic", right: "02:07" }}
      >
        <div className="grid h-full place-items-center text-cream/40">[ video slot ]</div>
      </CinemaFrame>
    </main>
  );
}
