"use client";
import { useState } from "react";
import { SiteIntro } from "@/components/intro/site-intro";
import { HeroShowreel } from "@/components/showreel/hero-showreel";
import { CinemaFrame } from "@/components/showreel/cinema-frame";
import { TryATrickButton } from "@/components/tricks/try-a-trick-button";

export function HomeClient() {
  const [introEnded, setIntroEnded] = useState(false);

  return (
    <>
      <SiteIntro
        onDismiss={() => setIntroEnded(true)}
      />
      <div className="mx-auto mt-14 flex max-w-[760px] justify-center">
        <CinemaFrame
          slateTop={{ left: "SL · Reel · 2026", right: "" }}
          slateBottom={{ left: "Memorable Magic", right: "" }}
        >
          <HeroShowreel autoplay={introEnded} />
        </CinemaFrame>
      </div>

      <div className="mt-8 flex justify-center">
        <TryATrickButton />
      </div>
    </>
  );
}
