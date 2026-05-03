import { Fragment } from "react";
import { SectionEyebrow } from "./section-eyebrow";

const NAMES = [
  "Edward Jones",
  "Pension Insurance Corporation",
  "GBG plc",
  "Holloway Friendly",
];

export function QuietMoney() {
  return (
    <section className="px-6 py-24 md:px-10 md:py-32">
      <div className="mx-auto max-w-[1100px] text-center">
        <SectionEyebrow numeral="03" label="The Quiet Money" />
        <h2 className="mt-6 font-display text-4xl italic leading-[1.05] text-cream md:text-6xl lg:text-[64px]">
          Where the suits like a card trick most.
        </h2>

        <p className="mx-auto mt-10 max-w-[760px] text-lg leading-relaxed text-cream/85 md:text-xl">
          {NAMES.map((name, i) => (
            <Fragment key={name}>
              {name}
              {i < NAMES.length - 1 && (
                <span aria-hidden="true" className="mx-3 text-gold">
                  ·
                </span>
              )}
            </Fragment>
          ))}
        </p>
      </div>
    </section>
  );
}
