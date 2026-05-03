import { Fragment } from "react";
import { SectionEyebrow } from "./section-eyebrow";

const CAUSES = [
  "LFC Foundation",
  "Liverpool Disabled Supporters Association",
  "Owen McVeigh Foundation",
  "Down Syndrome Liverpool",
  "Countess of Chester Hospital",
  "Wirral Met College",
];

export function WorkThatMatters() {
  return (
    <section className="px-6 py-24 md:px-10 md:py-32">
      <div className="mx-auto max-w-[1100px]">
        <div
          className="border-l-2 border-gold px-6 py-12 md:px-12 md:py-16"
          style={{ background: "rgba(245, 230, 200, 0.04)" }}
        >
          <SectionEyebrow numeral="04" label="The Work That Matters" />
          <h2 className="mt-6 font-display text-4xl italic leading-[1.05] text-cream md:text-6xl lg:text-[60px]">
            Twenty years of giving the trick away.
          </h2>

          <p className="mt-8 max-w-[820px] text-lg leading-relaxed text-cream/85 md:text-xl">
            {CAUSES.map((cause, i) => (
              <Fragment key={cause}>
                {cause}
                {i < CAUSES.length - 1 && (
                  <span aria-hidden="true" className="mx-3 text-gold">
                    ·
                  </span>
                )}
              </Fragment>
            ))}
          </p>
        </div>
      </div>
    </section>
  );
}
