// spencer-lynch/components/showreel/cinema-frame.tsx
import { cn } from "@/lib/utils";

export function CinemaFrame({
  children,
  slateTop,
  slateBottom,
  className,
}: {
  children: React.ReactNode;
  slateTop?: { left: string; right: string };
  slateBottom?: { left: string; right: string };
  className?: string;
}) {
  return (
    <div
      className={cn(
        "relative inline-block w-full max-w-[988px] border border-gold/40 p-[22px]",
        "bg-gradient-to-b from-ink-tinted to-ink-warm",
        "shadow-[0_32px_80px_rgba(0,0,0,0.7),inset_0_0_0_1px_rgba(212,175,55,0.12)]",
        className,
      )}
    >
      {/* corner brackets */}
      <span className="pointer-events-none absolute left-2 top-2 h-[18px] w-[18px] border-l border-t border-gold" />
      <span className="pointer-events-none absolute right-2 top-2 h-[18px] w-[18px] border-r border-t border-gold" />
      <span className="pointer-events-none absolute bottom-2 left-2 h-[18px] w-[18px] border-b border-l border-gold" />
      <span className="pointer-events-none absolute bottom-2 right-2 h-[18px] w-[18px] border-b border-r border-gold" />

      {slateTop && (
        <div
          className={cn(
            "mb-[10px] flex items-center px-1 font-mono text-[9px] uppercase tracking-[0.6em] text-gold/85",
            slateTop.right ? "justify-between" : "justify-center",
          )}
        >
          <span>{slateTop.left}</span>
          {slateTop.right && <span>{slateTop.right}</span>}
        </div>
      )}

      <div className="relative aspect-video overflow-hidden bg-black">{children}</div>

      {slateBottom && (
        <div
          className={cn(
            "mt-[10px] flex items-center px-1 font-mono text-[9px] uppercase tracking-[0.6em] text-gold/60",
            slateBottom.right ? "justify-between" : "justify-center",
          )}
        >
          <span>{slateBottom.left}</span>
          {slateBottom.right && <span>{slateBottom.right}</span>}
        </div>
      )}
    </div>
  );
}
