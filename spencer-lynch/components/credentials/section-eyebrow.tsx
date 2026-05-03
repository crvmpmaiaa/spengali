import { cn } from "@/lib/utils";

export function SectionEyebrow({
  numeral,
  label,
  className,
}: {
  numeral: string;
  label: string;
  className?: string;
}) {
  return (
    <p
      className={cn(
        "font-mono text-[10px] uppercase tracking-eyebrow-wide text-gold/85",
        className,
      )}
    >
      — § {numeral} · {label} —
    </p>
  );
}
