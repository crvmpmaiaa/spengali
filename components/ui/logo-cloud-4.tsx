import { cn } from "@/lib/utils";
import { InfiniteSlider } from "@/components/ui/infinite-slider";
import { ProgressiveBlur } from "@/components/ui/progressive-blur";
import { BASE_PATH } from "@/lib/base-path";

type Logo = {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  /** Optional Tailwind classes appended per-logo (e.g. to bump a single logo's size). */
  className?: string;
};

type LogoCloudProps = React.ComponentProps<"div"> & {
  logos: Logo[];
};

export function LogoCloud({ logos }: LogoCloudProps) {
  return (
    <div className="relative w-full bg-white py-4">
      <div className="pointer-events-none absolute top-0 left-0 w-full border-t" />

      <InfiniteSlider gap={56} reverse duration={100} durationOnHover={40}>
        {logos.map((logo) => (
          <img
            alt={logo.alt}
            className={cn(
              "pointer-events-none h-10 select-none md:h-14",
              logo.className,
            )}
            height="auto"
            key={`logo-${logo.alt}`}
            loading="lazy"
            src={`${BASE_PATH}${logo.src}`}
            width="auto"
          />
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

      <div className="pointer-events-none absolute bottom-0 left-0 w-full border-b" />
    </div>
  );
}
