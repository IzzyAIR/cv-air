import type { Lang } from "./i18n";

export const SITE_URL = "https://izzycode-two.vercel.app";
export const SITE_NAME = "Izzatilla Aliev — CV";
export const TWITTER_HANDLE = "@izzy2105";

export const OG_IMAGE = "/og-image.svg";
export const OG_IMAGE_WIDTH = 1200;
export const OG_IMAGE_HEIGHT = 630;

export const LOCALE_MAP: Record<Lang, string> = {
  en: "en_US",
  ru: "ru_RU",
  uz: "uz_UZ",
};

/** Canonical site path — v2 lives at the root. */
export function pathFor(lang: Lang): string {
  return lang === "en" ? "/" : `/${lang}/`;
}

/** The archived first design. Reachable, but out of the index. */
export function v1PathFor(lang: Lang): string {
  return lang === "en" ? "/v1" : `/${lang}/v1`;
}

export function absoluteUrl(path: string): string {
  const base = SITE_URL.replace(/\/$/, "");
  const tail = path.startsWith("/") ? path : `/${path}`;
  return `${base}${tail}`;
}
