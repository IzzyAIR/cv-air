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

## Architecture

Static, trilingual (`en` / `ru` / `uz`) personal CV site built with Astro 5 + Tailwind 3. Output is pure HTML/CSS with one small inline `<script>` in the Navbar — no React, no hydration, no client framework.

### Three-layer content pipeline

Content flows in a strict one-direction chain. Do not bypass it.

1. **`src/i18n/{en,ru,uz}.ts`** — typed content bundles, one per locale. Each exports a `CvContent` object (shape defined in `src/types/cv.ts`). All copy, links, JSON-LD, OG/Twitter meta, etc. live here.
2. **`src/i18n/index.ts`** — exports `Lang`, `LANGUAGES`, `DEFAULT_LANG = "en"`, `getContent(lang)`, `isLang()`, and `langHref(lang, hash)`. `langHref` returns `/` for `en` (default lang is at the root, NOT `/en/`) and `/ru/`, `/uz/` for the others.
3. **`src/services/*.service.ts`** — thin getters (e.g. `getHero(lang) => getContent(lang).hero`). Re-exported via `src/services/index.ts`. **Components import only from `../services`, never from `../i18n` directly** (the Navbar imports `LANGUAGES` / `langHref` from i18n because it renders the language switcher — that is the only exception).

### Routing

- `src/pages/index.astro` — `/` (English, default).
- `src/pages/[lang]/index.astro` — `/ru/` and `/uz/`. `getStaticPaths` returns only `ru` and `uz` (English is NOT routed via this file, it lives at the root).
- Both pages render `<CvPage lang={lang} />`. To add a fourth language: create `src/i18n/xx.ts`, add it to `translations` in `i18n/index.ts`, add it to `LANGUAGES`, and add `{ params: { lang: "xx" } }` to `getStaticPaths` (in both `[lang]/index.astro` and `[lang]/resume.astro`). No component changes needed.
- `src/pages/resume.astro` (`/resume`) and `src/pages/[lang]/resume.astro` (`/ru/resume`, `/uz/resume`) render `<ResumePage lang={lang} />` — the printable, downloadable CV.

### Components

`src/components/CvPage.astro` composes the page: `BaseLayout` → `Navbar` + section components (`HeroSection`, `AboutSection`, `TechStackSection`, `ExperienceSection`, `EducationSection`, `ContactSection`) + footer. Every component takes `{ lang }` and pulls its data through a service. Components are dumb — no fetching, no conditionals on locale strings, no inline copy.

`src/layouts/BaseLayout.astro` owns `<head>`: meta tags, OG/Twitter, JSON-LD (`set:html` from `meta.jsonLd`), favicons. SEO data is per-locale via `getSiteMeta(lang)`.

`Navbar.astro` is the only place with client JS — an `is:inline` script handling scroll-spy (highlights nav link of the section in view), mobile menu toggle, smooth-scroll, and scrolled-state styling. Section IDs are derived from `navLinks[].href` (strip the leading `#`). It also renders the "Resume PDF" link to `/resume` (per-locale).

`src/components/ResumePage.astro` is a **standalone** light/A4 document — it does NOT use `BaseLayout` (which is dark + indexed). It renders its own `<html>` (white background, `noindex`, scoped `<style>` instead of Tailwind, sans-serif Inter only), pulls the same content through the services, and ships a "Download PDF" button that calls `window.print()`. The print stylesheet (`@page { size: A4 }`, `@media print` hides the toolbar and resets the sheet) produces a clean A4 PDF — no PDF library/dependency. On screen the sheet is responsive (`max-width: 100%`, two-column/skill rows stack under 780px) so it reads on mobile, but print output is always strict A4. UI strings (button/section labels) are inlined per-locale in the component. Some shared content is trimmed for the CV via local filters (e.g. the `HIDDEN_SKILLS` list drops the "Forms & Validation" tech category, per-locale) — the main site is unaffected.

### Styling

- Tailwind 3 with `darkMode: ["class"]` and `applyBaseStyles: false` (base styles come from `src/styles/global.css`, imported once by `BaseLayout`).
- All theme colors are HSL CSS variables (`--background`, `--primary`, `--border`, etc.) defined in `global.css`. Use Tailwind utilities like `bg-background`, `text-primary`, `border-border` — do not hardcode hex values.
- Fonts: `font-heading` (Space Grotesk), `font-mono` (JetBrains Mono).
- `@/*` path alias maps to `src/*` (configured in `tsconfig.json`, extends `astro/tsconfigs/strict`).

### When editing content

- Changing copy: edit the relevant locale file in `src/i18n/`. If the shape changes (new field, new section), update `src/types/cv.ts` first — the three locale files will fail to compile until they all conform, which is the intended safety net.
- Adding a section: define the type in `cv.ts`, add the field to all three locales, add a service getter, create the component, mount it in `CvPage.astro`, and add a `navLinks` entry in all three locales (the `href` becomes the section's `id` for scroll-spy).
