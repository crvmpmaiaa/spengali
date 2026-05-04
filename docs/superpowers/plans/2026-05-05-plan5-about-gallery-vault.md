# Plan 5 — About, Gallery & The Vault

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build three new routes — `/about` (vintage magician aesthetic, real photos), `/gallery` (Vimeo showreel with controls + photo grid), and `/the-vault` (localStorage-gated hidden Easter-egg page).

**Architecture:** Each route is a Next.js App Router page file that composes focused single-responsibility components. The vault uses a client component with a `useEffect` localStorage check to split between decoy and authenticated states. All photos are copied from `assets/` to `public/photos/` as the first step. TDD throughout: unit tests before implementation for the vault gate logic; e2e smoke tests added after each page.

**Tech Stack:** Next.js 16 App Router, TypeScript, Tailwind v4, Playfair Display / Inter / JetBrains Mono via `next/font`, `next/image` for photos, Vitest + React Testing Library for unit tests, Playwright for e2e.

---

## File map

**Created:**
- `spencer-lynch/public/photos/` — all performance photos (renamed, spaces → hyphens)
- `spencer-lynch/app/about/page.tsx` — About page (server component, copy constants at top)
- `spencer-lynch/components/about/about-hero.tsx` — fire photo hero with ornate frame
- `spencer-lynch/components/about/about-story.tsx` — two-col body copy + headshot
- `spencer-lynch/components/about/about-gerrard.tsx` — cinematic Gerrard strip
- `spencer-lynch/components/about/about-at-work.tsx` — three-photo mosaic
- `spencer-lynch/app/gallery/page.tsx` — Gallery page (server component)
- `spencer-lynch/components/gallery/gallery-showreel.tsx` — Vimeo with native controls
- `spencer-lynch/components/gallery/gallery-photos.tsx` — CSS columns photo grid
- `spencer-lynch/app/the-vault/layout.tsx` — nested layout (robots: noindex only)
- `spencer-lynch/app/the-vault/page.tsx` — client component with localStorage gate
- `spencer-lynch/tests/unit/vault-page.test.tsx` — unit tests for vault gate + clipboard
- `spencer-lynch/tests/e2e/pages-smoke.spec.ts` — smoke tests for all three new routes

**Not modified:** `app/layout.tsx`, `app/page.tsx`, `components/nav/top-nav.tsx`, `components/showreel/cinema-frame.tsx`. The root layout's `WhatsAppWidget` will render on the vault page — this is acceptable (it's a floating button, not nav or footer, which the spec's isolation requirement targets).

---

## Task 0: Branch + asset pipeline

**Files:**
- Create dir: `spencer-lynch/public/photos/`

- [ ] **Step 1: Create the branch**

```bash
cd /Users/admin/Desktop/spengali
git checkout -b plan-5-pages
```

Expected: `Switched to a new branch 'plan-5-pages'`

- [ ] **Step 2: Copy and rename photos**

Run from the repo root:

```bash
DEST=spencer-lynch/public/photos
mkdir -p "$DEST"

SRC="assets/spencer-lynch/photos"

# Copy with spaces → hyphens, skip the no-extension file
for f in "$SRC"/*.jpeg "$SRC"/*.jpg; do
  [ -f "$f" ] || continue
  base=$(basename "$f")
  # Skip the problem file (no extension, trailing space)
  [[ "$base" == "spence fire 2 " ]] && continue
  safe="${base// /-}"
  cp "$f" "$DEST/$safe"
done

ls "$DEST"
```

Expected output lists: `celeb.jpeg`, `gerrard.jpeg`, `group-magic-fire-girls-2.jpeg`, `group-magic-girls.jpeg`, `group-magic.jpeg`, `reaction.jpeg`, `reaction2.jpeg`, `spence-fire-3-.jpeg`, `spence-fire.jpeg`, `spencer.jpg`

- [ ] **Step 3: Rename the space-before-extension file**

```bash
cd spencer-lynch/public/photos
mv "spence-fire-3-.jpeg" "spence-fire-3.jpeg"
ls spence-fire*
```

Expected: `spence-fire-3.jpeg  spence-fire.jpeg`

- [ ] **Step 4: Commit asset pipeline**

```bash
git add spencer-lynch/public/photos/
git commit -m "chore(spencer-lynch): copy + normalise performance photo assets"
```

---

## Task 1: Vault unit tests (write first — TDD)

**Files:**
- Create: `spencer-lynch/tests/unit/vault-page.test.tsx`

The vault page is a `"use client"` component. In jsdom (Vitest), `localStorage` is available globally — no mock package needed. `navigator.clipboard` needs stubbing.

- [ ] **Step 1: Write the failing tests**

Create `spencer-lynch/tests/unit/vault-page.test.tsx`:

```tsx
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { VaultContent } from "@/components/vault/vault-content";

beforeEach(() => {
  localStorage.clear();
  // Stub clipboard API
  Object.defineProperty(navigator, "clipboard", {
    value: { writeText: vi.fn().mockResolvedValue(undefined) },
    writable: true,
    configurable: true,
  });
  // Stub window.location so clipboard test gets a real URL (jsdom defaults to about:blank)
  Object.defineProperty(window, "location", {
    value: { href: "http://localhost:3000/the-vault" },
    writable: true,
    configurable: true,
  });
});

describe("VaultContent — localStorage gate", () => {
  it("shows decoy ? when sl-vault-unlocked key is absent", async () => {
    render(<VaultContent />);
    // waitFor guards against useEffect timing variance in jsdom
    await waitFor(() => expect(screen.getByText("?")).toBeInTheDocument());
    expect(screen.queryByRole("heading", { name: /the vault/i })).toBeNull();
  });

  it("shows full vault content when sl-vault-unlocked key is present", async () => {
    localStorage.setItem("sl-vault-unlocked", "1");
    render(<VaultContent />);
    await waitFor(() =>
      expect(screen.getByRole("heading", { name: /the vault/i })).toBeInTheDocument(),
    );
    expect(screen.queryByText("?")).toBeNull();
  });
});

describe("VaultContent — clipboard", () => {
  it("copy button calls clipboard.writeText with the current URL and shows Copied!", async () => {
    localStorage.setItem("sl-vault-unlocked", "1");
    render(<VaultContent />);
    await waitFor(() =>
      expect(screen.getByRole("button", { name: /copy/i })).toBeInTheDocument(),
    );
    fireEvent.click(screen.getByRole("button", { name: /copy/i }));
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith(
      "http://localhost:3000/the-vault",
    );
    await waitFor(() =>
      expect(screen.getByRole("button", { name: /copied/i })).toBeInTheDocument(),
    );
  });
});
```

Note: the test imports `VaultContent` from `@/components/vault/vault-content` — a new component (not the page directly). This keeps the localStorage logic unit-testable separate from the Next.js page metadata.

- [ ] **Step 2: Run tests — confirm they fail with "Cannot find module"**

```bash
cd /Users/admin/Desktop/spengali/spencer-lynch
npx vitest run tests/unit/vault-page.test.tsx
```

Expected: FAIL — `Cannot find module '@/components/vault/vault-content'`

---

## Task 2: Vault — VaultContent component

**Files:**
- Create: `spencer-lynch/components/vault/vault-content.tsx`

- [ ] **Step 1: Implement VaultContent**

Create `spencer-lynch/components/vault/vault-content.tsx`:

```tsx
"use client";
import { useEffect, useState } from "react";

const VAULT_KEY = "sl-vault-unlocked";

function AllSeeingEye() {
  return (
    <svg
      width="120"
      height="104"
      viewBox="0 0 120 104"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* Equilateral triangle */}
      <polygon
        points="60,6 114,98 6,98"
        stroke="#D4AF37"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      {/* Eye — outer ellipse centred at ~60,70, roughly 30% of triangle height */}
      <ellipse cx="60" cy="70" rx="18" ry="11" stroke="#D4AF37" strokeWidth="1.5" />
      {/* Pupil */}
      <circle cx="60" cy="70" r="5" stroke="#D4AF37" strokeWidth="1.5" />
    </svg>
  );
}

export function VaultContent() {
  const [unlocked, setUnlocked] = useState<boolean | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setUnlocked(localStorage.getItem(VAULT_KEY) !== null);
  }, []);

  // Render nothing until localStorage is read (avoids SSR mismatch)
  if (unlocked === null) return null;

  if (!unlocked) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-ink">
        <span className="font-mono text-2xl text-gold">?</span>
      </div>
    );
  }

  function handleCopy() {
    navigator.clipboard.writeText(window.location.href).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-ink px-6 py-16 text-center">
      <div className="mx-auto max-w-[480px]">
        <AllSeeingEye />

        <p className="mt-8 font-mono text-[10px] uppercase tracking-eyebrow text-gold/85">
          — You found it —
        </p>

        <h1 className="mt-4 font-display text-4xl italic text-cream md:text-5xl">
          The Vault
        </h1>

        <p className="mt-6 font-display text-lg italic leading-relaxed text-cream/70">
          "Not many people find this place. The ones who do understand
          something most people never will: the secret isn't in the hands.
          It's in where you're looking."
        </p>

        {/* Gold hairline */}
        <div className="mx-auto my-8 h-px w-24 bg-gradient-to-r from-transparent via-gold/60 to-transparent" />

        {/* Shareable URL */}
        <div className="flex items-center justify-center gap-3">
          <span className="font-mono text-xs text-cream/50 break-all">
            {typeof window !== "undefined" ? window.location.href : ""}
          </span>
          <button
            type="button"
            onClick={handleCopy}
            aria-label={copied ? "Copied" : "Copy link"}
            className="shrink-0 border border-gold/40 px-3 py-1 font-mono text-[10px] uppercase tracking-eyebrow text-cream/70 transition-colors hover:bg-gold/10"
          >
            {copied ? "Copied!" : "Copy"}
          </button>
        </div>

        <p className="mt-10 font-display text-sm italic text-cream/40">
          — Keep it to yourself. Or don't.
        </p>

        <a
          href="/"
          className="mt-8 inline-block font-mono text-[10px] uppercase tracking-eyebrow text-cream/40 transition-colors hover:text-cream/70"
        >
          ← Back
        </a>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Run tests — all should pass**

```bash
cd /Users/admin/Desktop/spengali/spencer-lynch
npx vitest run tests/unit/vault-page.test.tsx
```

Expected: 3 tests PASS

- [ ] **Step 3: Create the vault layout**

Create `spencer-lynch/app/the-vault/layout.tsx`:

```tsx
export default function VaultLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
```

- [ ] **Step 4: Create the vault page**

Create `spencer-lynch/app/the-vault/page.tsx`:

```tsx
import type { Metadata } from "next";
import { VaultContent } from "@/components/vault/vault-content";

export const metadata: Metadata = {
  title: "Spencer Lynch",
  robots: { index: false, follow: false },
};

export default function TheVaultPage() {
  return <VaultContent />;
}
```

- [ ] **Step 5: Start dev server and verify manually**

```bash
cd /Users/admin/Desktop/spengali/spencer-lynch
npm run dev
```

Open `http://localhost:3000/the-vault` in a normal browser tab — should show `?` only.

Open DevTools → Application → Local Storage → add key `sl-vault-unlocked` = `1` → refresh. Should show "The Vault" heading, SVG eye, copy button.

Test copy button: click → button label becomes "Copied!" → resets after 2s.

- [ ] **Step 6: Commit**

```bash
cd /Users/admin/Desktop/spengali
git add spencer-lynch/components/vault/ spencer-lynch/app/the-vault/ spencer-lynch/tests/unit/vault-page.test.tsx
git commit -m "feat(spencer-lynch): /the-vault hidden Easter-egg page with localStorage gate"
```

---

## Task 3: About — AboutHero component

**Files:**
- Create: `spencer-lynch/components/about/about-hero.tsx`

- [ ] **Step 1: Implement AboutHero**

Create `spencer-lynch/components/about/about-hero.tsx`:

```tsx
import Image from "next/image";

export function AboutHero() {
  return (
    <section className="relative flex min-h-[70vh] items-center justify-center overflow-hidden">
      {/* Background: fire photo */}
      <Image
        src="/photos/spence-fire.jpeg"
        alt="Spencer Lynch performing fire magic"
        fill
        className="object-cover object-center"
        sizes="100vw"
        priority
      />
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-ink/80" />

      {/* Ornate frame + text */}
      <div className="relative z-10 mx-auto max-w-[600px] px-8 py-12 text-center">
        {/* Corner brackets — same vocabulary as CinemaFrame */}
        <span className="pointer-events-none absolute left-0 top-0 h-[18px] w-[18px] border-l border-t border-gold" />
        <span className="pointer-events-none absolute right-0 top-0 h-[18px] w-[18px] border-r border-t border-gold" />
        <span className="pointer-events-none absolute bottom-0 left-0 h-[18px] w-[18px] border-b border-l border-gold" />
        <span className="pointer-events-none absolute bottom-0 right-0 h-[18px] w-[18px] border-b border-r border-gold" />
        {/* Thin outer frame */}
        <div className="absolute inset-0 border border-gold/30" />

        <p className="font-mono text-[10px] uppercase tracking-eyebrow text-gold/85">
          — Purveyor of Mystery &amp; Marvels —
        </p>
        <h1 className="mt-5 font-display text-5xl italic leading-tight text-cream md:text-6xl lg:text-7xl">
          Spencer Lynch
        </h1>
        <p className="mt-4 font-display text-xl italic text-cream/70">
          Twenty years. Two clubs. One magician.
        </p>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Verify renders in browser (quick check — full page assembly in Task 6)**

No standalone test needed here — visual component, verified in Task 6 when wired into the page.

---

## Task 4: About — AboutStory component

**Files:**
- Create: `spencer-lynch/components/about/about-story.tsx`

- [ ] **Step 1: Implement AboutStory**

Create `spencer-lynch/components/about/about-story.tsx`:

```tsx
import Image from "next/image";

interface AboutStoryProps {
  copy: { p1: string; p2: string; p3: string };
}

export function AboutStory({ copy }: AboutStoryProps) {
  return (
    <section className="pinstripe bg-ink-warm">
      {/* Top hairline */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-gold/30 to-transparent" />

      <div className="mx-auto max-w-[1100px] px-5 py-16 md:px-10 md:py-24">
        <div className="grid gap-12 lg:grid-cols-[1fr_320px] lg:gap-16">
          {/* Copy */}
          <div className="space-y-6 text-[17px] leading-relaxed text-cream/80">
            <p>{copy.p1}</p>
            <p>{copy.p2}</p>
            <p>{copy.p3}</p>
          </div>

          {/* Headshot */}
          <div className="flex flex-col items-center lg:items-start">
            <div className="-rotate-1 ring-1 ring-gold/50">
              <Image
                src="/photos/spencer.jpg"
                alt="Spencer Lynch, close-up magician"
                width={320}
                height={320}
                className="block object-cover"
                sizes="(max-width: 1024px) 100vw, 320px"
              />
            </div>
            <p className="mt-3 font-display text-sm italic text-cream/50">
              — Spencer Lynch, Liverpool
            </p>
          </div>
        </div>
      </div>

      {/* Bottom hairline */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
    </section>
  );
}
```

---

## Task 5: About — AboutGerrard component

**Files:**
- Create: `spencer-lynch/components/about/about-gerrard.tsx`

- [ ] **Step 1: Implement AboutGerrard**

Create `spencer-lynch/components/about/about-gerrard.tsx`:

```tsx
import Image from "next/image";

interface AboutGerrardProps {
  showGerrard?: boolean;
}

export function AboutGerrard({ showGerrard = true }: AboutGerrardProps) {
  const photo = showGerrard ? "/photos/gerrard.jpeg" : "/photos/spence-fire-3.jpeg";
  const eyebrow = showGerrard ? "— Anfield, 2017 —" : "— At Anfield —";
  const alt = showGerrard
    ? "Spencer Lynch performing close-up magic at Anfield hospitality suite"
    : "Spencer Lynch performing fire magic";

  return (
    <section className="relative flex max-h-[420px] min-h-[320px] items-center justify-center overflow-hidden">
      <Image
        src={photo}
        alt={alt}
        fill
        className="object-cover object-center"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-ink/60" />
      <div className="relative z-10 text-center">
        <p className="font-mono text-[10px] uppercase tracking-eyebrow text-gold/85">
          {eyebrow}
        </p>
        <p className="mt-3 font-display text-2xl italic text-cream md:text-3xl">
          "Some rooms you never forget."
        </p>
      </div>
    </section>
  );
}
```

---

## Task 6: About — AboutAtWork component

**Files:**
- Create: `spencer-lynch/components/about/about-at-work.tsx`

- [ ] **Step 1: Implement AboutAtWork**

Create `spencer-lynch/components/about/about-at-work.tsx`:

```tsx
import Image from "next/image";

const PHOTOS = [
  { src: "/photos/reaction.jpeg", alt: "Audience reaction to Spencer Lynch's card trick" },
  { src: "/photos/group-magic-girls.jpeg", alt: "Spencer Lynch performing close-up magic for a group" },
  { src: "/photos/group-magic-fire-girls-2.jpeg", alt: "Spencer Lynch performing fire magic for an audience" },
];

export function AboutAtWork() {
  return (
    <section className="grid grid-cols-1 md:grid-cols-3">
      {PHOTOS.map((photo, i) => (
        <div
          key={photo.src}
          className={`relative h-64 overflow-hidden md:h-80 ${i < PHOTOS.length - 1 ? "md:border-r md:border-r-gold/20" : ""}`}
        >
          <Image
            src={photo.src}
            alt={photo.alt}
            fill
            className="object-cover object-center transition-[filter] duration-300 hover:brightness-110 motion-reduce:transition-none"
            sizes="(max-width: 640px) 100vw, 33vw"
          />
        </div>
      ))}
    </section>
  );
}
```

---

## Task 7: About page assembly

**Files:**
- Create: `spencer-lynch/app/about/page.tsx`

- [ ] **Step 1: Create the about page**

Create `spencer-lynch/app/about/page.tsx`:

```tsx
import type { Metadata } from "next";
import { TopNav } from "@/components/nav/top-nav";
import { SiteFooter } from "@/components/footer/site-footer";
import { AboutHero } from "@/components/about/about-hero";
import { AboutStory } from "@/components/about/about-story";
import { AboutGerrard } from "@/components/about/about-gerrard";
import { AboutAtWork } from "@/components/about/about-at-work";

export const metadata: Metadata = {
  title: "About · Spencer Lynch",
  description:
    "Twenty years. Two clubs. One magician. The story of Spencer Lynch — the only magician to hold simultaneous resident positions at two Premier League clubs.",
};

const PHONE_TEL = "+447706319468";
const EMAIL = "spencer@example.com"; // TODO Plan 7: hoist to lib/contact.ts

// Placeholder copy — Spencer to review and rewrite
const COPY = {
  p1: "Spencer Lynch has been performing close-up magic professionally since 2006. What started in the rooms of Liverpool's hospitality circuit became something no other magician in the country can claim: simultaneous residencies at both Liverpool FC and Everton FC — the first and only magician to hold that position.",
  p2: "Over twenty seasons at Anfield, he's performed for UEFA delegates, Premier League legends, and the full range of the beautiful game's human drama. He's been in boardrooms for Google, on the high street for Marks & Spencer, and at private tables where the guests don't give their names.",
  p3: "The trick is never the point. The moment is. That's what close-up magic does that nothing else can: it stops time. For three seconds, the most senior person in the room is eight years old again. Spencer Lynch has been engineering those seconds for twenty years.",
};

export default function AboutPage() {
  return (
    <>
      <TopNav />
      <main className="bg-ink">
        <AboutHero />
        <AboutStory copy={COPY} />
        <AboutGerrard showGerrard />
        <AboutAtWork />

        {/* CTA */}
        <section className="bg-ink px-5 py-20 text-center md:py-28">
          <p className="font-display text-2xl italic text-cream md:text-3xl">
            "Ready to make your room remember?"
          </p>
          <a
            href="/book"
            className="mt-8 inline-block border border-gold/40 px-8 py-3 font-mono text-[11px] uppercase tracking-eyebrow text-cream/80 transition-colors hover:bg-gold/10 hover:text-cream"
          >
            Book Spencer
          </a>
        </section>
      </main>
      <SiteFooter phoneTel={PHONE_TEL} emailMailto={EMAIL} />
    </>
  );
}
```

- [ ] **Step 2: Verify in browser**

Navigate to `http://localhost:3000/about`. Check:
- Fire photo hero renders with text visible over the overlay
- Two-column story section + headshot (stacked on mobile, side-by-side on desktop)
- Gerrard cinematic strip
- Three-photo mosaic
- CTA with Book Spencer button

- [ ] **Step 3: Commit**

```bash
cd /Users/admin/Desktop/spengali
git add spencer-lynch/components/about/ spencer-lynch/app/about/
git commit -m "feat(spencer-lynch): /about page — vintage magician hero, story, Gerrard strip, at-work mosaic"
```

---

## Task 8: Gallery — GalleryShowreel component

**Files:**
- Create: `spencer-lynch/components/gallery/gallery-showreel.tsx`

- [ ] **Step 1: Implement GalleryShowreel**

Create `spencer-lynch/components/gallery/gallery-showreel.tsx`:

```tsx
import { CinemaFrame } from "@/components/showreel/cinema-frame";

export function GalleryShowreel() {
  return (
    <section id="showreel" className="px-5 py-16 md:px-10">
      <div className="mx-auto max-w-[960px]">
        <p className="mb-6 text-center font-display text-lg italic text-cream/70">
          "Two minutes. Twenty years."
        </p>
        <CinemaFrame
          slateTop={{ left: "SL · Showreel · 2017", right: "" }}
          slateBottom={{ left: "Memorable Magic", right: "02:07" }}
          className="max-w-none"
        >
          {/* Native controls — no background=1. color param tints progress bar gold. */}
          <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
            <iframe
              src="https://player.vimeo.com/video/214361408?autoplay=0&loop=0&color=D4AF37&byline=0&portrait=0&title=0&dnt=1"
              className="absolute inset-0 h-full w-full"
              allow="autoplay; fullscreen; picture-in-picture"
              allowFullScreen
              title="Spencer Lynch Showreel — Memorable Magic"
            />
          </div>
        </CinemaFrame>
      </div>
    </section>
  );
}
```

---

## Task 9: Gallery — GalleryPhotos component

**Files:**
- Create: `spencer-lynch/components/gallery/gallery-photos.tsx`

- [ ] **Step 1: Implement GalleryPhotos**

Create `spencer-lynch/components/gallery/gallery-photos.tsx`:

```tsx
import Image from "next/image";

const PHOTOS = [
  { src: "/photos/reaction.jpeg", alt: "Audience reaction to Spencer Lynch's card trick" },
  { src: "/photos/reaction2.jpeg", alt: "Audience reaction to Spencer Lynch's close-up magic" },
  { src: "/photos/group-magic-girls.jpeg", alt: "Spencer Lynch performing close-up magic for a group" },
  { src: "/photos/group-magic.jpeg", alt: "Spencer Lynch performing close-up magic" },
  { src: "/photos/group-magic-fire-girls-2.jpeg", alt: "Spencer Lynch performing fire magic for an audience" },
  { src: "/photos/spence-fire.jpeg", alt: "Spencer Lynch performing fire magic" },
  { src: "/photos/spence-fire-3.jpeg", alt: "Spencer Lynch performing fire magic at a live event" },
  { src: "/photos/celeb.jpeg", alt: "Spencer Lynch performing close-up magic" },
  { src: "/photos/gerrard.jpeg", alt: "Spencer Lynch performing close-up magic at Anfield hospitality suite" },
];

export function GalleryPhotos() {
  return (
    <section id="photos" className="px-5 pb-20 md:px-10">
      <div className="mx-auto max-w-[1100px]">
        <div className="h-px w-full bg-gradient-to-r from-transparent via-gold/30 to-transparent mb-10" />
        <p className="mb-8 font-mono text-[10px] uppercase tracking-eyebrow text-gold/85 text-center">
          — In the room —
        </p>
        {/* CSS multi-column masonry */}
        <div className="columns-1 gap-3 sm:columns-2 lg:columns-3">
          {PHOTOS.map((photo) => (
            <div key={photo.src} className="mb-3 overflow-hidden group">
              <Image
                src={photo.src}
                alt={photo.alt}
                width={600}
                height={400}
                className="w-full object-cover transition-[filter,box-shadow] duration-300 group-hover:brightness-110 group-hover:ring-1 group-hover:ring-gold/40 motion-reduce:transition-none"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

---

## Task 10: Gallery page assembly

**Files:**
- Create: `spencer-lynch/app/gallery/page.tsx`

- [ ] **Step 1: Create the gallery page**

Create `spencer-lynch/app/gallery/page.tsx`:

```tsx
import type { Metadata } from "next";
import { TopNav } from "@/components/nav/top-nav";
import { SiteFooter } from "@/components/footer/site-footer";
import { GalleryShowreel } from "@/components/gallery/gallery-showreel";
import { GalleryPhotos } from "@/components/gallery/gallery-photos";

export const metadata: Metadata = {
  title: "Gallery · Spencer Lynch",
  description:
    "Watch the showreel and browse performance photography from twenty years of close-up magic — stadium hospitality, boardrooms, private events.",
};

const PHONE_TEL = "+447706319468";
const EMAIL = "spencer@example.com"; // TODO Plan 7: hoist to lib/contact.ts

export default function GalleryPage() {
  return (
    <>
      <TopNav />
      <main className="bg-ink">
        {/* Page header */}
        <div className="px-5 pb-4 pt-8 text-center md:pb-6 md:pt-12">
          <p className="font-mono text-[10px] uppercase tracking-eyebrow text-gold/85">
            — Gallery —
          </p>
          <h1 className="mt-4 font-display text-4xl italic text-cream md:text-5xl">
            The Work
          </h1>
        </div>

        <GalleryShowreel />
        <GalleryPhotos />
      </main>
      <SiteFooter phoneTel={PHONE_TEL} emailMailto={EMAIL} />
    </>
  );
}
```

- [ ] **Step 2: Verify in browser**

Navigate to `http://localhost:3000/gallery`. Check:
- Heading "The Work" is visible
- Vimeo iframe renders inside the cinema frame (controls visible, gold tint)
- Masonry photo grid renders in 1/2/3 columns at different breakpoints
- Hover on photos: slight brightness lift

- [ ] **Step 3: Commit**

```bash
cd /Users/admin/Desktop/spengali
git add spencer-lynch/components/gallery/ spencer-lynch/app/gallery/
git commit -m "feat(spencer-lynch): /gallery page — Vimeo showreel with controls + masonry photo grid"
```

---

## Task 11: e2e smoke tests for new pages

**Files:**
- Create: `spencer-lynch/tests/e2e/pages-smoke.spec.ts`

- [ ] **Step 1: Write e2e smoke tests**

Create `spencer-lynch/tests/e2e/pages-smoke.spec.ts`:

```ts
import { test, expect } from "@playwright/test";

test("/about renders Spencer Lynch heading", async ({ page }) => {
  await page.goto("/about");
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    /spencer lynch/i,
  );
  // CTA section
  await expect(page.getByRole("link", { name: /book spencer/i })).toBeVisible();
});

test("/gallery has Vimeo iframe and photo grid", async ({ page }) => {
  await page.goto("/gallery");
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    /the work/i,
  );
  // Vimeo iframe present
  const iframe = page.locator("iframe[src*='vimeo.com']");
  await expect(iframe).toBeVisible();
  // At least one photo
  const photos = page.locator("img[alt*='Spencer Lynch']");
  expect(await photos.count()).toBeGreaterThan(0);
});

test("/the-vault shows decoy ? without localStorage key", async ({ page }) => {
  // Clear storage to ensure no key set
  await page.goto("/the-vault");
  await page.evaluate(() => localStorage.removeItem("sl-vault-unlocked"));
  await page.reload();
  await expect(page.getByText("?")).toBeVisible();
  await expect(
    page.getByRole("heading", { name: /the vault/i }),
  ).toHaveCount(0);
});
```

- [ ] **Step 2: Run e2e tests**

```bash
cd /Users/admin/Desktop/spengali/spencer-lynch
npx playwright test tests/e2e/pages-smoke.spec.ts
```

Expected: 3 tests PASS. If the dev server isn't already running, Playwright's `webServer` config in `playwright.config.ts` will start it automatically.

- [ ] **Step 3: Commit**

```bash
cd /Users/admin/Desktop/spengali
git add spencer-lynch/tests/e2e/pages-smoke.spec.ts
git commit -m "test(spencer-lynch): e2e smoke tests for /about, /gallery, /the-vault"
```

---

## Task 12: Full test suite verification

- [ ] **Step 1: Run all unit tests**

```bash
cd /Users/admin/Desktop/spengali/spencer-lynch
npx vitest run
```

Expected: all tests PASS (14 existing + 3 new vault tests = 17 total)

- [ ] **Step 2: Run all e2e tests**

```bash
npx playwright test
```

Expected: all tests PASS (3 existing + 3 new = 6 total)

- [ ] **Step 3: Run TypeScript check**

```bash
npx tsc --noEmit
```

Expected: no errors

- [ ] **Step 4: Final commit**

```bash
cd /Users/admin/Desktop/spengali
git add -A
git commit -m "chore(spencer-lynch): Plan 5 complete — About, Gallery & The Vault"
```

---

## Checklist against spec success criteria

- [ ] 1. `/about` renders all five sections with no layout breaks on mobile or desktop
- [ ] 2. Fire hero photo visible, text legible over overlay
- [ ] 3. `/gallery` Vimeo iframe with `src` containing `vimeo.com/214361408`; photos in CSS columns
- [ ] 4. `/the-vault` decoy shows `?` only; with key shows "The Vault" heading — HTTP 200 both states
- [ ] 5. Copy button writes URL to clipboard and shows `Copied!`
- [ ] 6. Lighthouse accessibility ≥ 95 on `/about` (run: `npx lighthouse http://localhost:3000/about --only-categories=accessibility`)
- [ ] 7. Hover transitions use `motion-reduce:transition-none` (done via Tailwind `motion-reduce:` variant on all photo hover classes)
- [ ] 8. All `<Image>` components have descriptive `alt` text
- [ ] 9. `/about` and `/gallery` have `export const metadata` with title + description; `/the-vault` has `robots: noindex`
