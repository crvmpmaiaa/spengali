// spencer-lynch/components/ui/progressive-blur.tsx
"use client";

import { type CSSProperties } from "react";
import { cn } from "@/lib/utils";

export type ProgressiveBlurProps = {
  side: "left" | "right";
  /** Width of the blur band as a CSS length (e.g. "120px", "10%"). Default "10%". */
  width?: string;
  /** Background colour the blur fades to. Default matches the page ink. */
  fadeTo?: string;
  className?: string;
};

/**
 * Edge-fade mask used at InfiniteSlider boundaries. Stacks a backdrop-blur
 * gradient with a colour-fade gradient so logos blur and dim toward the edge.
 */
export function ProgressiveBlur({
  side,
  width = "10%",
  fadeTo = "var(--color-ink, #070504)",
  className,
}: ProgressiveBlurProps) {
  const horizontal: CSSProperties =
    side === "left" ? { left: 0 } : { right: 0 };

  const maskGradient =
    side === "left"
      ? "linear-gradient(to right, black, transparent)"
      : "linear-gradient(to left, black, transparent)";

  const colourFade =
    side === "left"
      ? `linear-gradient(to right, ${fadeTo}, transparent)`
      : `linear-gradient(to left, ${fadeTo}, transparent)`;

  return (
    <div
      data-progressive-blur=""
      className={cn("pointer-events-none absolute top-0 z-10 h-full", className)}
      style={{
        ...horizontal,
        width,
        background: colourFade,
        backdropFilter: "blur(4px)",
        WebkitBackdropFilter: "blur(4px)",
        WebkitMaskImage: maskGradient,
        maskImage: maskGradient,
      }}
    />
  );
}
