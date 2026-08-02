<div align="center">

# 🪪 cv-air

**Personal CV / portfolio site of Izzatilla Aliev.**
Static. Trilingual. Minimal JS.

[![Astro](https://img.shields.io/badge/Astro-5.x-BC52EE?logo=astro&logoColor=white)](https://astro.build)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.x-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![License: MIT](https://img.shields.io/badge/License-MIT-1abc9c.svg)](#license)

[**Live →**](https://cv.izzyaliev.dev) · [English](/) · [Русский](/ru/) · [Oʻzbek](/uz/)

</div>

---

## ✨ Highlights

- 🚀 **Astro 5** static site — pre-rendered HTML, zero hydration cost
- 🌍 **i18n on `en` / `ru` / `uz`** — full content + meta, language switcher in nav
- 🧩 **Service layer** — every section pulls from `getXxx(lang)`; components stay dumb
- 🎨 **Tailwind 3** design system on CSS variables — single source of truth for theme
- 🧠 **Zero React** — interactivity is a few lines of vanilla `<script>` in the Navbar
- 📦 **One bundle** — built site is just HTML + CSS + a tiny inline script
- 📄 **Printable résumé** at `/resume` — ATS-friendly single-column A4, paginated on screen exactly as it prints, no PDF library

## 🛠️ Stack

| Layer            | Tech                                                |
| ---------------- | --------------------------------------------------- |
| Framework        | [Astro 5](https://astro.build)                      |
| Language         | TypeScript                                          |
| Styling          | Tailwind CSS 3 + CSS custom properties              |
| i18n             | Hand-rolled — typed bundles per locale              |
| Tooling          | Vite (via Astro), `tailwindcss-animate`             |

## 🗂️ Project structure

```
src/
├── components/         # Astro section components (Hero, About, …)
│   ├── CvPage.astro    # Composition of all sections for one locale
│   ├── Navbar.astro    # Sticky nav + scroll-spy + lang switcher
│   └── ResumePage.astro        # Standalone A4 résumé document (own <html>)
├── i18n/
│   ├── index.ts        # Lang type, LANGUAGES, getContent(lang)
│   ├── en.ts | ru.ts | uz.ts   # All copy + data per locale
├── layouts/
│   └── BaseLayout.astro        # <head>, SEO, OG, JSON-LD per locale
├── pages/
│   ├── index.astro             # / — English
│   ├── [lang]/index.astro      # /ru/, /uz/
│   ├── resume.astro            # /resume  (+ [lang]/resume.astro)
│   └── 404.astro
├── services/                   # getHero(lang), getExperience(lang), …
├── styles/global.css           # Tailwind + tokens
├── types/cv.ts                 # All section types
└── assets/
```

## 🌍 Internationalization

All copy lives in three typed bundles — [`src/i18n/en.ts`](src/i18n/en.ts), [`src/i18n/ru.ts`](src/i18n/ru.ts), [`src/i18n/uz.ts`](src/i18n/uz.ts) — and is exposed through a single `getContent(lang)` function. Components never reach into the bundle directly; they consume thin service wrappers:

```ts
// services/hero.service.ts
export function getHero(lang: Lang) {
  return getContent(lang).hero;
}
```

```astro
---
// components/HeroSection.astro
import { getHero } from "../services";
const { lang } = Astro.props;
const hero = getHero(lang);
---
<h1>{hero.firstName} <span>{hero.lastName}</span></h1>
```

Adding a fourth language = one new file in `src/i18n/`, one entry in `LANGUAGES`, one path in `getStaticPaths`. No component changes.

## 🚀 Getting started

```bash
# install
npm install

# dev — http://localhost:4321
npm run dev

# production build → ./dist/
npm run build

# preview the built site locally
npm run preview
```

## 📜 Scripts

| Script            | What it does                                  |
| ----------------- | --------------------------------------------- |
| `npm run dev`     | Astro dev server with HMR                     |
| `npm run build`   | Static build to `dist/`                       |
| `npm run preview` | Serve the built `dist/` locally               |
| `npm run astro`   | Direct access to the Astro CLI                |

## 🧭 Routes

| Path         | Page                     | Indexed |
| ------------ | ------------------------ | ------- |
| `/`          | Site — English (default) | yes     |
| `/ru/`       | Site — Русский           | yes     |
| `/uz/`       | Site — Oʻzbek            | yes     |
| `/v1`        | Archived v1 — English    | no      |
| `/ru/v1`     | Archived v1 — Русский    | no      |
| `/uz/v1`     | Archived v1 — Oʻzbek     | no      |
| `/resume`    | Résumé — English         | no      |
| `/ru/resume` | Résumé — Русский         | no      |
| `/uz/resume` | Résumé — Oʻzbek          | no      |
| `/404`       | Not Found                | —       |

## 🧊 The design

The live site is **v2** — a full redesign that replaced the original warm-dark editorial layout. The first design is kept at `/v1` as an archive: reachable, `noindex`, out of the sitemap, linked from the nav and the footer. Both are built from the same services and locale bundles; only the presentation differs.

- **Cold Luxury** palette: cool grey neutrals with one cobalt accent. Two themes — the system preference by default, plus a nav toggle that pins a choice in `localStorage` and applies it before first paint. Geist + Geist Mono, self-hosted.
- **Real brand marks** from Simple Icons: a logo marquee under the hero, a named grid in the stack section. No hand-drawn icon paths.
- **Motion is CSS first** — scroll-driven reveals, a `scroll()`-timeline reading-progress line, a masked name reveal, word-by-word ink-in. No scroll listeners. One small inline script covers the stat count-up and the magnetic CTA, and it bails out entirely under `prefers-reduced-motion`.
- Tokens live in `src/styles/v2.css` and never touch `global.css`, so the two designs cannot affect each other.

## 📄 Résumé

`/resume` renders the same content as an A4 document — no PDF dependency, "Download PDF" just calls `window.print()`.

- **Paginated preview.** An inline script measures the content blocks and lays them out into real A4 page boxes. The same boxes are what the browser prints, so **what you see is page-for-page the PDF**. Section and entry headings are pushed to the next page instead of being orphaned; every page carries a `Name — N / M` footer.
- **ATS-friendly.** Single column, standard section names (Professional Summary / Work Experience / Technical Skills / Education / Languages), plain selectable text, contacts as `mailto:` / `tel:` / https links — no icons, tables or images carrying data, so applicant-tracking parsers and AI screeners read it cleanly.
- Content comes through the same services as the site; only résumé-specific trimming (e.g. hidden skill categories) lives in the component.

## 🚢 Deploy

Output is plain static — drop `dist/` on anything that serves files:

- **Vercel** — `Framework: Astro`, build `npm run build`, output `dist`
- **Netlify** — same
- **GitHub Pages** / **Cloudflare Pages** — point at `dist/`
- **nginx / Caddy / S3** — copy `dist/` and you're done

## 📬 Contact

- ✉️ [izzycode2105@gmail.com](mailto:izzycode2105@gmail.com)
- ✈️ [t.me/izzy2105](https://t.me/izzy2105)
- 🌐 [izzycode-two.vercel.app](https://izzycode-two.vercel.app/)

## 📝 License

MIT © [Izzatilla Aliev](https://github.com/IzzyAIR)
