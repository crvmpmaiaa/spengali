# Spengali — Spencer Lynch · Memorable Magic

A new personal-brand website for **Spencer Lynch** — Liverpool FC's official magician since 2006, the only magician to ever hold simultaneous resident positions at two Premier League clubs.

The brief in one line: **the site itself performs.** Interactive in-site magic tricks, a cinema-frame Vimeo showreel, a five-section credentials wall, and an animated host character system. Built around the dual-residency credential as the headline.

## What's in this repo

| Path | What it is |
|---|---|
| [docs/superpowers/specs/2026-05-03-spencer-lynch-site-design.md](docs/superpowers/specs/2026-05-03-spencer-lynch-site-design.md) | Full design spec — locked aesthetic, structure, components, asset inventory, open questions |
| [docs/superpowers/plans/2026-05-03-spencer-lynch-foundation-and-hero.md](docs/superpowers/plans/2026-05-03-spencer-lynch-foundation-and-hero.md) | Implementation Plan 1 of 7 — foundation + hero shell + working enquiry form |
| [assets/spencer-lynch/](assets/spencer-lynch/) | Raw brand assets (logo variants + showreel MP4 fallback) — copied into the build's `public/` during Plan 1 |
| `spencer-lynch/` *(coming via Plan 1)* | The Next.js app itself |

## Roadmap

| # | Plan | Output |
|---|------|--------|
| **1** | **Foundation & Hero Shell** | **Deployable single-page site: nav + hero showreel + footer + working /book form** *(this plan)* |
| 2 | Credentials Sections (§ 01–§ 05) | Five distinct credentials sections, InfiniteSlider grayscale logo cloud |
| 3 | Trick Framework + 3 Tricks | Hero pick-a-card + random-pool tricks + `/the-vault` Easter-egg route |
| 4 | Animated Spencer System | Editorial-illustration host (Kling-animated), photoreal cameos for big reveals |
| 5 | Other Pages | About, full Showreel, Tech Illusions, Work + case studies, hidden routes |
| 6 | Testimonials + Social Strip | DMC-pattern carousel, Instagram/TikTok embeds |
| 7 | Polish & Launch | Lighthouse pass, mobile parity audit, domain swap, Vercel deploy |

## Tech Stack

Next.js 15 (App Router) · TypeScript · Tailwind CSS · shadcn/ui · framer-motion · Vimeo (background-mode embed) · Resend (transactional email) · Vercel (hosting)

See the spec for full rationale and the plan for implementation steps.

## Status

- ✅ Design spec written and reviewed
- ✅ Implementation Plan 1 written and reviewed
- 🚧 Plan 1 execution in progress

---

🤖 Spec and plans drafted with [Claude Code](https://claude.com/claude-code).
