"use client";
import { useState } from "react";
import { SiteIntro } from "@/components/intro/site-intro";
import { HeroShowreel } from "@/components/showreel/hero-showreel";
import { CinemaFrame } from "@/components/showreel/cinema-frame";
export function HomeClient() {
  const [introEnded, setIntroEnded] = useState(false);

  return (
    <>
      <SiteIntro
        mobileSrc="/intro/spencer-mobile.mp4"
        onDismiss={() => setIntroEnded(true)}
      />
      <div className="mx-auto mt-14 flex max-w-[988px] justify-center">
        <CinemaFrame
          slateTop={{ left: "SL · Reel · 2026", right: "" }}
          slateBottom={{ left: "Memorable Magic", right: "" }}
        >
          <HeroShowreel autoplay={introEnded} />
        </CinemaFrame>
      </div>
    </>
  );
}
