# CLAUDE.md

Guidance for Claude Code (claude.ai/code) in this repository.

Static, trilingual (`en` / `ru` / `uz`) personal CV site: Astro 5 + Tailwind 3, no React, no
hydration, no client bundle. Three surfaces from one content pipeline — the site (`/`), the
archived first design (`/v1`), the printable résumé (`/resume`).

## Commands

```bash
npm run dev       # Astro dev server with HMR — http://localhost:4321
npm run build     # Static build to ./dist/
npm run preview   # Serve built dist/ locally
npm run astro     # Direct Astro CLI access (e.g. `npm run astro check` for type-check)
```

No test runner, linter or formatter. `npm run astro check` is the only automated gate.

## Start here

`docs/` is the project map and the design system. Walk down from
[`docs/README.md`](docs/README.md): [`docs/project/`](docs/project/README.md) for routes,
components, content, logic, résumé and deploy; [`docs/design/`](docs/design/README.md) for the
design system; [`docs/changes/`](docs/changes/README.md) for dated notes.

Read the file matching the layer you are about to touch **before** editing it.

## Invariants

- **Content flows one way:** `types/cv.ts` → `i18n/{en,ru,uz}.ts` → `i18n/index.ts` →
  `services/*` → components. Components import from `../services`, never from `../i18n` for
  content. Copy changes go in the locale files, all three of them.
- **English lives at the root.** `getStaticPaths` in every `[lang]/*.astro` returns only `ru`
  and `uz`. Never emit `/en/`.
- **`noindex` and the sitemap filter move together.** `/v1` and `/resume` are both, in the same
  commit.
- **No client framework, no client bundle.** Interactivity is CSS first; when it cannot be, an
  inline script inside the surface's existing island that respects `prefers-reduced-motion`.
- **No hardcoded colours.** Tokens only (`src/styles/v2.css`, `src/styles/global.css`).
- **`v2.css` does not import `global.css`.** The two designs must not leak into each other.
- **The résumé sheet is always white**, and new markup there must be a top-level `.block`
  inside `#flow` or it will not paginate.

## Skills

`.claude/skills/design-taste-frontend/` — [tasteskill](https://www.tasteskill.dev/docs) (MIT,
`Leonxlnx/taste-skill`), an anti-slop frontend ruleset. Use it when designing something **new**.

**`docs/design/` outranks it inside this repo.** Its "AI tells" ban list forbids things that are
deliberate signatures of the archived v1. Do not "fix" the existing design to satisfy the skill.

## After a change

Structural change → update the matching file in `docs/project/` or `docs/design/`.
Non-obvious behaviour change → add a day file under `docs/changes/`. Rules:
[`docs/CONTRIBUTING.md`](docs/CONTRIBUTING.md).
