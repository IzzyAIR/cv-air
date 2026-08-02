# Design system — cv-air

Two systems live in this repo. **§11 is the live site** (v2, at `/`). **§1 to §9 document v1**, the first design, now archived at `/v1`. §10 covers the printable résumé, which is its own thing again.

What follows in §1 to §9: a personal-CV / portfolio that reads like a **printed editorial** and behaves like a **modern web engineering tool**. Senior in tone, restrained in ornament, decisive in detail.

## 1. Philosophy

**Editorial × Engineering.** The page borrows from print design — large display italic, numbered chapters, a hairline ruleset, a running side-rail of meta — and pairs it with developer-tool minimalism: monospaced micro-typography, tabular numerals, a single accent colour. The dark canvas is **warm** (not neutral) so cool / cold accents would feel out of place; only warm or warm-neutral accents (amber, honey, ink-red) hold the system together.

Three working rules:

1. **One accent.** A single `--primary` colour does all emphatic work (CTAs, status dots, category labels, link underlines, focus rings, italic punctuation marks). No secondary brand colour. Add chroma only when an element must announce itself.
2. **Hairlines over fills.** Section boundaries are 1px rules. Cards have 1px borders, not raised surfaces. Lists are separated by hairlines, not gaps. Result: the page reads as **one continuous document**, not a set of stacked widgets.
3. **Restraint of motion.** Motion is functional, not decorative. Reveal-on-scroll uses a slow ease-out cubic with a single Y-translate. Marquees pause on hover. The cursor-tracking glow blob is a *single* signature element, hidden under `prefers-reduced-motion` and on mobile.

## 2. Tokens (`src/styles/global.css`)

All colours are HSL via CSS variables. Tailwind utilities (`bg-background`, `text-primary`, etc.) read them through `tailwind.config.ts` — never hardcode hex.

| Token                       | Value                | Role                                                |
| --------------------------- | -------------------- | --------------------------------------------------- |
| `--background`              | `40 8% 6%`           | Warm near-black canvas. Off-neutral, slightly amber.|
| `--foreground`              | `40 25% 93%`         | Warm bone — soft, never pure white.                 |
| `--card`                    | `40 8% 9%`           | Surface for hover / hairline grids.                 |
| `--muted` / `-foreground`   | `40 6% 12%` / `… 55%`| Tertiary text, subtle backgrounds.                  |
| `--border`                  | `40 6% 17%`          | Hairlines, card borders, section rules.             |
| `--primary`                 | `38 92% 62%`         | **Honey-gold** (`#F4B240`). The single accent.      |
| `--primary-foreground`      | `38 35% 10%`         | Ink on amber CTAs.                                  |
| `--accent`                  | `8 88% 56%`          | Ink-red — reserved for destructive only.            |
| `--ring`                    | `38 92% 62%`         | Focus ring.                                         |
| `--radius`                  | `0.5rem`             | Used for cards. Pills are `rounded-full`.           |

### Palette history (when revisiting)
The accent was iterated on intentionally; if the brand is repositioned, these are the field-tested options:

- Electric chartreuse `72 100% 63%` — rejected as too "neon dev portfolio".
- Sodium amber `28 90% 62%` — warmer, more "tungsten" feel.
- **Honey-gold `38 92% 62%` — current**, balances warmth with editorial restraint.
- Petrol-blue `203 70% 60%` — cold counterpart, breaks the warm system.
- Ice-cyan `187 92% 69%` — too clinical, fights the warm canvas.

## 3. Typography

Three families, each with one job:

| Family               | Role                                       | Usage                                                 |
| -------------------- | ------------------------------------------ | ----------------------------------------------------- |
| **Inter**            | `--font-sans` — body and headlines (non-italic) | Default. `font-feature-settings: 'ss01','cv11','tnum'`.|
| **Instrument Serif** | `--font-display` — italic display only     | Section titles' "italic word", year markers, highlighted nouns, the email in Contact. Italic is the signature. |
| **JetBrains Mono**   | `--font-mono` — micro-typography           | Kickers, meta lines, periods, stack pills, tnum stats.|

Rules:
- **Display italic must never run alone.** It is always paired with a sans word on the same line — that contrast is the visual hook (`Engineering, refined by *AIDD*.`).
- Numbers everywhere use `.tnum` (`tabular-nums`) so columns line up.
- Letter-spacing: tight on headlines (`-0.02em` → `-0.03em`), wide on mono micro-labels (`tracking-[0.2em]` uppercase).

## 4. Layout grammar

- **Container:** `2rem` padding, `2xl` capped at 1400px, centered.
- **Section header pattern** (every section uses it):
  ```
  § 0N  ─────  KICKER          BIG TITLE with italic display word
  ```
  3-of-12 columns left (numeric mark + kicker), 9-of-12 columns right (title). The number reinforces the "printed document" reading order.
- **Section separator:** a single `border-t border-border/60` and `py-28 lg:py-36`. No background colour changes between sections.
- **Hairline rule (`.hairline`):** a 1px linear-gradient transparent-at-edges line used as inline separator and section header underline.

## 5. Motion

| Effect                 | Implementation                                       | Notes                                              |
| ---------------------- | ---------------------------------------------------- | -------------------------------------------------- |
| Scroll reveal          | `IntersectionObserver` in `BaseLayout.astro` adds `.is-in` to `[data-reveal]`. `--reveal-delay` chains items. | 0.9s ease `cubic-bezier(.22,1,.36,1)`. |
| Cursor glow blob       | `#cursor-blob` on Hero, `mix-blend-mode: screen`, lerp at 0.12. | Desktop only, disabled under reduced-motion.       |
| Magnetic CTA           | `[data-magnetic]` translates on mousemove (strength 14). | Combines cleanly with reveal because we use the *style* attribute, not the class. |
| Tech marquee           | `@keyframes marquee` 40s linear, paused on hover.    | Trick: render the items twice + `translateX(-50%)`.|
| Ken-Burns photo        | 14s slow scale + translate, alternate-infinite.      | Always-on; perceived as a printed photograph slowly drifting. |
| Status pulse           | `.pulse-dot` 1.8s opacity+scale.                     | One per page chrome (nav, hero, footer).           |
| Cursor blink in clock  | `.blink` 1.05s `steps(1)`.                           | The live Asia/Tashkent clock in the navbar.        |
| Count-up stat values   | `IntersectionObserver` in `AboutSection.astro`, 1.1s cubic ease-out. | Triggered once per stat, then unobserved.   |
| Copy email feedback    | `data-copy` button swaps `data-copy-label` between localized `COPY` ⇄ `COPIED` for 1.8s. |                                          |
| Reduced motion         | Single `@media (prefers-reduced-motion: reduce)` block disables animations and reveal hidden states. | Always respect.                                    |

## 6. Senior fingerprints

Small, intentional choices that compound into perceived quality:

- **Live Asia/Tashkent clock** in the nav with a blinking dot — the page has a location.
- **Numbered sections** (`§ 01 … § 06`) — the document has an order.
- **Photo as artifact** — corner brackets, `— 01 PORTRAIT` label, faux-EXIF caption (`F/1.4 · 50MM`), subtle grayscale + saturation drop.
- **Scroll marker pinned to bottom-of-section** on Hero, mirrored by the tagline on the right.
- **SVG film-grain overlay** at `opacity: 0.035` with `mix-blend-mode: overlay` — anchors the dark background, breaks the "flat web" feel.
- **Custom selection colour** = primary. **Custom scrollbar** = bordered, primary on hover.
- **Focus-visible** uses primary with `outline-offset: 3px`.
- **Tabular numerals** on every number in the page (`.tnum`).
- **Copy-to-clipboard email** as the primary contact action — no `mailto:` fallback unless `clipboard.writeText` rejects.

## 7. Content/structure contracts

The components are dumb; data flows in one direction:

```
i18n/{en,ru,uz}.ts  →  i18n/index.ts (getContent)  →  services/*.service.ts  →  components/*.astro
```

When changing copy, **only edit the locale file**. Section components must keep accepting `{ lang }` and pulling through services. Inline-localized strings (e.g. `AVAILABLE FOR HIRE` in Hero, principle titles in About) are kept in-component **only when** they are layout-bound — i.e. they are not real content, they are UI chrome that needs a translation. Anything that is real CV content lives in `i18n/`.

## 8. Adding a new section

1. Define the data type in `src/types/cv.ts`.
2. Add the field to all three locales — the build will fail until they conform (intended).
3. Create `services/<name>.service.ts` and re-export from `services/index.ts`.
4. Create the component. **Use the standard section header pattern** (`§ 0N`, kicker, title with one italic display word).
5. Mount it in `CvPage.astro` between existing sections — and add a `navLinks` entry in all three locales. The `href` (e.g. `#projects`) becomes the section's `id` for scroll-spy.

## 9. Don'ts

- **Don't add a second accent colour.** Use `text-foreground/40`, borders, or italic instead.
- **Don't reach into i18n bundles** from a component. Always go through a service.
- **Don't use raised surfaces / shadows for hierarchy.** Use hairlines, type weight, italic.
- **Don't introduce a client framework.** The single inline script per interactive island is the architectural ceiling. If something needs more, redesign the interaction.
- **Don't animate without a reason.** Every motion in §5 has a functional or rhythmical role. New motion needs the same justification.

## 10. The résumé document (`/resume`)

A **separate visual system on purpose.** The site is a dark editorial artifact; the résumé is a printed business document read by recruiters and parsed by machines. It does not inherit the tokens, the Tailwind layer or `BaseLayout` — it owns its own `<html>` and an unscoped `<style is:inline>`.

What carries over, and what deliberately doesn't:

| | Site | Résumé |
| --- | --- | --- |
| Canvas | warm near-black | white A4 sheet |
| Accent | honey-gold `38 92% 62%` | bronze `#8a5c0d` — the same hue darkened until it holds contrast on white and survives greyscale printing |
| Type | Inter + Instrument Serif italic + JetBrains Mono | Inter only — display italic and mono micro-type don't survive ATS parsing or a fax-grade print |
| Hierarchy | hairlines, italic, weight | same instinct: 1px rules under uppercase section labels, weight and colour for rank, no fills or shadows |
| Motion | §5 | none |

Rules specific to this document:

1. **Machine-readability outranks styling.** Single column, standard section names, real text, contacts as links. No icons, tables or images carrying information — an ATS reads the text layer, not the layout.
2. **One page box, two outputs.** Content is laid out into A4 `.page` elements by script and those same boxes are printed, so the preview *is* the PDF. Anything added must be a top-level `.block` inside `#flow` or it won't paginate.
3. **Bronze is the only colour.** Section labels, company names, bullet markers. Everything else is ink, body or muted grey.
4. **Nothing decorative.** No grain, no glow, no corner brackets. A recruiter's eye budget is ~6 seconds; every mark on the sheet must be doing navigational work.

## 11. v2 — the live system (`/`)

> **Sections 1 to 9 describe v1, which now lives at `/v1` as an archive.** It is kept for reference and for the record of how the accent and the editorial grammar were arrived at. Do not evolve it; new design work happens here in §11.

v2 is a **complete redesign**, not a reskin, generated against the `design-taste-frontend` skill. It shares only the content pipeline with v1. Everything below is deliberate and recorded so it does not get "corrected" back toward v1.

**Design read:** senior engineer portfolio for hiring managers and recruiters, premium-consumer language, native CSS plus Tailwind utilities and scroll-driven animation.

**Dials:** `DESIGN_VARIANCE 9` · `MOTION_INTENSITY 8` · `VISUAL_DENSITY 3`.

**Palette — Cold Luxury.** Cool silver-grey neutrals, chrome surfaces, smoke lines, one cobalt accent (`230 68% 51%` light, `227 72% 74%` dark). Chosen against two bans: it is not v1's warm honey system, and it is not the beige/brass/espresso family that premium-consumer briefs default to. One accent, whole page, both themes.

**Two themes, one system.** The system preference is the default (`@media (prefers-color-scheme: dark)`); the nav toggle pins a choice by writing `data-theme` on `<html>` and storing it. `:root[data-theme="…"]` outranks the bare `:root` inside the media query, so the manual choice always wins without `!important`. A blocking inline script in `V2Layout` applies the stored value before first paint, so a pinned theme never flashes. Removing the stored value hands control back to the system. Section-level inversion is still forbidden: whichever theme is active, the entire page is in it.

**Type.** Geist and Geist Mono, self-hosted through `@fontsource-variable` (no `<link>` to Google Fonts). No serif at all: the skill bans Instrument Serif by name, which is v1's signature face.

**Shape lock.** Panels 16px, media 20px, interactive full pill. No other radii.

**What v2 refuses on purpose** (all of these are v1 signatures): numbered section eyebrows, any eyebrow at all, middle dots as a default separator, em-dashes anywhere in rendered copy, hairline decoration, film grain, cursor blob, marquee, live clock.

**Signature moves.** Real Simple Icons brand marks (never hand-drawn paths): a logo-only marquee under the hero, and a hairline grid of named marks in the stack section. Sticky rails carry the section label plus, in Experience, the whole six-role track while the detail column scrolls. The hero portrait sits in a chrome frame (cool sheen plus a 1px inner highlight) and drifts on its own scroll timeline.

**Motion inventory** (each has one job):

| Effect | Job | How |
| --- | --- | --- |
| Name unmask | hierarchy, first impression | `clip-path` keyframes, staggered per line |
| Portrait drift | depth | `animation-timeline: view()`, ±3% |
| Reading progress | orientation | `animation-timeline: scroll()` on a 1px accent line |
| Word-by-word ink-in | pacing the opening claim | per-word `--i` offsets the `animation-range` |
| Rule draw | section arrival | `scaleX` on the accent underline |
| Scroll reveals | rhythm | `view()` timelines, no scroll listener |
| Count-up stats | draws the eye to the numbers | `IntersectionObserver`, cubic ease-out |
| Magnetic CTA | feedback | `pointermove` transform, no state |
| Card lift, sweep underline, `<details>` rotate | feedback and state | CSS transitions |

Everything is wrapped in `prefers-reduced-motion`; the count-up and magnetic script bail out entirely when motion is reduced, and the scroll-driven reveals degrade to plain visible content where view timelines are unsupported.

**The one script.** `V2Page.astro` carries a single inline island for the count-up and the magnetic CTA. Both need per-frame values, which CSS scroll timelines cannot express. Nothing else on the page uses JavaScript.

