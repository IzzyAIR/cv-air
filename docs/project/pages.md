# Страницы и маршрутизация

Все маршруты статические. Английский живет в корне, `ru` и `uz` — под префиксом.

## Карта маршрутов

| Путь         | Файл                            | Рендерит     | Индексация |
| ------------ | ------------------------------- | ------------ | ---------- |
| `/`          | `src/pages/index.astro`         | `V2Page`     | да         |
| `/ru/`       | `src/pages/[lang]/index.astro`  | `V2Page`     | да         |
| `/uz/`       | `src/pages/[lang]/index.astro`  | `V2Page`     | да         |
| `/v1`        | `src/pages/v1.astro`            | `CvPage`     | нет        |
| `/ru/v1`     | `src/pages/[lang]/v1.astro`     | `CvPage`     | нет        |
| `/uz/v1`     | `src/pages/[lang]/v1.astro`     | `CvPage`     | нет        |
| `/resume`    | `src/pages/resume.astro`        | `ResumePage` | нет        |
| `/ru/resume` | `src/pages/[lang]/resume.astro` | `ResumePage` | нет        |
| `/uz/resume` | `src/pages/[lang]/resume.astro` | `ResumePage` | нет        |
| `/404`       | `src/pages/404.astro`           | `BaseLayout` | —          |

Файлы страниц — четыре-пять строк: импорт компонента и передача `lang`. Никакой логики
в `src/pages/` не держим.

## Английский не проходит через `[lang]/`

`getStaticPaths` во **всех трех** `[lang]/*.astro` возвращает только `ru` и `uz`:

```ts
export function getStaticPaths() {
  return [{ params: { lang: "ru" } }, { params: { lang: "uz" } }];
}
```

Если добавить туда `en`, появятся дубли `/en/` при живом `/` — конкуренция страниц в выдаче.
Корневой путь для `en` зашит в `pathFor`, `v1PathFor` (`src/consts.ts`), `langHref`
(`src/i18n/index.ts`) и `v2Href`, `v1Href` (`src/components/v2/ui.ts`).

## SEO по поверхностям

| Поверхность | Голова страницы             | canonical      | robots            |
| ----------- | --------------------------- | -------------- | ----------------- |
| v2          | `src/layouts/V2Layout.astro`   | `pathFor(lang)` через `v2Href` | `index, follow` |
| v1          | `src/layouts/BaseLayout.astro` | `v1PathFor(lang)`              | `noindex, nofollow` (проп `noindex`) |
| resume      | собственный `<head>` в `src/components/ResumePage.astro` | нет | `noindex, nofollow` |

`V2Layout` и `BaseLayout` раскладывают `hreflang` по всем локалям из `LANGUAGES` плюс
`x-default` на английскую версию. Оба берут метаданные через `getSiteMeta(lang)`,
включая JSON-LD (вставляется `set:html` из `meta.jsonLd`).

## Sitemap

`@astrojs/sitemap` настроен в `astro.config.mjs`. Фильтр выкидывает архив и резюме:

```js
filter: (page) => !/\/(v1|resume)\/?$/.test(page)
```

**Инвариант:** фильтр и `noindex` должны совпадать. Меняется одно — в том же коммите
меняется второе, иначе в sitemap попадает страница, закрытая от индексации.

`site` в `astro.config.mjs` и `SITE_URL` в `src/consts.ts` — два места с одним и тем же
доменом; при переезде правим оба. `trailingSlash: "ignore"`.

## 404

`src/pages/404.astro` — единственная страница на английском без локализованных пар,
использует `BaseLayout` с явными `title`/`description` и `noindex`.

## Добавление маршрута

1. Создать `src/pages/<name>.astro` (английский, корень) и `src/pages/[lang]/<name>.astro`.
2. В `[lang]`-версии вернуть из `getStaticPaths` все локали, кроме `en`.
3. Решить вопрос индексации: если страница `noindex` — добавить ее в фильтр sitemap.
4. Проверить, нужен ли ей canonical и hreflang; если да — маршрут должен получить свою
   функцию пути в `src/consts.ts`, а не собирать URL строками по месту.
