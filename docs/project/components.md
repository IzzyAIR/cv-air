# Компоненты и layouts

Компоненты «глупые»: принимают `{ lang }`, тянут данные через сервис, рендерят разметку.
Ни фетчей, ни условий по строке локали, ни инлайн-копирайта.

## Общий контракт

```astro
---
import { getAbout } from "../services";   // только из services, не из i18n
import type { Lang } from "../i18n";      // тип — можно

interface Props { lang: Lang }
const { lang } = Astro.props;
const about = getAbout(lang);
---
```

Единственные исключения по импорту из `src/i18n/`: `Navbar.astro`, `V2Nav.astro` и
`V2Layout.astro` берут `LANGUAGES` / `langHref` — им нужен список локалей для переключателя
языка и `hreflang`, а это не контент.

## v2 — живой сайт (`src/components/v2/`)

| Компонент             | Сервис / источник           | Что делает                                                    |
| --------------------- | --------------------------- | ------------------------------------------------------------- |
| `V2Page.astro`        | —                           | Композиция: `V2Layout` → `V2Nav` + `<main>` из секций + островок JS |
| `V2Nav.astro`         | `getHero`, `LANGUAGES`      | Шапка, якоря, переключатель языка, ссылка на `/v1`, тумблер темы |
| `V2ThemeToggle.astro` | `getUi`                     | Кнопка `#v2-theme`, иконки солнца/луны из `@tabler/icons` как raw SVG |
| `V2Hero.astro`        | `getHero`, `getContact`     | Имя, заголовок, лид (обрезан `leadFrom`), CTA, фото через `astro:assets` |
| `V2Marquee.astro`     | `MARQUEE_LOGOS`             | Бегущая строка брендовых марок, без props                     |
| `V2Stats.astro`       | `getAbout`                  | Цифры из `about.stats`, разбор `value` на число и суффикс, `data-count` для счетчика |
| `V2About.astro`       | `getAbout`                  | Секция `#about`                                                |
| `V2Experience.astro`  | `getExperience`             | Секция `#work`: нативные `<details>` рядом со sticky-рельсом  |
| `V2Stack.astro`       | `getTechStack`, `CORE_LOGOS`| Секция `#stack`: подписанная сетка логотипов                   |
| `V2Credentials.astro` | `getEducation`              | Образование и языки                                            |
| `V2Contact.astro`     | `getContact`, `getHero`     | Секция `#contact`, футер, ссылка на архив `/v1`               |

Секционные `id` (`about`, `work`, `stack`, `contact`) — якоря навигации v2; они заданы в
разметке секций и должны совпадать с хешами в `V2Nav`.

## v1 — архив (`src/components/`)

`CvPage.astro` собирает `BaseLayout` → `Navbar` + `HeroSection`, `AboutSection`,
`TechStackSection`, `ExperienceSection`, `EducationSection`, `ContactSection` + футер.
Все — с тем же контрактом `{ lang }` + сервис.

`Navbar.astro` — единственное место с клиентским JS в v1: скролл-спай, мобильное меню,
плавный скролл, состояние «проскроллено». `id` секций выводятся из `navLinks[].href`
(снимается ведущий `#`), поэтому ссылка в локальном бандле и `id` в компоненте связаны
жестко.

Архив не развиваем: правки в v1 нужны только тогда, когда меняется форма контента
(`types/cv.ts`) и он перестает компилироваться.

## Layouts

| Layout             | Обслуживает | Что несет                                                          |
| ------------------ | ----------- | ------------------------------------------------------------------ |
| `V2Layout.astro`   | `/`         | `src/styles/v2.css`, полный SEO-head, pre-paint скрипт темы        |
| `BaseLayout.astro` | `/v1`, 404  | `src/styles/global.css`, SEO-head с canonical на `/v1`, проп `noindex` |

Два layout'а импортируют разные CSS-файлы, и `v2.css` не подключает `global.css` — из-за
этого дизайны не протекают друг в друга. Не сводить их в один.

## ResumePage

`src/components/ResumePage.astro` не использует layout вообще: рендерит собственный
`<html>`, шрифты импортирует напрямую из `@fontsource-variable`, стили — `<style is:inline>`
вместо Tailwind. Подробности — в файле `resume.md` этого раздела.

## Добавление секции на v2

1. Тип секции — в `src/types/cv.ts`.
2. Поле — во все три бандла `src/i18n/{en,ru,uz}.ts` (иначе не компилируется).
3. Геттер — в `src/services/`, реэкспорт в `src/services/index.ts`.
4. Компонент `src/components/v2/V2Xxx.astro` по контракту выше.
5. Монтаж в `V2Page.astro` и, если нужен якорь, — `id` секции + запись в `navLinks`
   всех трех бандлов.
