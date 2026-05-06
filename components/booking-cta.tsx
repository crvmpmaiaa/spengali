import Link from "next/link";

export function BookingCta({ label = "Send an Enquiry" }: { label?: string }) {
  return (
    <section className="bg-ink px-5 py-20 text-center md:py-28">
      <div className="mx-auto max-w-xl">
        <p className="font-mono text-[11px] uppercase tracking-eyebrow text-gold/60">
          ✦ Make your event unforgettable ✦
        </p>
        <div className="mx-auto my-5 flex items-center gap-3">
          <span className="flex-1 border-t border-gold/20" />
          <span className="text-gold/30 text-[9px]">◆</span>
          <span className="flex-1 border-t border-gold/20" />
        </div>
        <p className="font-display text-3xl italic text-cream md:text-4xl">
          "Ready to make your<br />room remember?"
        </p>
        <div className="mx-auto my-5 flex items-center gap-3">
          <span className="flex-1 border-t border-gold/20" />
          <span className="text-gold/30 text-[9px]">◆</span>
          <span className="flex-1 border-t border-gold/20" />
        </div>
        <Link
          href="/book"
          className="mt-2 inline-block rounded-sm border border-gold/40 px-10 py-3 font-display text-base italic text-cream/85 transition-all hover:border-gold/70 hover:bg-gold/10 hover:text-cream"
        >
          {label}
        </Link>
      </div>
    </section>
  );
}
