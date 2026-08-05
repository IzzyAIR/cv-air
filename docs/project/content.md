# Контент: типы, локали, сервисы

Однонаправленная цепочка. Обходить ее нельзя ни в одну сторону.

```
src/types/cv.ts  →  src/i18n/{en,ru,uz}.ts  →  src/i18n/index.ts  →  src/services/*  →  компоненты
     форма              контент                  выбор локали          геттеры          разметка
```

## 1. Форма — `src/types/cv.ts`

Интерфейсы всех секций: `SiteMeta`, `NavLink`, `Hero`, `About`, `TechStack`, `Experience`,
`Education`, `Contact` и вложенные (`HeroCta`, `AboutStat`, `TechCategory`,
`ExperienceItem`, `EducationItem`, `LanguageItem`, `ContactLink`).

Меняем форму **первой**: три локальных бандла перестают компилироваться, пока все три не
приведены к новому типу. Это и есть страховка от «перевели на русский, забыли узбекский».

Замечания по типам:

- `ContactLink.type` — union `"telegram" | "phone" | "portfolio"`; компоненты фильтруют
  ссылки по нему, а не по порядку в массиве.
- `HeroCta.variant` — `"primary" | "outline"`; вариант выбирает контент, не компонент.
- `ExperienceItem.location` и `highlights` — опциональные, разметка обязана это переживать.
- `SiteMeta.jsonLd` — `Record<string, unknown>`, вставляется в `<head>` через `set:html`.

## 2. Контент — `src/i18n/en.ts`, `ru.ts`, `uz.ts`

Каждый файл экспортирует один объект типа `CvContent`. Внутри — вся копия: заголовки,
абзацы, метаданные, OG/Twitter, JSON-LD, ссылки. Текстов в компонентах нет.

`CvContent` описан в `src/i18n/index.ts`:

```ts
interface CvContent {
  siteMeta; navLinks; brand; hero; about; techStack; experience; education; contact;
}
```

Правки копирайта — только здесь. Если правка нужна лишь на одной поверхности, это не
причина плодить поля: сначала смотрим на локальные фильтры (например, `HIDDEN_SKILLS`
в резюме).

## 3. Выбор локали — `src/i18n/index.ts`

| Экспорт                    | Назначение                                                        |
| -------------------------- | ----------------------------------------------------------------- |
| `Lang`                     | `"en" \| "ru" \| "uz"`                                             |
| `LANGUAGES`                | `[{ code, label }]` — порядок переключателя языка                  |
| `DEFAULT_LANG`             | `"en"`                                                             |
| `CvContent`                | Форма бандла                                                       |
| `getContent(lang)`         | Бандл локали, с откатом на `DEFAULT_LANG`                          |
| `isLang(value)`            | Type guard для параметров маршрута                                 |
| `langHref(lang, hash?)`    | `/` для `en`, `/ru/`, `/uz/` для остальных; хеш добавляется в конец |

## 4. Геттеры — `src/services/`

Тонкие функции без логики:

```ts
export function getHero(lang: Lang) {
  return getContent(lang).hero;
}
```

Файлы: `site.service.ts` (`getSiteMeta`), `navigation.service.ts` (`getNavLinks`,
`getBrand`), `hero`, `about`, `tech-stack`, `experience`, `education`, `contact`.
Все реэкспортированы из `src/services/index.ts` — компоненты импортируют только оттуда.

**Инвариант:** компонент не импортирует `src/i18n/` ради контента. Слой сервисов — точка,
где однажды можно будет подменить источник (CMS, JSON, коллекции Astro), не трогая
двадцать компонентов.

Слой сервисов при этом не место для форматирования: обрезка, разбиение и очистка текста
живут в хелперах поверхности (`src/components/v2/ui.ts` для v2, локальные функции внутри
`ResumePage.astro` для резюме).

## Добавить четвертый язык

1. `src/i18n/xx.ts` — копия `en.ts`, переведенная целиком (тип не даст пропустить поле).
2. `src/i18n/index.ts`: расширить `Lang`, добавить в `translations` и в `LANGUAGES`.
3. `{ params: { lang: "xx" } }` в `getStaticPaths` **всех трех** `[lang]/`-маршрутов:
   `index.astro`, `v1.astro`, `resume.astro`.
4. `LOCALE_MAP` в `src/consts.ts` — пара вида `xx: "xx_XX"` для OG-локали и `hreflang`.
5. `astro.config.mjs` — локаль в `sitemap({ i18n: { locales } })`.
6. `STRINGS` в `src/components/v2/ui.ts` — блок chrome-строк новой локали.
7. UI-строки резюме внутри `ResumePage.astro` — там свой per-locale словарь.

Компоненты при этом не меняются ни в одном файле.

## Добавить поле в существующую секцию

1. Поле в интерфейс в `src/types/cv.ts`.
2. Значение во все три бандла.
3. Использование в компоненте нужной поверхности.

Обратный порядок (сначала разметка) дает поле, которого нет в двух локалях, и молчаливый
`undefined` в проде.
