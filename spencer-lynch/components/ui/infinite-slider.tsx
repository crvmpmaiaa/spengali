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

/**
 * InfiniteSlider — CSS-driven horizontal marquee primitive.
 *
 * Animation contract (defined in app/globals.css):
 *   - .animate-marquee runs `@keyframes marquee` from 0 → -50% translateX
 *   - reads --marquee-duration (default 40s) and --marquee-duration-hover (default 80s)
 *   - honours `prefers-reduced-motion: reduce` by stopping the animation
 *
 * Children are duplicated inline so the -50% endpoint produces a seamless loop.
 * The duplicate set is `aria-hidden` so assistive tech only announces the original.
 */
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
        <div className={cn("flex shrink-0 flex-nowrap items-center", gapClassName)}>
          {items.map((child, i) => (
            <div key={`a-${i}`} className="shrink-0">
              {child}
            </div>
          ))}
        </div>
        {/* Duplicate set — invisible to AT, present in flow for seamless loop */}
        <div
          className={cn("flex shrink-0 flex-nowrap items-center", gapClassName)}
          aria-hidden="true"
        >
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
