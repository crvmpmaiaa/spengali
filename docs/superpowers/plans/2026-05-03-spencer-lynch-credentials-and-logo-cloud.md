# Spencer Lynch — Credentials Sections & Logo Cloud Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Render homepage sections 5–9 (the five credentials sections § 01–§ 05) between the hero and the footer, with §02 driven by a reusable shadcn-style `<InfiniteSlider>` + `<ProgressiveBlur>` grayscale logo cloud. Client logos are sourced from the public web — this plan does not block on Spencer-supplied vector files.

**Architecture:** Two new reusable primitives under `components/ui/` (`infinite-slider.tsx`, `progressive-blur.tsx`) and a sibling `components/credentials/` directory with one self-contained component per section (`stadium-years.tsx`, `boardrooms.tsx`, `quiet-money.tsx`, `work-that-matters.tsx`, `as-seen-on.tsx`). Each section component owns its copy, its logo/name list, and its visual treatment. The homepage (`app/page.tsx`) imports them and renders them in order between the hero `<section>` and `<SiteFooter />`. The InfiniteSlider uses CSS keyframes for transform-only animation (paint-cheap, GPU-friendly) with `prefers-reduced-motion` honoured via a media query that pauses the animation and shows a static row. ProgressiveBlur is a pair of absolute-positioned mask elements at the slider edges. Logos render as `<Image>` (next/image) with `width`/`height` set so layout is stable and no CLS occurs.

**Tech Stack:** Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS v4 (`@theme` blocks in `app/globals.css`) · shadcn 4.6 · framer-motion · react-use-measure · vitest · Playwright

**Spec:** [`docs/superpowers/specs/2026-05-03-spencer-lynch-site-design.md`](../specs/2026-05-03-spencer-lynch-site-design.md) — homepage architecture sections 5–9 (lines 138–142) and the Credentials five-section table (lines 226–232) lock the design.

**Plan 1 reference:** [`docs/superpowers/plans/2026-05-03-spencer-lynch-foundation-and-hero.md`](./2026-05-03-spencer-lynch-foundation-and-hero.md) — established the design tokens (`bg-ink`, `text-cream`, `text-gold`, `font-display`, `tracking-eyebrow`, etc.) and component patterns this plan reuses.

**Working directory:** `/Users/admin/Desktop/spengali/spencer-lynch/`

**Branch:** `plan-2-credentials` (branched from `plan-1-foundation`; Plan 1 has not yet merged to `main` — the user deferred deploy)

---

## Roadmap (where this plan sits)

| # | Plan | Status |
|---|------|--------|
| 1 | Foundation & Hero Shell | ✅ done — `plan-1-foundation` branch |
| **2** | **Credentials Sections (§ 01–§ 05) + Logo Cloud (this plan)** | 🔨 this plan |
| 3 | Trick Framework + 3 Tricks at Launch | future |
| 4 | Animated Spencer System | future |
| 5 | Other Pages (about, gallery, work, hidden routes) | future |
| 6 | Testimonials Carousel + Social Viral Strip | future |
| 7 | Polish & Launch | future |

**Out of scope for this plan** — explicitly deferred:

- Section 3 (three category clip tiles: Close-Up · Tech Illusions · Big Events) — moves to Plan 3 because it needs per-category clip content we don't yet have
- Section 4 (interactive trick zone / pick-a-card) — Plan 3
- Section 10–11 (testimonials, social strip) — Plan 6
- Wiring §02 logos to `/work/[slug]` case-study links — those slugs are built in Plan 5; for now §02 logos render non-clickable
- Replacing publicly-sourced grayscale logos with Spencer-supplied vectors — happens organically over time, not blocking

---

## File Structure (created or modified by this plan)

```
spencer-lynch/
├── app/
│   ├── globals.css                                # MODIFY — add @keyframes marquee + .animate-marquee utility
│   └── page.tsx                                   # MODIFY — insert <Credentials /> block between hero and footer
├── components/
│   ├── credentials/                               # NEW directory
│   │   ├── stadium-years.tsx                      # § 01
│   │   ├── boardrooms.tsx                         # § 02 (InfiniteSlider host)
│   │   ├── quiet-money.tsx                        # § 03
│   │   ├── work-that-matters.tsx                  # § 04
│   │   ├── as-seen-on.tsx                         # § 05
│   │   ├── section-eyebrow.tsx                    # shared eyebrow primitive
│   │   └── credentials-block.tsx                  # composes all five in document order
│   └── ui/
│       ├── infinite-slider.tsx                    # NEW reusable
│       └── progressive-blur.tsx                   # NEW reusable
├── public/
│   └── brand/
│       ├── crests/                                # NEW — § 01 colour football crests
│       │   ├── liverpool.svg
│       │   ├── everton.svg
│       │   ├── uefa.svg
│       │   ├── chester-racecourse.svg
│       │   └── wrexham.svg                        # optional — only if findable on public web
│       └── logos/                                 # NEW — § 02 grayscale corporate logos
│           ├── google.svg
│           ├── marks-and-spencer.svg
│           ├── santander.svg
│           ├── morrisons.svg
│           ├── specsavers.svg
│           ├── five-guys.svg
│           ├── aon.svg
│           ├── nec.svg
│           ├── chester-zoo.svg
│           └── worldwide-hospitality.svg
└── tests/
    ├── unit/
    │   ├── infinite-slider.test.tsx               # NEW
    │   ├── progressive-blur.test.tsx              # NEW
    │   └── section-eyebrow.test.tsx               # NEW
    └── e2e/
        └── credentials-smoke.spec.ts              # NEW
```

No deletions. No file moves. No changes to existing components/tests except `app/page.tsx` and `app/globals.css`.

---

## Design Tokens — what's already there, what's added

**Already in `app/globals.css` (from Plan 1)** — reuse, do not redefine:

| Token | Class | Value |
|---|---|---|
| Ink (page bg) | `bg-ink` `text-ink` | `#070504` |
| Ink-warm (panel bg) | `bg-ink-warm` | `#0A0807` |
| Ink-tinted (gradient inner) | — | `#1A1308` |
| Cream | `text-cream` | `#F5E6C8` |
| Gold (primary accent) | `text-gold` `border-gold` `bg-gold` | `#D4AF37` |
| Gold-deep | `text-gold-deep` | `#7A5A18` |
| Display serif | `font-display` | Playfair Display 700 italic |
| Mono | `font-mono` | JetBrains Mono |
| Eyebrow tracking | `tracking-eyebrow` | 0.4em |
| Eyebrow tracking wide | `tracking-eyebrow-wide` | 0.55em |
| Pinstripe overlay | `.pinstripe` | 45° gold-on-dark hairline |

**Added by this plan to `app/globals.css`:**

```css
@keyframes marquee {
  from { transform: translate3d(0, 0, 0); }
  to   { transform: translate3d(-50%, 0, 0); }
}

@layer utilities {
  .animate-marquee {
    animation: marquee var(--marquee-duration, 40s) linear infinite;
    will-change: transform;
  }
  .animate-marquee:hover { animation-duration: var(--marquee-duration-hover, 80s); }
  @media (prefers-reduced-motion: reduce) {
    .animate-marquee { animation: none; transform: translate3d(0, 0, 0); }
  }
}
```

The duration values are exposed as CSS custom properties so `<InfiniteSlider>` can override them per-instance via inline `style` without authoring extra utility variants.

---

# Phase 0 — Branch + Logo Asset Sourcing

## Task 0.1: Create the working branch

**Files:** none — git only.

- [ ] **Step 1: Confirm clean tree on `plan-1-foundation`**

```bash
cd "/Users/admin/Desktop/spengali" && git status
```
Expected: `On branch plan-1-foundation` and `nothing to commit, working tree clean`. If dirty, stop and surface to the user.

- [ ] **Step 2: Create and check out `plan-2-credentials`**

```bash
cd "/Users/admin/Desktop/spengali" && \
git checkout -b plan-2-credentials
```
Expected: `Switched to a new branch 'plan-2-credentials'`.

- [ ] **Step 3: Verify the dev server still boots**

```bash
cd "/Users/admin/Desktop/spengali/spencer-lynch" && npm run dev
```
Open `http://localhost:3000` — confirm Plan 1 hero renders. Stop the server before continuing.

## Task 0.2: Source § 01 football crests

**Files:**
- Create: `spencer-lynch/public/brand/crests/{liverpool,everton,uefa,chester-racecourse}.svg` (and `wrexham.svg` if available)

Sourcing protocol — for each crest, in order of preference: (1) Wikimedia Commons SVG, (2) brand's official press / about page, (3) PNG with transparency from any reputable source, converted to small SVG-wrapped raster only if no SVG exists.

- [ ] **Step 1: Make the destination directory**

```bash
mkdir -p "/Users/admin/Desktop/spengali/spencer-lynch/public/brand/crests"
```

- [ ] **Step 2: Source Liverpool FC crest**

Search "Liverpool FC logo svg site:wikimedia.org" — Wikimedia Commons hosts the current crest. Download the SVG to `public/brand/crests/liverpool.svg`. Open the file and confirm it renders by viewing it in a browser (drag-drop the file). Confirm no embedded raster — if it's a wrapped PNG, find a true-vector alternative.

- [ ] **Step 3: Source Everton FC crest**

Same protocol — `public/brand/crests/everton.svg`.

- [ ] **Step 4: Source UEFA logo**

Same protocol — `public/brand/crests/uefa.svg`.

- [ ] **Step 5: Source Chester Racecourse logo**

Chester Racecourse rarely has a Wikimedia entry — try their press pack on chester-races.com. If only PNG is available, save as `chester-racecourse.png` instead and update the manifest in Task 2.2 accordingly.

- [ ] **Step 6: Optionally source Wrexham AFC crest**

If a clean SVG of Wrexham AFC's current crest is findable in under five minutes, add `wrexham.svg`. If not, ship four crests — the spec allows this ("+ Wrexham AFC if logo available", spec line 228).

- [ ] **Step 7: Verify file sizes**

```bash
ls -lah /Users/admin/Desktop/spengali/spencer-lynch/public/brand/crests/
```
Expected: each SVG under 50 KB. If a PNG is bigger than 100 KB, run it through a lossless optimiser (`pngcrush` or similar) before committing.

- [ ] **Step 8: Commit**

```bash
cd "/Users/admin/Desktop/spengali" && \
git add spencer-lynch/public/brand/crests/ && \
git commit -m "feat(spencer-lynch): source § 01 Stadium Years football crests from public web"
```

## Task 0.3: Source § 02 corporate logos (grayscale-friendly)

**Files:**
- Create: `spencer-lynch/public/brand/logos/{google,marks-and-spencer,santander,morrisons,specsavers,five-guys,aon,nec,chester-zoo,worldwide-hospitality}.svg`

The slider applies a CSS grayscale filter at runtime — source logos can be in colour. Each must be either a clean SVG or a PNG with transparent background. Per-logo target file size: under 30 KB.

- [ ] **Step 1: Make the destination directory**

```bash
mkdir -p "/Users/admin/Desktop/spengali/spencer-lynch/public/brand/logos"
```

- [ ] **Step 2: Source ten logos in this order**

For each name below, search "{brand} logo svg site:svgl.app" first (curated brand SVG library), then "site:wikimedia.org", then the brand's own press page. Save with the listed kebab-case filename.

| Filename | Brand |
|---|---|
| `google.svg` | Google |
| `marks-and-spencer.svg` | Marks & Spencer |
| `santander.svg` | Santander |
| `morrisons.svg` | Morrisons |
| `specsavers.svg` | Specsavers |
| `five-guys.svg` | Five Guys |
| `aon.svg` | Aon |
| `nec.svg` | NEC (the UK arena, not the Japanese tech firm — disambiguate carefully) |
| `chester-zoo.svg` | Chester Zoo |
| `worldwide-hospitality.svg` | Worldwide Hospitality |

If any single brand's SVG is genuinely unfindable in five minutes, save a transparent PNG instead with the same kebab-case stem (`worldwide-hospitality.png`) and note the substitution in the eventual commit message. The Boardrooms component (Task 2.4) will read whichever extension exists.

- [ ] **Step 3: Verify all ten files render**

Open each in a browser by dragging the file in. Expected: the brand mark renders cleanly against transparency. If any logo has a baked-in white background fill instead of transparency, edit the SVG in a text editor to remove the `<rect fill="#fff" .../>` background, or find an alternative.

- [ ] **Step 4: Verify file sizes**

```bash
ls -lah /Users/admin/Desktop/spengali/spencer-lynch/public/brand/logos/
```
Expected: each under 30 KB. Larger files often mean an embedded raster — replace with vector if possible.

- [ ] **Step 5: Commit**

```bash
cd "/Users/admin/Desktop/spengali" && \
git add spencer-lynch/public/brand/logos/ && \
git commit -m "feat(spencer-lynch): source § 02 Boardrooms grayscale logo cloud assets"
```

---

# Phase 1 — Slider Primitives

## Task 1.1: Add `marquee` keyframes utility to globals.css

**Files:**
- Modify: `spencer-lynch/app/globals.css` — append a new `@layer utilities` block (or extend the existing one)

- [ ] **Step 1: Add the keyframes + utility**

Append to the **end** of `spencer-lynch/app/globals.css` (after the existing `@layer utilities { .pinstripe { ... } }` block):

```css
@keyframes marquee {
  from { transform: translate3d(0, 0, 0); }
  to   { transform: translate3d(-50%, 0, 0); }
}

@layer utilities {
  .animate-marquee {
    animation: marquee var(--marquee-duration, 40s) linear infinite;
    will-change: transform;
  }
  .animate-marquee:hover {
    animation-duration: var(--marquee-duration-hover, 80s);
  }
  @media (prefers-reduced-motion: reduce) {
    .animate-marquee {
      animation: none;
      transform: translate3d(0, 0, 0);
    }
  }
}
```

The `translate3d(-50%, 0, 0)` end-state assumes the slider duplicates its children once (so total content width is 200%). The `<InfiniteSlider>` component in Task 1.2 enforces that duplication.

- [ ] **Step 2: Run dev server, sanity-check no regression**

```bash
cd "/Users/admin/Desktop/spengali/spencer-lynch" && npm run dev
```
Open `http://localhost:3000` — hero still renders, no console errors. Stop the server.

- [ ] **Step 3: Commit**

```bash
cd "/Users/admin/Desktop/spengali" && \
git add spencer-lynch/app/globals.css && \
git commit -m "feat(spencer-lynch): add marquee keyframes + .animate-marquee utility for InfiniteSlider"
```

## Task 1.2: Build `<InfiniteSlider>` (test → impl)

**Files:**
- Create: `spencer-lynch/tests/unit/infinite-slider.test.tsx`
- Create: `spencer-lynch/components/ui/infinite-slider.tsx`

- [ ] **Step 1: Write the failing test**

Create `spencer-lynch/tests/unit/infinite-slider.test.tsx`:

```tsx
// spencer-lynch/tests/unit/infinite-slider.test.tsx
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { InfiniteSlider } from "@/components/ui/infinite-slider";

describe("InfiniteSlider", () => {
  it("renders its children", () => {
    render(
      <InfiniteSlider>
        <span>Alpha</span>
        <span>Beta</span>
      </InfiniteSlider>,
    );
    // Each child appears at least once (twice in DOM due to duplication)
    expect(screen.getAllByText("Alpha").length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText("Beta").length).toBeGreaterThanOrEqual(1);
  });

  it("duplicates children for seamless loop", () => {
    render(
      <InfiniteSlider>
        <span>Solo</span>
      </InfiniteSlider>,
    );
    // The seamless-loop requires the children to be rendered exactly twice
    expect(screen.getAllByText("Solo").length).toBe(2);
  });

  it("hides the duplicate set from assistive tech", () => {
    const { container } = render(
      <InfiniteSlider>
        <span>Solo</span>
      </InfiniteSlider>,
    );
    // The aria-hidden duplicate must exist and contain the same children
    const ariaHidden = container.querySelector('[aria-hidden="true"]');
    expect(ariaHidden).not.toBeNull();
    expect(ariaHidden!.textContent).toContain("Solo");
  });

  it("applies a custom duration via CSS custom property", () => {
    const { container } = render(
      <InfiniteSlider duration={20}>
        <span>X</span>
      </InfiniteSlider>,
    );
    const track = container.querySelector(".animate-marquee") as HTMLElement;
    expect(track.style.getPropertyValue("--marquee-duration")).toBe("20s");
  });
});
```

- [ ] **Step 2: Run the test, expect failure**

```bash
cd "/Users/admin/Desktop/spengali/spencer-lynch" && npm test -- infinite-slider
```
Expected: FAIL — "Cannot find module '@/components/ui/infinite-slider'".

- [ ] **Step 3: Implement the component**

Create `spencer-lynch/components/ui/infinite-slider.tsx`:

```tsx
// spencer-lynch/components/ui/infinite-slider.tsx
"use client";

import { Children, type CSSProperties, type ReactNode } from "react";
import { cn } from "@/lib/utils";

export type InfiniteSliderProps = {
  children: ReactNode;
  /** Seconds for one full pass at rest. Default 40. */
  duration?: number;
  /** Seconds for one full pass while hovered (slower → bigger number). Default 2× duration. */
  durationOnHover?: number;
  /** Tailwind gap utility applied to the flex track. Default "gap-12" (3rem). */
  gapClassName?: string;
  /** Extra classes for the outer overflow-hidden container. */
  className?: string;
  /** Extra classes for the inner animated track. */
  trackClassName?: string;
};

export function InfiniteSlider({
  children,
  duration = 40,
  durationOnHover,
  gapClassName = "gap-12",
  className,
  trackClassName,
}: InfiniteSliderProps) {
  const slowDuration = durationOnHover ?? duration * 2;
  const items = Children.toArray(children);

  const trackStyle = {
    "--marquee-duration": `${duration}s`,
    "--marquee-duration-hover": `${slowDuration}s`,
  } as CSSProperties;

  return (
    <div
      className={cn(
        "relative w-full overflow-hidden",
        // The edge-fade is layered behind <ProgressiveBlur> at the call site;
        // here we only provide the overflow clip + track.
        className,
      )}
    >
      <div
        className={cn(
          "flex w-max shrink-0 flex-nowrap items-center animate-marquee",
          gapClassName,
          trackClassName,
        )}
        style={trackStyle}
      >
        {items.map((child, i) => (
          <div key={`a-${i}`} className="shrink-0">
            {child}
          </div>
        ))}
        {/* Duplicate set — invisible to AT, present in flow for seamless loop */}
        <div className={cn("flex shrink-0 flex-nowrap items-center", gapClassName)} aria-hidden="true">
          {items.map((child, i) => (
            <div key={`b-${i}`} className="shrink-0">
              {child}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
```

Key choices:
- **CSS-keyframes animation** rather than framer-motion `useAnimationFrame`. Simpler, GPU-accelerated, honours `prefers-reduced-motion` via a media query in the utility (see Task 1.1).
- **Duplicate set** is a single sibling rendering all items again, marked `aria-hidden="true"`. This makes the `translate3d(-50%, 0, 0)` end-state seamless because at -50% the second set has scrolled into the first set's starting position.
- **Hover slowdown** uses CSS `:hover { animation-duration }` — no JS needed.
- **No `react-use-measure` needed** — the marquee is fully CSS-driven. (Plan 1's `package.json` already lists `react-use-measure`, so it's still available for future components if required.)

- [ ] **Step 4: Run the test, expect pass**

```bash
cd "/Users/admin/Desktop/spengali/spencer-lynch" && npm test -- infinite-slider
```
Expected: 4 passing.

- [ ] **Step 5: Commit**

```bash
cd "/Users/admin/Desktop/spengali" && \
git add spencer-lynch/components/ui/infinite-slider.tsx spencer-lynch/tests/unit/infinite-slider.test.tsx && \
git commit -m "feat(spencer-lynch): InfiniteSlider primitive with hover-slowdown and reduced-motion support"
```

## Task 1.3: Build `<ProgressiveBlur>` (test → impl)

**Files:**
- Create: `spencer-lynch/tests/unit/progressive-blur.test.tsx`
- Create: `spencer-lynch/components/ui/progressive-blur.tsx`

- [ ] **Step 1: Write the failing test**

Create `spencer-lynch/tests/unit/progressive-blur.test.tsx`:

```tsx
// spencer-lynch/tests/unit/progressive-blur.test.tsx
import { render } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { ProgressiveBlur } from "@/components/ui/progressive-blur";

describe("ProgressiveBlur", () => {
  it("renders one element per side requested", () => {
    const { container } = render(<ProgressiveBlur side="left" />);
    expect(container.querySelectorAll('[data-progressive-blur]').length).toBe(1);
  });

  it("applies a left-aligned mask when side='left'", () => {
    const { container } = render(<ProgressiveBlur side="left" />);
    const el = container.querySelector('[data-progressive-blur]') as HTMLElement;
    expect(el.style.left).toBe("0px");
    expect(el.style.right).toBe("");
  });

  it("applies a right-aligned mask when side='right'", () => {
    const { container } = render(<ProgressiveBlur side="right" />);
    const el = container.querySelector('[data-progressive-blur]') as HTMLElement;
    expect(el.style.right).toBe("0px");
    expect(el.style.left).toBe("");
  });
});
```

- [ ] **Step 2: Run the test, expect failure**

```bash
npm test -- progressive-blur
```
Expected: FAIL — module not found.

- [ ] **Step 3: Implement the component**

Create `spencer-lynch/components/ui/progressive-blur.tsx`:

```tsx
// spencer-lynch/components/ui/progressive-blur.tsx
"use client";

import { type CSSProperties } from "react";
import { cn } from "@/lib/utils";

export type ProgressiveBlurProps = {
  side: "left" | "right";
  /** Width of the blur band as a CSS length (e.g. "120px", "10%"). Default "10%". */
  width?: string;
  /** Background colour the blur fades to. Default matches the page ink. */
  fadeTo?: string;
  className?: string;
};

/**
 * Edge-fade mask used at InfiniteSlider boundaries. Stacks a backdrop-blur
 * gradient with a colour-fade gradient so logos blur and dim toward the edge.
 */
export function ProgressiveBlur({
  side,
  width = "10%",
  fadeTo = "var(--color-ink, #070504)",
  className,
}: ProgressiveBlurProps) {
  const horizontal: CSSProperties =
    side === "left" ? { left: 0 } : { right: 0 };

  const maskGradient =
    side === "left"
      ? "linear-gradient(to right, black, transparent)"
      : "linear-gradient(to left, black, transparent)";

  const colourFade =
    side === "left"
      ? `linear-gradient(to right, ${fadeTo}, transparent)`
      : `linear-gradient(to left, ${fadeTo}, transparent)`;

  return (
    <div
      data-progressive-blur=""
      className={cn("pointer-events-none absolute top-0 z-10 h-full", className)}
      style={{
        ...horizontal,
        width,
        background: colourFade,
        backdropFilter: "blur(4px)",
        WebkitBackdropFilter: "blur(4px)",
        WebkitMaskImage: maskGradient,
        maskImage: maskGradient,
      }}
    />
  );
}
```

- [ ] **Step 4: Run the test, expect pass**

```bash
npm test -- progressive-blur
```
Expected: 3 passing.

- [ ] **Step 5: Commit**

```bash
cd "/Users/admin/Desktop/spengali" && \
git add spencer-lynch/components/ui/progressive-blur.tsx spencer-lynch/tests/unit/progressive-blur.test.tsx && \
git commit -m "feat(spencer-lynch): ProgressiveBlur edge-fade primitive"
```

---

# Phase 2 — Credentials Components

## Task 2.1: Build `<SectionEyebrow>` shared primitive (test → impl)

All five sections share an eyebrow row in the form `— § 0N · Section Name —` (em-dashes, mono font, gold tint, wide letter-spacing). This primitive enforces the convention so a future copy change touches one file.

**Files:**
- Create: `spencer-lynch/tests/unit/section-eyebrow.test.tsx`
- Create: `spencer-lynch/components/credentials/section-eyebrow.tsx`

- [ ] **Step 1: Write the failing test**

```tsx
// spencer-lynch/tests/unit/section-eyebrow.test.tsx
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { SectionEyebrow } from "@/components/credentials/section-eyebrow";

describe("SectionEyebrow", () => {
  it("formats the eyebrow with em-dashes around the label", () => {
    render(<SectionEyebrow numeral="01" label="The Stadium Years" />);
    expect(
      screen.getByText(/—\s*§\s*01\s*·\s*The Stadium Years\s*—/),
    ).toBeInTheDocument();
  });

  it("uses an <p> with mono / gold styling classes", () => {
    const { container } = render(
      <SectionEyebrow numeral="02" label="Boardrooms" />,
    );
    const p = container.querySelector("p");
    expect(p?.className).toMatch(/font-mono/);
    expect(p?.className).toMatch(/text-gold/);
  });
});
```

- [ ] **Step 2: Run the test, expect failure**

```bash
npm test -- section-eyebrow
```

- [ ] **Step 3: Implement**

```tsx
// spencer-lynch/components/credentials/section-eyebrow.tsx
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
```

- [ ] **Step 4: Run the test, expect pass**

```bash
npm test -- section-eyebrow
```

- [ ] **Step 5: Commit**

```bash
cd "/Users/admin/Desktop/spengali" && \
git add spencer-lynch/components/credentials/section-eyebrow.tsx spencer-lynch/tests/unit/section-eyebrow.test.tsx && \
git commit -m "feat(spencer-lynch): SectionEyebrow shared primitive for credentials sections"
```

## Task 2.2: Build `<StadiumYears>` (§ 01)

Per spec line 138: typographic, eyebrow, display headline `Twenty seasons. Two clubs. One magician.`, four colour football crests (Liverpool / Everton / UEFA / Chester Racecourse, +Wrexham if available) as outlined chips. Not a marquee.

**Files:**
- Create: `spencer-lynch/components/credentials/stadium-years.tsx`

- [ ] **Step 1: Implement the component**

```tsx
// spencer-lynch/components/credentials/stadium-years.tsx
import Image from "next/image";
import { existsSync } from "node:fs";
import path from "node:path";
import { SectionEyebrow } from "./section-eyebrow";

type Crest = { name: string; src: string; alt: string };

const REQUIRED_CRESTS: Crest[] = [
  { name: "Liverpool FC", src: "/brand/crests/liverpool.svg", alt: "Liverpool Football Club crest" },
  { name: "Everton FC", src: "/brand/crests/everton.svg", alt: "Everton Football Club crest" },
  { name: "UEFA", src: "/brand/crests/uefa.svg", alt: "UEFA logo" },
  { name: "Chester Racecourse", src: "/brand/crests/chester-racecourse.svg", alt: "Chester Racecourse logo" },
];

const OPTIONAL_WREXHAM: Crest = {
  name: "Wrexham AFC",
  src: "/brand/crests/wrexham.svg",
  alt: "Wrexham AFC crest",
};

function resolveCrests(): Crest[] {
  // Optional crest is included only if the file actually exists at build time.
  // Server component — fs check is safe.
  const wrexhamPath = path.join(process.cwd(), "public", "brand", "crests", "wrexham.svg");
  return existsSync(wrexhamPath)
    ? [...REQUIRED_CRESTS, OPTIONAL_WREXHAM]
    : REQUIRED_CRESTS;
}

export function StadiumYears() {
  const crests = resolveCrests();

  return (
    <section className="px-6 py-24 md:px-10 md:py-32">
      <div className="mx-auto max-w-[1100px] text-center">
        <SectionEyebrow numeral="01" label="The Stadium Years" />
        <h2 className="mt-6 font-display text-4xl italic leading-[1.05] text-cream md:text-6xl lg:text-[64px]">
          Twenty seasons. Two clubs. One magician.
        </h2>

        <ul className="mt-12 flex flex-wrap items-center justify-center gap-5 md:gap-8">
          {crests.map((crest) => (
            <li
              key={crest.name}
              className="flex items-center gap-3 border border-gold/30 px-5 py-3 text-cream/80"
            >
              <Image
                src={crest.src}
                alt={crest.alt}
                width={32}
                height={32}
                className="h-8 w-8 object-contain"
              />
              <span className="font-mono text-[11px] uppercase tracking-eyebrow text-cream/85">
                {crest.name}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
```

If Chester Racecourse only has a PNG, change `chester-racecourse.svg` → `chester-racecourse.png` in `REQUIRED_CRESTS`. (The `existsSync` check only protects the optional Wrexham slot; required crests must all be present for the section to render correctly.)

- [ ] **Step 2: Verify it renders in dev**

Insert temporarily into `app/page.tsx` after the hero `<section>` to eyeball:

```tsx
import { StadiumYears } from "@/components/credentials/stadium-years";
// ...
<StadiumYears />
```

```bash
npm run dev
```
Open `http://localhost:3000`. Expected: eyebrow, italic headline, four (or five) chip rows centred. Stop the server. **Revert** the temporary import + render — Phase 3 wires the section block officially.

- [ ] **Step 3: Commit**

```bash
cd "/Users/admin/Desktop/spengali" && \
git add spencer-lynch/components/credentials/stadium-years.tsx && \
git commit -m "feat(spencer-lynch): § 01 Stadium Years — typographic + colour crest chips"
```

## Task 2.3: Build `<Boardrooms>` (§ 02 — InfiniteSlider host)

Per spec line 139: eyebrow, display headline `From global tech to the high street.`, InfiniteSlider of grayscale corporate logos with hover-slowdown and ProgressiveBlur left/right edges. Plan 2 renders logos as plain `<Image>` (no link) — Plan 5 will add `/work/[slug]` hrefs.

**Files:**
- Create: `spencer-lynch/components/credentials/boardrooms.tsx`

- [ ] **Step 1: Implement the component**

```tsx
// spencer-lynch/components/credentials/boardrooms.tsx
import Image from "next/image";
import { InfiniteSlider } from "@/components/ui/infinite-slider";
import { ProgressiveBlur } from "@/components/ui/progressive-blur";
import { SectionEyebrow } from "./section-eyebrow";

type Logo = { name: string; src: string; alt: string };

const LOGOS: Logo[] = [
  { name: "Google", src: "/brand/logos/google.svg", alt: "Google" },
  { name: "Marks & Spencer", src: "/brand/logos/marks-and-spencer.svg", alt: "Marks & Spencer" },
  { name: "Santander", src: "/brand/logos/santander.svg", alt: "Santander" },
  { name: "Morrisons", src: "/brand/logos/morrisons.svg", alt: "Morrisons" },
  { name: "Specsavers", src: "/brand/logos/specsavers.svg", alt: "Specsavers" },
  { name: "Five Guys", src: "/brand/logos/five-guys.svg", alt: "Five Guys" },
  { name: "Aon", src: "/brand/logos/aon.svg", alt: "Aon" },
  { name: "NEC", src: "/brand/logos/nec.svg", alt: "NEC" },
  { name: "Chester Zoo", src: "/brand/logos/chester-zoo.svg", alt: "Chester Zoo" },
  { name: "Worldwide Hospitality", src: "/brand/logos/worldwide-hospitality.svg", alt: "Worldwide Hospitality" },
];

export function Boardrooms() {
  return (
    <section className="px-6 py-24 md:px-10 md:py-32">
      <div className="mx-auto max-w-[1100px] text-center">
        <SectionEyebrow numeral="02" label="Boardrooms & Brand Activations" />
        <h2 className="mt-6 font-display text-4xl italic leading-[1.05] text-cream md:text-6xl lg:text-[64px]">
          From global tech to the high street.
        </h2>
      </div>

      <div className="relative mx-auto mt-14 max-w-[1280px]">
        <InfiniteSlider duration={50} durationOnHover={120} gapClassName="gap-16">
          {LOGOS.map((logo) => (
            <div key={logo.name} className="flex h-12 w-[140px] items-center justify-center">
              <Image
                src={logo.src}
                alt={logo.alt}
                width={140}
                height={48}
                className="h-10 w-auto object-contain opacity-65 grayscale transition duration-500 hover:opacity-100 hover:grayscale-0"
              />
            </div>
          ))}
        </InfiniteSlider>
        <ProgressiveBlur side="left" width="120px" />
        <ProgressiveBlur side="right" width="120px" />
      </div>
    </section>
  );
}
```

Key choices:
- `width="120px"` on ProgressiveBlur edges — wide enough to fully fade ~one logo width at the boundary
- `opacity-65 grayscale` baseline; hover lifts both. The slider's `:hover` slowdown is independent — `:hover` matches the `.animate-marquee` track whenever the cursor is on it or any of its descendant logos, so both behaviours fire simultaneously when a user hovers a logo.
- 50s base duration / 120s on hover — slow enough to read at rest, near-stationary when hovered.

- [ ] **Step 2: Sanity-check in dev**

Same temporary insert/revert pattern as Task 2.2 — render `<Boardrooms />` once below the hero, confirm the slider auto-scrolls, hover slows it, edges fade to ink. Then revert.

- [ ] **Step 3: Commit**

```bash
cd "/Users/admin/Desktop/spengali" && \
git add spencer-lynch/components/credentials/boardrooms.tsx && \
git commit -m "feat(spencer-lynch): § 02 Boardrooms — grayscale InfiniteSlider with progressive-blur edges"
```

## Task 2.4: Build `<QuietMoney>` (§ 03)

Per spec line 140: eyebrow, display headline `Where the suits like a card trick most.`, inline list of financial-services clients separated by gold dot delimiters.

**Files:**
- Create: `spencer-lynch/components/credentials/quiet-money.tsx`

- [ ] **Step 1: Implement**

```tsx
// spencer-lynch/components/credentials/quiet-money.tsx
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
```

- [ ] **Step 2: Commit**

```bash
cd "/Users/admin/Desktop/spengali" && \
git add spencer-lynch/components/credentials/quiet-money.tsx && \
git commit -m "feat(spencer-lynch): § 03 The Quiet Money — inline list with gold dot separators"
```

## Task 2.5: Build `<WorkThatMatters>` (§ 04)

Per spec line 141: gold-accent panel with `border-left: 2px solid gold`, `background: rgba(245,230,200,0.04)`, eyebrow, display headline `Twenty years of giving the trick away.`, inline list of causes.

**Files:**
- Create: `spencer-lynch/components/credentials/work-that-matters.tsx`

- [ ] **Step 1: Implement**

```tsx
// spencer-lynch/components/credentials/work-that-matters.tsx
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
```

The inline `style` for the `rgba(245,230,200,0.04)` background avoids inventing a one-off Tailwind utility for a value used in exactly one place.

- [ ] **Step 2: Commit**

```bash
cd "/Users/admin/Desktop/spengali" && \
git add spencer-lynch/components/credentials/work-that-matters.tsx && \
git commit -m "feat(spencer-lynch): § 04 The Work That Matters — gold-accent panel"
```

## Task 2.6: Build `<AsSeenOn>` (§ 05)

Per spec line 142: eyebrow, three Playfair-italic broadcaster names (Sky Sports · ITV · Liverpool Echo) — minimal, no logos.

**Files:**
- Create: `spencer-lynch/components/credentials/as-seen-on.tsx`

- [ ] **Step 1: Implement**

```tsx
// spencer-lynch/components/credentials/as-seen-on.tsx
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
```

- [ ] **Step 2: Commit**

```bash
cd "/Users/admin/Desktop/spengali" && \
git add spencer-lynch/components/credentials/as-seen-on.tsx && \
git commit -m "feat(spencer-lynch): § 05 As Seen On — three Playfair italic broadcasters"
```

## Task 2.7: Compose all five into `<CredentialsBlock>`

A single import for `app/page.tsx` keeps the homepage tidy and the section order locked in one place.

**Files:**
- Create: `spencer-lynch/components/credentials/credentials-block.tsx`

- [ ] **Step 1: Implement**

```tsx
// spencer-lynch/components/credentials/credentials-block.tsx
import { StadiumYears } from "./stadium-years";
import { Boardrooms } from "./boardrooms";
import { QuietMoney } from "./quiet-money";
import { WorkThatMatters } from "./work-that-matters";
import { AsSeenOn } from "./as-seen-on";

export function CredentialsBlock() {
  return (
    <>
      <StadiumYears />
      <Boardrooms />
      <QuietMoney />
      <WorkThatMatters />
      <AsSeenOn />
    </>
  );
}
```

- [ ] **Step 2: Commit**

```bash
cd "/Users/admin/Desktop/spengali" && \
git add spencer-lynch/components/credentials/credentials-block.tsx && \
git commit -m "feat(spencer-lynch): compose CredentialsBlock orchestrator for § 01-05"
```

---

# Phase 3 — Wire Up the Homepage

## Task 3.1: Insert `<CredentialsBlock />` between hero and footer

**Files:**
- Modify: `spencer-lynch/app/page.tsx`

- [ ] **Step 1: Add the import and render**

In `spencer-lynch/app/page.tsx`, add `import { CredentialsBlock } from "@/components/credentials/credentials-block";` near the top alongside the other component imports. Then, **between** the hero `<main>` element's closing tag and the `<SiteFooter />` call, render `<CredentialsBlock />`. Wrap the credentials in a `<main>` continuation OR move the credentials block inside the existing `<main>` after the hero `<section>` — either works; the existing `<main>` wrap is preferable so screen readers see one main landmark. Final structure should be:

```tsx
<>
  <TopNav />
  <main className="pinstripe relative bg-ink">
    <section className="px-6 pb-24 pt-12 md:px-10">
      {/* hero — unchanged */}
    </section>
    <CredentialsBlock />
  </main>
  <SiteFooter phoneTel={PHONE_TEL} emailMailto={EMAIL} />
</>
```

- [ ] **Step 2: Boot the dev server and walk the page**

```bash
cd "/Users/admin/Desktop/spengali/spencer-lynch" && npm run dev
```

Open `http://localhost:3000`. Walk top-to-bottom and confirm:
1. Hero unchanged (eyebrow, italic headline, supporting copy, Try-a-Trick button, cinema-framed showreel)
2. § 01 — eyebrow + italic headline + crest chips, centred
3. § 02 — eyebrow + italic headline + grayscale logo cloud auto-scrolling. Hover slows the scroll. Left and right edges fade to the ink colour.
4. § 03 — eyebrow + italic headline + four names separated by gold dots
5. § 04 — eyebrow + italic headline inside a gold-accent panel with cream-tinted background
6. § 05 — eyebrow + three Playfair-italic broadcaster names
7. Footer — unchanged

No console errors. No CLS jolts as logos load (each logo `<Image>` has explicit width/height).

- [ ] **Step 3: Test reduced-motion**

Open Chrome DevTools → Rendering → "Emulate CSS media feature `prefers-reduced-motion`" → "reduce". Reload. Expected: § 02 logo cloud is **frozen** (logos visible, not scrolling). All other sections unchanged.

Disable the override before continuing.

- [ ] **Step 4: Commit**

```bash
cd "/Users/admin/Desktop/spengali" && \
git add spencer-lynch/app/page.tsx && \
git commit -m "feat(spencer-lynch): wire CredentialsBlock into homepage between hero and footer"
```

---

# Phase 4 — Tests

## Task 4.1: Playwright smoke test for credentials block

**Files:**
- Create: `spencer-lynch/tests/e2e/credentials-smoke.spec.ts`

- [ ] **Step 1: Write the test**

```typescript
// spencer-lynch/tests/e2e/credentials-smoke.spec.ts
import { test, expect } from "@playwright/test";

test("homepage renders all five credentials sections in order", async ({ page }) => {
  await page.goto("/");

  // The five display headlines, top to bottom
  const headings = await page
    .getByRole("heading", { level: 2 })
    .allInnerTexts();

  expect(headings).toContain("Twenty seasons. Two clubs. One magician.");
  expect(headings).toContain("From global tech to the high street.");
  expect(headings).toContain("Where the suits like a card trick most.");
  expect(headings).toContain("Twenty years of giving the trick away.");

  // § 01 chips render at least 4 crests
  const crestRow = page.locator("li", {
    has: page.locator("img[alt*='crest' i], img[alt*='UEFA' i], img[alt*='Racecourse' i]"),
  });
  await expect.poll(async () => crestRow.count()).toBeGreaterThanOrEqual(4);

  // § 02 logo cloud renders at least the ten brand logos (counting both copies = 20)
  const logoImgs = page.locator("img[src*='/brand/logos/']");
  await expect.poll(async () => logoImgs.count()).toBeGreaterThanOrEqual(10);

  // § 05 broadcasters
  await expect(page.getByText("Sky Sports", { exact: true })).toBeVisible();
  await expect(page.getByText("ITV", { exact: true })).toBeVisible();
  await expect(page.getByText("Liverpool Echo", { exact: true })).toBeVisible();
});

test("credentials block respects prefers-reduced-motion", async ({ page, context }) => {
  await context.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");

  // The marquee track should have animation: none in computed style
  const track = page.locator(".animate-marquee").first();
  await expect(track).toBeVisible();
  const animationName = await track.evaluate(
    (el) => window.getComputedStyle(el).animationName,
  );
  expect(animationName).toBe("none");
});
```

- [ ] **Step 2: Run the test, expect pass**

```bash
cd "/Users/admin/Desktop/spengali/spencer-lynch" && npm run test:e2e -- credentials-smoke
```

Expected: 2 passing. If the first test fails on heading text, double-check the copy in each component matches the spec strings exactly (no curly-quote substitution, no trailing whitespace).

- [ ] **Step 3: Run the full e2e suite to confirm no regressions in Plan 1 tests**

```bash
npm run test:e2e
```

Expected: 5 passing (3 from Plan 1 — homepage hero smoke, /book form fields, empty-submit blocked — plus 2 new from this task).

- [ ] **Step 4: Run the full unit suite**

```bash
npm test
```

Expected: 21 passing (14 from Plan 1 + 7 new across infinite-slider, progressive-blur, section-eyebrow). If counts differ, surface to the user.

- [ ] **Step 5: Commit**

```bash
cd "/Users/admin/Desktop/spengali" && \
git add spencer-lynch/tests/e2e/credentials-smoke.spec.ts && \
git commit -m "test(spencer-lynch): Playwright smoke test for credentials block + reduced-motion"
```

---

# Phase 5 — Lighthouse + Final Polish

## Task 5.1: Production build + Lighthouse mobile pass

**Files:** none (verification + targeted-fix only).

- [ ] **Step 1: Build the production bundle**

```bash
cd "/Users/admin/Desktop/spengali/spencer-lynch" && npm run build
```

Expected: build succeeds, no TypeScript errors. If TS errors appear, fix them — common cause is an `<Image>` without explicit `width`/`height` (we deliberately set both).

- [ ] **Step 2: Serve the production build**

```bash
npm run start
```

- [ ] **Step 3: Run Lighthouse mobile**

DevTools → Lighthouse → Mobile preset → Performance + Accessibility + Best Practices + SEO → Analyze page.

Plan 1 baseline: P 92 / A 96 / BP 77 / SEO 100. Plan 2 target: **maintain or improve all four** (BP 77 is the unfixable Vimeo `_cfuvid` cookie — accept).

- [ ] **Step 4: If Performance dropped below 90, the most likely culprits:**

1. **Slider thrashing main thread** — confirm DevTools Performance panel shows `marquee` keyframes as compositor-only (no layout / paint per frame). If layout fires, verify the track has `transform: translate3d(...)` not `left:` or `margin-left:` mutations.
2. **Logo SVGs too large** — if total logo payload exceeds ~150 KB, run each through `svgo --multipass` and re-commit.
3. **CLS** — confirm zero CLS. Each `<Image>` has explicit width/height; the ProgressiveBlur is absolutely positioned (no layout impact); the marquee track is `w-max` (no reflow on logo load).

- [ ] **Step 5: If Accessibility dropped below 95:**

1. Confirm every `<img>` (Next.js `<Image>` renders to `<img>`) has a meaningful `alt`. Decorative images use `alt=""`.
2. Confirm crest list and broadcaster list use `<ul>`/`<li>` (they do). The slider track is a `<div>` row of logos — that's correct because the duplicated set is `aria-hidden="true"`.
3. Confirm contrast: `text-cream/85` on `bg-ink` ≥ 4.5:1.

- [ ] **Step 6: Apply any necessary fixes; re-run Lighthouse; capture final scores**

- [ ] **Step 7: Commit**

```bash
cd "/Users/admin/Desktop/spengali" && \
git add spencer-lynch && \
git commit -m "perf(spencer-lynch): Plan 2 Lighthouse pass — perf X / a11y Y / bp Z / seo W"
```

(Replace placeholders with actuals.)

## Task 5.2: Resolve open questions and update spec / memory

Open questions surfaced during execution that need user-visible resolution:

- [ ] **Step 1: Wrexham AFC crest** — was it included or did we ship four? Note in the final commit message.

- [ ] **Step 2: Logo file format substitutions** — were any of the ten §02 logos saved as PNG instead of SVG? Note them.

- [ ] **Step 3: Update the master spec's "Things still pending real values" / Plan 7 backlog if anything new surfaced** — for example, if Worldwide Hospitality has no findable public-web logo, capture that as a Plan 7 item ("Worldwide Hospitality logo: still placeholder, needs Spencer-supplied").

- [ ] **Step 4: Commit any spec doc updates**

```bash
cd "/Users/admin/Desktop/spengali" && \
git add docs/superpowers/specs/2026-05-03-spencer-lynch-site-design.md && \
git commit -m "docs(spec): record Plan 2 outcomes — crest count, logo substitutions, follow-ups"
```

---

## Plan 2 Acceptance Criteria

The plan is complete when **all** of the following are true:

- [ ] Branch `plan-2-credentials` exists locally and is ready to be pushed (push is the user's call — Plan 1 was deferred from deploy)
- [ ] Homepage renders, in this order: top nav → hero (unchanged) → § 01 Stadium Years → § 02 Boardrooms (auto-scrolling logo cloud) → § 03 Quiet Money → § 04 Work That Matters (gold-accent panel) → § 05 As Seen On → footer (unchanged)
- [ ] § 02 InfiniteSlider auto-scrolls on desktop; hovering anywhere on the slider visibly slows it
- [ ] § 02 ProgressiveBlur edges fade logos in/out at left and right boundaries
- [ ] All logos in § 02 render in grayscale at rest with reduced opacity; hover lifts to colour at full opacity (per logo)
- [ ] `prefers-reduced-motion: reduce` freezes the slider (animation: none) — verified via DevTools emulation AND Playwright e2e test
- [ ] All Playwright e2e tests pass (Plan 1's 3 + Plan 2's 2 = 5)
- [ ] All vitest unit tests pass (Plan 1's 14 + Plan 2's ~7 = ~21)
- [ ] `npm run build` succeeds with zero TypeScript errors
- [ ] Browser console is clean on the homepage (no warnings, no errors) in dev and production builds
- [ ] Lighthouse mobile: P ≥ 90, A ≥ 95, BP ≥ 75 (Vimeo cookie ceiling), SEO ≥ 95 — at minimum equal to Plan 1 baseline

## Open Questions for the User (do NOT block on these)

1. **Wrexham AFC crest** — include only if findable on public web in under five minutes; otherwise ship four. Confirm post-execution which path was taken.
2. **§ 02 link behaviour** — Plan 5 will add `/work/[slug]` hrefs to the logos. Until then, logos are non-clickable `<Image>` elements. If you'd prefer all logos link to a placeholder `/work` index in the meantime, say so before execution starts.
3. **Slider duration** — base 50s / hover 120s. If too fast/slow on the live page, tune in `boardrooms.tsx:21` (the `<InfiniteSlider duration={50} durationOnHover={120} ...>` props).

## What's NOT in this plan (covered by future plans)

- Section 3 (three category clip tiles: Close-Up · Tech Illusions · Big Events) — Plan 3
- Section 4 (interactive trick zone / pick-a-card) — Plan 3
- Section 10 (testimonials carousel) — Plan 6
- Section 11 (social viral strip) — Plan 6
- §02 logos linking to `/work/[slug]` case studies — Plan 5
- Replacing publicly-sourced logos with Spencer-supplied vectors — opportunistic, not blocking
- Animated Spencer host bubble appearance during credentials — Plan 4
