// spencer-lynch/components/ui/infinite-slider.tsx
"use client";

import { Children, type CSSProperties, type ReactNode } from "react";
import { cn } from "@/lib/utils";

export type InfiniteSliderProps = {
  children: ReactNode;
  /** Seconds for one full pass at rest. Default 40. */
  duration?: number;
  /** Seconds for one full pass while hovered (slower → bigger number). Default 2× duration. */
  durationOnHover?: number;
  /** Tailwind gap utility applied to the flex track. Default "gap-12" (3rem). */
  gapClassName?: string;
  /** Extra classes for the outer overflow-hidden container. */
  className?: string;
  /** Extra classes for the inner animated track. */
  trackClassName?: string;
};

export function InfiniteSlider({
  children,
  duration = 40,
  durationOnHover,
  gapClassName = "gap-12",
  className,
  trackClassName,
}: InfiniteSliderProps) {
  const slowDuration = durationOnHover ?? duration * 2;
  const items = Children.toArray(children);

  const trackStyle = {
    "--marquee-duration": `${duration}s`,
    "--marquee-duration-hover": `${slowDuration}s`,
  } as CSSProperties;

  return (
    <div
      className={cn(
        "relative w-full overflow-hidden",
        // The edge-fade is layered behind <ProgressiveBlur> at the call site;
        // here we only provide the overflow clip + track.
        className,
      )}
    >
      <div
        className={cn(
          "flex w-max shrink-0 flex-nowrap items-center animate-marquee",
          gapClassName,
          trackClassName,
        )}
        style={trackStyle}
      >
        {items.map((child, i) => (
          <div key={`a-${i}`} className="shrink-0">
            {child}
          </div>
        ))}
        {/* Duplicate set — invisible to AT, present in flow for seamless loop */}
        <div className={cn("flex shrink-0 flex-nowrap items-center", gapClassName)} aria-hidden="true">
          {items.map((child, i) => (
            <div key={`b-${i}`} className="shrink-0">
              {child}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
