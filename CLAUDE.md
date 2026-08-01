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

- `src/pages/index.astro` — `/` (English, default).
- `src/pages/[lang]/index.astro` — `/ru/` and `/uz/`. `getStaticPaths` returns only `ru` and `uz` (English is NOT routed via this file, it lives at the root).
- Both pages render `<CvPage lang={lang} />`. To add a fourth language: create `src/i18n/xx.ts`, add it to `translations` in `i18n/index.ts`, add it to `LANGUAGES`, and add `{ params: { lang: "xx" } }` to `getStaticPaths` (in both `[lang]/index.astro` and `[lang]/resume.astro`). No component changes needed.
- `src/pages/resume.astro` (`/resume`) and `src/pages/[lang]/resume.astro` (`/ru/resume`, `/uz/resume`) render `<ResumePage lang={lang} />` — the printable, downloadable CV.

### Components

`src/components/CvPage.astro` composes the page: `BaseLayout` → `Navbar` + section components (`HeroSection`, `AboutSection`, `TechStackSection`, `ExperienceSection`, `EducationSection`, `ContactSection`) + footer. Every component takes `{ lang }` and pulls its data through a service. Components are dumb — no fetching, no conditionals on locale strings, no inline copy.

`src/layouts/BaseLayout.astro` owns `<head>`: meta tags, OG/Twitter, JSON-LD (`set:html` from `meta.jsonLd`), favicons. SEO data is per-locale via `getSiteMeta(lang)`.

`Navbar.astro` is the only place with client JS — an `is:inline` script handling scroll-spy (highlights nav link of the section in view), mobile menu toggle, smooth-scroll, and scrolled-state styling. Section IDs are derived from `navLinks[].href` (strip the leading `#`). It also renders the "Resume PDF" link to `/resume` (per-locale).

`src/components/ResumePage.astro` is a **standalone** light/A4 document — it does NOT use `BaseLayout` (which is dark + indexed). It renders its own `<html>` (white background, `noindex`, `<style is:inline>` instead of Tailwind, sans-serif Inter only), pulls the same content through the services, and ships a "Download PDF" button that calls `window.print()`. No PDF library/dependency.

**Pagination.** The template emits a flat list of atomic `.block` elements inside `#flow`; an inline script measures them and distributes them into real A4 `.page` boxes (`210×297mm`, fixed-height `.page-body` type area). The same page boxes are used on screen and in print (`@page { size: A4; margin: 0 }` + `break-after: page`), so **the preview is exactly the PDF** — page for page. Section (`.sec`) and entry (`.entry-head`) headings are pushed forward when they'd be orphaned at the bottom of a page; each page gets a `Name — N / M` footer. On narrow screens the whole stack is scaled down with a CSS transform (`fit()`), so pages stay proportional instead of reflowing. Because pages are created at runtime, the styles must stay unscoped — hence `is:inline`; new markup must be a top-level child of `#flow` with class `block` or it won't be paginated.

**ATS.** The layout is deliberately single-column with standard section names ("Professional Summary", "Work Experience", "Technical Skills", "Education", "Languages"), real text (no icons/images/tables carrying data) and contacts as `mailto:`/`tel:`/https links, so applicant-tracking parsers and AI screeners read it cleanly.

UI strings (button/section labels) are inlined per-locale in the component. Some shared content is trimmed for the CV via local filters (e.g. the `HIDDEN_SKILLS` list drops the "Forms & Validation" tech category, per-locale) — the main site is unaffected. Highlights written as `"Project — description"` are auto-split into a bold lead-in by `splitHighlight`.

### Styling

- Tailwind 3 with `darkMode: ["class"]` and `applyBaseStyles: false` (base styles come from `src/styles/global.css`, imported once by `BaseLayout`).
- All theme colors are HSL CSS variables (`--background`, `--primary`, `--border`, etc.) defined in `global.css`. Use Tailwind utilities like `bg-background`, `text-primary`, `border-border` — do not hardcode hex values.
- Fonts: `font-heading` (Space Grotesk), `font-mono` (JetBrains Mono).
- `@/*` path alias maps to `src/*` (configured in `tsconfig.json`, extends `astro/tsconfigs/strict`).

### When editing content

- Changing copy: edit the relevant locale file in `src/i18n/`. If the shape changes (new field, new section), update `src/types/cv.ts` first — the three locale files will fail to compile until they all conform, which is the intended safety net.
- Adding a section: define the type in `cv.ts`, add the field to all three locales, add a service getter, create the component, mount it in `CvPage.astro`, and add a `navLinks` entry in all three locales (the `href` becomes the section's `id` for scroll-spy).
