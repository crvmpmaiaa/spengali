import { SectionEyebrow } from "./section-eyebrow";

const BROADCASTERS = ["Sky Sports", "ITV", "Liverpool Echo"];

export function AsSeenOn() {
  return (
    <section className="px-6 py-24 md:px-10 md:py-32">
      <div className="mx-auto max-w-[1100px] text-center">
        <SectionEyebrow numeral="05" label="As Seen On" />
        <ul className="mt-10 flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
          {BROADCASTERS.map((name) => (
            <li
              key={name}
              className="font-display text-3xl italic text-cream/85 md:text-5xl"
            >
              {name}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
