import { cn } from "@/lib/utils";
import { InfiniteSlider } from "@/components/ui/infinite-slider";
import { ProgressiveBlur } from "@/components/ui/progressive-blur";
import { BASE_PATH } from "@/lib/base-path";

type Logo = {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  whiteBg?: boolean;
};

type LogoCloudProps = React.ComponentProps<"div"> & {
  logos: Logo[];
};

export function LogoCloud({ logos }: LogoCloudProps) {
  return (
    <div className="relative w-full bg-ink py-4">
      <div className="pointer-events-none absolute top-0 left-0 w-full border-t border-gold/15" />

      <InfiniteSlider gap={0} reverse duration={60} durationOnHover={24}>
        {logos.map((logo) => (
          <div
            key={`logo-${logo.alt}`}
            className={cn(
              "flex items-center justify-center bg-white px-4 py-2",
            )}
          >
            <img
              alt={logo.alt}
              className={cn(
                "pointer-events-none h-14 select-none md:h-20",
                logo.className,
              )}
              height="auto"
              loading="lazy"
              src={`${BASE_PATH}${logo.src}`}
              width="auto"
            />
          </div>
        ))}
      </InfiniteSlider>

      <ProgressiveBlur
        blurIntensity={1}
        className="pointer-events-none absolute top-0 left-0 hidden h-full w-[160px] md:block"
        direction="left"
      />
      <ProgressiveBlur
        blurIntensity={1}
        className="pointer-events-none absolute top-0 right-0 hidden h-full w-[160px] md:block"
        direction="right"
      />

      <div className="pointer-events-none absolute bottom-0 left-0 w-full border-b border-gold/15" />
    </div>
  );
}
