// spencer-lynch/components/brand/sl-logo.tsx
import Image from "next/image";
import { cn } from "@/lib/utils";
import { BASE_PATH } from "@/lib/base-path";

/**
 * Logo variants are pre-recoloured PNGs with transparent backgrounds,
 * matched to the site palette (gold SL flourish + cream wordmark).
 * No CSS filter tricks needed — these render correctly on any dark bg.
 */
const SOURCES = {
  color: "/brand/logo-on-dark.png",
  bw: "/brand/logo-bw.jpg", // monochrome — not currently rendered; reserved for future overlays
  "no-pips": "/brand/logo-no-pips-on-dark.png",
} as const;

export type SLLogoVariant = keyof typeof SOURCES;

export function SLLogo({
  variant = "color",
  className,
  width = 320,
  height = 100,
  priority = false,
}: {
  variant?: SLLogoVariant;
  className?: string;
  width?: number;
  height?: number;
  priority?: boolean;
}) {
  return (
    <Image
      src={`${BASE_PATH}${SOURCES[variant]}`}
      alt="Spencer Lynch · Memorable Magic"
      width={width}
      height={height}
      priority={priority}
      className={cn("h-auto w-auto", className)}
    />
  );
}
