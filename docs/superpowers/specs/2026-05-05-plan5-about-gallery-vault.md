# Spencer Lynch — Plan 5: About, Gallery & The Vault

**Date:** 2026-05-05
**Branch:** plan-2-credentials (continuing; will rename or branch from here)
**Status:** Approved — ready for implementation planning

---

## Scope

Three new routes:

| Route | Purpose |
|---|---|
| `/about` | Spencer's story — vintage magician aesthetic, photos, credentials narrative |
| `/gallery` | Showreel with sound + performance photo grid |
| `/the-vault` | Hidden Easter-egg page, unlocked by trick interaction |

Work pages (`/work`, `/work/[slug]`) are explicitly **out of scope** for Plan 5. They will be a dedicated SEO-focused plan covering corporate, stadium, weddings, private parties as sub-pages.

---

## `/about` — Purveyor of Mystery & Marvels

### Design direction

Lean into the old-world theatrical side of the existing "Card Maker's Library" palette. Aged playbill meets premium watchmaker. The moodboard references (ornate Victorian frames, vintage typographer's engraving aesthetic, "Purveyor of Mystery & Marvels" language) inform the decorative layer — but the underlying palette (ink/cream/gold) and typefaces (Playfair Display italic, Inter mono) stay consistent with the rest of the site.

### Section structure

#### 1. Hero

- Full-bleed dark section. `spence fire.jpeg` as background image, object-cover, heavily darkened via `after:` overlay (`bg-ink/80` or similar) so the flame remains visible but Spencer's face emerges from shadow.
- Decorative CSS ornate border frame around the text block: thin gold lines (`border border-gold/40`) with corner flourish marks (pseudo-element `+` arms, same corner-bracket vocabulary as the cinema frame). Roughly 2–3rem padding inside.
- Gold eyebrow in small mono uppercase: `— Purveyor of Mystery & Marvels —`
- Main heading in Playfair Display italic: `Spencer Lynch` (~56–72px)
- Subheading: `Twenty years. Two clubs. One magician.` in cream/70, smaller Playfair italic.
- No CTA in the hero — let it breathe.

#### 2. The Story

- `bg-ink-warm` with pinstripe texture (existing `.pinstripe` class).
- Two-column layout on desktop (`lg:grid-cols-[1fr_320px]`); stacked on mobile.
- **Left:** Body copy in three paragraphs covering: (a) the origin story — how Spencer got into magic and built his early reputation; (b) the Liverpool FC / Everton dual residency — the thing no other magician on earth has; (c) the philosophy — why close-up magic at this level is about human connection, not spectacle.
- **Right:** `spencer.jpg` (already B&W) in a slightly-angled frame (`rotate-1` or `-rotate-1`), thin gold border (`ring-1 ring-gold/50`), and a small italic caption beneath: `— Spencer Lynch, Liverpool`.
- Gold hairline divider above and below this section.

#### 3. The Gerrard Moment

- Full-width cinematic strip, constrained to ~`max-h-[420px]` with `overflow-hidden`.
- `gerrard.jpeg` as background, object-cover, cropped to landscape (the Anfield hospitality suite context reads clearly).
- Dark overlay (`bg-ink/60`) with centred text overlay:
  - Small gold eyebrow: `— Anfield, 2017 —`
  - Playfair italic quote: `"Some rooms you never forget."`
- No names. Handled editorially per the spec's locked decision on Carragher/Rooney/Gerrard — subject to Spencer's confirmation of permissions. If permissions aren't confirmed, this section is replaced by a generic "At Anfield" atmospheric shot without the named figure visible.

#### 4. At Work

- Three-photo horizontal mosaic on desktop, vertical stack on mobile.
- Photos: `reaction.jpeg`, `group magic.jpeg`, `group magic girls.jpeg` (or whichever three have the strongest composition).
- No captions. Reactions tell the story.
- Each photo: `object-cover`, fixed height (`h-64 md:h-80`), slight hover brightness lift (`hover:brightness-110 transition-all`).
- Thin gold hairline separating each photo slot.

#### 5. CTA

- Dark section, centred.
- Playfair italic: `"Ready to make your room remember?"`
- Gold-bordered button linking to `/book`: `Book Spencer`
- Same button style as existing site (font-mono uppercase, `border-gold/40`).

### Copy (placeholder — Spencer to review/rewrite)

```
Spencer Lynch has been performing close-up magic professionally since 2006. What started in the rooms of Liverpool's hospitality circuit became something no other magician in the country can claim: simultaneous residencies at both Liverpool FC and Everton FC — the first and only magician to hold that position.

Over twenty seasons at Anfield, he's performed for UEFA delegates, Premier League legends, and the full range of the beautiful game's human drama. He's been in boardrooms for Google, on the high street for Marks & Spencer, and at private tables where the guests don't give their names.

The trick is never the point. The moment is. That's what close-up magic does that nothing else can: it stops time. For three seconds, the most senior person in the room is eight years old again. Spencer Lynch has been engineering those seconds for twenty years.
```

---

## `/gallery` — Showreel & Photos

### Design direction

Clean, minimal, dark. Two clearly sectioned surfaces on one scrollable page. No lightbox in v1 (keeps scope lean). The showreel gets the premium treatment; the photo grid is atmospheric, not portfolio-polished.

### Section structure

#### 1. Page header

- Simple: eyebrow `— Gallery —`, heading `The Work` in Playfair italic.
- No hero image. Black, centred, generous padding.

#### 2. `#showreel` — Full Vimeo player

- Vimeo embed `vimeo.com/214361408` with **native controls** (no `background=1` — this is where visitors come to watch with sound).
- Params: `autoplay=0&loop=0&color=D4AF37&byline=0&portrait=0&title=0&dnt=1`
- `color=D4AF37` tints Vimeo's progress bar/controls gold to match the palette.
- Wrapped in the existing `CinemaFrame` component.
- Max width `~960px`, centred, 16:9 aspect-ratio container.
- Brief italic line above the frame: `"Two minutes. Twenty years."` in Playfair italic cream/70.
- A `#showreel` anchor for direct linking from nav.

#### 3. `#photos` — Performance photo grid

- CSS multi-column grid (`columns-1 sm:columns-2 lg:columns-3`), `gap-3`.
- All available performance photos from `public/photos/`:
  - `reaction.jpeg`, `reaction2.jpeg`
  - `group magic.jpeg`, `group magic girls.jpeg`, `group magic fire girls 2.jpeg`
  - `spence fire.jpeg`, `spence fire 2.jpeg`, `spence fire 3.jpeg`
  - `celeb.jpeg`
  - `gerrard.jpeg` (include — the room is recognisable even without names)
- Each photo: `w-full mb-3 object-cover` with `hover:brightness-110 hover:ring-1 hover:ring-gold/40 transition-all duration-300`.
- No captions in v1. Let the images speak.
- `#photos` anchor for direct linking.

### Nav link wiring

- `Gallery` in the top nav already exists and links to `/gallery`. No nav changes needed.

---

## `/the-vault` — Hidden Easter Egg

### Access

- Not in nav. Not linked from any public page.
- URL surfaced only via the trick-unlock reveal modal (Plan 3 territory — the unlock mechanism already exists conceptually; this page just needs to exist at the route).
- Once unlocked, the URL is persisted to `localStorage` under key `sl-vault-unlocked`. On subsequent visits to `/the-vault`, if the key exists, the page renders normally. If the key is absent, the page renders a "nothing to see here" decoy state (blank dark page with a small gold `?` in the centre, no explanation).

### Design

- Full-page dark (`bg-ink`). No nav, no footer — completely standalone.
- Centred content, max-width `480px`.
- **SVG ornament:** all-seeing eye in a triangle, fine-line gold on black. Inspired by the moodboard top-left panel. ~120px wide. Developer-drawn SVG (no external asset needed).
- Gold eyebrow in mono: `— You found it —`
- Playfair italic heading: `The Vault`
- Body copy (Playfair italic, cream/70, ~16px):
  > *"Not many people find this place. The ones who do understand something most people never will: the secret isn't in the hands. It's in where you're looking."*
- Gold hairline divider.
- A "shareable secret" URL display: shows `spencerlynch.co.uk/the-vault` in mono text with a copy-to-clipboard button (icon + `Copied!` flash). The real domain is a placeholder until launch — use `window.location.href` at runtime.
- Small italic line at the bottom: `— Keep it to yourself. Or don't.`
- A discreet `← Back` link (mono, cream/40) to return to the homepage.

### Decoy state (unauthenticated)

- If `localStorage` key absent: render a plain black page. Small gold `?` centred, ~24px mono. No other content. Status code still 200 — no server-side auth needed; the decoy is purely cosmetic. If someone guesses the URL, they see nothing meaningful.

---

## Asset pipeline

All photos need copying to `spencer-lynch/public/photos/` from `assets/spencer-lynch/photos/`. No resizing required for v1 — Next.js `<Image>` handles optimisation at serve time.

| Source | Destination |
|---|---|
| `assets/spencer-lynch/photos/*.jpeg` | `spencer-lynch/public/photos/` |
| `assets/spencer-lynch/photos/spencer.jpg` | `spencer-lynch/public/photos/` |

The `spence fire 2 ` filename (no extension, has trailing space) should be checked — if it's a valid image file, rename to `spence-fire-2.jpeg` during the copy.

---

## Components

| New component | Location | Notes |
|---|---|---|
| `AboutHero` | `components/about/about-hero.tsx` | Fire photo hero with ornate frame |
| `AboutStory` | `components/about/about-story.tsx` | Two-col story + headshot |
| `AboutGerrard` | `components/about/about-gerrard.tsx` | Cinematic strip (conditional on permissions) |
| `AboutAtWork` | `components/about/about-at-work.tsx` | Three-photo mosaic |
| `GalleryShowreel` | `components/gallery/gallery-showreel.tsx` | Full Vimeo with controls |
| `GalleryPhotos` | `components/gallery/gallery-photos.tsx` | CSS columns photo grid |
| `VaultPage` (page-level) | `app/the-vault/page.tsx` | Standalone, no layout shell |

Existing components reused: `TopNav`, `SiteFooter`, `CinemaFrame`, `SectionEyebrow`.

---

## Routing

```
app/
  about/
    page.tsx          ← new
  gallery/
    page.tsx          ← new
  the-vault/
    page.tsx          ← new (standalone, no shared layout)
```

`/the-vault` should use its own layout (or `export const metadata` with `robots: noindex`) to stay out of search engines.

---

## Tests

- Unit: `VaultPage` renders decoy state when `localStorage` key absent; renders full content when key present.
- e2e smoke: `/about` loads and `h1` contains "Spencer Lynch"; `/gallery` loads and Vimeo iframe is present; `/the-vault` without key shows decoy `?`.

---

## Out of scope (Plan 5)

- `/work`, `/work/[slug]` — SEO multi-page plan, separate cycle
- Animated Spencer character system (Plan 4)
- Testimonials carousel (Plan 6)
- Social viral strip (Plan 6)
- Lightbox for gallery photos (Plan 7 polish)
- Any trick mechanism changes (Plan 3)

---

## Success criteria

1. `/about` renders all five sections with no layout breaks on mobile or desktop
2. The fire hero photo is visible with text legible over the overlay
3. `/gallery` Vimeo player loads with gold-tinted controls; photos render in masonry columns
4. `/the-vault` decoy state shows `?` only; authenticated state shows full vault content
5. All three pages pass Lighthouse accessibility ≥ 95
6. All motion (hover transitions) respects `prefers-reduced-motion`
7. Photos are served via Next.js `<Image>` with correct `alt` text
