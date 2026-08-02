# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # Astro dev server with HMR — http://localhost:4321
npm run build     # Static build to ./dist/
npm run preview   # Serve built dist/ locally
npm run astro     # Direct Astro CLI access (e.g. `npm run astro check` for type-check)
```

There is no test runner, linter, or formatter configured. Type-checking is via `astro check` (run through `npm run astro check`).

## Skills

`.claude/skills/design-taste-frontend/` — [tasteskill](https://www.tasteskill.dev/docs) (MIT, `Leonxlnx/taste-skill`), an anti-slop frontend ruleset for landing pages, portfolios and redesigns. Useful for **new** surfaces.

**`DESIGN.md` outranks it inside this repo.** The skill's "AI tells" ban list forbids several things that are deliberate signatures here: numbered section eyebrows (`§ 01`), middle-dot separators, em-dashes, hairline rules as decoration, the custom cursor blob, Inter as the default face. Do not "fix" the existing design to satisfy the skill — apply it when designing something new, and defer to `DESIGN.md` on anything the site already does.

## Architecture

Static, trilingual (`en` / `ru` / `uz`) personal CV site built with Astro 5 + Tailwind 3. Output is pure HTML/CSS with one small inline `<script>` in the Navbar — no React, no hydration, no client framework.

### Three-layer content pipeline

Content flows in a strict one-direction chain. Do not bypass it.

1. **`src/i18n/{en,ru,uz}.ts`** — typed content bundles, one per locale. Each exports a `CvContent` object (shape defined in `src/types/cv.ts`). All copy, links, JSON-LD, OG/Twitter meta, etc. live here.
2. **`src/i18n/index.ts`** — exports `Lang`, `LANGUAGES`, `DEFAULT_LANG = "en"`, `getContent(lang)`, `isLang()`, and `langHref(lang, hash)`. `langHref` returns `/` for `en` (default lang is at the root, NOT `/en/`) and `/ru/`, `/uz/` for the others.
3. **`src/services/*.service.ts`** — thin getters (e.g. `getHero(lang) => getContent(lang).hero`). Re-exported via `src/services/index.ts`. **Components import only from `../services`, never from `../i18n` directly** (the Navbar imports `LANGUAGES` / `langHref` from i18n because it renders the language switcher — that is the only exception).

### Routing

Three surfaces, all built from the same content:

| Route | Renders | Indexed |
| --- | --- | --- |
| `/`, `/ru/`, `/uz/` | `<V2Page>` — **the site** | yes |
| `/v1`, `/ru/v1`, `/uz/v1` | `<CvPage>` — the archived first design | no |
| `/resume`, `/ru/resume`, `/uz/resume` | `<ResumePage>` — printable CV | no |

- English is never routed through `[lang]/`; it lives at the root of each pair. `getStaticPaths` in every `[lang]/*.astro` returns only `ru` and `uz`.
- To add a fourth language: create `src/i18n/xx.ts`, add it to `translations` in `i18n/index.ts`, add it to `LANGUAGES`, and add `{ params: { lang: "xx" } }` to `getStaticPaths` in **all three** `[lang]/` routes (`index`, `v1`, `resume`). No component changes needed.
- Canonicals and hreflang: v2 uses `pathFor()`, v1 uses `v1PathFor()` (both in `src/consts.ts`). The sitemap filter in `astro.config.mjs` drops `/v1` and `/resume`, matching their `noindex`. If a route stops being noindex, update the filter in the same change.

### Components

`src/components/CvPage.astro` composes the page: `BaseLayout` → `Navbar` + section components (`HeroSection`, `AboutSection`, `TechStackSection`, `ExperienceSection`, `EducationSection`, `ContactSection`) + footer. Every component takes `{ lang }` and pulls its data through a service. Components are dumb — no fetching, no conditionals on locale strings, no inline copy.

`src/layouts/BaseLayout.astro` owns `<head>`: meta tags, OG/Twitter, JSON-LD (`set:html` from `meta.jsonLd`), favicons. SEO data is per-locale via `getSiteMeta(lang)`.

`Navbar.astro` is the only place with client JS — an `is:inline` script handling scroll-spy (highlights nav link of the section in view), mobile menu toggle, smooth-scroll, and scrolled-state styling. Section IDs are derived from `navLinks[].href` (strip the leading `#`). It also renders the "Resume PDF" link to `/resume` (per-locale).

`src/components/ResumePage.astro` is a **standalone** light/A4 document — it does NOT use `BaseLayout` (which is dark + indexed). It renders its own `<html>` (white background, `noindex`, `<style is:inline>` instead of Tailwind, sans-serif Inter only), pulls the same content through the services, and ships a "Download PDF" button that calls `window.print()`. No PDF library/dependency.

**Pagination.** The template emits a flat list of atomic `.block` elements inside `#flow`; an inline script measures them and distributes them into real A4 `.page` boxes (`210×297mm`, fixed-height `.page-body` type area). The same page boxes are used on screen and in print (`@page { size: A4; margin: 0 }` + `break-after: page`), so **the preview is exactly the PDF** — page for page. Section (`.sec`) and entry (`.entry-head`) headings are pushed forward when they'd be orphaned at the bottom of a page; each page gets a `Name — N / M` footer. On narrow screens the whole stack is scaled down with a CSS transform (`fit()`), so pages stay proportional instead of reflowing. Because pages are created at runtime, the styles must stay unscoped — hence `is:inline`; new markup must be a top-level child of `#flow` with class `block` or it won't be paginated.

**ATS.** The layout is deliberately single-column with standard section names ("Professional Summary", "Work Experience", "Technical Skills", "Education", "Languages"), real text (no icons/images/tables carrying data) and contacts as `mailto:`/`tel:`/https links, so applicant-tracking parsers and AI screeners read it cleanly.

UI strings (button/section labels) are inlined per-locale in the component. Some shared content is trimmed for the CV via local filters (e.g. the `HIDDEN_SKILLS` list drops the "Forms & Validation" tech category, per-locale) — the main site is unaffected. Highlights written as `"Project — description"` are auto-split into a bold lead-in by `splitHighlight`.

### v2 — the current site (`/`, `/ru/`, `/uz/`)

The live design, built with the `design-taste-frontend` skill. v1 is kept at `/v1` as an archive, not as an alternative: it is `noindex`, out of the sitemap, and linked only from v2's nav and footer. Both share the content pipeline — same services, same locale bundles, no content duplication.

- `src/pages/index.astro` + `src/pages/[lang]/index.astro` → `src/components/v2/V2Page.astro` → `src/layouts/V2Layout.astro` + section components in `src/components/v2/`.
- `V2Layout` carries the full SEO head (canonical, hreflang, OG, Twitter, JSON-LD). `BaseLayout` still carries v1's, pointed at the `/v1` paths.
- Two themes: system preference by default, plus a nav toggle that pins one via `data-theme` on `<html>` + `localStorage` (`v2-theme`). The pre-paint script lives in `V2Layout`, the click handler in `V2Page`'s island, the icons come from `@tabler/icons` as raw SVG. Dark values exist twice on purpose (media query and `[data-theme="dark"]`) — keep them in sync.
- `src/styles/v2.css` owns the v2 tokens (`--v2-*`, light and dark via `prefers-color-scheme` and `[data-theme]`) and self-hosted Geist / Geist Mono. It does **not** import `global.css`, so v1 and v2 cannot leak into each other. Tailwind exposes the tokens as `bg-v2-bg`, `text-v2-ink`, `border-v2-line`, `bg-v2-accent`, plus `font-geist` / `font-geist-mono` and `rounded-v2` / `rounded-v2-lg` — all additive, v1 utilities untouched.
- `src/components/v2/ui.ts` holds the per-locale chrome strings plus the shared helpers: `v2Href`, `noDash` (the skill bans the em-dash, the content bundles are full of them), `leadFrom` (hero subtext capped at 20 words), `splitLead` (bold project lead-in).
- `src/components/v2/logos.ts` maps curated `simple-icons` exports to `{ name, path }`; the marquee and the stack grid render them as inline SVG at build time. Never hand-draw an icon path here.
- Motion is CSS first: entry keyframes, `animation-timeline: view()` reveals, `animation-timeline: scroll()` for the reading-progress line. **No scroll listeners.** One inline script in `V2Page.astro` covers the two things CSS cannot do (stat count-up, magnetic CTA) and exits early under `prefers-reduced-motion`.
- Experience is a native `<details>` list beside a sticky rail; no JavaScript is involved in opening entries.
- v2 is the indexed surface; `/v1` and `/resume` are `noindex` so the same content never competes with itself in search.

Constraints that override the skill inside this repo: Astro + Tailwind 3 (the skill defaults to React/Next + Tailwind v4 + the Motion library), and no client framework per the architecture rule above. Everything else in the skill was applied.

### Styling

- Tailwind 3 with `darkMode: ["class"]` and `applyBaseStyles: false` (base styles come from `src/styles/global.css`, imported once by `BaseLayout`).
- All theme colors are HSL CSS variables (`--background`, `--primary`, `--border`, etc.) defined in `global.css`. Use Tailwind utilities like `bg-background`, `text-primary`, `border-border` — do not hardcode hex values.
- Fonts: `font-heading` (Space Grotesk), `font-mono` (JetBrains Mono).
- `@/*` path alias maps to `src/*` (configured in `tsconfig.json`, extends `astro/tsconfigs/strict`).

### When editing content

- Changing copy: edit the relevant locale file in `src/i18n/`. If the shape changes (new field, new section), update `src/types/cv.ts` first — the three locale files will fail to compile until they all conform, which is the intended safety net.
- Adding a section: define the type in `cv.ts`, add the field to all three locales, add a service getter, create the component, mount it in `CvPage.astro`, and add a `navLinks` entry in all three locales (the `href` becomes the section's `id` for scroll-spy).
