# Design system — cv-air

A personal-CV / portfolio that reads like a **printed editorial** and behaves like a **modern web engineering tool**. Senior in tone, restrained in ornament, decisive in detail.

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
