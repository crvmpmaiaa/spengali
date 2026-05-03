// spencer-lynch/components/brand/sl-logo.tsx
import Image from "next/image";
import { cn } from "@/lib/utils";

const SOURCES = {
  color: "/brand/logo-color.jpg",
  bw: "/brand/logo-bw.jpg",
  "no-pips": "/brand/logo-no-pips.jpg",
} as const;

export type SLLogoVariant = keyof typeof SOURCES;

export function SLLogo({
  variant = "color",
  className,
  invertOnDark = false,
  width = 320,
  height = 100,
  priority = false,
}: {
  variant?: SLLogoVariant;
  className?: string;
  invertOnDark?: boolean;
  width?: number;
  height?: number;
  priority?: boolean;
}) {
  return (
    <Image
      src={SOURCES[variant]}
      alt="Spencer Lynch — Memorable Magic"
      width={width}
      height={height}
      priority={priority}
      className={cn(
        "h-auto w-auto",
        invertOnDark && "invert mix-blend-screen brightness-110",
        className,
      )}
    />
  );
}
