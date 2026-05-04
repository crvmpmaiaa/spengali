# Spencer Lynch — Plan 5: About, Gallery & The Vault

**Date:** 2026-05-05
**Branch:** `plan-5-pages` — branch off `plan-2-credentials` at the start of implementation (`git checkout -b plan-5-pages`)
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

- `bg-ink-warm` (defined as `--color-ink-warm: #0A0807` in `app/globals.css`) with pinstripe texture (existing `.pinstripe` utility class, also defined in `globals.css`).
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
- No names in any text. The photo itself shows two people; the named figure is a public figure photographed in a public-facing hospitality context. **Default: ship with the photo.** If Spencer explicitly revokes permission before launch, replace with `spence fire 2.jpeg` (atmospheric, no third parties) and change the eyebrow to `— At Anfield —`. The component accepts a `showGerrard?: boolean` prop (default `true`) to make this a one-line swap.

#### 4. At Work

- Three-photo horizontal mosaic on desktop, vertical stack on mobile.
- Photos (fixed selection): `reaction.jpeg`, `group magic girls.jpeg`, `group magic fire girls 2.jpeg`. These three were chosen for composition — jaw-drop reaction + group energy + fire/drama.
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

- Simple: eyebrow `— Gallery —`, heading `The Work` in Playfair italic. (The h1 is "The Work" — the route `/gallery` is for nav clarity; the editorial heading can differ.)
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
- URL surfaced only via the trick-unlock reveal modal (Plan 3 territory — the unlock mechanism will point here in a later plan). For Plan 5, the vault page is built and tested in isolation: the implementer sets the `localStorage` key manually in devtools to verify the authenticated state, and verifies the decoy state in a private window.
- Once unlocked, the URL is persisted to `localStorage` under key `sl-vault-unlocked`. On subsequent visits to `/the-vault`, if the key exists, the page renders normally. If the key is absent, the page renders a "nothing to see here" decoy state (blank dark page with a small gold `?` in the centre, no explanation).

### Design

- Full-page dark (`bg-ink`). No nav, no footer — completely standalone.
- Centred content, max-width `480px`.
- **SVG ornament:** a simple equilateral triangle (stroke, no fill) with a single eye shape (ellipse + pupil circle) centred inside it. Fine-line, gold stroke (`#D4AF37`), no fill, on black. ~120px wide × ~104px tall. Developer-drawn inline SVG — no illustrator required. Stroke weight: 1.5px. The eye should be roughly 30% of the triangle's height. This is geometric minimalism, not ornate engraving.
- Gold eyebrow in mono: `— You found it —`
- Playfair italic heading: `The Vault`
- Body copy (Playfair italic, cream/70, ~16px):
  > *"Not many people find this place. The ones who do understand something most people never will: the secret isn't in the hands. It's in where you're looking."*
- Gold hairline divider.
- A "shareable secret" URL display: uses `window.location.href` at runtime to get the current full URL (will be `localhost:3000/the-vault` in dev, production domain after deploy — no hardcoding needed). Copy-to-clipboard button: clicking copies the URL string, button label flashes to `Copied!` for 2 seconds then resets. Uses the browser Clipboard API (`navigator.clipboard.writeText`).
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

The file `spence fire 2 ` (no extension, trailing space) is of unknown validity — **exclude it from the gallery grid**. Only copy files with confirmed `.jpeg`/`.jpg` extensions. The fallback for the Gerrard section uses `spence fire 3 .jpeg` instead (confirmed extension present).

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

### Copy storage

All placeholder body copy lives as string constants at the top of each page file (`app/about/page.tsx`, etc.) — not in a CMS or separate constants file. This is the simplest approach for v1 and gives Spencer one file per page to edit. The Plan 7 copy-handover task will extract to a proper content layer if needed.

### Next.js Image `sizes` prop

All `<Image>` components must include a `sizes` prop to avoid the Next.js console warning and enable correct srcset selection:
- Hero background images: `sizes="100vw"`
- Story headshot (right column, 320px wide): `sizes="(max-width: 1024px) 100vw, 320px"`
- At Work mosaic (1/3 width on desktop): `sizes="(max-width: 640px) 100vw, 33vw"`
- Gallery photo grid (1/3 width on desktop): `sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"`

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

- Unit: `VaultPage` renders decoy `?` when `localStorage` key `sl-vault-unlocked` is absent; renders heading "The Vault" when key is present. Test using `jest-localstorage-mock` or equivalent.
- Unit: copy-to-clipboard button in VaultPage calls `navigator.clipboard.writeText` with the current URL and shows `Copied!` label.
- e2e smoke: `/about` loads and `h1` contains "Spencer Lynch"; `/gallery` loads and the page contains an `iframe` with a `src` containing `vimeo.com`; `/the-vault` with no localStorage key set shows a single `?` character and no heading.
- Reduced-motion: hover brightness transitions use `transition-all` — wrap in `@media (prefers-reduced-motion: reduce)` override that removes the transition. Verified manually; no automated test required for v1.

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
3. `/gallery` Vimeo iframe is present with `src` containing `vimeo.com/214361408`; photos render in CSS columns layout
4. `/the-vault` without `sl-vault-unlocked` in localStorage shows only `?` (decoy); with the key set shows heading "The Vault" and vault content — HTTP 200 in both states
5. Vault copy-to-clipboard: clicking the copy button writes the current URL to clipboard and shows `Copied!`
6. All three pages pass Lighthouse accessibility ≥ 95 (run locally via `npx lighthouse http://localhost:3000/about --only-categories=accessibility`)
7. All hover transitions are wrapped in a `prefers-reduced-motion` media query override removing the transition
8. All `<Image>` components have descriptive `alt` text: performance photos use `"Spencer Lynch performing close-up magic"` or scene-specific descriptions; headshot uses `"Spencer Lynch, close-up magician"`; no empty alts on non-decorative images
9. `/about` and `/gallery` have `<title>` and `<meta name="description">` set via `export const metadata` in their page files; `/the-vault` uses `robots: { index: false, follow: false }`
